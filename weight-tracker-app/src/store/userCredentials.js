import React, { useState, createContext } from "react";

const initialUserState = {
    name: "",
    email:"",
    startWeight: "",
    goalWeight: "",
    isLoggedIn: false
}

export const Context = React.createContext();

const UserState = ({ children }) => {
   const [userState, setUserState] = useState(initialUserState);
    return ( 
        <Context.Provider value={[userState, setUserState]}>{children}</Context.Provider>
     );
}
 
export default UserState;