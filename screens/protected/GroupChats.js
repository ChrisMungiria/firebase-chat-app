import {
  View,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { FIREBASE_DB } from "../../firebase";
import { useSelector } from "react-redux";

const GroupChats = () => {
  const [groupsCollectionRef, setGroupsCollectionRef] = useState(null);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const ref = collection(FIREBASE_DB, "groups");
    setGroupsCollectionRef(ref);

    const unsubscribe = onSnapshot(ref, (groups) => {
      const groupsData = groups.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      setGroups(groupsData);
    });

    return unsubscribe;
  }, []);

  const createGroup = async () => {
    console.log(user.userID);
    setLoading(true);
    try {
      await addDoc(groupsCollectionRef, {
        name: `Group #${Math.floor(Math.random() * 1000)}`,
        description: "This is a chat group",
        creator: user.userID,
      }).then(() => {
        setLoading(false);
      });
    } catch (error) {
      console.log("error creating group", error);
    }
  };
  return (
    <View className="w-screen h-screen pt-16">
      <ScrollView>
        {groups.map((group) => (
          <View
            key={group.id}
            className="w-full bg-white p-4 mb-2"
            style={{
              elevation: 4,
            }}
          >
            <TouchableOpacity>
              <Text>{group.name}</Text>
              <Text>{group.description}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <Pressable
        onPress={createGroup}
        className="absolute bottom-20 right-10 bg-blue-500 p-4 rounded-full"
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Ionicons name="person-add-outline" size={24} color="white" />
        )}
      </Pressable>
    </View>
  );
};

export default GroupChats;
