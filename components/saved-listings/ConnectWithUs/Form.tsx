import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import removeWidows from "hooks/useRemoveWidows";

import { SavedListingsContext } from "components/SavedListingsContext";

import { onSubmit } from "./onSubmit";

export interface Inputs {
  name: string;
  email: string;
  contactNumber: string;
  requirementBrief: string;
}

interface FormProps {
  showSuccess: () => void;
  showError: () => void;
}

export const Form = ({ showSuccess, showError }: FormProps) => {
  const {
    register,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const savedListings = useContext(SavedListingsContext);
  const [propertiesInterested, setPropertiesInterested] = useState(
    savedListings.saved
  );
  useEffect(() => {
    setPropertiesInterested(savedListings.saved);
  }, [savedListings.saved]);

  return (
    <form
      onSubmit={handleSubmit((formData) => {
        setIsSubmitting(true);
        onSubmit(formData).then((json) => {
          if (json.success) {
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

      {/* Contact Number */}
      <div className="py-3">
        <label className="form-label" htmlFor="contactNumber">
          Contact Number
        </label>
        <input
          type="text"
          id="contactNumber"
          className={`form-control form-control-lg ${
            errors.contactNumber ? "is-invalid" : ""
          }`}
          {...register("contactNumber", {
            pattern: {
              value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
              message: "Please enter a valid phone number",
            },
          })}
        />
        {errors.contactNumber && (
          <div className="invalid-feedback d-block">
            <p className="mb-0">{removeWidows(errors.contactNumber.message)}</p>
          </div>
        )}
      </div>

      {/* Requirement Brief */}
      <div className="py-3">
        <label className="form-label" htmlFor="requirementBrief">
          Requirement Brief
        </label>
        <textarea
          className={`form-control form-control-lg`}
          id="requirementBrief"
          rows={6}
          {...register("requirementBrief")}
        />
      </div>

      {/* Properties I’m Interested In */}
      <div className="py-3">
        <label className="form-label">Properties I&apos;m Interested In</label>
        {propertiesInterested && propertiesInterested.length > 0 && (
          <>
            <ol>
              {propertiesInterested.map((property) => {
                return (
                  <li key={property.property_id}>
                    <Link href={`/properties/${property.slug}`}>
                      <a target={"_blank"}>
                        <p className="d-inline lg text-primary fw-bold mb-2 ms-3">
                          {property.title}
                        </p>
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </>
        )}
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
