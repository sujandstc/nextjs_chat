import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { axios_base_url } from "@/appConstants/config";

export default function Home() {
  const textRef: any = useRef();
  const username: any = useRef();
  const [chatKey, setChatKey] = useState<any>("");
  const [chats, setChats] = useState<any>([]);
  const [isSending, setIsSending] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const getChatKey = localStorage.getItem("chatKey");
      setChatKey(getChatKey ? getChatKey : "");

      setTimeout(() => {
        setInterval(() => {
          getChat();
        }, 500);
        getChat();
      }, 2000);
    }
  }, [router]);

  const startChat = () => {
    localStorage.setItem("chatKey", username.current.value);
    setChatKey(username.current.value);

    startChatFinal(username.current.value);
  };

  const endChat = () => {
    localStorage.removeItem("chatKey");
    setChatKey(undefined);
  };

  const startChatFinal = async (username: string) => {
    try {
      const response = await axios.get(
        axios_base_url + "/api/startchat?username=" + username
      );

      await axios.post(axios_base_url + "/api/sendchat", {
        username: "system",
        chat: `${username} has entered`,
      });

      alert("Good!");
    } catch (e) {
      alert("error");
    }
  };

  const sendChat = async () => {
    setIsSending(true);
    const getChatText = textRef.current.value;

    try {
      const response = await axios.post(axios_base_url + "/api/sendchat", {
        username: localStorage.getItem("chatKey"),
        chat: getChatText,
      });

      textRef.current.value = "";
      setIsSending(false);

      getChat();
    } catch (e) {
      alert("error");
    }
  };

  const getChat = async () => {
    try {
      const key = localStorage.getItem("chatKey");
      const response = await axios.get(
        axios_base_url + "/api/getchat?key=" + key
      );

      setChats(response.data.data);
    } catch (e) {
      alert("error");
    }
  };

  return (
    <>
      <div className="">
        {chatKey ? (
          <>
            <div className="chats">
              {chats.map((el: any) => (
                <>
                  <b>{el.username}</b>: {el.chat} <hr />
                </>
              ))}
            </div>

            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendChat();
                }}
              >
                <input type="text" ref={textRef} />
                <button type="submit" disabled={isSending ? true : false}>
                  {isSending ? "Sending..." : "Send chat"}
                </button>
              </form>
            </div>

            <button onClick={endChat}>Delete chat</button>
          </>
        ) : (
          <>
            <input type="text" ref={username} />
            <button onClick={startChat}>Start chat</button>
          </>
        )}
      </div>
    </>
  );
}
