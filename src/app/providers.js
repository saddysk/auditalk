"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { UserContextProvider } from "./context/userContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const theme = extendTheme({
  fonts: {
    heading: "var(--font-inter)",
    body: "var(--font-inter)",
  },
});

export function Providers({ children }) {
  return (
    <GoogleOAuthProvider clientId="342222579547-ft07jlbd7o512lv9fpjhfulpon2aoirs.apps.googleusercontent.com">
      <UserContextProvider>
        <CacheProvider>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </CacheProvider>
      </UserContextProvider>
    </GoogleOAuthProvider>
  );
}
