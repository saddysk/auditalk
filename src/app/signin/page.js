"use client";
import { Heading, Flex, Grid, Button, useToast } from "@chakra-ui/react";
import Image from "next/image";
import { Logo, SignIn } from "../assets";
import { useGoogleLogin } from "@react-oauth/google";
import { register } from "../axios/axios";
import axios from "axios";
import useUserContext from "../context/userContext";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
const Signin = () => {
  const { userContext, setContextUser } = useUserContext();
  const toast = useToast();
  const router = useRouter();
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );

        try {
          const resp = await register({
            email: res.data.email,
            name: res.data.name,
            picture: res.data.picture,
            token: response.access_token,
          });
          if (resp.status == 200) {
            setContextUser(resp.data.data);
            if (typeof window !== "undefined") {
              localStorage.setItem("x-auth-token", resp.data.session);
              localStorage.setItem("x-auth-email", resp.data.data.email);
            }
            console.log(resp, "resp.data.data");
            toast({
              title: resp.data.message,
              position: "top",
              variant: "left-accent",
              status: "success",
              duration: 3000,
            });
            router.push("/");
          }
        } catch (error) {
          //toast(error?.response?.data?.message, { type: "error" });
          setContextUser({});
        }
      } catch (err) {
        console.log(err, "err");
      }
    },
  });
  return (
    <>
      <Flex w={"100vw"} h={"100vh"} pos={"relative"}>
        {/* <Container maxW={"1440px"} margin="auto" py={24}></Container> */}
        <Grid
          gridTemplateColumns={"1fr 1fr"}
          display={["flex", "grid"]}
          flexDir={"column-reverse"}
        >
          <Flex
            flexDir={"column"}
            gap={10}
            fontSize={"md"}
            justifyContent={"center"}
            alignItems={"center"}
            margin={["auto", "unset"]}
          >
            <Heading>Welcome to Auditalk</Heading>
            <Button
              display={"flex"}
              type="button"
              px={10}
              py={[2, 6]}
              onClick={() => login()}
              gap={4}
              fontSize={20}
              bg={"transparent"}
              border={"1px solid black"}
              rounded={"40px"}
            >
              <FcGoogle fontSize={30} /> Sign In with google
            </Button>
          </Flex>
          <Flex
            w={"100%"}
            p={8}
            bg="#516EFF"
            maxH={["60%", "unset"]}
            h={"100%"}
            mb={["auto", "unset"]}
          >
            <Flex
              flexDir={"column"}
              alignItems={"center"}
              rounded={"lg"}
              overflow={"hidden"}
              bg={"white"}
              pb={4}
            >
              {" "}
              <Image w={["70%", "100%"]} h="100%" src={SignIn} />
              <Image display={["none", "unset"]} src={Logo} />
            </Flex>
          </Flex>
        </Grid>
      </Flex>
    </>
  );
};

export default Signin;
