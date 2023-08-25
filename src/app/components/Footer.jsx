import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Grid,
  Flex,
} from "@chakra-ui/react";
import { LogoW } from "../assets";
import Image from "next/image";
import Link from "next/link";

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export default function LargeWithLogoLeft() {
  return (
    <>
      <Box bg={"#516EFF"} color={"#ffffff"}>
        <Container as={Stack} maxW={"1440px"} margin="auto" py={24}>
          <SimpleGrid
            templateColumns={{ sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr" }}
            spacing={8}
          >
            <Stack spacing={6} mr={12}>
              <Flex w={["150px", "100px"]}>
                <Image src={LogoW} />
              </Flex>

              <Text fontSize={"sm"}>
                Lorem ipsum ral care in India. India Lorem Ipsum Lorem Ipsum
                dolor sit amet consectetour elit edipiscing
                {/* © 2022 Chakra Templates. All rights reserved */}
              </Text>
            </Stack>
            <Stack
              align={"flex-start"}
              borderRight={["0px", "1px solid #FFFFFF4D"]}
              pr={4}
            >
              <Text>We are welcoming you</Text>
              <Text fontSize="3xl" fontWeight={"600"} mt={4}>
                Want to visit our clinic?
              </Text>
              <Text>
                Saturday - Thrusday
                <br />X am- X pm
              </Text>
            </Stack>
            <Stack
              align={"flex-start"}
              borderRight={["0px", "1px solid #FFFFFF4D"]}
            >
              <Text>Important links</Text>
              <Grid templateColumns="1fr 0.5fr" mt={4}>
                <Stack align={"flex-start"}>
                  <Link href={"#"}>Terms & Conditions </Link>
                  <Link href={"https://wa.me/+917872836494"}>Support</Link>
                  <Link href={"#"}>Privacy policy</Link>
                </Stack>
              </Grid>
            </Stack>

            <Stack align={"flex-start"}>
              <Text>Say hello to us</Text>
              <Link href="mail:hello@easyhearing.com">
                {" "}
                <Text fontSize="lg" fontWeight={"600"} mt={4}>
                  hello@easyhearing.com
                </Text>
              </Link>
              <Text>
                Address
                <br />
                123 Anywhere, <br />
                Somewhere
                <br />
                IN 876549
                <br />
              </Text>
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>
      <Box bg={"#18181B"} color={"#ffffff"}>
        <Container as={Stack} maxW={"1440px"} margin="auto" py={6}>
          <Text textAlign={"center"} fontWeight={"500"}>
            © 2023, All Rights Reserved
          </Text>
        </Container>
      </Box>
    </>
  );
}
