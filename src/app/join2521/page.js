"use client";
import {
  Flex,
  Container,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Navbar } from "../components";
import { getJoin } from "../axios/axios";

const JoinUs = () => {
  const [data, setData] = useState();
  useEffect(() => {
    (async () => {
      try {
        console.log("res");
        const res = await getJoin();
        setData(res.data.data);
        console.log(res, "res");
      } catch (err) {
        console.log(err, "err");
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
              <Table variant="striped" colorScheme="gray">
                <Thead>
                  <Tr>
                    <Th></Th>
                    <Th>First Name</Th>
                    <Th>Last Name</Th>
                    <Th isNumeric>Phone Number</Th>
                    <Th>Email</Th>
                    <Th>Working Address</Th>
                    <Th>Desirable Working Area</Th>
                    <Th>Created At</Th>

                  </Tr>
                </Thead>
                <Tbody>
                  {data?.map((item , index) => (
                    <Tr>
                      <Td>{index+1}</Td>
                      <Td>{item.firstName}</Td>
                      <Td>{item.lastName}</Td>
                      <Td isNumeric>{item.phone}</Td>
                      <Td>{item.email}</Td>
                      <Td>{item.workingAddress}</Td>
                      <Td>{item.desiredWorkingArea}</Td>
                      <Td>{item.createdAt}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
         
        </Container>
      </Flex>
    </>
  );
};

export default JoinUs;
