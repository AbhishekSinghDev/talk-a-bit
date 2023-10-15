import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  Image,
} from "@chakra-ui/react";
import React from "react";

import { AiFillEye } from "react-icons/ai";

const ProfileModal = ({ user, children }) => {
  // const { user } = ChatState();

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      backdropBlur="2px"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  return (
    <>
      {/* <Button
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
      >
        Use Overlay one
      </Button> */}
      <span
        ml="4"
        onClick={() => {
          setOverlay(<OverlayTwo />);
          onOpen();
        }}
      >
        {/* My Profile */}
        {children ? children : <AiFillEye className="cursor-pointer" />}
        {/* {console.log(user)} */}
      </span>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ModalHeader fontSize="4xl" fontWeight="bold">
            {user.name ? user.name.toUpperCase() : user.user.name.toUpperCase()}
          </ModalHeader>
          <ModalCloseButton />
          <Image
            src={user.name ? user.pic : user.user.pic}
            height="200px"
            width="200px"
            borderRadius="full"
          ></Image>
          <ModalBody marginTop="7">
            <Text fontSize="2xl">
              Email: {user.email ? user.email : user.user.email}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
