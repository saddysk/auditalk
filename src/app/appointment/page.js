"use client";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import Image from "next/image";
import React, { useEffect } from "react";
import { BiSolidOffer, BiSolidUser } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { Banner, Logo } from "../assets";
import {
  addSession,
  createOrderId,
  getUser,
  updateUser,
  verifyPayment,
} from "../axios/axios";
import { Footer, Navbar } from "../components";
import { Address, CARDS } from "./data";
import useUserContext from "../context/userContext";
import { useRouter } from "next/navigation";

const Appointment = () => {
  const { userContext, setContextUser } = useUserContext();
  const [orderId, setOrderId] = React.useState("");
  const [treatmentType, setTreatmentType] = React.useState("speech-therapy");
  const [step, setStep] = React.useState(0);
  const toast = useToast();
  const router = useRouter();
  useEffect(() => {
    (async () => {
      try {
        const res = await getUser();
        setContextUser(res.data.data);
      } catch (err) {
        toast({
          title: "Login/Signup to start booking",
          position: "top",
          variant: "left-accent",
          status: "info",
          duration: 3000,
        });
        router.push("/signin");
      }
    })();
  }, []);

  const handlePay = async ({ amount, treatmentType, sessionCount }) => {
    console.log(amount, treatmentType, sessionCount, "yay");

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    await createOrderId({
      amount: amount * 100,
      treatmentType,
      sessionCount,
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log(response.data);
          setOrderId(response.data.orderID);
          checkoutOrder({
            orderId: response.data.orderID,
            amount: amount * 100,
            treatmentType,
            sessionCount,
            router,
            userContext,
            setContextUser,
          });
        }
      })
      .catch((error) => console.log(error));
  };
  const payment = {
    "speech-therapy": 999,
    "swallow-therapy": 1499,
    "occupational-therapy": 999,
    "hearing-test": 999,
  };
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
      {step == 0 && (
        <Flex w={"100vw"} pos={"relative"}>
          <Container maxW={"1440px"} margin="auto" py={24}>
            <Flex
              flexDir={"column"}
              bg="#F8FAFC"
              mx={[0, 12]}
              px={[8, 20]}
              py={16}
              rounded={"lg"}
            >
              <Heading
                fontSize={["2xl", "3xl"]}
                fontWeight={"600"}
                lineHeight={"1.3"}
              >
                Home Visit &gt; Add your Address
              </Heading>
              <Box
                width={"100%"}
                ml={"auto"}
                mt={4}
                borderTop={"1px solid #BCBCBC"}
              ></Box>

              <Box
                w={["100%", "700px"]}
                rounded="md"
                margin={"auto"}
                bg="#F8FAFC"
                mt={20}
              >
                <Formik
                  initialValues={{
                    firstName: "",
                    lastName: "",
                    phone: "",
                    email: "",
                    addressLine1: "",
                    addressLine2: "",
                    landmark: "",
                    city: "",
                    state: "",
                    aggreedTerms: false,
                  }}
                  validationSchema={Address}
                  onSubmit={(values) => {
                    (async () => {
                      console.log("res");
                      try {
                        console.log("res");
                        const res = await updateUser(values);
                        console.log(res, "res");
                        toast({
                          title: "Added address details successfully!",
                          position: "top",
                          variant: "left-accent",
                          status: "success",
                          duration: 3000,
                        });
                        setStep(1);
                        setContextUser({ ...userContext, address: values });
                      } catch (err) {
                        console.log(err, "err");
                        toast({
                          title:
                            "Error adding address details. Please try again.",
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
                          name="addressLine1"
                          as={Input}
                          errors={errors}
                          touched={touched}
                          placeholder={"Enter Your Current Working Address"}
                          width={"full"}
                        />
                        <InputContainer
                          name="addressLine2"
                          as={Input}
                          errors={errors}
                          touched={touched}
                          placeholder={"Enter Your Current Working Address"}
                          width={"full"}
                        />

                        <InputContainer
                          name="landmark"
                          as={Input}
                          errors={errors}
                          touched={touched}
                          placeholder={"E.g. near Bridgeford School"}
                          width={"full"}
                        />

                        <InputContainer
                          name="city"
                          as={Input}
                          errors={errors}
                          touched={touched}
                          placeholder={"Town/City"}
                        />
                        <InputContainer
                          name="state"
                          as={Input}
                          errors={errors}
                          touched={touched}
                          placeholder={"State"}
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
                        <Button
                          gridColumn={"1/3"}
                          type="submit"
                          bg={"#516EFF"}
                          color={"white"}
                          fontSize={"16px"}
                          width="full"
                        >
                          Confirm
                        </Button>
                      </Grid>
                    </form>
                  )}
                </Formik>
              </Box>
            </Flex>
          </Container>
        </Flex>
      )}
      {step == 1 && (
        <>
          <Flex w={"100vw"} pos={"relative"}>
            <Container maxW={"1440px"} margin="auto" py={24} pb={0}>
              <Flex
                flexDir={"column"}
                bg="#F8FAFC"
                mx={[0, 12]}
                px={[8, 20]}
                py={16}
                rounded={"lg"}
              >
                <Heading
                  fontSize={["2xl", "3xl"]}
                  fontWeight={"600"}
                  lineHeight={"1.3"}
                >
                  Home Visit &gt; Choose your treatment
                </Heading>
                <Box
                  width={"100%"}
                  ml={"auto"}
                  mt={4}
                  borderTop={"1px solid #BCBCBC"}
                ></Box>
                <Flex flexDir={"column"} mt={20}>
                  <label>Treatment</label>
                  <Select
                    value={treatmentType}
                    onChange={(e) => {
                      setTreatmentType(e.target.value);
                    }}
                    w={["100%", "400px"]}
                    mt={2}
                  >
                    <option value="speech-therapy">Speech Therapy</option>
                    <option value="swallow-therapy">Swallow Therapy</option>
                    <option value="occupational-therapy">
                      Occupational Therapy
                    </option>
                    <option value="hearing-test">Hearing Test</option>
                  </Select>
                </Flex>
              </Flex>
            </Container>
          </Flex>
          <Flex w={"100vw"} pos={"relative"}>
            <Container maxW={"1440px"} margin="auto" py={24}>
              <Flex
                flexDir={"column"}
                bg="#F8FAFC"
                mx={[0, 12]}
                px={[8, 20]}
                py={16}
                rounded={"lg"}
              >
                <Heading
                  fontSize={["2xl", "3xl"]}
                  fontWeight={"600"}
                  lineHeight={"1.3"}
                >
                  Home Visit &gt; Payment
                </Heading>
                <Box
                  width={"100%"}
                  ml={"auto"}
                  mt={4}
                  borderTop={"1px solid #BCBCBC"}
                ></Box>

                <Grid
                  templateColumns={"1fr 1fr 1fr"}
                  gap={4}
                  mt={20}
                  display={["flex", "grid"]}
                  flexDir={"column"}
                >
                  {CARDS.map((card) => {
                    return (
                      <PayCard
                        title={card.title}
                        price={payment[treatmentType]}
                        sessionCount={card.sessionCount}
                        features={card.features}
                        highlight={card.isHighlighted}
                        onClick={(amt) => {
                          if (treatmentType == "") {
                            toast({
                              title: "Please select treatment type",
                              position: "top",
                              variant: "left-accent",
                              status: "info",
                              duration: 3000,
                            });
                            return;
                          }
                          handlePay({
                            amount: amt,
                            treatmentType,
                            sessionCount: card.sessionCount,
                          });
                        }}
                      />
                    );
                  })}
                </Grid>
              </Flex>
            </Container>
          </Flex>
        </>
      )}
      {/* <Flex>
        <Button
          onClick={() =>
            handlePay({
              amount: 40000,
              treatmentType: "headace",
              sessionCount: 4,
            })
          }
        >
          {" "}
          Payyyyyyy
        </Button>
      </Flex> */}
      <Footer />
    </>
  );
};

export default Appointment;

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    document.body.appendChild(script);
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
  });
}

