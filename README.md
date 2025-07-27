# AI ↔ Human Prompt Protocol

A shared project to compare natural language prompts with protocol-driven ones using OpenAI, through a minimal web interface.

This project lets you test how structured prompt protocols can improve consistency, reproducibility, and collaboration with LLMs.

It's born with the idea to collaborate to create a new efficient way to communicate with AI assistants and LLMs, to build without losing control or quality.

## Folder structure

```
/resources
├── protocol/               # Markdown descriptions of protocols (task.md, front-end.md...)
├── prompts
│   ├── standard/           # Natural language prompts
│   │   └── results/        # Results of standard prompts
│   └── enhanced/           # Protocol-based prompts (JSON with "protocol" field)
│       └── results/        # Results of enhanced prompts
/src
└── public/                 # Frontend static interface
```

## How to use

1. Clone the repository
2. Create a `.env` file with your OpenAI key:
   ```
   OPENAI_API_KEY=your-api-key-here
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the server:
   ```
   npm start
   ```
5. Open `http://localhost:3000` to access the interface.

## Purpose

This tool allows developers and researchers to:
- Compare human-style prompts with structured protocol ones
- Collect and store results
- Experiment with collaborative logic between human ↔ AI

## TODO

- Create a loading component that appears when a OpenAI request is processing
- Allora the creation of protocols and prompts directly from the web page
- Integrate more models and LLMs
- Build and share!

## Author

Created by Mattia Marchesini ([info@mattiamarchesini.com](mailto:info@mattiamarchesini.com)).
Currently working on **KLIK**, an AI-native meta-framework designed to empower developers without introducing unintended side effects.

KLIK's vision is to create a better future with developers, by sharing this early tool with the GitHub community, I hope to encourage experimentation and collaboration around better human–AI interaction practices.

---

Contributions welcome. No code exposure required to join discussions or test prompts.
