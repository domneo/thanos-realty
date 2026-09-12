import { handleApiRequest } from "./api";

/**
 * Single place that decides where `api/v1/*` calls go.
 *
 * With `API_BASE_URL` unset the request is served in-process by `lib/api`,
 * which is what lets `getStaticProps` build pages without an HTTP server
 * listening. Point `API_BASE_URL` at a host to proxy to an external API
 * instead.
 */
export const requestApi = async (
  method: string,
  endpoint: string,
  body?: unknown
): Promise<any> => {
  const base = process.env.API_BASE_URL;

  if (base) {
    const res = await fetch(`${base}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: body === undefined ? null : JSON.stringify(body),
    });
    return res.json();
  }

  const [pathname, search] = endpoint.replace(/^\/?api\/v1\/?/, "").split("?");
  const query: Record<string, string> = {};
  new URLSearchParams(search || "").forEach((value, key) => {
    query[key] = value;
  });

  const result = await handleApiRequest({
    method,
    path: pathname.split("/").filter(Boolean).map(decodeURIComponent),
    query,
    body,
    baseUrl: "/",
  });

  return result.body;
};
