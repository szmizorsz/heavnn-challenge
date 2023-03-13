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
import { User, Post } from "@/types/customTypes";
import usePosts from "@/hooks/usePosts";
import UsersPost from "./usersPost";

export default function Users() {
  const { users } = useUsers();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { posts } = usePosts();
  const [userPosts, setUserPosts] = useState<Post[]>([]);

  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    setUserPosts(posts.filter((post: Post) => post.userId === user.id));
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
              <Td>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleViewDetails(user)}
                >
                  View Posts
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
      <UsersPost
        isOpen={isOpen}
        onClose={onClose}
        selectedUser={selectedUser}
        userPosts={userPosts}
      />
    </Box>
  );
}
