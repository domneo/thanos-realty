import { Inputs } from "./Form";

export const onSubmit = async (formData: Inputs) => {
  const { name, email, contactNumber, requirementBrief } = formData;

  const data = {
    email: email,
    name: name,
    contact_number: contactNumber,
    requirement_brief: requirementBrief,
    session_id: localStorage.getItem("session_id"),
    message: "_",
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}api/v1/contact/saved-listings`,
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
