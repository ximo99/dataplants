// import dependencies
import React, { useRef } from "react";
import { LogBox, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { NativeBaseProvider, Toast } from "native-base";
import { NavigationContainer } from "@react-navigation/native";

// import screens
import Header from "./Shared/Header";

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

  return (
    <Auth>
      <Provider store={store}>
        <NativeBaseProvider>
          <NavigationContainer>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <Header />
            <Main />
          </NavigationContainer>
        </NativeBaseProvider>
      </Provider>
    </Auth>
  );
}

export default App;
