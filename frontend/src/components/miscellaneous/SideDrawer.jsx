import React, { useState } from "react";
import axios from "axios";
import { AiFillCaretDown, AiOutlineSearch } from "react-icons/ai";
import { BsFillBellFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

// chakra ui imports
import { Box } from "@chakra-ui/layout";
import {
  Button,
  Tooltip,
  Text,
  Menu,
  MenuButton,
  MenuList,
  Avatar,
  MenuItem,
  MenuDivider,
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
  Spinner,
} from "@chakra-ui/react";

import { toast } from "react-toastify";

import { ChatState } from "../../context/ChatContextProvider";
import ProfileModal from "./ProfileModal";
import ChatLoading from "../ChatLoading";
import UserListItem from "../useravatar/UserListItem";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const { user, setSelectedChat, chats, setChats } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("userinfo");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast.warn("Please enter something in search!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:7000/api/v1/users?search=${search}`,
        config
      );

      if (data.length === 0) {
        toast("No User Found", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }

      setLoading(false);
      setSearchResult(data);
    } catch (err) {
      toast.error("Some server error!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        "http://localhost:7000/api/v1/chat",
        {
          userId,
        },
        config
      );

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (err) {
      toast.error("Some Server Error!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="darkgrey"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
        borderRadius="full"
      >
        <Tooltip label="Search Users" hasArrow placement="bottom-end">
          <Button variant="solid" borderRadius="full" onClick={onOpen}>
            <AiOutlineSearch className="sm:text-xl text-lg" />
            <Text
              display={{ base: "none", md: "flex" }}
              px={{ base: "0", md: "4" }}
            >
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Text
          fontSize={{ base: "15px", md: "2xl" }}
          fontFamily="Poppins"
          fontWeight="bold"
          textColor="black"
        >
          Talk A Bit
        </Text>

        <div className="mr-4 flex items-center justify-between gap-4">
          <Menu>
            <MenuButton p={1}>
              <BsFillBellFill className="sm:text-2xl text-lg" />
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>
          <Box>
            <Menu>
              <MenuButton as={Button} rightIcon={<AiFillCaretDown />}>
                <Avatar
                  size="sm"
                  cursor="pointer"
                  name={user.user.name}
                  src={user.user.pic}
                />
              </MenuButton>
              <MenuList>
                <ProfileModal user={user}>
                  <MenuItem>My Profile</MenuItem>
                </ProfileModal>
                <MenuDivider />
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" paddingBottom={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>GO</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
