import * as Yup from "yup";
export const Address = Yup.object().shape({
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
  addressLine1: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  addressLine2: Yup.string()
    .min(2, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
  landmark: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  aggreedTerms: Yup.boolean(),
});

export const CARDS = [
  {
    title: "1 Session",
    sessionCount : 1,
    price: 500,
    features: ["Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum"],
    isHighlighted: false,
  },
  {
    title: "5 Session",
    sessionCount : 5,
    price: 600,
    features: ["Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum"],
    isHighlighted: true,
  },
  {
    title: "8 Session",
    sessionCount : 8,
    price: 600,
    features: ["Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum"],
    isHighlighted: false,
  },
];
