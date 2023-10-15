import Chat from "../models/chatModels.js";
import User from "../models/userModel.js";

const accessChat = async (req, res) => {
  // req.body.userId = user_id which is the current user trying to build chat with
  // _id = user_id of the current user

  const { userId } = req.body;

  if (!userId) {
    res.status(400).json({ message: "please provide userid" });
  }

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  console.log(isChat);

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    const chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);

      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      res.status(200).send(fullChat);
    } catch (err) {
      res.status(400).json({ success: false, message: "some server error" });
    }
  }
};

const fetchChat = async (req, res) => {
  try {
    const chats = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });

        res.status(200).send(results);
      });
  } catch (err) {
    res.status(400).json({ message: "some server error" });
  }
};

const createGroup = async (req, res) => {
  // check weither the request from user have both groupname and users array is present or not
  if (!req.body.name && req.body.users) {
    res.status(400).json({
      success: false,
      message: "please provide groupname and all the users",
    });
  }

  let allUsers = JSON.parse(req.body.users);

  // needed more than 2 users atleast to form a group
  if (allUsers.length < 2) {
    res.status(400).json({
      success: false,
      message: "needed more than 2 users to create group chat",
    });
  }

  allUsers.push(req.user);

  try {
    const newGroupChat = new Chat({
      chatName: req.body.name,
      isGroupChat: true,
      users: allUsers,
      groupAdmin: req.user,
    });

    const groupChatResult = await newGroupChat.save();

    const fetchGroupChat = await Chat.find({ _id: groupChatResult._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(200).json({
      success: true,
      message: "group created successfully",
      fetchGroupChat,
    });
  } catch (err) {
    res.status(500).json({ message: "some server error" });
  }
};

const renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;

  // check weather the new name is empty or not
  if (!chatId && !chatName) {
    res
      .status(400)
      .json({ message: "please provide the new group name and chat id" });
  }

  try {
    // new is here "if the nothing provided then db gonna return the same name before"
    const updatedChatName = await Chat.findByIdAndUpdate(
      chatId,
      { chatName: chatName },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChatName) {
      res.status(400).json({ success: false, message: "oops! no group found" });
    }
    // res.status(200).json({
    //   data,
    // });
    res.status(200).send(updatedChatName);
  } catch (err) {
    res.status(500).json({ message: "some server error" });
  }
};

const removeFromGroup = async (req, res) => {
  const { userId, chatId } = req.body;

  // check empty
  if (!chatId && !userId) {
    res
      .status(400)
      .json({ success: false, message: "please provide a user id" });
  }

  try {
    const removed = await Chat.findByIdAndUpdate(
      chatId,
      { $pull: { users: userId } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!removed) {
      res
        .status(400)
        .json({ success: false, message: "unable to remove from group" });
    }
    res.status(200).json({
      success: true,
      message: "user removed successfully",
      updatedGroup: removed,
    });
  } catch (err) {
    res.status(500).json({ message: "some server error" });
  }
};

const addToGroup = async (req, res) => {
  const { userId, chatId } = req.body;

  // check empty
  if (!chatId && !userId) {
    res
      .status(400)
      .json({ success: false, message: "please provide a user id" });
  }

  try {
    const addRequest = await Chat.findByIdAndUpdate(
      chatId,
      { $push: { users: userId } },
      { new: true }
    ).populate("users", "-password");

    if (!addRequest) {
      res
        .status(400)
        .json({ success: false, message: "unable to add to group" });
    }
    // res.status(200).json({
    //   success: true,
    //   message: "user added successfully",
    //   updatedGroup: addRequest,
    // });
    res.status(200).send(addRequest);
  } catch (err) {
    res.status(500).json({ message: "some server error" });
  }
};

export {
  accessChat,
  fetchChat,
  createGroup,
  renameGroup,
  removeFromGroup,
  addToGroup,
};
