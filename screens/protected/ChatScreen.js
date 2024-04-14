import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { FIREBASE_DB } from "../../firebase";
import { useSelector } from "react-redux";

const ChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const group = route.params.group;
  const id = group.id;

  const user = useSelector((state) => state.auth.user);

  useLayoutEffect(() => {
    const msgCollectionRef = collection(FIREBASE_DB, `groups/${id}/messages`);
    const q = query(msgCollectionRef, orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (groups) => {
      const messages = groups.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setMessages(messages);
    });

    return unsubscribe;
  }, []);

  const sendMessage = async () => {
    const msg = message.trim();
    if (msg.length === 0) return;

    const msgCollectionRef = collection(FIREBASE_DB, `groups/${id}/messages`);

    await addDoc(msgCollectionRef, {
      message: msg,
      sender: user.userID,
      createdAt: serverTimestamp(),
    });

    setMessage("");
  };

  const renderMessage = ({ item }) => {
    const myMessage = item.sender === user.userID;
    return (
      <View
        className={`p-3 mt-3 mx-3 rounded-xl max-w-[80%] ${
          myMessage ? "bg-blue-500 text-white self-end" : "bg-slate-200"
        }`}
      >
        <Text
          className={`text-lg ${myMessage ? "text-white" : "text-slate-700"}`}
        >
          {item.message}
        </Text>
        <Text
          className={`text-xs ${
            myMessage ? "text-white self-end" : "text-slate-700"
          }`}
        >
          {item.createdAt?.toDate().toLocaleDateString()}
        </Text>
      </View>
    );
  };
  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
      />
      <View className="flex-row bg-white p-4">
        <TextInput
          multiline
          value={message}
          onChangeText={(text) => setMessage(text)}
          placeholder="Type a message"
          className="flex-1 border border-slate-300 rounded-md p-2"
        />
        <Button disabled={message === ""} title="Send" onPress={sendMessage} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    padding: 10,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    maxWidth: "80%",
  },
  userMessageContainer: {
    backgroundColor: "#dcf8c6",
    alignSelf: "flex-end",
  },
  otherMessageContainer: {
    backgroundColor: "#fff",
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
});

export default ChatScreen;
