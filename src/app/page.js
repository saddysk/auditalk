"use client";
import {
  Flex,
  Heading,
  Container,
  Grid,
  Box,
  Text,
  Button,
} from "@chakra-ui/react";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppointmentCard, Hero } from "./assets";
import Image from "next/image";
import { Footer, Navbar } from "./components";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-inter: ${inter.style.fontFamily};
          }
        `}
      </style>
      <Navbar />
      <Flex w={"100vw"} pos={"relative"}>
        <Container maxW={"1440px"} margin="auto" py={24}>
          <Grid
            templateColumns={"1fr 1fr"}
            alignItems={"center"}
            display={["flex", "grid"]}
            flexDir={"column"}
          >
            <Flex flexDir={"column"} gap={"20px"}>
              <Heading
                fontSize={["4xl", "6xl"]}
                fontWeight={"700"}
                lineHeight={"1.3"}
              >
                Professional{" "}
                <Box display={"inline"} color={"#FFD700"}>
                  {" "}
                  Hearing Care{" "}
                </Box>
                at home.
              </Heading>
              <Text fontSize={['lg', "xl"]} color={"#777777"}>
                We Provide Hearing Checkup Right At Your Doorstep
              </Text>
            </Flex>
            <Box w={"80%"} ml={"auto"} m={['auto', 'unset']} mt={[8, 'unset']}>
              <Image src={Hero} />
            </Box>
          </Grid>
        </Container>
      </Flex>
      <Flex w={"100vw"} pos={"relative"} bg={"#F8FAFC"}>
        <Container maxW={"1440px"} margin="auto" py={24}>
          <Heading
            fontSize={["4xl","5xl"]}
            fontWeight={"600"}
            lineHeight={"1.3"}
            color={"#FFD700"}
            textTransform={"uppercase"}
          >
            Quick Actions
          </Heading>
          <Box width={"80%"} ml={"auto"} borderTop={"1px solid #BCBCBC"}></Box>
          <Grid
            display={["flex", "grid"]}
            flexDir={"column"}
            templateColumns={"1fr 1fr"}
            gap={20}
            mt={20}
          >
            {APPOINTMENT_CARDS.map((c) => {
              return (
                <Flex flexDir={"column"} gap={7} alignItems={"flex-start"}>
                  <Image src={c.cardImage} />
                  <Heading fontSize={["lg", "2xl"]}>{c.title}</Heading>
                  <Button
                    as={"a"}
                    display={{ base: "none", md: "inline-flex" }}
                    fontSize={["md","lg"]}
                    fontWeight={400}
                    color={"white"}
                    bg={"#516EFF"}
                    href={c.btnLink}
                    _hover={{
                      opacity: "80%",
                    }}
                    px={24}
                    py={4}
                  >
                    {c.btnContent}
                  </Button>
                </Flex>
              );
            })}
          </Grid>
          {/* <Box pos={"absolute"} display={['none' , 'block']} left={"30px"} bottom={"30px"}>
            <Image src={Line} />
          </Box> */}
        </Container>
      </Flex>
      <Footer />
    </>
  );
};

const APPOINTMENT_CARDS = [
  {
    title: "Book an Appointment (home visit)",
    btnContent: "Book Now",
    btnLink: "/appointment",
    cardImage: AppointmentCard,
  },
  {
    title: "Book an Appointment (home visit)",
    btnContent: "Book Now",
    btnLink: "/appointment",
    cardImage: AppointmentCard,
  },
];
export default Home;
