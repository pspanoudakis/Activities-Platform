import React from "react";
import { Link } from "react-router-dom";

export function NotFound() {

    return (
        <div className="w-full flex flex-col justify-center items-center gap-3 py-6">
            <span className="text-center text-3xl font-light">{`Η σελίδα δεν βρέθηκε :(`}</span>
            <Link
                to="/"
                className="bg-cyan hover:bg-navbar-cyan rounded-xl py-2 px-4"
            >
                Πίσω στην Αρχική
            </Link>
        </div>
    )
}
