import { useContext, createContext } from "react";

const UserContext = createContext({ user: null, setUser: null });

export default UserContext;
