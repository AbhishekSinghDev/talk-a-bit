import React, { useState } from "react";
import { ChatState } from "../context/ChatContextProvider";

import { Button } from "@chakra-ui/button";

// chakra ui files
import { Box } from "@chakra-ui/layout";

// internal files
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";

const Chats = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  const style = {
    backgroundImage: `url(${"https://coolbackgrounds.io/images/backgrounds/white/white-trianglify-b79c7e1f.jpg"})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "100vh",
  };

  return (
    <section className="w-[100%]" style={style}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </section>
  );
};

export default Chats;
