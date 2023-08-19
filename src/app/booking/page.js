"use client";
import {
  Flex,
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
  Box,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Navbar } from "../components";
import { getUser } from "../axios/axios";
import useUserContext from "../context/userContext";
import { useRouter } from "next/navigation";

const JoinUs = () => {
  const { userContext, setContextUser } = useUserContext();
  const [data, setData] = useState();
  const route = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        console.log("res");
        const res = await getUser();
        setData(res.data.data.sessions);
        setContextUser(res.data.data);
        setLoading(false);
      } catch (err) {
        console.log(err, "err");
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <Navbar />

      <Flex>
        <Container maxW={"1440px"} margin="auto" py={24}>
          <Flex>
            <TableContainer w={"100%"}>
              {loading ? (
                <Flex
                  justifyContent={"center"}
                  alignItems={"center"}
                  h={"60vh"}
                  w={"100%"}
                >
                  <Spinner />
                </Flex>
              ) : (
                <Table variant="striped" colorScheme="gray">
                  <Thead>
                    <Tr>
                      <Th>Session ID</Th>
                      <Th>Treatment Type</Th>
                      <Th isNumeric>Counts</Th>
                      <Th>Name</Th>
                      <Th>Email</Th>
                      <Th>Address</Th>
                      <Th>City</Th>
                      <Th>Phone</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data?.map((item, index) => (
                      <Tr>
                       <Td onClick={() => route.push(`/booking/${item.sessionId}`)}>{item.sessionId}</Td>
                        <Td>{item.treatmentType}</Td>
                        <Td isNumeric>{item.sessionCount}</Td>
                        <Td>
                          {item.address?.firstName} {item.address?.lastName}
                        </Td>
                        <Td>{item.address?.email}</Td>
                        <Td>
                          {item.address?.addressLine1}
                          <br />
                          {item.address?.addressLine2}
                        </Td>
                        <Td>{item.address?.city}</Td>
                        <Td>{item.address?.phone}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              )}
            </TableContainer>
          </Flex>
        </Container>
      </Flex>
    </>
  );
};

export default JoinUs;
