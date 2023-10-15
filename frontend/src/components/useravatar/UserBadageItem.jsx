import { Box, CloseButton } from "@chakra-ui/react";
import React from "react";

const UserBadageItem = ({ user, handleFunction }) => {
  return (
    <Box
      px={2}
      py={0.2}
      borderRadius="lg"
      m={1}
      mb={2}
      // variant="solid"
      fontSize={12}
      display="flex"
      alignItems="center"
      justifyContent="center"
      backgroundColor="blueviolet"
      color="white"
      // colorScheme="purple"
      cursor="pointer"
      onClick={handleFunction}
    >
      {user.name.toUpperCase()}
      <CloseButton p={0} m={0} />
    </Box>
  );
};

export default UserBadageItem;
