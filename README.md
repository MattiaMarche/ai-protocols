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
   └── components/          # Frontend components separated to keep pages clean
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

## UI

This project uses partial early versions of the KLIK theme system: a set of CSS custom properties designed to build consistent interfaces.  
While it shares some principles with utility-first systems like Tailwind, it is much lighter and entirely tailor-made.

The theme was originally part of a TypeScript + SASS module and is still in the process of being streamlined.

To avoid unnecessary complexity for such a minimal UI, the project also includes a very basic component system:  
components are plain JavaScript functions stored in the `/components` folder and injected automatically into DOM elements with a `data-comp` attribute.  
This allows for cleaner pages without introducing libraries like React or Vue, which would be overkill in this context.

## TODO

- Create a loading component that appears when a OpenAI request is processing
- Allow the creation of protocols and prompts directly from the web page
- Add an assistant enhancing prompts for a specified structure (ex. use `protocol.json` to convert `standard.md`)
- Integrate more models and LLMs
- Build and share!

## Author

Created by Mattia Marchesini ([info@mattiamarchesini.com](mailto:info@mattiamarchesini.com)).
Currently working on **KLIK**, an AI-native meta-framework designed to empower developers without introducing unintended side effects.

KLIK's vision is to create a better future with developers, by sharing this early tool with the GitHub community, I hope to encourage experimentation and collaboration around better human–AI interaction practices.

Most of my work is in private or long-term projects (visit my [Index Page](https://github.com/MattiaMarche/index) if you're interested).
I share selected tools and experiments that reflect my actual vision like `AI ↔ Human Prompt Protocol`.

---

Contributions welcome. No code exposure required to join discussions or test prompts.
