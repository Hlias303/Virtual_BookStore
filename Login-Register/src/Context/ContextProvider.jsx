import { createContext, useContext, useState } from "react";
import React from "react";

export const userContext = createContext();

export const ContextProvider = ({children}) => {
    const [role,SetRole] = useState(null);
    
    return(
        <userContext.Provider value = {{role,SetRole}}>
            {children}
        </userContext.Provider>
    );
};

// export const useAuth = () => useContext(userContext);

