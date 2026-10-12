"use client";

import {
  Box,
  Button,
  Card,
  Center,
  Container,
  Divider,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Text,
  useToast,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { ComponentProps, ReactNode } from "react";
import { useLanguage } from "./LanguageContext";

type IconProps = ComponentProps<typeof Icon>;

const EMAIL = "christianandremartinez@gmail.com";
const GITHUB_URL = "https://github.com/cmart1109";
const LINKEDIN_URL = "https://www.linkedin.com/in/ch-martinez2002/";

/* ------------------------------------------------------------------ */
/* Icons (inline SVG to avoid extra dependencies and keep load light)  */
/* ------------------------------------------------------------------ */

const ArrowForwardIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </Icon>
);

const ArrowDownIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="5 12 12 19 19 12" />
  </Icon>
);

const ExternalLinkIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </Icon>
);

const GithubIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
  </Icon>
);

const LinkedinIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </Icon>
);

const MailIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </Icon>
);

const CopyIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </Icon>
);

const CheckIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="20 6 9 17 4 12" />
  </Icon>
);

const SearchIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </Icon>
);

const LayoutIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="9" />
  </Icon>
);

const CodeIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </Icon>
);

const SendIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </Icon>
);

const GraduationIcon = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 10 12 5 2 10l10 5 10-5Z" />
    <path d="M6 12v5c0 1.2 2.7 3 6 3s6-1.8 6-3v-5" />
    <line x1="22" y1="10" x2="22" y2="16" />
  </Icon>
);

/* ------------------------------------------------------------------ */
/* Static content                                                      */
/* ------------------------------------------------------------------ */

const skillsByTab = {
  frontEnd: [
    { label: "React", iconClass: "devicon-react-original" },
    { label: "Next.js", iconClass: "devicon-nextjs-plain" },
    { label: "TypeScript", iconClass: "devicon-typescript-plain" },
    { label: "JavaScript", iconClass: "devicon-javascript-plain" },
    { label: "HTML5", iconClass: "devicon-html5-plain" },
    { label: "CSS3", iconClass: "devicon-css3-plain" },
  ],
  backEnd: [
    { label: "Node.js", iconClass: "devicon-nodejs-plain" },
    { label: "Express", iconClass: "devicon-express-original" },
    { label: "PostgreSQL", iconClass: "devicon-postgresql-plain" },
    { label: "MongoDB", iconClass: "devicon-mongodb-plain" },
    { label: "Firebase", iconClass: "devicon-firebase-plain" },
    { label: "Supabase", iconClass: "devicon-supabase-plain" },
  ],
  other: [
    { label: "Python", iconClass: "devicon-python-plain" },
    { label: "Csharp", iconClass: "devicon-csharp-plain" },
    { label: "Cplusplus", iconClass: "devicon-cplusplus-plain" },
    { label: "Unity", iconClass: "devicon-unity-plain" },
    { label: "Figma", iconClass: "devicon-figma-plain" },
    { label: "Git", iconClass: "devicon-git-plain" },
  ],
};

const projectMeta = [
  {
    id: "project1",
    stack: ["Blazor", "C#", ".NET", "ASP.NET Core Identity", "Monaco Editor", "Entity Framework"],
    github: "https://github.com/cmart1109/CSE-325-Project.git",
    demo: "https://markpad-cmartinez.azurewebsites.net/",
    typeKey: "projects.typeAcademic",
    highlights: ["projects.project1.h1", "projects.project1.h2", "projects.project1.h3"],
  },
  {
    id: "project2",
    stack: ["Next.js", "TypeScript", "React", "Prisma", "Chakra UI"],
    github: "https://github.com/cmart1109/whisp",
    demo: "https://whisp-2xb7hfv3n-cmart1109s-projects.vercel.app/",
    typeKey: "projects.typePersonal",
    highlights: ["projects.project2.h1", "projects.project2.h2", "projects.project2.h3"],
  },
];

const processMeta = [
  { icon: SearchIcon, titleKey: "process.step1.title", descKey: "process.step1.desc" },
  { icon: LayoutIcon, titleKey: "process.step2.title", descKey: "process.step2.desc" },
  { icon: CodeIcon, titleKey: "process.step3.title", descKey: "process.step3.desc" },
  { icon: SendIcon, titleKey: "process.step4.title", descKey: "process.step4.desc" },
];

