import type { APIRoute } from "astro";

export const GET: APIRoute = () => {
  return new Response(
    "dh=3938ab8131cb20562881b3cabe931223d20d5c61",
    {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
};
