import { handleApiRequest } from "lib/api";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * HTTP entry point for the content API. Everything under `/api/v1/*` is
 * handled by the shared router in `lib/api`, which the server-side rendering
 * path calls directly.
 */
export default async function v1(req: NextApiRequest, res: NextApiResponse) {
  const { path, ...query } = req.query;

  const result = await handleApiRequest({
    method: req.method || "GET",
    path: Array.isArray(path) ? path : ([path].filter(Boolean) as string[]),
    query,
    body: req.body,
    baseUrl: "/",
  });

  res.status(result.status).json(result.body);
}
