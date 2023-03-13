import { useState, useEffect } from "react";
import axios from "axios";
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
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(25);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get<Post[]>(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(res.data);
    };

    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(posts.length / postsPerPage);

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
    currentPage * postsPerPage > posts.length
      ? posts.length
      : currentPage * postsPerPage;

  return (
    <Box w="50%" mx="auto" mt={10} mb={20}>
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
      <Flex justify="space-between" mt={10}>
        <HStack spacing={2}>
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
          >
            Next
          </Button>
        </HStack>
        <Text fontSize="sm">
          Showing {displayRangeStart} to {displayRangeEnd} of {posts.length}{" "}
          posts
        </Text>
      </Flex>
    </Box>
  );
}
