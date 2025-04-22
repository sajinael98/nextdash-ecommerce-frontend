import React from "react";
import SettingForm from "../../components/admin-panel/setting-form";

const BuyingSetting = () => {
  return (
    <SettingForm
      schema={{
        updatePrice: {
          type: "boolean",
          label: "Update Price",
          description:
            "Enables modification of the last recorded price when goods are received.",
        },
        insertNewPrice: {
          type: "boolean",
          label: "Insert New Price",
          description:
            "Allow the system to insert a new price for the item if no price exists after it is received.",
        },
      }}
    />
  );
};

export default BuyingSetting;
