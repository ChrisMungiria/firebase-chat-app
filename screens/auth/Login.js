import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../../slices/authSlice";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebase";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("mungiria01@gmail.com");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    await signInWithEmailAndPassword(FIREBASE_AUTH, email, password).then(
      (userCredentials) => {
        dispatch(
          login({
            email: userCredentials.user.email,
            userID: userCredentials.user.uid,
          })
        );
      }
    );
  };

  return (
    <View className="w-screen h-screen flex items-center justify-center space-y-4">
      <Text className="text-xl font-semibold">Log In</Text>
      <View className="w-3/4 mx-auto space-y-2">
        <Text className="text-slate-600">Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          className="p-2 border border-slate-300 rounded-md"
        />
      </View>
      <View className="w-3/4 mx-auto space-y-2">
        <Text className="text-slate-600">Password</Text>
        <TextInput
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          className="p-2 border border-slate-300 rounded-md"
        />
      </View>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Pressable
          onPress={handleLogin}
          className="bg-blue-500 w-3/4 mx-auto flex items-center justify-center p-2 rounded-md"
        >
          <Text className="text-white">Log in</Text>
        </Pressable>
      )}
      <Pressable onPress={() => navigation.navigate("Register")}>
        <Text>Don't have an account? Register</Text>
      </Pressable>
    </View>
  );
};

export default Login;
