// import dependencies
import React, { useRef } from "react";
import { LogBox, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { NativeBaseProvider, Toast } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";

// import navigatiors
import Main from "./Navigators/Main";

// import context API
import Auth from "./Context/store/Auth";

// import redux
import store from "./Redux/store";

LogBox.ignoreAllLogs(true);
function App() {
  const toastRef = useRef();
  
  React.useEffect(() => {
    if (toastRef.current) {
      Toast.setRef(toastRef.current);
    }
  }, [toastRef]);
  
  // font definition
  const [fontsLoaded] = useFonts({
    DelaGothicOne: require("./assets/fonts/DelaGothicOne.ttf"),
    Lato: require("./assets/fonts/Lato.ttf"),
    Arsenal: require("./assets/fonts/Arsenal.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <Auth>
      <Provider store={store}>
        <NativeBaseProvider>
          <NavigationContainer>
            <StatusBar backgroundColor="#515760" barStyle="dark-content" />
            <Main />
          </NavigationContainer>
        </NativeBaseProvider>
      </Provider>
    </Auth>
  );
}

export default App;