const stats = [
  { value: 3, suffix: "+", labelKey: "stats.years" },
  { value: 18, suffix: "+", labelKey: "stats.technologies" },
  { value: 2, suffix: "", labelKey: "stats.projects" },
  { value: 100, suffix: "%", labelKey: "stats.remote" },
];

/* ------------------------------------------------------------------ */
/* Building blocks                                                     */
/* ------------------------------------------------------------------ */

function Reveal({ children, delay = 0, y = 24 }: { children: ReactNode; delay?: number; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(() => (reduce ? value : 0));

  useEffect(() => {
    if (reduce || !inView) return;
    const controls = animate(0, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  center = true,
}: {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <VStack align={center ? "center" : "flex-start"} spacing={3} mb={{ base: 10, md: 14 }}>
      <HStack spacing={3}>
        <Text fontFamily="pixel" fontSize="9px" color="brand.300" aria-hidden="true">
          {index}
        </Text>
        <Box w="8px" h="8px" borderRadius="full" bg="brand.400" boxShadow="0 0 10px rgba(169, 127, 255, 0.7)" />
        <Text color="brand.300" fontWeight="700" textTransform="uppercase" fontSize="xs" letterSpacing="widest">
          {eyebrow}
        </Text>
      </HStack>
      <Heading fontSize={{ base: "1.6rem", md: "1.875rem" }} lineHeight="1.2" textAlign={center ? "center" : "left"} fontWeight="700" letterSpacing="-0.01em">
        {title}
      </Heading>
      {description ? (
        <Text color="gray.400" textAlign={center ? "center" : "left"} maxW="2xl" fontSize="md" lineHeight="1.7">
          {description}
        </Text>
      ) : null}
    </VStack>
  );
}

function Section({ id, children }: { id: string; children: ReactNode }) {
  return (
    <Box as="section" id={id} scrollMarginTop="120px">
      {children}
    </Box>
  );
}

function SkillCard({ label, iconClass, index }: { label: string; iconClass: string; index: number }) {
  const reduce = useReducedMotion();
  const display = label === "Csharp" ? "C#" : label === "Cplusplus" ? "C++" : label;
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: Math.min(index * 0.05, 0.3) }}
    >
      <Card
        className={`card-skill-${label.toLowerCase()}`}
        p={5}
        h="full"
        bg="rgba(24, 24, 33, 0.5)"
        backdropFilter="blur(10px)"
        borderWidth="1px"
        borderColor="rgba(169, 127, 255, 0.12)"
        borderRadius="xl"
        boxShadow="sm"
        justifyContent="center"
        alignItems="center"
        display="flex"
        flexDirection="column"
        transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
        _hover={{
          borderColor: "rgba(169, 127, 255, 0.4)",
          bg: "rgba(24, 24, 33, 0.8)",
          boxShadow: "0 10px 24px rgba(119, 53, 255, 0.15)",
        }}
      >
        <Center
          boxSize="56px"
          borderRadius="lg"
          bg="rgba(255, 255, 255, 0.02)"
          borderWidth="1px"
          borderColor="rgba(255, 255, 255, 0.05)"
          transition="all 0.3s"
        >
          <Box as="i" className={`${iconClass} skill-icon`} aria-hidden="true" />
        </Center>
        <Text color="gray.300" mt={3} fontSize="sm" fontWeight="600" textAlign="center" letterSpacing="wide">
          {display}
        </Text>
      </Card>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Home() {
  const { t } = useLanguage();
  const toast = useToast();
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      /* clipboard not available (e.g. insecure context) */
    }
    setCopied(true);
    toast({
      title: t("contact.toastTitle"),
      description: t("contact.toastDesc"),
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom-right",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main style={{ position: "relative" }}>
      {/* Dynamic Background components */}
      <div className="grid-bg" />

      {/* Ambient glowing blobs */}
      <Box position="absolute" top="5%" left="5%" w={{ base: "260px", md: "400px" }} h={{ base: "260px", md: "400px" }} borderRadius="full" bg="rgba(119, 53, 255, 0.08)" filter="blur(120px)" zIndex={-2} pointerEvents="none" />
      <Box position="absolute" top="45%" right="5%" w={{ base: "300px", md: "500px" }} h={{ base: "300px", md: "500px" }} borderRadius="full" bg="rgba(67, 39, 204, 0.06)" filter="blur(140px)" zIndex={-2} pointerEvents="none" />
      <Box position="absolute" bottom="10%" left="15%" w={{ base: "280px", md: "450px" }} h={{ base: "280px", md: "450px" }} borderRadius="full" bg="rgba(169, 127, 255, 0.05)" filter="blur(130px)" zIndex={-2} pointerEvents="none" />

      <Box m={{ base: 2, md: 8 }} borderRadius={{ base: 24, md: 32 }} py={{ base: 16, md: 24 }} minHeight="100vh">
        <Container maxW="5xl">
          <VStack align="stretch" spacing={{ base: 24, md: 36 }}>
            {/* Hero / Intro */}
            <Section id="home">
              <Box minHeight={{ base: "75vh", md: "80vh" }} display="flex" alignItems="center">
                <Stack direction={{ base: "column-reverse", md: "row" }} spacing={{ base: 12, md: 16 }} align="center" w="full">
                  <motion.div
                    style={{ flex: 1.2 }}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <VStack align={{ base: "center", md: "flex-start" }} spacing={5}>
                      <HStack bg="rgba(169, 127, 255, 0.07)" borderWidth="1px" borderColor="rgba(169, 127, 255, 0.2)" borderRadius="full" px={4} py={1.5} spacing={2}>
                        <Box w="6px" h="6px" borderRadius="full" bg="brand.300" className="pulse-dot" />
                        <Text fontFamily="pixel" fontSize={{ base: "8px", md: "9px" }} color="brand.200" fontWeight="600" letterSpacing="widest" textTransform="uppercase">
                          {t("hero.status")}
                        </Text>
                      </HStack>

                      <Heading
                        fontSize={{ base: "2rem", sm: "2.5rem", md: "3rem" }}
                        lineHeight="1.1"
                        textAlign={{ base: "center", md: "left" }}
                        bgGradient="linear(to-r, white, gray.200, brand.300)"
                        bgClip="text"
                        fontWeight="800"
                        letterSpacing="-0.02em"
                      >
                        Christian André Martinez
                      </Heading>

                      <Text
                        fontFamily="pixel"
                        fontSize={{ base: "9px", md: "11px" }}
                        color="brand.300"
                        fontWeight="500"
                        letterSpacing="2px"
                        textTransform="uppercase"
                        textAlign={{ base: "center", md: "left" }}
                        textShadow="0 0 10px rgba(169, 127, 255, 0.2)"
                      >
                        {t("hero.subtitle")}
                      </Text>

                      <Text color="gray.300" maxW={{ base: "xl", md: "2xl" }} fontSize="lg" lineHeight="tall" textAlign={{ base: "center", md: "left" }}>
                        {t("hero.description")}
                      </Text>

                      <Stack direction={{ base: "column", sm: "row" }} spacing={4} pt={4} w={{ base: "full", sm: "auto" }} justify={{ base: "center", md: "flex-start" }}>
                        <Button
                          as="a"
                          href="#projects"
                          colorScheme="brand"
                          color="white"
                          bg="brand.500"
                          size="lg"
                          borderRadius="full"
                          px={8}
                          _hover={{ bg: "brand.600", color: "white", transform: "translateY(-2px)", boxShadow: "0 8px 24px rgba(119, 53, 255, 0.35)" }}
                          transition="all 0.2s"
                          rightIcon={<ArrowForwardIcon />}
                        >
                          {t("hero.btnProjects")}
                        </Button>
                        <Button
                          as="a"
                          href="#contact"
                          variant="outline"
                          color="white"
                          borderColor="rgba(255, 255, 255, 0.2)"
                          size="lg"
                          borderRadius="full"
                          px={8}
                          _hover={{ bg: "rgba(255, 255, 255, 0.05)", borderColor: "rgba(255, 255, 255, 0.35)", transform: "translateY(-2px)" }}
                          transition="all 0.2s"
                        >
                          {t("hero.btnTalk")}
                        </Button>
                      </Stack>
                    </VStack>
                  </motion.div>

                  <Center flex="0.8">
                    <motion.div
                      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                      className="float-animation"
                    >
                      <Box
                        position="relative"
                        borderRadius="3xl"
                        p={4}
                        bg="linear-gradient(135deg, rgba(169, 127, 255, 0.1), transparent)"
                        border="1px solid"
                        borderColor="rgba(169, 127, 255, 0.15)"
                        boxShadow="2xl"
                      >
                        <Image
                          src="/placeholder-profile.svg"
                          alt="Christian André Martinez"
                          borderRadius="2xl"
                          maxW={{ base: 220, md: 320 }}
                          w="100%"
                          bg="rgba(15, 15, 20, 0.4)"
                          backdropFilter="blur(8px)"
                          transition="all 0.3s"
                        />
                      </Box>
                    </motion.div>
                  </Center>
                </Stack>
              </Box>

              {/* Stats band */}
              <Reveal delay={0.1}>
                <Card
                  mt={{ base: 6, md: 10 }}
                  px={{ base: 6, md: 10 }}
                  py={{ base: 8, md: 9 }}
                  borderRadius="2xl"
                  bg="rgba(24, 24, 33, 0.45)"
                  backdropFilter="blur(12px)"
                  borderWidth="1px"
                  borderColor="rgba(169, 127, 255, 0.15)"
                  boxShadow="xl"
                >
                  <SimpleGrid columns={{ base: 2, md: 4 }} spacing={{ base: 8, md: 4 }}>
                    {stats.map((stat) => (
                      <VStack key={stat.labelKey} spacing={1}>
                        <Heading size="2xl" fontWeight="800" bgGradient="linear(to-r, white, brand.300)" bgClip="text">
                          <CountUp value={stat.value} suffix={stat.suffix} />
                        </Heading>
                        <Text color="gray.400" fontSize="xs" fontWeight="600" textTransform="uppercase" letterSpacing="wide" textAlign="center">
                          {t(stat.labelKey)}
                        </Text>
                      </VStack>
                    ))}
                  </SimpleGrid>
                </Card>
              </Reveal>
            </Section>

            {/* About */}
            <Section id="about">
              <Reveal>
                <Stack direction={{ base: "column", md: "row" }} spacing={{ base: 12, md: 16 }} align="center">
                  <Box flex="1">
                    <HStack spacing={3} mb={3}>
                      <Text fontFamily="pixel" fontSize="9px" color="brand.300" aria-hidden="true">
                        01
                      </Text>
                      <Box w="8px" h="8px" borderRadius="full" bg="brand.400" />
                      <Text color="brand.300" fontWeight="700" textTransform="uppercase" fontSize="xs" letterSpacing="widest">
                        {t("about.intro")}
                      </Text>
                    </HStack>
                    <Heading fontSize={{ base: "1.6rem", md: "1.875rem" }} mb={6} fontWeight="700" letterSpacing="-0.01em">
                      {t("about.title")}
                    </Heading>
                    <Text color="gray.400" fontSize="md" lineHeight="1.8" mb={6}>
                      {t("about.p1")}
                    </Text>
                    <Text color="gray.400" fontSize="md" lineHeight="1.8">
                      {t("about.p2")}
                    </Text>
                  </Box>

                  <Center flex={{ base: "1 1 auto", md: "0 0 340px" }} w="full">
                    <Card
                      w="full"
                      p={6}
                      borderRadius="2xl"
                      bg="rgba(24, 24, 33, 0.4)"
                      backdropFilter="blur(12px)"
                      borderWidth="1px"
                      borderColor="rgba(169, 127, 255, 0.15)"
                      boxShadow="xl"
                      transition="all 0.3s"
                      _hover={{ transform: "translateY(-4px)", borderColor: "rgba(169, 127, 255, 0.4)", boxShadow: "0 10px 30px rgba(119, 53, 255, 0.15)" }}
                    >
                      <VStack align="stretch" spacing={4}>
                        <Heading size="xs" fontFamily="pixel" color="brand.300" textTransform="uppercase" letterSpacing="wide">
                          {t("about.techCardTitle")}
                        </Heading>
                        <Divider borderColor="rgba(255, 255, 255, 0.08)" />

                        <Box>
                          <Text fontSize="10px" color="gray.400" fontWeight="700" textTransform="uppercase" letterSpacing="1px">{t("about.location")}</Text>
                          <Text fontSize="sm" color="gray.200" fontWeight="600" mt={0.5}>{t("about.locationVal")}</Text>
                        </Box>
                        <Box>
                          <Text fontSize="10px" color="gray.400" fontWeight="700" textTransform="uppercase" letterSpacing="1px">{t("about.experience")}</Text>
                          <Text fontSize="sm" color="gray.200" fontWeight="600" mt={0.5}>{t("about.experienceVal")}</Text>
                        </Box>
                        <Box>
                          <Text fontSize="10px" color="gray.400" fontWeight="700" textTransform="uppercase" letterSpacing="1px">{t("about.focus")}</Text>
                          <Text fontSize="sm" color="gray.200" fontWeight="600" mt={0.5}>{t("about.focusVal")}</Text>
                        </Box>
                        <Box>
                          <Text fontSize="10px" color="gray.400" fontWeight="700" textTransform="uppercase" letterSpacing="1px">{t("about.job")}</Text>
                          <HStack spacing={2} mt={1}>
                            <Box w="8px" h="8px" borderRadius="full" bg="green.400" className="pulse-dot" style={{ boxShadow: "0 0 8px rgba(72, 187, 120, 0.8)" }} />
                            <Text fontSize="sm" color="gray.300" fontWeight="600">{t("about.jobVal")}</Text>
                          </HStack>
                        </Box>
                      </VStack>
                    </Card>
                  </Center>
                </Stack>
              </Reveal>
            </Section>

            {/* Education */}
            <Section id="education">
              <Reveal>
                <SectionHeading index="02" eyebrow={t("education.intro")} title={t("education.title")} />
              </Reveal>

              <Reveal delay={0.05}>
                <Card
                  w="full"
                  maxW="3xl"
                  mx="auto"
                  p={{ base: 6, md: 8 }}
                  borderRadius="2xl"
                  bg="rgba(24, 24, 33, 0.4)"
                  backdropFilter="blur(12px)"
                  borderWidth="1px"
                  borderColor="rgba(169, 127, 255, 0.15)"
                  boxShadow="xl"
                  transition="all 0.3s"
                  _hover={{ borderColor: "rgba(169, 127, 255, 0.4)", transform: "translateY(-4px)", boxShadow: "0 10px 30px rgba(119, 53, 255, 0.15)" }}
                >
                  <Stack direction={{ base: "column", sm: "row" }} spacing={5} align={{ base: "flex-start", sm: "center" }}>
                    <Center
                      boxSize="56px"
                      borderRadius="xl"
                      bg="rgba(169, 127, 255, 0.08)"
                      borderWidth="1px"
                      borderColor="rgba(169, 127, 255, 0.2)"
                      color="brand.300"
                      flexShrink={0}
                    >
                      <GraduationIcon boxSize="26px" />
                    </Center>

                    <Box flex="1">
                      <Heading size="md" fontWeight="700" color="white" letterSpacing="wide">
                        {t("education.degree")}
                      </Heading>
                      <Text color="brand.200" fontWeight="600" fontSize="sm" mt={1}>
                        {t("education.school")}
                      </Text>
                      <Text color="gray.400" fontSize="sm" mt={1} lineHeight="1.6">
                        {t("education.program")}
                      </Text>
                    </Box>

                    <HStack
                      flexShrink={0}
                      spacing={2}
                      px={3}
                      py={1.5}
                      borderRadius="full"
                      bg="rgba(72, 187, 120, 0.1)"
                      borderWidth="1px"
                      borderColor="rgba(72, 187, 120, 0.3)"
                    >
                      <Box w="6px" h="6px" borderRadius="full" bg="green.400" className="pulse-dot" />
                      <Text fontSize="xs" fontWeight="700" color="green.300" textTransform="uppercase" letterSpacing="wide">
                        {t("education.status")}
                      </Text>
                    </HStack>
                  </Stack>
                </Card>
              </Reveal>
            </Section>

            {/* Skills */}
            <Section id="skills">
              <Reveal>
                <SectionHeading index="03" eyebrow={t("skills.intro")} title={t("skills.title")} />
              </Reveal>

              <Reveal delay={0.05}>
                <Tabs variant="soft-rounded" align="center">
                  <TabList
                    bg="rgba(15, 15, 20, 0.5)"
                    p={1.5}
                    borderRadius="full"
                    borderWidth="1px"
                    borderColor="rgba(169, 127, 255, 0.15)"
                    display="inline-flex"
                    mb={8}
                  >
                    {["skills.tab1", "skills.tab2", "skills.tab3"].map((key) => (
                      <Tab
                        key={key}
                        borderRadius="full"
                        color="gray.400"
                        fontWeight="700"
                        fontSize={{ base: "10px", md: "xs" }}
                        px={{ base: 3, md: 8 }}
                        py={2}
                        textTransform="uppercase"
                        letterSpacing="1px"
                        _selected={{ color: "white", bg: "brand.500", boxShadow: "0 4px 15px rgba(119, 53, 255, 0.35)" }}
                      >
                        {t(key)}
                      </Tab>
                    ))}
                  </TabList>

                  <TabPanels>
                    {[skillsByTab.frontEnd, skillsByTab.backEnd, skillsByTab.other].map((skills, tabIndex) => (
                      <TabPanel key={tabIndex} p={0}>
                        <SimpleGrid columns={{ base: 2, sm: 3 }} spacing={5}>
                          {skills.map((skill, i) => (
                            <SkillCard key={skill.label} label={skill.label} iconClass={skill.iconClass} index={i} />
                          ))}
                        </SimpleGrid>
                      </TabPanel>
                    ))}
                  </TabPanels>
                </Tabs>
              </Reveal>
            </Section>

            {/* Process */}
            <Section id="process">
              <Reveal>
                <SectionHeading
                  index="04"
                  eyebrow={t("process.intro")}
                  title={t("process.title")}
                  description={t("process.description")}
                />
              </Reveal>

              <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={5}>
                {processMeta.map((step, i) => {
                  const StepIcon = step.icon;
                  return (
                    <Reveal key={step.titleKey} delay={i * 0.08}>
                      <Card
                        h="full"
                        p={6}
                        borderRadius="2xl"
                        bg="rgba(24, 24, 33, 0.4)"
                        backdropFilter="blur(12px)"
                        borderWidth="1px"
                        borderColor="rgba(169, 127, 255, 0.15)"
                        boxShadow="lg"
                        transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                        _hover={{ borderColor: "rgba(169, 127, 255, 0.4)", transform: "translateY(-4px)", boxShadow: "0 12px 26px rgba(119, 53, 255, 0.14)" }}
                      >
                        <VStack align="flex-start" spacing={4}>
                          <Center boxSize="48px" borderRadius="xl" bg="rgba(169, 127, 255, 0.08)" borderWidth="1px" borderColor="rgba(169, 127, 255, 0.2)" color="brand.300">
                            <StepIcon boxSize="20px" />
                          </Center>
                          <HStack spacing={2}>
                            <Text fontFamily="pixel" fontSize="9px" color="brand.300" aria-hidden="true">0{i + 1}</Text>
                            <Heading size="sm" fontWeight="700">{t(step.titleKey)}</Heading>
                          </HStack>
                          <Text color="gray.400" fontSize="sm" lineHeight="1.7">{t(step.descKey)}</Text>
                        </VStack>
                      </Card>
                    </Reveal>
                  );
                })}
              </SimpleGrid>
            </Section>

            {/* Projects */}
            <Section id="projects">
              <Reveal>
                <SectionHeading index="05" eyebrow={t("projects.intro")} title={t("projects.title")} />
              </Reveal>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
                {projectMeta.map((project, index) => (
                  <Reveal key={project.id} delay={index * 0.1}>
                    <motion.div whileHover={reduce ? undefined : { y: -8 }} transition={{ type: "spring", stiffness: 300, damping: 18 }} style={{ height: "100%" }}>
                      <Card
                        overflow="hidden"
                        h="full"
                        bg="rgba(24, 24, 33, 0.4)"
                        backdropFilter="blur(12px)"
                        borderWidth="1px"
                        borderColor="rgba(169, 127, 255, 0.15)"
                        borderRadius="2xl"
                        boxShadow="lg"
                        transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                        _hover={{ borderColor: "rgba(169, 127, 255, 0.4)", boxShadow: "0 15px 30px rgba(119, 53, 255, 0.15)" }}
                      >
                        {/* Editor window topbar mockup */}
                        <Box w="full" bg="rgba(15, 15, 20, 0.6)" borderBottomWidth="1px" borderColor="rgba(169, 127, 255, 0.1)" px={4} py={3} display="flex" alignItems="center" justifyContent="space-between">
                          <HStack spacing={1.5}>
                            <Box w="8px" h="8px" borderRadius="full" bg="#ff5f56" />
                            <Box w="8px" h="8px" borderRadius="full" bg="#ffbd2e" />
                            <Box w="8px" h="8px" borderRadius="full" bg="#27c93f" />
                          </HStack>
                          <Text fontFamily="pixel" fontSize="8px" color="gray.400" letterSpacing="wide" aria-hidden="true">
                            {String(index + 1).padStart(2, "0")}
                          </Text>
                        </Box>

                        <Box p={6} display="flex" flexDirection="column" flex="1">
                          <HStack justify="space-between" align="flex-start" spacing={3} mb={3} flexWrap="wrap" rowGap={2}>
                            <Heading size="md" fontWeight="700" letterSpacing="wide" color="white">
                              {t(`projects.${project.id}.title`)}
                            </Heading>
                            <Tag
                              flexShrink={0}
                              size="sm"
                              variant="subtle"
                              bg="rgba(169, 127, 255, 0.08)"
                              color="brand.200"
                              borderColor="rgba(169, 127, 255, 0.2)"
                              borderWidth="1px"
                              borderRadius="md"
                              fontWeight="600"
                              fontSize="10px"
                            >
                              {t(project.typeKey)}
                            </Tag>
                          </HStack>

                          <Text color="gray.400" fontSize="sm" lineHeight="1.7">
                            {t(`projects.${project.id}.desc`)}
                          </Text>

                          <VStack align="stretch" spacing={2} mt={4}>
                            {project.highlights.map((key) => (
                              <HStack key={key} spacing={2.5} align="flex-start">
                                <Box mt="7px" w="5px" h="5px" borderRadius="full" bg="brand.400" flexShrink={0} />
                                <Text color="gray.300" fontSize="sm" lineHeight="1.6">
                                  {t(key)}
                                </Text>
                              </HStack>
                            ))}
                          </VStack>

                          <Wrap mt={5} spacing={2}>
                            {project.stack.map((item) => (
                              <WrapItem key={`${project.id}-${item}`}>
                                <Tag
                                  size="sm"
                                  variant="subtle"
                                  bg="rgba(169, 127, 255, 0.08)"
                                  color="brand.200"
                                  borderColor="rgba(169, 127, 255, 0.15)"
                                  borderWidth="1px"
                                  borderRadius="md"
                                  fontWeight="600"
                                  fontSize="10px"
                                >
                                  {item}
                                </Tag>
                              </WrapItem>
                            ))}
                          </Wrap>

                          <Box mt="auto">
                            <Divider borderColor="rgba(255, 255, 255, 0.06)" my={5} />
                            <HStack justify="space-between" align="center">
                              <Link
                                href={project.github}
                                isExternal
                                display="flex"
                                alignItems="center"
                                color="gray.400"
                                fontSize="xs"
                                fontWeight="600"
                                _hover={{ color: "brand.300", textDecoration: "none" }}
                              >
                                <GithubIcon boxSize="16px" mr={1.5} aria-hidden="true" />
                                {t("projects.code")}
                              </Link>

                              <Button
                                as="a"
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                size="sm"
                                variant="ghost"
                                color="brand.200"
                                _hover={{ bg: "rgba(169, 127, 255, 0.08)", color: "brand.100" }}
                                rightIcon={<ExternalLinkIcon boxSize="12px" />}
                              >
                                {t("projects.demo")}
                              </Button>
                            </HStack>
                          </Box>
                        </Box>
                      </Card>
                    </motion.div>
                  </Reveal>
                ))}
              </SimpleGrid>
            </Section>

            {/* Contact */}
            <Section id="contact">
              <Reveal>
                <Center>
                  <Card
                    w="full"
                    maxW="3xl"
                    p={{ base: 8, md: 12 }}
                    borderRadius="3xl"
                    bg="rgba(15, 15, 20, 0.55)"
                    backdropFilter="blur(16px)"
                    borderWidth="1px"
                    borderColor="rgba(169, 127, 255, 0.18)"
                    boxShadow="2xl"
                    position="relative"
                    overflow="hidden"
                  >
                    <Box position="absolute" top="-50px" right="-50px" w="200px" h="200px" borderRadius="full" bg="rgba(119, 53, 255, 0.12)" filter="blur(50px)" pointerEvents="none" />

                    <VStack spacing={6} align="center" textAlign="center" position="relative" zIndex={1}>
                      <Center boxSize="64px" borderRadius="2xl" bg="rgba(169, 127, 255, 0.08)" borderWidth="1px" borderColor="rgba(169, 127, 255, 0.2)" color="brand.300">
                        <MailIcon boxSize="28px" />
                      </Center>

                      <VStack spacing={2}>
                        <Heading size="lg" fontWeight="800" color="white">
                          {t("contact.title")}
                        </Heading>
                        <Text color="gray.400" maxW="lg" fontSize="md" lineHeight="1.7">
                          {t("contact.desc")}
                        </Text>
                      </VStack>

                      <Button
                        size="lg"
                        borderRadius="full"
                        colorScheme="brand"
                        bg="rgba(169, 127, 255, 0.07)"
                        color="brand.100"
                        borderWidth="1px"
                        borderColor="rgba(169, 127, 255, 0.25)"
                        px={8}
                        py={7}
                        _hover={{ bg: "rgba(169, 127, 255, 0.12)", borderColor: "rgba(169, 127, 255, 0.4)", transform: "translateY(-2px)" }}
                        transition="all 0.2s"
                        onClick={handleCopyEmail}
                        leftIcon={copied ? <CheckIcon boxSize="18px" /> : <CopyIcon boxSize="18px" />}
                      >
                        {copied ? t("contact.copied") : EMAIL}
                      </Button>
                      <Text as="span" aria-live="polite" position="absolute" w="1px" h="1px" overflow="hidden" clipPath="inset(50%)">
                        {copied ? t("contact.copied") : ""}
                      </Text>

                      <HStack spacing={4} pt={4} flexWrap="wrap" justify="center">
                        <Button
                          as="a"
                          href={GITHUB_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="outline"
                          borderColor="rgba(255, 255, 255, 0.15)"
                          bg="rgba(255, 255, 255, 0.02)"
                          color="gray.300"
                          size="md"
                          borderRadius="full"
                          _hover={{ bg: "rgba(255, 255, 255, 0.06)", color: "white", borderColor: "rgba(255, 255, 255, 0.25)" }}
                          leftIcon={<GithubIcon boxSize="18px" />}
                        >
                          GitHub
                        </Button>
                        <Button
                          as="a"
                          href={LINKEDIN_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="outline"
                          borderColor="rgba(255, 255, 255, 0.15)"
                          bg="rgba(255, 255, 255, 0.02)"
                          color="gray.300"
                          size="md"
                          borderRadius="full"
                          _hover={{ bg: "rgba(255, 255, 255, 0.06)", color: "white", borderColor: "rgba(255, 255, 255, 0.25)" }}
                          leftIcon={<LinkedinIcon boxSize="18px" />}
                        >
                          LinkedIn
                        </Button>
                      </HStack>
                    </VStack>
                  </Card>
                </Center>
              </Reveal>
            </Section>

            {/* Footer */}
            <Box as="footer" pt={6} pb={6}>
              <Divider borderColor="rgba(255, 255, 255, 0.06)" mb={6} />
              <HStack justify="space-between" w="full" flexDir={{ base: "column", sm: "row" }} spacing={4}>
                <Text color="gray.500" fontSize="xs" textAlign={{ base: "center", sm: "left" }}>
                  © {new Date().getFullYear()} {t("footer.rights")}
                </Text>
                <HStack spacing={6}>
                  <Link
                    as="a"
                    href={GITHUB_URL}
                    isExternal
                    aria-label="GitHub"
                    color="gray.500"
                    _hover={{ color: "brand.300", textDecoration: "none" }}
                  >
                    <GithubIcon boxSize="18px" />
                  </Link>
                  <Link
                    as="a"
                    href={LINKEDIN_URL}
                    isExternal
                    aria-label="LinkedIn"
                    color="gray.500"
                    _hover={{ color: "brand.300", textDecoration: "none" }}
                  >
                    <LinkedinIcon boxSize="18px" />
                  </Link>
                  <Link color="gray.500" href="#home" fontSize="xs" display="flex" alignItems="center" _hover={{ color: "brand.300", textDecoration: "none" }}>
                    <ArrowDownIcon boxSize="14px" mr={1} style={{ transform: "rotate(180deg)" }} />
                    {t("footer.top")}
                  </Link>
                </HStack>
              </HStack>
            </Box>
          </VStack>
        </Container>
      </Box>
    </main>
  );
}
