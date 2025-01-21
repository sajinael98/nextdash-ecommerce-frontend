import AutoForm from "@components/autoform";
import { RJSFSchema } from "@rjsf/utils";

import React from "react";
const schema: RJSFSchema = {
  title: "A registration form",
  description: "A simple form example.",
  type: "object",
  required: ["isMale", "lastName"],
  properties: {
    firstName: {
      type: "string",
      title: "First name",
    },
    lastName: {
      type: "string",
      title: "Last name",
    },
    isMale: {
      type: "boolean",
      title: "is Male",
    },
    age: {
      type: "number",
      title: "Age",
      minimum: 20,
    },
    birthDate: {
      type: "string",
      format: "date",
      title: "Birth Date",
    },
    listOfStrings: {
      type: "array",
      title: "A list of strings",
      items: {
        type: "object",
        required: ["lastName"],
        properties: {
          firstName: {
            type: "string",
            view: true,
          },
          lastName: {
            type: "string",
            view: true,
          },
        },
      },
    },
    personDetails: {
      type: "object",
      title: "Person Details",
      properties: {
        firstName: {
          type: "string",
        },
        lastName: {
          type: "string",
        },
      },
    },
    personDetail2s: {
      type: "object",
      title: "Person Details",
      properties: {
        firstName: {
          type: "string",
        },
        lastName: {
          type: "string",
        },
      },
    },
  },
};

const IndexPage = () => {
  return <AutoForm schema={schema} />;
};

export default IndexPage;
