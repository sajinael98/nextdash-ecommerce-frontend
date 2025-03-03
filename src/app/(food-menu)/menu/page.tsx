"use client";

import { Center, Container, Text, TextInput } from "@mantine/core";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";
import dayjs from 'dayjs'
import { IconSearch } from "@tabler/icons-react";

const MenuPage = () => {
  const searchParams = useSearchParams();
  return (
    <Container>
      <Center styles={{ root: { filter: "brightness(0) invert(1)" } }}>
        <Image
          src="/food-menu/logo.png"
          width={200}
          height={100}
          alt="rehan logo"
        />
      </Center>
      <Text c="white" fz={25} mb="md">
        {dayjs().format("A") === "AM" ? "صباح الخير" : "مساء الخير"}
      </Text>
      <TextInput placeholder="ماذا تود أن تأكل اليوم ؟" mb="md" rightSection={<IconSearch/>}/>
    </Container>
  );
};

export default MenuPage;
