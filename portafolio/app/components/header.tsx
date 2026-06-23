"use client";

import { Box, Flex, HStack, Link, Text, Menu, MenuButton, MenuList, MenuItem, Button, Icon } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../LanguageContext";

const GlobalIcon = (props: any) => (
  <Icon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </Icon>
);

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  const navItems = [
    { label: t("nav.home"), href: "#home" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.skills"), href: "#skills" },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const isScrollingDown = currentY > lastScrollY.current;

      setIsScrolled(currentY > 20);

      if (currentY < 40) {
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
      position="fixed"
      top="16px"
      left="50%"
      zIndex={20}
      w="92%"
      maxW="5xl"
      transform={isHidden ? "translate(-50%, -150%)" : "translate(-50%, 0)"}
      transition="transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s, border-color 0.3s"
      borderRadius="full"
      borderWidth="1px"
      borderColor={isScrolled ? "rgba(169, 127, 255, 0.2)" : "rgba(169, 127, 255, 0.1)"}
      bg={isScrolled ? "rgba(7, 7, 9, 0.85)" : "rgba(7, 7, 9, 0.6)"}
      backdropFilter="blur(16px)"
      boxShadow={isScrolled ? "0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)" : "none"}
      py={2.5}
      px={{ base: 4, md: 8 }}
    >
      <Flex align="center" justify="space-between">
        <Link
          href="#home"
          textDecoration="none"
          _hover={{ textDecoration: "none" }}
        >
          <Text
            fontFamily="pixel"
            fontWeight="400"
            fontSize={{ base: "xs", md: "sm" }}
            letterSpacing="wider"
            bgGradient="linear(to-r, brand.300, brand.500)"
            bgClip="text"
            transition="opacity 0.2s"
            _hover={{ opacity: 0.8 }}
          >
            CM
          </Text>
        </Link>

        <HStack as="nav" spacing={{ base: 2, md: 5 }}>
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              color="gray.300"
              fontSize={{ base: "10px", md: "xs" }}
              fontWeight="700"
              textTransform="uppercase"
              letterSpacing="widest"
              position="relative"
              transition="color 0.2s"
              _hover={{
                color: "brand.300",
                textDecoration: "none",
              }}
            >
              {item.label}
            </Link>
          ))}

          <Box pl={{ base: 1, md: 2 }}>
            <Menu autoSelect={false}>
              <MenuButton
                as={Button}
                size="xs"
                variant="outline"
                color="gray.300"
                borderColor="rgba(169, 127, 255, 0.2)"
                bg="transparent"
                borderRadius="full"
                px={{ base: 2, md: 3 }}
                fontSize="9px"
                fontWeight="700"
                leftIcon={<GlobalIcon boxSize="10px" />}
                _hover={{ bg: "rgba(169, 127, 255, 0.08)", color: "brand.300", borderColor: "brand.400" }}
                _active={{ bg: "rgba(169, 127, 255, 0.15)" }}
              >
                {language.toUpperCase()}
              </MenuButton>
              <MenuList
                bg="rgba(7, 7, 9, 0.95)"
                backdropFilter="blur(8px)"
                borderColor="rgba(169, 127, 255, 0.2)"
                borderRadius="lg"
                boxShadow="xl"
                minW="100px"
                p={1}
                zIndex={25}
              >
                <MenuItem
                  bg="transparent"
                  color="gray.300"
                  fontSize="xs"
                  fontWeight={language === "es" ? "700" : "400"}
                  _hover={{ bg: "rgba(169, 127, 255, 0.1)", color: "brand.300" }}
                  onClick={() => setLanguage("es")}
                  borderRadius="md"
                  px={3}
                  py={2}
                >
                  Español
                </MenuItem>
                <MenuItem
                  bg="transparent"
                  color="gray.300"
                  fontSize="xs"
                  fontWeight={language === "en" ? "700" : "400"}
                  _hover={{ bg: "rgba(169, 127, 255, 0.1)", color: "brand.300" }}
                  onClick={() => setLanguage("en")}
                  borderRadius="md"
                  px={3}
                  py={2}
                >
                  English
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </HStack>
      </Flex>
    </Box>
  );
}