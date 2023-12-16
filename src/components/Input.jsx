import React, { useContext, useState, useEffect } from "react";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { upload } from "@testing-library/user-event/dist/upload";

const Input = () => {
  const [text, setText] = useState("");
  const [tempText, setTempText] = useState("");

  const [img, setImg] = useState(null);

  useEffect(() => {
    // Check if img is not null and then call handleSubmit
    if (img !== null) {
      handleSend();
    }
  }, [img]);

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      // Call your function here
      handleSend();
    }
  };

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    setTempText(text);
    setText("");
    if (img) {
      const storageRef = ref(storage, uuid());
      await uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text: "Image",
              senderId: currentUser.uid,
              date: Timestamp.now(),
              img: downloadURL,
            }),
          });
        });
      });

      // const uploadTask = uploadBytesResumable(storageRef, img);
      // uploadTask.on(
      //   (error) => {
      //     console.log(error);
      //     //TODO:Handle Error
      //   },
      //   () => {
      //     getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
      //       await updateDoc(doc(db, "chats", data.chatId), {
      //         messages: arrayUnion({
      //           id: uuid(),
      //           text,
      //           senderId: currentUser.uid,
      //           date: Timestamp.now(),
      //           img: downloadURL,
      //         }),
      //       });
      //     });
      //   }
      // );
    } else if (text !== "") {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setTempText("");
    setImg(null);
  };
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={handleEnterPress}
      />
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
