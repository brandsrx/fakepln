# FakePLN

**Detección de Noticias Falsas mediante Procesamiento de Lenguaje Natural y Arquitecturas Transformer**

## Descripción

FakePLN es un proyecto de detección automática de noticias falsas en español utilizando técnicas de PLN (Procesamiento de Lenguaje Natural) y modelos basados en arquitecturas Transformer. El objetivo es construir un chatbot capaz de clasificar noticias como **reales** o **falsas** a partir de su contenido textual.

## Dataset

El conjunto de datos utilizado contiene noticias en español con las siguientes características:

| Archivo | Registros | Descripción |
|---|---|---|
| `data/spanishFakeNews.csv` | 538 | Datos de entrenamiento (305 reales, 233 falsas) |
| `data/testSpanishFakeNews.csv` | 60 | Datos de prueba |

Cada registro incluye dos columnas:
- **texto**: Contenido de la noticia
- **clase**: Etiqueta (`fake` o `real`)

## Fases del Proyecto

### Fase 1: Adquisición y Análisis Exploratorio de Datos (EDA)
- Carga y limpieza del dataset (eliminación de nulos y duplicados)
- Análisis del balance de clases
- Distribución de longitud de textos
- Extracción de entidades nombradas con spaCy

### Fases futuras
- Tokenización y preparación de datos para arquitecturas Transformer
- Entrenamiento y fine-tuning de modelos (BERT, RoBERTa, etc.)
- Implementación del chatbot interactivo

## Tecnologías

- **Python 3**
- **Pandas, NumPy** — Manipulación y análisis de datos
- **Matplotlib, Seaborn** — Visualización de datos
- **spaCy** — Procesamiento de lenguaje natural y reconocimiento de entidades
- **Transformers (Hugging Face)** — Modelos Transformer para clasificación
- **Jupyter Notebook** — Entorno de desarrollo experimental

## Instalación

```bash
pip install pandas numpy matplotlib seaborn spacy
python -m spacy download es_core_news_md
```

## Uso

Abrir el notebook principal:

```bash
jupyter notebook notebook.ipynb
```

## Estructura del Proyecto

```
fakepln/
├── data/
│   ├── spanishFakeNews.csv        # Dataset de entrenamiento
│   └── testSpanishFakeNews.csv    # Dataset de prueba
├── notebook.ipynb                 # Notebook principal con EDA
└── README.md
```

## Licencia

Este proyecto se desarrolla con fines educativos y de investigación.
