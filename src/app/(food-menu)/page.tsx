"use client";

import { Box, Flex, Text } from "@mantine/core";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/menu");
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Flex h={"100vh"} align="center" justify="center">
        
        <Box
          pos="relative"
          h={150}
          w="100%"
          style={{ zIndex: 2, top: -100 }}
          component={motion.div}
          animate={{
            filter: "brightness(0) invert(1)",
            top: 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.5,
          }}
        >
          <Image
            unoptimized={false}
            src="/food-menu/logo.png"
            alt="logo"
            style={{ objectFit: "contain" }}
            fill
          />
        </Box>
        <Box
          style={{
            width: "100vw",
            height: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            paddingBlock: "var(--mantine-spacing-md)",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
          component={motion.div}
          animate={{ height: "100vh" }}
          transition={{ duration: 0.5 }}
          bg="mPrimary"
        >
          <Text
            ta="center"
            c="white"
            component={motion.p}
            animate={{ opacity: 0 }}
            transition={{
              delay: 0.5,
            }}
          >
            أهلاً وسهلاً بكم
          </Text>
        </Box>
      </Flex>
    </>
  );
};

export default IndexPage;
