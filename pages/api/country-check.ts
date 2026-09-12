import { NextApiRequest, NextApiResponse } from "next";

export default function countryCheck(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const country = req.headers["x-vercel-ip-country"];
  res.status(200).json({ country: country ? country : "" });
}
