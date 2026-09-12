import { Inputs } from "../Footer";

export const onSubmit = async (formData: Inputs) => {
  const { email } = formData;

  const data = {
    email: email,
  };

  const res = await fetch(
    `/api/subscribers`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const json = await res.json();
  return json;
};
