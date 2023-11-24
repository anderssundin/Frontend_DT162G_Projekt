import React, { useState, createContext } from "react";

const initialUserState = {
    name: "",
    email:"",
    startWeight: 0,
    goalWeight: 0,
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