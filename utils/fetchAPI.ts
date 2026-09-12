import { requestApi } from "lib/apiGateway";

const fetchAPI = async (endpoint: string) => {
  const json = await requestApi("GET", endpoint);

  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }

  return json.data;
};

export default fetchAPI;
