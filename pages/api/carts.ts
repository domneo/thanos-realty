import { requestApi } from "lib/apiGateway";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * Saved listings are keyed by the `session_id` the browser keeps in
 * localStorage, so the cart endpoints are proxied rather than called from the
 * client directly.
 */
export default async function carts(req: NextApiRequest, res: NextApiResponse) {
  const sessionId = String(req.query.session_id || "");

  switch (req.method) {
    case "GET":
      return res
        .status(200)
        .json(
          await requestApi(
            "GET",
            `api/v1/cart?session_id=${encodeURIComponent(sessionId)}`
          )
        );

    case "POST":
    case "DELETE":
      return res
        .status(200)
        .json(await requestApi(req.method, "api/v1/cart", req.body));

    default:
      res.setHeader("Allow", "GET, POST, DELETE");
      return res
        .status(405)
        .json({ success: false, message: "Method not allowed" });
  }
}
