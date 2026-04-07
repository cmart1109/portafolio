import {
  Box,
  Button,
  Card,
  Container,
  Heading,
  HStack,
  Link,
  SimpleGrid,
  Tag,
  Text,
  VStack,
  Wrap,
  WrapItem,
  Image,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

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
          className="skill-card"
        >
          <Box as="i" className={`${skill.iconClass} skill-icon`} aria-hidden="true" />
          <Text color="gray.300" mt={3} fontSize="lg" fontWeight="500" textAlign="center">
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
        m="3rem"
        borderRadius={25}
        minH="100vh"
        py={{ base: 10, md: 16 }}
        minHeight="100vh"
      >
        <Container maxW="5xl">
          <VStack align="stretch" spacing={{ base: 12, md: 16 }} minHeight="200vh">
            <Box id="about" minHeight="60vh" alignItems="center" display="flex" flexDirection="column" justifyContent="center">
              <Heading
                size="3xl"
                lineHeight="1.1"
                maxW="1xl"
                textAlign="center"
              >
                Christian André Martinez
              </Heading>
              <Text
                fontFamily="pixel"
                fontSize={{ base: "xs", md: "sm" }}
                color="brand.300"
                fontWeight="400"
                letterSpacing="wide"
                textTransform="uppercase"
                textAlign="center"
                mb={3}
                marginTop={3}
              >
                Fullstack Developer & UI Designer
              </Text>
              <Text mt={5} color="gray.300" maxW="2xl" fontSize="lg" lineHeight="tall" textAlign="center" mx="auto">
                A passionate developer with experience in building web applications
                using modern technologies. I enjoy creating intuitive user interfaces
                and solving complex problems.
              </Text>
              <HStack spacing={4} mt={8} flexWrap="wrap" justifyContent="center">
                <Button colorScheme="brand" size="lg" fontFamily="pixel" fontWeight="400">
                  View Projects
                </Button>
                <Button
                  variant="outline"
                  colorScheme="brand"
                  size="lg"
                  fontFamily="pixel"
                  fontWeight="400"
                >
                  Contact Me
                </Button>
              </HStack>
            </Box>

            <Box id="projects">
              <Box display="flex" flexDirection="row" alignItems="center">
              <Image
                src="/placeholder-profile.svg"
                alt="Placeholder profile illustration"
                borderRadius="xl"
                border="1px solid"
                borderColor="brand.700"
                maxW="400px"
                w="100%"
                mx="auto"
                m={6}
              />
              <Box textAlign="left" ml={{ base: 0, md: 10 }} mt={{ base: 10, md: 0 }}>
              <Heading size="xl" textAlign="left" mb={4}>
                About Me
              </Heading>
              <Text color="gray.300" maxW="3xl" lineHeight="tall" textAlign="left" mx="auto">
                I'm a fullstack developer with a passion for creating beautiful and functional web applications. With a background in UI design, I strive to build interfaces that are not only visually appealing but also user-friendly. I have experience working with a variety of technologies and am always eager to learn and take on new challenges.

                In my free time, I enjoy exploring new design trends, contributing to open-source projects, and collaborating with other developers to create innovative solutions.
              </Text>
              
          
              </Box>
              </Box>
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
                  <Box
                    key={project.title}
                    p={6}
                    bg="surface.800"
                    borderWidth="1px"
                    borderColor="brand.700"
                    borderRadius="xl"
                    boxShadow="sm"
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
                          <Tag size="sm" variant="outline" colorScheme="brand">
                            {item}
                          </Tag>
                        </WrapItem>
                      ))}
                    </Wrap>
                  </Box>
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
          </VStack>
        </Container>
      </Box>
    </main>
  );
}
