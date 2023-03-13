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
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EditIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import usePosts from "@/hooks/usePosts";
import { Post } from "@/types/customTypes";
import EditModal from "./editModal";
import Search from "./search";

export default function Posts() {
  const { posts } = usePosts();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(25);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const filteredPosts = posts.filter((post) =>
    post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const displayRangeStart = (currentPage - 1) * postsPerPage + 1;
  const displayRangeEnd =
    currentPage * postsPerPage > filteredPosts.length
      ? filteredPosts.length
      : currentPage * postsPerPage;

  const handleDelete = (id: number) => {
    console.log("Post should be deleted: " + id);
  };

  const handleEdit = (post: Post) => {
    setSelectedPost(post);
    onOpen();
  };

  const handleSaveChanges = (editedPost: Post) => {
    console.log("Post should be saved: " + editedPost);
    setSelectedPost(null);
    onClose();
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  return (
    <Box w="50%" mx="auto" mt={10} mb={20}>
      <Search handleSearch={handleSearch} />
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
              <Td>
                <HStack>
                  <Button
                    size="sm"
                    variant="ghost"
                    leftIcon={<EditIcon />}
                    onClick={() => handleEdit(post)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    leftIcon={<DeleteIcon />}
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </Button>
                </HStack>
              </Td>
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
      <EditModal
        isOpen={isOpen}
        onClose={onClose}
        selectedPost={selectedPost}
        handleSaveChanges={handleSaveChanges}
      />
    </Box>
  );
}
