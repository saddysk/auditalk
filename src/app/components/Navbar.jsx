import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Logo } from "@/app/assets/index";
import Image from "next/image";
import Link from "next/link";
export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  let isToken = false;
  if (typeof window !== "undefined") {
    isToken = localStorage.getItem("x-auth-token");
  }
  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        maxW={"1440px"}
        margin="auto"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? (
                <CloseIcon w={12} h={12} />
              ) : (
                <HamburgerIcon w={16} h={16} />
              )
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Link href="/">
            {" "}
            <Flex w={["150px", "100px"]}>
              <Image src={Logo} />
            </Flex>
          </Link>
          <Flex display={{ base: "none", md: "flex" }} ml="auto" mr={12}>
            <DesktopNav />
          </Flex>
        </Flex>

        {!isToken ? (
          <Button
            as={"a"}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"#516EFF"}
            href={"/signin"}
            _hover={{
              opacity: "80%",
            }}
          >
            Sign Up
          </Button>
        ) : (
          <Button
            as={"a"}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"#516EFF"}
            _hover={{
              opacity: "80%",
            }}
            onClick={() => {
              if (typeof window !== "undefined") {
                localStorage.removeItem("x-auth-token");
                localStorage.removeItem("x-auth-email");
              }
              window.location.reload();
            }}
          >
            Logout
          </Button>
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Link
            p={2}
            href={navItem.href ?? "#"}
            fontSize={"sm"}
            fontWeight={500}
            color={linkColor}
            _hover={{
              textDecoration: "none",
              color: linkHoverColor,
            }}
          >
            {navItem.label}
          </Link>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  return (
    <Stack spacing={4}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
      </Flex>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Join Us",
    href: "/join",
  },
  {
    label: "My Bookings",
    href: "/booking",
  },
];
