// import dependencies
import React, { useRef, useContext, useState } from "react";
import { LogBox, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { NativeBaseProvider, Toast } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import UserContext from "./Context/UserContext";

// import navigatiors
import Init from "./Navigators/Init";

// import context API
import Auth from "./Context/store/Auth";

// import redux
import store from "./Redux/store";

LogBox.ignoreAllLogs(true);
function App() {
  const toastRef = useRef();

  const [user, setUser] = useState(null);

  React.useEffect(() => {
    if (toastRef.current) {
      Toast.setRef(toastRef.current);
    }
  }, [toastRef]);

  return (
    <Auth>
      <Provider store={store}>
        <NativeBaseProvider>
          <UserContext.Provider value={{user: user, setUser: setUser}}>
            <NavigationContainer>
              <StatusBar backgroundColor="#515760" barStyle="dark-content" />
              {/* <Main /> */}
              <Init />
            </NavigationContainer>
          </UserContext.Provider>
        </NativeBaseProvider>
      </Provider>
    </Auth>
  );
}

export default App;
