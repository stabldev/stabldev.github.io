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

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function corsResponse(body: string | null, status = 200): Response {
  return new Response(body, { status, headers: corsHeaders });
}

export default {
  async fetch(
    request: Request,
    env: Env,
    _ctx: ExecutionContext,
  ): Promise<Response> {
    const url = new URL(request.url);

    // handle CORS preflight requests
    if (request.method === "OPTIONS") {
      return corsResponse(null, 204);
    }

    // get the value of the key
    if (request.method === "GET") {
      const key = url.searchParams.get("key");
      if (!key) return corsResponse("Missing key", 400);

      const value = await env.REACTIONS.get(key);
      if (!value) return corsResponse("Not found", 404);

      return corsResponse(value);
    }

    // increment the value of the key
    if (request.method === "POST") {
      const key = url.searchParams.get("key");
      if (!key) return corsResponse("Missing key", 400);

      const value: number =
        parseInt((await env.REACTIONS.get(key)) || "0", 10) + 1;
      await env.REACTIONS.put(key, value.toString());
      return corsResponse(value.toString());
    }

    // only "GET", "POST" and "OPTIONS" are allowed
    return corsResponse("Method not allowed", 405);
  },
} satisfies ExportedHandler<Env>;
