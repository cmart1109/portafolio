import {
  Box,
  Button,
  Card,
  Container,
  Heading,
  HStack,
  Icon,
  Link,
  SimpleGrid,
  Tag,
  Text,
  VStack,
  Wrap,
  WrapItem,
  Image,
  Stack,
  Center,
  Divider,
  Fade,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

const ArrowForwardIcon = () => (
  <Icon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </Icon>
);

const ExternalLinkIcon = () => (
  <Icon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
  </Icon>
);

export default function Home() {
  const pixelHeadingStyles = {
    fontFamily: "pixel",
    fontWeight: "400",
    letterSpacing: "wide",
  };

  const skillsByTab = {
    frontEnd: [
      { label: "React", iconClass: "devicon-react-original" },
      { label: "Next.js", iconClass: "devicon-nextjs-plain" },
      { label: "TypeScript", iconClass: "devicon-typescript-plain" },
      { label: "JavaScript", iconClass: "devicon-javascript-plain" },
      { label: "HTML", iconClass: "devicon-html5-plain" },
      { label: "CSS", iconClass: "devicon-css3-plain" },
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
      { label: "C#", iconClass: "devicon-csharp-plain" },
      { label: "C++", iconClass: "devicon-cplusplus-plain" },
      { label: "Unity", iconClass: "devicon-unity-plain" },
      { label: "Figma", iconClass: "devicon-figma-plain" },
      { label: "Git", iconClass: "devicon-git-plain" },
    ],
  };

  const renderSkillsGrid = (skills: Array<{ label: string; iconClass: string }>) => (
    <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4}>
      {skills.map((skill) => (
        <Card
          key={skill.label}
          p={6}
          bg="surface.800"
          borderWidth="1px"
          borderColor="brand.700"
          borderRadius="xl"
          boxShadow="sm"
          justifyContent="center"
          alignItems="center"
          display="flex"
          flexDirection="column"
          transition="transform 200ms ease, box-shadow 200ms ease"
          _hover={{ transform: "translateY(-6px)", boxShadow: "lg" }}
        >
          <Center
            as="div"
            boxSize="56px"
            borderRadius="md"
            bg="rgba(255,255,255,0.03)"
            borderWidth="1px"
            borderColor="transparent"
          >
            <Box as="i" className={`${skill.iconClass} skill-icon`} aria-hidden="true" fontSize="28px" />
          </Center>
          <Text color="gray.300" mt={3} fontSize="lg" fontWeight="600" textAlign="center">
            {skill.label}
          </Text>
        </Card>
      ))}
    </SimpleGrid>
  );

  const projects = [
    {
      title: "Project One",
      description:
        "A short summary of your project. Explain the problem, your approach, and the result.",
      stack: ["Next.js", "Chakra UI", "TypeScript"],
    },
    {
      title: "Project Two",
      description:
        "Another project highlight. Keep this concise and measurable when possible.",
      stack: ["React", "Node.js", "PostgreSQL"],
    },
  ];

  return (
    <main id="top">
      <Box
        bgGradient="linear(to-b, surface.950, surface.900)"
        m={{ base: 4, md: 12 }}
        borderRadius={20}
        py={{ base: 8, md: 14 }}
        minHeight="100vh"
        boxShadow="inset 0 1px 0 rgba(255,255,255,0.02), 0 8px 30px rgba(2,6,23,0.6)"
      >
        <Container maxW="5xl">
          <VStack align="stretch" spacing={{ base: 10, md: 14 }}>
            <Box id="about" minHeight={{ base: "60vh", md: "64vh" }} display="flex" alignItems="center" justifyContent="center">
              <Stack direction={{ base: "column", md: "row" }} spacing={{ base: 8, md: 12 }} align="center" w="full">
                <Box flex="1">
                  <Heading
                    size="3xl"
                    lineHeight="1.05"
                    maxW="xl"
                    textAlign={{ base: "center", md: "left" }}
                    bgGradient="linear(to-r, brand.300, brand.500)"
                    bgClip="text"
                  >
                    Christian André Martinez
                  </Heading>

                  <Text
                    fontFamily="pixel"
                    fontSize={{ base: "xs", md: "sm" }}
                    color="brand.300"
                    fontWeight="500"
                    letterSpacing="wide"
                    textTransform="uppercase"
                    textAlign={{ base: "center", md: "left" }}
                    mt={2}
                  >
                    Fullstack Developer & UI Designer
                  </Text>

                  <Text mt={5} color="gray.300" maxW={{ base: "xl", md: "2xl" }} fontSize="lg" lineHeight="tall" textAlign={{ base: "center", md: "left" }}>
                    A passionate developer building web apps with attention to
                    detail, accessibility and delightful interactions. I craft
                    interfaces that look great and feel smooth.
                  </Text>

                  <HStack spacing={4} mt={6} justifyContent={{ base: "center", md: "flex-start" }}>
                    <Button colorScheme="brand" size="lg" fontFamily="pixel" rightIcon={<ArrowForwardIcon />}>
                      View Projects
                    </Button>
                    <Button
                      variant="ghost"
                      colorScheme="brand"
                      size="lg"
                      fontFamily="pixel"
                      rightIcon={<ExternalLinkIcon />}
                    >
                      Contact Me
                    </Button>
                  </HStack>
                </Box>

                <Center flex="0 0 360px">
                  <Image
                    src="/placeholder-profile.svg"
                    alt="Profile illustration"
                    borderRadius="2xl"
                    border="1px solid"
                    borderColor="brand.700"
                    boxShadow="lg"
                    maxW={{ base: 220, md: 360 }}
                    w="100%"
                    bg="linear-gradient(135deg, rgba(255,255,255,0.02), transparent)"
                    p={4}
                  />
                </Center>
              </Stack>
            </Box>

            <Box id="projects">
              <Stack direction={{ base: "column", md: "row" }} spacing={8} align="center">
                <Box flex="1">
                  <Heading size="xl" mb={4}>
                    About Me
                  </Heading>
                  <Text color="gray.300" maxW="3xl" lineHeight="tall">
                    I'm a fullstack developer with a passion for creating beautiful and functional web applications. With a background in UI design, I strive to build interfaces that are not only visually appealing but also user-friendly. I have experience working with a variety of technologies and am always eager to learn and take on new challenges.

                    In my free time, I enjoy exploring new design trends, contributing to open-source projects, and collaborating with other developers to create innovative solutions.
                  </Text>
                </Box>

                <Center flex="0 0 320px">
                  <Card
                    p={4}
                    borderRadius="lg"
                    bg="surface.800"
                    borderWidth="1px"
                    borderColor="brand.700"
                    boxShadow="md"
                    _hover={{ transform: "translateY(-6px)", boxShadow: "xl" }}
                    transition="transform 200ms ease"
                  >
                    <Image
                      src="/placeholder-profile.svg"
                      alt="Placeholder profile illustration"
                      borderRadius="lg"
                      maxW={280}
                      w="100%"
                    />
                  </Card>
                </Center>
              </Stack>
            </Box>

            <Box id="contact">
              <Heading size="md" mb={4} {...pixelHeadingStyles}>
                Skills
              </Heading>
              <Box>
                <Tabs>
                  <TabList>
                    <Tab>FrontEnd</Tab>
                    <Tab>BackEnd</Tab>
                    <Tab>Other</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>{renderSkillsGrid(skillsByTab.frontEnd)}</TabPanel>
                    <TabPanel>{renderSkillsGrid(skillsByTab.backEnd)}</TabPanel>
                    <TabPanel>{renderSkillsGrid(skillsByTab.other)}</TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
            </Box>

            <Box>
              <Heading size="md" mb={4} {...pixelHeadingStyles}>
                Projects
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                {projects.map((project) => (
                  <Card
                    key={project.title}
                    p={6}
                    bg="surface.800"
                    borderWidth="1px"
                    borderColor="brand.700"
                    borderRadius="xl"
                    boxShadow="sm"
                    transition="transform 200ms ease, box-shadow 200ms ease"
                    _hover={{ transform: "translateY(-8px)", boxShadow: "xl" }}
                  >
                    <Heading size="sm" {...pixelHeadingStyles}>
                      {project.title}
                    </Heading>
                    <Text mt={3} color="gray.300">
                      {project.description}
                    </Text>
                    <Wrap mt={4} spacing={2}>
                      {project.stack.map((item) => (
                        <WrapItem key={`${project.title}-${item}`}>
                          <Tag size="sm" variant="subtle" bg="rgba(255,255,255,0.02)" color="gray.200">
                            {item}
                          </Tag>
                        </WrapItem>
                      ))}
                    </Wrap>
                    <HStack mt={4} justify="flex-end">
                      <Button size="sm" variant="ghost" colorScheme="brand">
                        View
                      </Button>
                    </HStack>
                  </Card>
                ))}
              </SimpleGrid>
            </Box>

            <Box>
              <Heading size="md" mb={4} {...pixelHeadingStyles}>
                Contact
              </Heading>
              <Text color="gray.300" mb={3}>
                Replace these links with your real profiles and email.
              </Text>
              <HStack spacing={5} flexWrap="wrap">
                <Link color="brand.300" href="mailto:hello@example.com">
                  hello@example.com
                </Link>
                <Link color="brand.300" href="https://github.com" isExternal>
                  GitHub
                </Link>
                <Link color="brand.300" href="https://linkedin.com" isExternal>
                  LinkedIn
                </Link>
              </HStack>
            </Box>
            
            <Box as="footer" pt={10} pb={6}>
              <Divider borderColor="rgba(255,255,255,0.03)" mb={4} />
              <HStack justify="space-between" w="full">
                <Text color="gray.400" fontSize="sm">
                  © {new Date().getFullYear()} Christian André Martinez
                </Text>
                <HStack spacing={4}>
                  <Link color="gray.400" href="#top">
                    Back to top
                  </Link>
                  <Link color="brand.300" href="/cv.pdf" isExternal>
                    Resume
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
