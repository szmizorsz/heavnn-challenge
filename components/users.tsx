import { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  Text,
  Flex,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import useUsers from "@/hooks/useUsers";
import UserDetailModal from "./userDetailModal";
import { User } from "@/types/customTypes";

export default function Users() {
  const { users } = useUsers();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    onOpen();
  };

  return (
    <Box w="50%" mx="auto" mt={10} mb={20}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Username</Th>
            <Th>Email</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user: User) => (
            <Tr key={user.id}>
              <Td>{user.id}</Td>
              <Td>{user.name}</Td>
              <Td>{user.username}</Td>
              <Td>{user.email}</Td>
              <Td>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleViewDetails(user)}
                >
                  View Details
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <UserDetailModal
        isOpen={isOpen}
        onClose={onClose}
        selectedUser={selectedUser}
      />
    </Box>
  );
}
