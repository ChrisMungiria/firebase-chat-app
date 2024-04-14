import { View, Button } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FIREBASE_AUTH } from "../../firebase";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  console.log(user);

  const handleLogout = async () => {
    await signOut(FIREBASE_AUTH).then(() => {
      dispatch(logout());
    });
  };
  return (
    <View className="w-screen h-screen flex items-center justify-center">
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Profile;
