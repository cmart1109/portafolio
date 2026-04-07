"use client";

import { Box, Container, Flex, HStack, Link, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const isScrollingDown = currentY > lastScrollY.current;

      if (currentY < 24) {
        setIsHidden(false);
      } else if (isScrollingDown) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={20}
      transform={isHidden ? "translateY(-120%)" : "translateY(0)"}
      transition="transform 0.28s ease"
      borderBottomWidth="1px"
      borderColor="brand.700"
      bg="rgba(7, 7, 9, 0.75)"
      backdropFilter="blur(8px)"
    >
      <Container maxW="5xl" py={3}>
        <Flex align="center" justify="space-between">
          <Link
            href="#top"
            textDecoration="none"
            _hover={{ textDecoration: "none", color: "brand.200" }}
          >
            <Text
              fontFamily="pixel"
              fontWeight="400"
              fontSize={{ base: "sm", md: "md" }}
              letterSpacing="wider"
              color="brand.100"
            >
              CM
            </Text>
          </Link>

          <HStack as="nav" spacing={{ base: 3, md: 6 }}>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                color="gray.200"
                fontSize="sm"
                fontWeight="600"
                textTransform="uppercase"
                letterSpacing="wide"
                _hover={{ color: "brand.200" }}
              >
                {item.label}
              </Link>
            ))}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}