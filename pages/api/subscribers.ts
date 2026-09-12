import { requestApi } from "lib/apiGateway";
import { NextApiRequest, NextApiResponse } from "next";

export default async function subscribers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  return res
    .status(200)
    .json(await requestApi("POST", "api/v1/subscribers", req.body));
}
