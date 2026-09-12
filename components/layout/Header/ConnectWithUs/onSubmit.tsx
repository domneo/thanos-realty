import { iAmInterestedInValues, Inputs } from "./Form";

export const onSubmit = async (formData: Inputs) => {
  const {
    name,
    email,
    iAmInterestedIn_OptimisingRealEstateFootprint,
    iAmInterestedIn_ChangeImplementation,
    iAmInterestedIn_Learningaboutindustrytrendsandbenchmark,
    iAmInterestedIn_HybridWorkingArrangement,
    iAmInterestedIn_AdoptingModernWorkplace,
    iAmInterestedIn_Exploringmarketoptions,
    iAmInterestedIn_Other,
    iAmInterestedIn_OtherText,
    companyName,
    headcount,
    currentOfficeSize,
  } = formData;

  const iAmInterestedIn = [
    iAmInterestedIn_OptimisingRealEstateFootprint,
    iAmInterestedIn_ChangeImplementation,
    iAmInterestedIn_Learningaboutindustrytrendsandbenchmark,
    iAmInterestedIn_HybridWorkingArrangement,
    iAmInterestedIn_AdoptingModernWorkplace,
    iAmInterestedIn_Exploringmarketoptions,
    iAmInterestedIn_Other,
  ]
    .map((val, i) => {
      if (val) {
        return iAmInterestedInValues[i];
      }
      return;
    })
    .filter((val) => val !== undefined);

  const message = `
    <p>I am interested in:</p>
    ${
      iAmInterestedIn
        ? `<ul>${iAmInterestedIn
            .map((val) => {
              return `<li>${val}${
                val === "Other" && iAmInterestedIn_OtherText
                  ? `: ${iAmInterestedIn_OtherText}`
                  : ``
              }</li>`;
            })
            .join("")}</ul>`
        : `-`
    }
    <p>Company Name: ${companyName || `-`}</p>
    <p>Headcount: ${headcount || `-`}</p>
    <p>Current Office Size: ${currentOfficeSize || `-`}</p>
  `;

  const data = {
    email: email,
    name: name,
    message: message,
    interests: JSON.stringify(iAmInterestedIn),
    other: iAmInterestedIn_OtherText || null,
    company: companyName,
    headcount: headcount,
    office_size: currentOfficeSize,
  };

  const res = await fetch("/api/v1/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  return json;
};