async function checkoutOrder({
  orderId,
  amount,
  treatmentType,
  sessionCount,
  router,
  userContext,

  setContextUser,
}) {
  const KEY_ID = "rzp_test_5C7FR9ToxvLuxX";
  var options = {
    key: KEY_ID,
    amount: amount,
    currency: "INR",
    name: "Auditalk",
    description: "Get doctors at your home",
    image: Logo,
    order_id: orderId,
    handler: function (response) {
      paymentVerification(
        response,
        { treatmentType, sessionCount, orderId },
        router,
        userContext,

        setContextUser
      );
    },
    prefill: {
      name: "Nada",
      email: "nadaaofficial19@gmail.com",
    },
    theme: {
      color: "#229fa4",
    },
  };

  var rzp1 = new window.Razorpay(options);
  rzp1.on("payment.failed", function (response) {
    // alert(response.error.code);
    alert(response.error.description);
    // alert(response.error.source);
    // alert(response.error.step);
    alert(response.error.reason);
    // alert(response.error.metadata.order_id);
    // alert(response.error.metadata.payment_id);
  });

  rzp1.open();
}

async function paymentVerification(
  razorpayResponse,
  data,
  router,
  userContext,

  setContextUser
) {
  await verifyPayment(razorpayResponse)
    .then(async (response) => {
      console.log(response);
      if (response.status === 200) {
        if (response.data.signatureIsValid) {
          console.log("payment verified");
          const res = await addSession({
            ...data,
            address: userContext.address,
          });

          console.log(res.data.data.sessions);

          console.log(
            res,
            "res",
            res.data.data.sessions,
            res.data.data.sessions[res.data.data.sessions.length - 1]
          );
          setContextUser(res.data.data);
          router.push(
            `/booking/${
              res.data.data.sessions[res.data.data.sessions.length - 1]
                .sessionId
            }`
          );
          console.log("session added");
        }
        // enrollFunction(razorpayResponse.razorpay_order_id);
        else alert("payment received is not from an authentic source");
      }
    })
    .catch((error) => console.log(error));
}

