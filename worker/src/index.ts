/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
  async fetch(
    request: Request,
    env: Env,
    _ctx: ExecutionContext,
  ): Promise<Response> {
    const url = new URL(request.url);

    // get the value of the key
    if (request.method === "GET") {
      const key = url.searchParams.get("key");
      if (!key) {
        return new Response("Missing key", { status: 400 });
      }

      const value = await env.REACTIONS.get(key);
      if (!value) {
        return new Response("Not found", { status: 404 });
      }
      return new Response(value);
    }

    // increment the value of the key
    if (request.method === "POST") {
      const key = url.searchParams.get("key");
      if (!key) {
        return new Response("Missing key", { status: 400 });
      }

      const value: number =
        parseInt((await env.REACTIONS.get(key)) || "0", 10) + 1;
      await env.REACTIONS.put(key, value.toString());
      return new Response(value.toString());
    }

    // only "GET" and "POST" are allowed
    return new Response("Method not allowed", { status: 405 });
  },
} satisfies ExportedHandler<Env>;
