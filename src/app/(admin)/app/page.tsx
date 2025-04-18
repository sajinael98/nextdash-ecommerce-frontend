"use client";

import {
  SetFieldError,
  SetFieldValue,
  SetValues,
} from "@mantine/form/lib/types";
import { BaseRecord, LogicalFilter } from "@refinedev/core";
import { getSession } from "next-auth/react";
import AutoForm from "./components/admin-panel/dashboard-form";

interface FieldChange {
  [key: string]: (
    value: any,
    values: BaseRecord,
    frm: {
      setFieldError: SetFieldError<any>;
      setFieldValue: SetFieldValue<any>;
      setValues: SetValues<any>;
    }
  ) => void;
}

const change: FieldChange = {
  "items.0.saji": (value, values, form) => {
    form.setFieldValue("lastName", "nael");
    console.log("saji");
  },
};

const IndexPage = () => {
  function submitHandler(values: any) {
    console.log(values);
  }

  async function check() {
    const session = await getSession();
    const filter: LogicalFilter = {
      field: "uom",
      operator: "eq",
      value: "saji",
    };
  }
  return (
    <>
      <button onClick={check}>click</button>
      <AutoForm
        change={{
          firstName: function (value, values, { setFieldValue }) {},
        }}
        schema={{
          firstName: {
            type: "string",
            label: "First Name",
            required: true,
            validate(value) {
              if (typeof value === "string")
                return value.length < 6 ? "tss" : null;
            },
          },
          lastName: {
            type: "string",
            label: "Last Name",
          },
          age: {
            type: "number",
            label: "Age",
            default: 10,
          },
          isMale: {
            type: "boolean",
            label: "Is Male",
            default: true,
          },
          gender: {
            type: "select",
            label: "Gender",
            data: [{ label: "male", value: "male" }],
          },
          user: {
            type: "resource",
            label: "User",
            resource: "users",
            optionLabel: "username",
          },
          information: {
            type: "object",
            label: "Information",
            fullWidth: true,
            schema: {
              firstName: {
                type: "string",
                label: "First Name",
              },
            },
          },
          items: {
            type: "array",
            label: "items",
            fullWidth: true,
            schema: {
              firstName: {
                type: "string",
                view: true,
                label: "First Name",
              },
              lastName: {
                type: "string",
                view: true,
                label: "Last Name",
                required: true,
              },
            },
            change: {
              firstName: function (value, values, { setFieldValue }) {
                // setFieldValue("lastName", "sa");
              },
            },
          },
        }}
        onSubmit={submitHandler}
      />
    </>
  );
};

export default IndexPage;
