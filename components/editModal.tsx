import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedPost: { id: number; title: string; body: string } | null;
  handleSaveChanges: (editedPost: {
    id: number;
    title: string;
    body: string;
  }) => void;
}

export default function EditModal({
  isOpen,
  onClose,
  selectedPost,
  handleSaveChanges,
}: Props) {
  const [editedPost, setEditedPost] = useState({
    id: 0,
    title: "",
    body: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    handleSaveChanges(editedPost);
  };

  const handleCancel = () => {
    setEditedPost({ id: 0, title: "", body: "" });
    onClose();
  };

  if (!selectedPost) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>ID</FormLabel>
            <Input value={selectedPost.id} isDisabled />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              value={editedPost.title}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Body</FormLabel>
            <Input
              name="body"
              value={editedPost.body}
              onChange={handleInputChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save Changes
          </Button>
          <Button variant="ghost" onClick={handleCancel}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
