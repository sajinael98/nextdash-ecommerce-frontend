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
      }}
    />
  );
};

export default BuyingSetting;
