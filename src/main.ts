import { Webview } from "@webview/webview";

const isDev = Deno.env.get("DEV") === "true";
const port = 8001;

// In production mode, start the worker thread server
if (!isDev) {
  const _worker = new Worker(new URL("./server_worker.ts", import.meta.url), {
    type: "module",
    name: port.toString(),
  });
  
  // Wait for server initialization
  await new Promise((resolve) => setTimeout(resolve, 100));
}

// Create and start WebView
const webview = new Webview(true);
webview.navigate(`http://localhost:${port}`);
webview.run(); 