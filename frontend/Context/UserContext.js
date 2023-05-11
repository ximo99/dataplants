import { useContext, createContext } from "react";

const UserContext = createContext({ user: null, setUser: null, refresh: false, setRefresh: null });

export default UserContext;