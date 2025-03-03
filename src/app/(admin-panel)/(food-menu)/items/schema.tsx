export const itemSchema = {
  type: "object",
  properties: {
    itemName: {
      type: "string",
      title: "Item Name",
    },
    enabled: {
      type: "boolean",
      title: "Enabled",
      default: true,
    },
    itemImage: {
      type: "string",
      widget: "image",
      title: "Image",
    },
    description: {
      type: "string",
      title: "Description",
    },
    sizes: {
      type: "array",
      title: "Sizes",
      items: {
        type: "object",
        properties: {
          itemSize: {
            type: "string",
            title: "Item Size",
            view: true,
          },
          price: {
            type: "number",
            title: "Price",
            view: true,
          },
          defaultSize: {
            type: "boolean",
            title: "Default",
            view: true,
          },
        },
      },
    },
    modifiers: {
      type: "array",
      title: "Modifiers",
      items: {
        type: "object",
        properties: {
          itemModifier: {
            type: "string",
            title: "Modifier",
            view: true,
          },
        },
      },
    },
  },
};
