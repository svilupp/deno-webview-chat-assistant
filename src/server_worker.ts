import { Application } from "jsr:@oak/oak@17.1.2";
import { oakCors } from "jsr:@tajpouria/cors@1.2.1";

const app = new Application();
const port = Number(self.name || 8001);
const distPath = new URL("../dist/", import.meta.url).pathname;

app.use(oakCors());
app.use(async (context) => {
  try {
    // Load files via Deno loader, Oak paths do not work correctly when compiled
    const requestedPath = context.request.url.pathname;
    const fullPath = `${distPath}${requestedPath === '/' ? 'index.html' : requestedPath}`;
    const fileContents = await Deno.readFile(fullPath);

    if (fullPath.endsWith('.html')) {
      context.response.type = "text/html";
    } else if (fullPath.endsWith('.js')) {
      context.response.type = "application/javascript";
    } else if (fullPath.endsWith('.css')) {
      context.response.type = "text/css";
    }

    context.response.body = fileContents;
  } catch (error) {
    context.response.status = 404;
    context.response.body = `File not found: ${context.request.url.pathname}`;
    throw error;
  }
});

console.log(`Server running on http://localhost:${port}`);
await app.listen({ port });