import { Client } from "@gradio/client";

export const runtime = "nodejs";

type ChatMessage = {
    role: "user" | "assistant";
    content: string;
};

const OPENROUTER_MODEL = "nvidia/nemotron-3-ultra-550b-a55b:free";

const SYSTEM_PROMPT = `
Eres Verox, un asistente inteligente especializado en análisis de noticias falsas en español.

Tu objetivo es ayudar al usuario a analizar noticias, titulares o textos informativos y explicar si presentan señales de desinformación.

Reglas de comportamiento:
- Habla siempre como un solo asistente llamado Verox.
- Nunca menciones que internamente existen dos modelos.
- Nunca digas "el modelo de Hugging Face" o "el modelo de OpenRouter".
- Si recibes un resultado técnico previo, intégralo de forma natural como parte de tu propio análisis.
- No cambies el veredicto recibido desde el análisis técnico.
- No inventes fuentes, autores, fechas ni enlaces.
- No afirmes que una noticia es 100% verdadera o 100% falsa.
- Usa lenguaje claro, profesional y fácil de entender.
- Si el usuario solo saluda o pregunta qué haces, responde brevemente y pídele que pegue una noticia.
- Si el usuario pega una noticia, entrega una respuesta ordenada con:
  1. Veredicto probable.
  2. Nivel de confianza si está disponible.
  3. Explicación breve.
  4. Recomendaciones para verificar.
  5. Aclaración de que el sistema es una herramienta de apoyo.

Estilo de respuesta:
- Profesional, claro y confiable.
- Usa markdown cuando ayude.
- Usa negritas para el veredicto.
- Evita respuestas demasiado largas.
- Mantén un tono académico pero amigable.
`.trim();

function jsonError(message: string, status = 500) {
    return Response.json({ success: false, message }, { status });
}

function normalizeHistory(history: unknown): ChatMessage[] {
    if (!Array.isArray(history)) return [];

    return history
        .filter((item): item is ChatMessage => {
            if (!item || typeof item !== "object") return false;
            const maybe = item as Partial<ChatMessage>;
            return (
                (maybe.role === "user" || maybe.role === "assistant") &&
                typeof maybe.content === "string" &&
                maybe.content.trim().length > 0
            );
        })
        .slice(-8)
        .map((item) => ({
            role: item.role,
            content: item.content.trim(),
        }));
}

function createOpenRouterStream(response: Response) {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const reader = response.body?.getReader();
    let buffer = "";

    return new ReadableStream<Uint8Array>({
        async start(controller) {
            if (!reader) {
                controller.close();
                return;
            }

            try {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    buffer += decoder.decode(value, { stream: true });
                    const lines = buffer.split("\n");
                    buffer = lines.pop() ?? "";

                    for (const line of lines) {
                        const trimmed = line.trim();
                        if (!trimmed.startsWith("data:")) continue;

                        const payload = trimmed.slice(5).trim();
                        if (payload === "[DONE]") {
                            controller.close();
                            return;
                        }

                        try {
                            const parsed = JSON.parse(payload) as {
                                choices?: Array<{
                                    delta?: { content?: string };
                                    message?: { content?: string };
                                }>;
                            };
                            const content =
                                parsed.choices?.[0]?.delta?.content ??
                                parsed.choices?.[0]?.message?.content ??
                                "";

                            if (content) controller.enqueue(encoder.encode(content));
                        } catch {
                            // Ignore malformed SSE keepalive lines.
                        }
                    }
                }
            } catch (error) {
                controller.error(error);
                return;
            }

            controller.close();
        },
    });
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const message = body?.message;
        const history = normalizeHistory(body?.history);

        if (!message || typeof message !== "string" || !message.trim()) {
            return jsonError("El mensaje es obligatorio", 400);
        }

        const cleanMessage = message.trim();

        if (!process.env.OPENROUTER_API_KEY) {
            return jsonError("Falta configurar OPENROUTER_API_KEY.", 500);
        }

        const client = await Client.connect("br4nd0n40/verox-fake-news");

        const hfResult = await client.predict("/respond", {
            message: cleanMessage,
        });

        const hfData = hfResult.data as unknown[];

        const modelResponse =
            typeof hfData?.[0] === "string"
                ? hfData[0]
                : JSON.stringify(hfData?.[0] ?? "No se recibió respuesta del modelo.");

        const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
                "X-Title": "Verox",
            },
            body: JSON.stringify({
                model: OPENROUTER_MODEL,
                stream: true,
                messages: [
                    {
                        role: "system",
                        content: SYSTEM_PROMPT,
                    },
                    ...history,
                    {
                        role: "user",
                        content: `
Mensaje original del usuario:
${cleanMessage}

Resultado técnico previo:
${modelResponse}

Integra ese resultado como parte de tu propio análisis y responde como Verox.
            `.trim(),
                    },
                ],
            }),
        });

        if (!openRouterResponse.ok) {
            const errorText = await openRouterResponse.text();
            return jsonError(
                errorText || "No se pudo generar la respuesta conversacional.",
                openRouterResponse.status
            );
        }

        return new Response(createOpenRouterStream(openRouterResponse), {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Cache-Control": "no-store",
            },
        });
    } catch (error) {
        console.error("Error en API:", error);

        return jsonError(
            error instanceof Error
                ? error.message
                : "Hubo un error inesperado al completar el análisis.",
            500
        );
    }
}
