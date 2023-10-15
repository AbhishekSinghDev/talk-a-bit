import Chat from "../models/chatModels.js";
import Message from "../models/messageModels.js";
import User from "../models/userModel.js";

const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    res.status(400).json({ message: "Invalid data passed into request" });
  }

  let newMessage = new Message({
    sender: req.user._id,
    content: content,
    chat: chatId,
  });

  try {
    let msg = await newMessage.save();

    msg = await msg.populate("sender", "name pic");
    msg = await msg.populate("chat");
    msg = await User.populate(msg, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: msg,
    });

    res.json(msg);
  } catch (err) {
    res.status(400).json({ error: `${err.message}` });
  }
};

const allMessages = async (req, res) => {
  try {
    const msg = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");

    res.json(msg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { sendMessage, allMessages };
