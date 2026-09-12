import { handleApiRequest } from "./api";

/**
 * Single place that `api/v1/*` calls go through.
 *
 * The router runs in-process, which is what lets `getStaticProps` build pages
 * without an HTTP server listening.
 */
export const requestApi = async (
  method: string,
  endpoint: string,
  body?: unknown
): Promise<any> => {
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
