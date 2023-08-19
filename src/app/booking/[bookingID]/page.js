"use client";
import {
  Heading,
  Flex,
  Container,
  Button,
  Box,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Footer, Navbar } from "@/app/components";
import { usePathname, useRouter } from "next/navigation";
import useUserContext from "@/app/context/userContext";
import { TiTick } from "react-icons/ti";
import Image from "next/image";
import { Placeholder } from "@/app/assets";

const BookingConfirmation = () => {
  const { userContext, setContextUser } = useUserContext();
  const route = usePathname();
  const router = useRouter();
  const toast = useToast();
  //console.log(route.split("/")[2], userContext.sessions);
  console.log(userContext);

  useEffect(() => {
    if (Object.keys(userContext).length == 0) {
      console.log(1);
      toast({
        title: "Error in fetching confirmation details. Please try again.",
        position: "top",
        variant: "left-accent",
        status: "error",
        duration: 3000,
      });
      router.push("/booking");
    }
  }, [userContext]);

  return (
    <>
      <Navbar />
      <Flex w={"100vw"} pos={"relative"}>
        <Container maxW={"1440px"} margin="auto" py={24}>
          {Object.keys(userContext).length !== 0 && (
            <Flex
              bg="#F8FAFC"
              w={["100%", "80%"]}
              m="auto"
              flexDir={"column"}
              gap={6}
              padding={6}
            >
              <Flex justifyContent={"center"} alignItems={"center"} gap={4}>
                <TiTick color="green.100" />
                <Heading>Booking Confirmed</Heading>
              </Flex>
              <Box
                width={"100%"}
                ml={"auto"}
                mt={4}
                borderTop={"1px solid #BCBCBC"}
              ></Box>
              <Flex gap={16} mt={4} flexDir={["column", "row"]}>
                <Box width={"105px"}>
                  <Image src={Placeholder} />
                </Box>
                <Text fontSize={"16px"} letterSpacing={2} lineHeight={"30px"}>
                  A Specialist Doctor will be arriving at your doorstep on
                  scheduled time
                  <br />
                  Doctor might contact you on your registered number if he/she
                  is unable to find your location
                </Text>
              </Flex>
              <Box
                width={"100%"}
                ml={"auto"}
                mt={4}
                borderTop={"1px solid #BCBCBC"}
              ></Box>
              <Flex>
                <Text
                  fontSize={"16px"}
                  letterSpacing={2}
                  lineHeight={"40px"}
                  fontWeight={"600"}
                >
                  Confirmation ID -{" "}
                  {
                    userContext?.sessions[userContext?.sessions?.length - 1]
                      .sessionId
                  }{" "}
                  <br />
                  Time - 10:00 - 11:00 AM <br />
                  Date - 22/05/2023 <br />
                  Location -{" "}
                  {
                    userContext?.sessions[userContext?.sessions?.length - 1]
                      .address?.addressLine2
                  }{" "}
                  <br />
                  {
                    userContext?.sessions[userContext?.sessions?.length - 1]
                      .address?.addressLine1
                  }
                  <br />
                </Text>
              </Flex>
              <Button
                fontSize={"lg"}
                fontWeight={400}
                color={"white"}
                bg={"#516EFF"}
                href={"#"}
                _hover={{
                  opacity: "80%",
                }}
                px={24}
                py={4}
                mx={"auto"}
                mt={10}
                onClick={() => router.push("/")}
              >
                Go Home
              </Button>
            </Flex>
          )}
        </Container>
      </Flex>
      <Footer />
    </>
  );
};

export default BookingConfirmation;
