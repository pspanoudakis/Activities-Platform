import React, { useContext } from "react";
import { AppContext } from "../AppContext";
import { NeedSignIn } from "../components/NeedSignIn";

export function ProfilePage() {
    
    const context = useContext(AppContext)

    return (
        context.state.userInfo ?
        <div></div>
        :
        <NeedSignIn/>
    )    
}
