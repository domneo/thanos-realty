import React from "react";
import { removeWidows as stringRemoveWidows } from "string-remove-widows";

const removeWidows = (
  children: React.ReactNode,
  removeWidowPreventionMeasures: boolean = false
) => {
  return React.Children.map(children, (child) => {
    if (typeof child === "string") {
      return stringRemoveWidows(child, {
        convertEntities: false,
        removeWidowPreventionMeasures: removeWidowPreventionMeasures,
      }).res;
    }
    return child;
  });
};

export default removeWidows;
