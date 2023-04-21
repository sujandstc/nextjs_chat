import type { NextApiRequest, NextApiResponse } from "next";
import { mongoConnect } from "./mongoConnect";

const getChat = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const mongoConnection = await mongoConnect();

  if (!mongoConnection) throw "ERROR CONNECTING!";

  const collection = mongoConnection.db("chatbot").collection("chats");

  const data = await collection.find({}).toArray();

  await mongoConnection.close();

  res.status(200).json({
    data: data,
  });
};

export default getChat;
