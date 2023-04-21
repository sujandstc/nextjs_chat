import type { NextApiRequest, NextApiResponse } from "next";
import { mongoConnect } from "./mongoConnect";

const startChat = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { username } = req.query;

  const mongoConnection = await mongoConnect();

  if (!mongoConnection) throw "ERROR CONNECTING!";

  const collection = mongoConnection.db("chatbot").collection("visitors");

  await collection.insertOne({
    username: username,
  });

  await mongoConnection.close();

  res.status(200).json({
    name: "Ok",
  });
};

export default startChat;
