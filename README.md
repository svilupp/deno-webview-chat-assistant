# Deno Webview Chat Assistant Template

A minimalist template for building AI-powered desktop applications using Deno 2.1, Vue.js, and Webview. This template helps you quickly create standalone executables for your GenAI tasks.

The example is a simple chat assistant talking to OpenAI that will be packaged into a single file.
It should take less than 5 minutes.

## Why This Template?

While there are many web-based AI applications, desktop applications offer unique advantages:
- **Privacy & Security**: Direct access to local files without cloud upload
- **Streamlined Workflow**: Integrate with your desktop environment and tools
- **Easy Distribution**: Single executable file for simple installation
- **Custom UI/UX**: Full control over the user experience without browser limitations
- **Offline Features**: Work without internet (If you use local backends like llama.cpp)

## Features

- **Deno 2.1**: Modern runtime with built-in TypeScript support
- **Vue.js**: Reactive UI framework for smooth user interactions
- **Webview**: Lightweight alternative to Electron
- **Single Binary**: Compiles into a standalone executable
- **Hot Reload**: Development with instant feedback
- **TypeScript**: Full type safety out of the box

## Prerequisites

- **Deno 2.1** or later installed on your system
- Your preferred **AI API key** (OpenAI, Anthropic, etc.)

## Getting Started

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/deno-webview-chat-assistant.git
   cd deno-webview-chat-assistant
   ```

2. **Install Dependencies**
   ```bash
   deno install
   ```

3. **Configure Your AI API**
   Create a `.env` file in the project root (see `.env.example` for reference)
   ```env
   VITE_OPENAI_API_KEY=your-api-key-here
   ```

## Development

Run the development server with hot reload (uses Vite + Webview):
```bash
deno task dev
```
The app will be available at `http://localhost:8001`.

## Building

Create a standalone executable (builds Vite into dist/ folder and then compiles it with Deno):
```bash
deno task compile
```

The executable will be created in the root directory and it will called `myapp`. Just double click it to run.
See `deno.json` for more configuration options, look for key `--output` to change the output directory.    

## Project Structure

It's not pretty mixing the backend and frontend, but we keep it flat for simplicity.

```
├── src/
│   ├── App.vue         # Main Vue component with chat UI
│   ├── env.d.ts        # TypeScript environment declarations
│   ├── vue.ts          # Vue application entry point
│   ├── main.ts         # Deno/Webview initialization
│   └── server_worker.ts # Static file server for production
├── deno.json       # Deno configuration
├── .env            # Environment variables - Make sure to set your OpenAI API key
└── README.md
```

## License

MIT License - feel free to use this template for your own projects!

## Acknowledgments

- [Deno](https://deno.land/) for the runtime
- [Vue.js](https://vuejs.org/) for the frontend framework
- [Webview](https://github.com/webview/webview) for native GUI capabilities (we're using the Deno port)