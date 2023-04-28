// import dependencies
import React, { useRef } from "react";
import { LogBox, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { NativeBaseProvider, Toast } from "native-base";
import { NavigationContainer } from "@react-navigation/native";

// import navigatiors
import Init from './Navigators/Init'

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
            <StatusBar backgroundColor="#515760" barStyle="dark-content" />
            {/* <Main /> */}
            <Init />
          </NavigationContainer>
        </NativeBaseProvider>
      </Provider>
    </Auth>
  );
}

export default App;
