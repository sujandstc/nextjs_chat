import type { NextApiRequest, NextApiResponse } from "next";
import { mongoConnect } from "./mongoConnect";

const startChat = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { username, chat } = req.body;

  if (!username) throw "Invalid username";
  if (!chat) throw "Chat required";

  const mongoConnection = await mongoConnect();

  if (!mongoConnection) throw "ERROR CONNECTING!";

  const collection = mongoConnection.db("chatbot").collection("chats");

  await collection.insertOne({
    username: username,
    chat: chat,
  });

  await mongoConnection.close();

  res.status(200).json({
    name: "Ok",
  });
};

export default startChat;
