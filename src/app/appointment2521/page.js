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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Navbar } from "../components";
import { getUsers } from "../axios/axios";

const JoinUs = () => {
  const [data, setData] = useState();

  useEffect(() => {
    (async () => {
      try {
        console.log("res");
        const res = await getUsers();
        res.data.data.map((item) => item.sessions);
        setData(res.data.data.map((item) => [...item.sessions]).flat());
        console.log(res.data.data.map((item) => item.sessions).flat(), "res");
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
                      <Td>{item.sessionId}</Td>
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
            </TableContainer>
          </Flex>
        </Container>
      </Flex>
    </>
  );
};

export default JoinUs;
