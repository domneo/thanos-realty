import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import removeWidows from "hooks/useRemoveWidows";

import { onSubmit } from "./onSubmit";

export const iAmInterestedInValues = [
  "Optimising real estate footprint",
  "Change implementation",
  "Learning about industry trends and benchmark",
  "Hybrid working arrangement",
  "Adopting modern workplace",
  "Exploring market options",
  "Other",
] as const;

type InterestedInValue = typeof iAmInterestedInValues[number];

type StripSpaces<S extends string> = S extends `${infer Head} ${infer Tail}`
  ? `${Head}${StripSpaces<Tail>}`
  : S;

export type InterestedInKey = `iAmInterestedIn_${StripSpaces<InterestedInValue>}`;

export const getInterestedInId = (value: InterestedInValue) =>
  ("iAmInterestedIn_" + value.replace(/\s/g, "")) as InterestedInKey;

const iAmInterestedInKeys = iAmInterestedInValues.map(getInterestedInId);

export type Inputs = Record<InterestedInKey, boolean> & {
  name: string;
  email: string;
  iAmInterestedIn_OtherText: string;
  companyName: string;
  headcount: string;
  currentOfficeSize: string;
};

interface ConnectWithUsFormProps {
  showSuccess: () => void;
  showError: () => void;
}

export const ConnectWithUsForm = ({
  showSuccess,
  showError,
}: ConnectWithUsFormProps) => {
  const {
    register,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const iAmInterestedIn_Other = watch("iAmInterestedIn_Other");

  const validateInterestedIn = () =>
    getValues(iAmInterestedInKeys).includes(true) ||
    "Please select at least one option";

  return (
    <form
      onSubmit={handleSubmit((formData) => {
        setIsSubmitting(true);
        onSubmit(formData).then((json) => {
          if (json.status === "success") {
            console.log("Form submitted!");
            showSuccess();
            setIsSubmitting(false);
          } else {
            console.error(json.message);
            showError();
            setIsSubmitting(false);
          }
        });
      })}
    >
      {/* Name */}
      <div className="py-3">
        <label className="form-label" htmlFor="name">
          Name <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          id="name"
          className={`form-control form-control-lg ${
            errors.name ? "is-invalid" : ""
          }`}
          {...register("name", {
            required: "Please enter your name",
          })}
        />
        {errors.name && (
          <div className="invalid-feedback d-block">
            <p className="mb-0">{removeWidows(errors.name.message)}</p>
          </div>
        )}
      </div>

      {/* Work Email */}
      <div className="py-3">
        <label className="form-label" htmlFor="email">
          Work Email <span className="text-danger">*</span>
        </label>
        <input
          type="email"
          id="email"
          className={`form-control form-control-lg ${
            errors.email ? "is-invalid" : ""
          }`}
          {...register("email", {
            required: "Please enter a valid work email address",
            pattern: {
              value:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Please enter a valid work email address",
            },
          })}
        />
        {errors.email && (
          <div className="invalid-feedback d-block">
            <p className="mb-0">{removeWidows(errors.email.message)}</p>
          </div>
        )}
      </div>

      {/* I Am Interested In */}
      <div className="py-3">
        <label htmlFor="iAmInterestedIn" className="form-label">
          I am interested in <span className="text-danger">*</span>
        </label>
        <AutoColumns>
          {iAmInterestedInValues.map((field) => (
            <div key={field} className="form-check">
              <input
                className="form-check-input"
                id={getInterestedInId(field)}
                type="checkbox"
                {...register(getInterestedInId(field), {
                  validate: validateInterestedIn,
                })}
              />
              <label
                className="form-check-label"
                htmlFor={getInterestedInId(field)}
              >
                {removeWidows(field)}
              </label>
            </div>
          ))}
        </AutoColumns>
        {iAmInterestedIn_Other && (
          <textarea
            className={`form-control form-control-lg ${
              errors.iAmInterestedIn_OtherText ? "is-invalid" : ""
            }`}
            id="iAmInterestedIn_OtherText"
            rows={2}
            {...register("iAmInterestedIn_OtherText", {
              required: "Please provide more info about your other interests",
              shouldUnregister: true,
            })}
          />
        )}
        {iAmInterestedIn_Other && errors.iAmInterestedIn_OtherText && (
          <div className="invalid-feedback d-block">
            <p className="mb-0">
              {removeWidows(errors.iAmInterestedIn_OtherText.message)}
            </p>
          </div>
        )}
        {errors.iAmInterestedIn_Other && (
          <div className="invalid-feedback d-block">
            <p className="mb-0">
              {removeWidows(errors.iAmInterestedIn_Other.message)}
            </p>
          </div>
        )}
      </div>

      {/* Company Name */}
      <div className="py-3">
        <label className="form-label" htmlFor="companyName">
          Company Name
        </label>
        <input
          type="text"
          id="companyName"
          className={`form-control form-control-lg`}
          {...register("companyName")}
        />
      </div>

      <div className="row">
        {/* Headcount */}
        <div className="col-md-7 py-3">
          <label className="form-label" htmlFor="headcount">
            Headcount
          </label>
          <select
            className="form-select form-select-lg"
            id="headcount"
            aria-label="Headcount"
            {...register("headcount")}
          >
            <option value="">Select an option</option>
            <option value="1 - 20">1 - 20</option>
            <option value="21 - 100">21 - 100</option>
            <option value="More than 100">More than 100</option>
          </select>
        </div>

        {/* Current Office Size */}
        <div className="col-md-5 py-3">
          <label className="form-label" htmlFor="currentOfficeSize">
            Current Office Size
          </label>
          <select
            className="form-select form-select-lg"
            id="currentOfficeSize"
            aria-label="Current Office Size"
            {...register("currentOfficeSize")}
          >
            <option value="">Select an option</option>
            <option value="Below 5,000 sq ft">Below 5,000 sq ft</option>
            <option value="5,000 - 15,000 sq ft">5,000 - 15,000 sq ft</option>
            <option value="Above 15,000 sq ft">Above 15,000 sq ft</option>
          </select>
        </div>
      </div>

      <div className="py-5 d-flex justify-content-end">
        <input
          type="submit"
          value={isSubmitting ? "Submitting..." : "Submit"}
          className="btn btn-secondary btn-lg"
          style={{ minWidth: "160px" }}
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
};

const AutoColumns = styled.div`
  columns: 2 15rem;
  column-gap: 3.5rem;
  margin-top: 0.5rem;

  div.form-check {
    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      column-span: all;
    }
  }
`;
