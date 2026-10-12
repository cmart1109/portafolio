"use client";

import { Box, Button, Flex, HStack, Icon, IconButton, Link, Menu, MenuButton, MenuItem, MenuList, Text, VStack } from "@chakra-ui/react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { ComponentProps } from "react";
import { useLanguage } from "../LanguageContext";

type IconProps = ComponentProps<typeof Icon>;

const GlobalIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </Icon>
);

const MenuIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </Icon>
);

const CloseIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </Icon>
);

const NAV_TARGETS = ["home", "about", "education", "skills", "process", "projects", "contact"] as const;

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("home");
  const lastScrollY = useRef(0);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

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
      setIsMenuOpen(false);

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

  // Close the mobile menu when resizing up to the desktop layout
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  // Highlight the nav item for the section currently in view
  useEffect(() => {
    const sections = NAV_TARGETS.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Scroll progress indicator */}
      <motion.div
        aria-hidden="true"
        style={{
          scaleX: progress,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          transformOrigin: "left",
          background: "linear-gradient(90deg, #431b99, #7735ff, #a97fff)",
          zIndex: 40,
          pointerEvents: "none",
        }}
      />

      <Box
        as="header"
        position="fixed"
        top={{ base: "12px", md: "16px" }}
        left="50%"
        zIndex={30}
        w="92%"
        maxW="5xl"
        transform={isHidden && !isMenuOpen ? "translate(-50%, -150%)" : "translate(-50%, 0)"}
        transition="transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s, border-color 0.3s"
        borderRadius="full"
        borderWidth="1px"
        borderColor={isScrolled || isMenuOpen ? "rgba(169, 127, 255, 0.2)" : "rgba(169, 127, 255, 0.1)"}
        bg={isScrolled || isMenuOpen ? "rgba(7, 7, 9, 0.85)" : "rgba(7, 7, 9, 0.6)"}
        backdropFilter="blur(16px)"
        boxShadow={isScrolled || isMenuOpen ? "0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)" : "none"}
        py={2.5}
        px={{ base: 4, md: 8 }}
      >
        <Flex align="center" justify="space-between">
          <Link href="#home" textDecoration="none" _hover={{ textDecoration: "none" }} aria-label="CM — Inicio">
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

          <HStack spacing={{ base: 2, md: 5 }}>
            {/* Desktop navigation */}
            <HStack as="nav" display={{ base: "none", md: "flex" }} spacing={{ base: 2, md: 5 }} aria-label="Primary">
              {navItems.map((item) => {
                const isActive = active === item.href.slice(1);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    color={isActive ? "brand.200" : "gray.300"}
                    fontSize="xs"
                    fontWeight="700"
                    textTransform="uppercase"
                    letterSpacing="widest"
                    position="relative"
                    transition="color 0.2s"
                    _hover={{ color: "brand.300", textDecoration: "none" }}
                  >
                    {item.label}
                    <Box
                      as="span"
                      position="absolute"
                      left={0}
                      right={0}
                      bottom="-4px"
                      h="2px"
                      borderRadius="full"
                      bg="brand.400"
                      transformOrigin="left"
                      transition="transform 0.25s ease, opacity 0.25s ease"
                      style={{ transform: isActive ? "scaleX(1)" : "scaleX(0)", opacity: isActive ? 1 : 0 }}
                    />
                  </Link>
                );
              })}
            </HStack>

            <Box>
              <Menu autoSelect={false}>
                <MenuButton
                  as={Button}
                  size="xs"
                  variant="outline"
                  color="gray.300"
                  borderColor="rgba(169, 127, 255, 0.2)"
                  bg="transparent"
                  borderRadius="full"
                  px={{ base: 2.5, md: 3 }}
                  fontSize="9px"
                  fontWeight="700"
                  aria-label={`Language selector: ${language.toUpperCase()}`}
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
                  minW="120px"
                  p={1}
                  zIndex={45}
                >
                  <MenuItem
                    bg="transparent"
                    color="gray.300"
                    fontSize="xs"
                    minH="40px"
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
                    minH="40px"
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

            {/* Mobile menu toggle */}
            <IconButton
              display={{ base: "inline-flex", md: "none" }}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav-panel"
              icon={isMenuOpen ? <CloseIcon boxSize="18px" /> : <MenuIcon boxSize="18px" />}
              size="sm"
              variant="outline"
              color="gray.200"
              borderColor="rgba(169, 127, 255, 0.25)"
              bg="transparent"
              borderRadius="full"
              onClick={() => setIsMenuOpen((open) => !open)}
              _hover={{ bg: "rgba(169, 127, 255, 0.08)", color: "brand.200", borderColor: "brand.400" }}
              _active={{ bg: "rgba(169, 127, 255, 0.15)" }}
            />
          </HStack>
        </Flex>
      </Box>

      {/* Mobile dropdown navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(3, 3, 5, 0.55)",
                zIndex: 28,
              }}
            />
            <motion.div
              id="mobile-nav-panel"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              style={{
                position: "fixed",
                top: "72px",
                left: 0,
                right: 0,
                margin: "0 auto",
                width: "92%",
                maxWidth: "64rem",
                zIndex: 29,
              }}
            >
              <Box
                bg="rgba(7, 7, 9, 0.95)"
                backdropFilter="blur(16px)"
                borderWidth="1px"
                borderColor="rgba(169, 127, 255, 0.2)"
                borderRadius="2xl"
                boxShadow="0 20px 50px rgba(0, 0, 0, 0.6)"
                p={2.5}
              >
                <VStack as="nav" align="stretch" spacing={1} aria-label="Mobile">
                  {navItems.map((item) => {
                    const isActive = active === item.href.slice(1);
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        px={4}
                        minH="48px"
                        borderRadius="lg"
                        color={isActive ? "brand.200" : "gray.200"}
                        fontSize="sm"
                        fontWeight="700"
                        textTransform="uppercase"
                        letterSpacing="wide"
                        bg={isActive ? "rgba(169, 127, 255, 0.1)" : "transparent"}
                        _hover={{ bg: "rgba(169, 127, 255, 0.08)", color: "brand.200", textDecoration: "none" }}
                      >
                        {item.label}
                        {isActive ? <Box w="8px" h="8px" borderRadius="full" bg="brand.400" /> : null}
                      </Link>
                    );
                  })}
                </VStack>
              </Box>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
