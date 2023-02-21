import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import RoutesManager from "./Routes/RoutesManager";

const Stack = createStackNavigator();

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar />
        <RoutesManager />
        <View
          style={{
            height: 60,
            justifyContent: "center",
            alignItems: "center",
            borderColor: "rgba(222,222,222,.4)",
            borderWidth: 1,
          }}
        >
          <Text>Add Banner</Text>
        </View>
      </NavigationContainer>
    </View>
  );
};

export default App;
