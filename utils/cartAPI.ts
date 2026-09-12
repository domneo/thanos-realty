const fetchProperties = async (
  method: string,
  data: {
    session_id?: string;
    property_id?: string;
  }
) => {
  const res = await fetch(
    `/api/carts?session_id=${data.session_id}`,
    {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: method !== "GET" ? JSON.stringify(data) : null,
    }
  );

  const json = await res.json();
  if (json.success === false) {
    console.error(json.message);
    throw new Error(json.message);
  }

  return json;
};

export const getSavedProperties = async (data: { session_id?: string }) => {
  return await fetchProperties("GET", data);
};

export const addProperty = async (data: {
  session_id?: string;
  property_id?: string;
}) => {
  return await fetchProperties("POST", data);
};

export const removeProperty = async (data: {
  session_id?: string;
  property_id?: string;
}) => {
  return await fetchProperties("DELETE", data);
};
