import React,{ useContext} from "react";
import { userContext } from "./ContextProvider";


const ProtectedRoute = () => {

    const {role} = useContext(userContext)
}