"use client";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import {
  Heading,
  Flex,
  Container,
  Text,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel, Input, Textarea,
  Grid,
  useToast
} from "@chakra-ui/react";
import { Footer, Navbar } from "../components";
import { Banner, JoinUs as JoinUsImg } from "../assets";
import Image from "next/image";
import { join } from "../axios/axios";
import { useRouter } from "next/navigation";

const JoinUsSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  phone: Yup.string().required(),
  email: Yup.string().email("Invalid email").required("Required"),
  workingAddress: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  desiredWorkingArea: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  permanentAddress: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  aggreedTerms: Yup.boolean().required("Required"),
});

const JoinUs = () => {
  const toast = useToast();
  const route = useRouter();
  return (
    <>
      <Navbar />
      <Flex w={"100vw"} pos={"relative"}>
        <Image objectFit="cover" src={Banner} />
        <Container
          maxW={"1440px"}
          margin="auto"
          py={24}
          pos={"absolute"}
          left={"0%"}
          right={"0%"}
          color={"white"}
        >
          <Heading fontSize={"32px"} fontWeight={"500"}>
            Join Us
          </Heading>
          <Text fontSize={"21px"} fontWeight={"300"} mt={4}>
            Home &gt; Join us
          </Text>
        </Container>
      </Flex>
      <Flex>
        <Container maxW={"1440px"} margin="auto" py={24}>
          <Flex>
            <Box
              px={[8, "130px"]}
              py="48px"
              rounded="md"
              margin={"auto"}
              bg="#F8FAFC"
            >
              <Flex margin={"auto"} mb={20} justifyContent={"center"}>
                <Image src={JoinUsImg} />
              </Flex>
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  phone: "",
                  email: "",
                  workingAddress: "",
                  desiredWorkingArea: "",
                  permanentAddress: "",
                  aggreedTerms: false,
                }}
                validationSchema={JoinUsSchema}
                onSubmit={(values) => {
                  (async () => {
                    console.log("res");
                    try {
                      console.log("res");
                      const res = await join(values);
                      console.log(res, "res");
                      toast({
                        title: "Form submitted successfully!",
                        position: "top",
                        variant: "left-accent",
                        status: "success",
                        duration: 3000,
                      });
                      route("/");
                    } catch (err) {
                      console.log(err, "err");
                      toast({
                        title: "Error submitting form. Please try again.",
                        position: "top",
                        variant: "left-accent",
                        status: "error",
                        duration: 3000,
                      });
                    }
                  })();
                }}
              >
                {({ handleSubmit, errors, touched }) => (
                  <form onSubmit={handleSubmit}>
                    <Grid
                      templateColumns={"1fr 1fr"}
                      spacing={4}
                      align="flex-start"
                      columnGap={10}
                      rowGap={5}
                      display={["flex", "grid"]}
                      flexDir={"column"}
                    >
                      <InputContainer
                        name="firstName"
                        as={Input}
                        errors={errors}
                        touched={touched}
                        placeholder={"First Name"}
                      />
                      <InputContainer
                        name="lastName"
                        as={Input}
                        errors={errors}
                        touched={touched}
                        placeholder={"First Name"}
                      />
                      <InputContainer
                        name="phone"
                        as={Input}
                        errors={errors}
                        touched={touched}
                        placeholder={"(860) 000-0000"}
                      />
                      <InputContainer
                        name="email"
                        as={Input}
                        errors={errors}
                        touched={touched}
                        placeholder={"email@gmail.com"}
                      />
                      <InputContainer
                        name="workingAddress"
                        as={Input}
                        errors={errors}
                        touched={touched}
                        placeholder={"Enter Your Current Working Address"}
                        width={"full"}
                      />

                      <InputContainer
                        name="desiredWorkingArea"
                        as={Input}
                        errors={errors}
                        touched={touched}
                        placeholder={"Enter Your Desired Working Area"}
                        width={"full"}
                      />

                      <InputContainer
                        name="permanentAddress"
                        as={Textarea}
                        errors={errors}
                        touched={touched}
                        placeholder={"123 Baker Streets , London"}
                        width={"full"}
                      />

                      <InputContainer
                        name="aggreedTerms"
                        as={Checkbox}
                        errors={errors}
                        touched={touched}
                        width={"full"}
                        type="checkbox"
                        placeholder={
                          "Consectetur Adipisicing Elit Sed Do Eiusmod Tempor . Terms & Conditions"
                        }
                      />

                      {/* <FormControl
                        isInvalid={!!errors.password && touched.password}
                      >
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Field
                          as={Input}
                          id="password"
                          name="password"
                          type="password"
                          variant="filled"
                          validate={(value) => {
                            let error;

                            if (value.length < 6) {
                              error =
                                "Password must contain at least 6 characters";
                            }

                            return error;
                          }}
                        />
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                      </FormControl>
                      <Field
                        as={Checkbox}
                        id="rememberMe"
                        name="rememberMe"
                        colorScheme="purple"
                      >
                        Remember me?
                      </Field> */}
                      <Button
                        gridColumn={"1/3"}
                        type="submit"
                        bg={"#516EFF"}
                        color={"white"}
                        fontSize={"16px"}
                        width="full"
                      >
                        Join
                      </Button>
                    </Grid>
                  </form>
                )}
              </Formik>
            </Box>
          </Flex>
        </Container>
      </Flex>
      <Footer />
    </>
  );
};

export default JoinUs;

const InputContainer = ({
  name,
  errors,
  as,
  touched,
  type = null,
  placeholder,
  width = null,
}) => {
  //console.log(touched, errors, 12);
  const result = name.replace(/([A-Z])/g, " $1");
  return (
    <FormControl
      gridColumn={width == "full" && "1/3"}
      display="flex"
      flexDir={type !== "checkbox" ? "column" : "row"}
    >
      {type !== "checkbox" && (
        <FormLabel htmlFor={name} fontSize={"14px"} color={"18181B"}>
          {result.charAt(0).toUpperCase() + result.slice(1)}
        </FormLabel>
      )}
      <Field
        as={as}
        id={name}
        name={name}
        type={name}
        variant="outline"
        placeholder={placeholder}
      />
      {type == "checkbox" && (
        <FormLabel
          display={"inline"}
          p={0}
          m={0}
          ml={2}
          htmlFor={name}
          fontSize={"14px"}
          color={"18181B"}
        >
          {placeholder}
        </FormLabel>
      )}
      {errors[name] && touched[name] ? (
        <Text fontSize={"14px"} mt={2} color={"red.500"}>
          {errors[name]}
        </Text>
      ) : null}
    </FormControl>
  );
};
