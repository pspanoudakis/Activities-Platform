import React from "react";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import { SignInForm } from "./SignInForm";

export function NeedSignIn() {
    
    const context = useContext(AppContext)

    return (
        <div className="w-full flex flex-col justify-center items-center gap-3 py-6">
            <span className="text-center text-3xl font-light">Για να συνεχίσετε, πρέπει να συνδεθείτε.</span>
            <button
                className="bg-cyan hover:bg-navbar-cyan rounded-xl py-2 px-4"
                onClick={() => {
                    context.setState({
                        ...context.state,
                        showModal: true,
                        modalProps: {
                            content: <SignInForm/>,
                            scroll: false,
                            bgColor: 'bg-cyan'
                        }
                    })
                }}
            >
                Σύνδεση
            </button>
        </div>
    )
}
