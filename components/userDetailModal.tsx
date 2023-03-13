import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
} from "@chakra-ui/react";
import { User } from "@/types/customTypes";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedUser: User | null;
}

export default function UserDetailModal({
  isOpen,
  onClose,
  selectedUser,
}: Props) {
  if (!selectedUser) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>User Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Box>
              <strong>Name:</strong> {selectedUser.name}
            </Box>
            <Box>
              <strong>Username:</strong> {selectedUser.username}
            </Box>
            <Box>
              <strong>Email:</strong> {selectedUser.email}
            </Box>
            <Box>
              <strong>Address:</strong> {selectedUser.address.street},{" "}
              {selectedUser.address.suite}, {selectedUser.address.city},{" "}
              {selectedUser.address.zipcode}
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
