import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import "expo-dev-client";

import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";

import RoutesManager from "./Routes/RoutesManager";

//Redux
import { Provider } from "react-redux";
import store from "./Redux/store";

const App = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
