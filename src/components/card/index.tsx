import { CardProps, Card as CardMantine } from "@mantine/core";
import React from "react";
import classes from "./card.module.css";

const Card: React.FC<CardProps> = ({ children, ...props }) => {
  return (
    <CardMantine {...props} className={classes["card"]}>
      {children}
    </CardMantine>
  );
};

export default Card;