const PayCard = ({
  title,
  price,
  highlight,
  features,
  onClick,
  sessionCount,
}) => {
  return (
    <Flex
      bg={highlight ? "#FFD70054" : "white"}
      p={8}
      rounded="lg"
      flexDir={"column"}
      gap={8}
      my={highlight ? 0 : 8}
      justifyContent={"center"}
    >
      <Flex gap={4} alignItems={"center"}>
        <BiSolidUser fontSize={24} />
        <Heading fontSize={"2xl"}>{title}</Heading>
      </Flex>
      <Text color={"gray.500"} fontSize={"xl"}>
        What You'll Get
      </Text>
      <Flex pb={8} borderBottom={"1px dashed gray"} flexDir={"column"} gap={4}>
        {features.map((feature) => {
          return (
            <Flex gap={4} alignItems={"center"}>
              <TiTick fontSize="20px" />
              <Text>{feature}</Text>
            </Flex>
          );
        })}
      </Flex>
      <Heading>₹ {price * sessionCount}</Heading>
      <Flex gap={4}>
        <BiSolidOffer fontSize={"40px"} />
        <Text>
          Pay {199 * sessionCount} now and remaining amount at home after the
          service.{" "}
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
        onClick={() => onClick(199 * sessionCount)}
      >
        Proceed to Pay
      </Button>
    </Flex>
  );
};

const InputContainer = ({
  name,
  errors,
  as,
  touched,
  type = null,
  placeholder,
  width = null,
}) => {
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
