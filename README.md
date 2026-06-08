# FakePLN — Verox

**Detección de Noticias Falsas en Español mediante Procesamiento de Lenguaje Natural y Arquitecturas Transformer**

FakePLN es un proyecto académico de detección automática de noticias falsas en español. Consta de dos componentes principales:

- **Notebook de análisis y entrenamiento** (`notebook.ipynb`) — Carga el dataset, realiza análisis exploratorio (EDA), entena un modelo BETO (Spanish BERT) y lo evalúa.
- **Aplicación web** (`web/`) — Chatbot interactivo llamado **Verox** construido con Next.js que permite al usuario pegar una noticia y recibir un análisis generado por IA.

---

## Dataset

El conjunto de datos contiene noticias en español etiquetadas como `real` o `fake`:

| Archivo | Registros | Descripción |
|---|---|---|
| `data/spanishFakeNews.csv` | 538 | Entrenamiento (305 reales, 233 falsas) |
| `data/testSpanishFakeNews.csv` | 60 | Prueba |

Cada registro tiene dos columnas: **texto** (contenido de la noticia) y **clase** (`fake` o `real`).

---

## Componente de Ciencia de Datos (`notebook.ipynb`)

### Fases

1. **EDA** — Carga y limpieza, balance de clases, distribución de longitud de textos, reconocimiento de entidades con spaCy.
2. **Tokenización** — Limpieza de texto, división train/test, tokenización con el tokenizador de BETO (`dccuchile/bert-base-spanish-wwm-cased`, max 512 tokens).
3. **Fine-tuning** — Entrenamiento de `BertForSequenceClassification` con PyTorch y pérdida ponderada para compensar el desbalanceo.
4. **Evaluación** — Accuracy ~98.3% en el conjunto de prueba (60 noticias), inferencia de ~49 ms por artículo.

### Requisitos

```
pip install pandas numpy matplotlib seaborn scikit-learn spacy transformers datasets accelerate torch
python -m spacy download es_core_news_md
```

### Ejecución

```bash
jupyter notebook notebook.ipynb
```

---

## Aplicación Web — Verox

Chatbot interactivo que recibe una noticia y devuelve un análisis detallado usando dos modelos:
1. **Modelo clasificador** (Gradio en Hugging Face) — Clasificación técnica.
2. **LLM conversacional** (OpenRouter — Nvidia Nemotron) — Genera una respuesta legible en español.

### Tecnologías

| Tecnología | Versión |
|---|---|
| Next.js | 16.2.7 |
| React | 19.2.4 |
| TypeScript | ^5 |
| Tailwind CSS | ^4 |
| pnpm | — |
| Gradio Client | ^2.2.1 |
| Hugging Face Inference | ^4.13.18 |
| OpenRouter SDK | ^0.12.79 |
| react-markdown | ^10.1.0 |

### Requisitos

- Node.js 20+
- pnpm (recomendado) o npm/yarn/bun

### Variables de Entorno

Crea un archivo `web/.env` con:

```env
HUGGINGFACE_ACCESS_TOKEN=tu_token_huggingface
OPENROUTER_API_KEY=tu_api_key_openrouter
```

> **Nota:** El archivo `web/.env` está en `.gitignore` y no se sube al repositorio.

### Ejecución

```bash
cd web
pnpm install
pnpm dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

### Comandos disponibles

| Comando | Descripción |
|---|---|
| `pnpm dev` | Inicia servidor de desarrollo |
| `pnpm build` | Compila para producción |
| `pnpm start` | Inicia servidor de producción |
| `pnpm lint` | Ejecuta ESLint |

---

## Estructura del Proyecto

```
fakepln/
├── data/
│   ├── spanishFakeNews.csv          # Dataset de entrenamiento
│   └── testSpanishFakeNews.csv      # Dataset de prueba
├── notebook.ipynb                   # Notebook principal: EDA + fine-tuning + evaluación
├── README.md
└── web/                             # Aplicación web Next.js (Verox)
    ├── .env                         # Variables de entorno (no versionado)
    ├── package.json
    ├── next.config.ts
    ├── app/
    │   ├── layout.tsx               # Layout raíz
    │   ├── page.tsx                 # Página de inicio
    │   ├── chat/page.tsx            # Chat interactivo
    │   ├── equipo/page.tsx          # Página del equipo
    │   └── api/chat/route.ts        # API endpoint (POST /api/chat)
    ├── components/
    │   ├── AppShell.tsx             # Layout contenedor
    │   ├── ChatInput.tsx            # Entrada de texto
    │   ├── ChatMessage.tsx          # Burbuja de mensaje
    │   ├── Footer.tsx               # Pie de página
    │   ├── Header.tsx               # Barra de navegación
    │   ├── LandingHero.tsx          # Hero de la landing page
    │   └── MarkdownMessage.tsx      # Renderizado Markdown
    ├── context/
    │   └── chat-context.tsx         # Contexto para compartir mensaje inicial
    └── lib/
        └── utils.ts                 # Utilidad cn()
```

---

## Licencia

Proyecto desarrollado con fines educativos y de investigación para la materia de Procesamiento de Lenguaje Natural.
