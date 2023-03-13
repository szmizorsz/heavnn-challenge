import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Post } from "@/types/customTypes";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedUser: User | null;
  userPosts: Post[];
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

export default function UsersPost({
  isOpen,
  onClose,
  selectedUser,
  userPosts,
}: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = userPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(userPosts.length / postsPerPage);

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const displayRangeStart = (currentPage - 1) * postsPerPage + 1;
  const displayRangeEnd =
    currentPage * postsPerPage > userPosts.length
      ? userPosts.length
      : currentPage * postsPerPage;

  if (!selectedUser) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{`Posts by ${selectedUser.name}`}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Title</Th>
                <Th>Body</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentPosts.map((post) => (
                <Tr key={post.id}>
                  <Td>{post.id}</Td>
                  <Td>{post.title}</Td>
                  <Td>{post.body}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Box mt={6}>
            <Button
              size="sm"
              variant="outline"
              leftIcon={<ChevronLeftIcon />}
              onClick={handlePrevClick}
              isDisabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              size="sm"
              variant="outline"
              rightIcon={<ChevronRightIcon />}
              onClick={handleNextClick}
              isDisabled={currentPage === totalPages}
              ml={2}
            >
              Next
            </Button>
            <Text fontSize="sm">
              Showing {displayRangeStart} to {displayRangeEnd} of{" "}
              {userPosts.length} posts
            </Text>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
