import { requestApi } from "lib/apiGateway";
import { NextApiRequest, NextApiResponse } from "next";

const search = async (req: NextApiRequest, res: NextApiResponse) => {
  const { q = "", model = "", page = "1" } = req.query;
  const json = await requestApi(
    "GET",
    `api/v1/search?q=${encodeURIComponent(
      String(q)
    )}&model=${encodeURIComponent(String(model))}&page=${encodeURIComponent(
      String(page)
    )}`
  );

  if (json.status !== "success") {
    console.error(json.message);
    throw new Error("Failed to fetch API");
  }

  return res.status(200).json(json);
};

export default search;
