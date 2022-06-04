import React, { useState } from "react";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import Media from "react-media";

function NavbarButton({
    title,
    bgColor,
    callback
}) {
    return (
        <button onClick={callback} className={`rounded-full py-1 px-3 ${bgColor} font-light text-sm tracking-widest`}>
            {title}
        </button>
    )
}

export function Navbar() {

    const [showOptionsMenu, setShowOptionsMenu] = useState(false)

    return (
        <nav className='w-full bg-navbar-cyan flex flex-col justify-center items-center h-max'>
            <div className='w-full py-3 flex justify-between gap-4 px-3' style={{ maxWidth: "60rem", minWidth: "20rem"}}>
                <div className="flex-1 flex flex-row justify-start gap-5">
                    <Link to="/" className="font-bold text-2xl">Logo</Link>
                    <form method="GET" className="bg-white rounded-3xl pl-3 flex-1 flex flex-row gap-3 items-center max-w-xl">
                        <input type="text" className="focus:outline-none placeholder:italic flex-1" placeholder="Αναζητήστε μια δραστηριότητα..."/>
                        <button type="submit" className="hover:bg-light-cyan duration-200 rounded-full px-3 py-1">
                            <FontAwesomeIcon icon={faSearch} color="gray"/>                        
                        </button>
                    </form>
                </div>
                <Media queries={{ small: { maxWidth: 800 } }}>
                    {matches =>
                        matches.small ? (
                            <button onClick={() => setShowOptionsMenu(!showOptionsMenu)} className="rounded-full px-2 duration-200 hover:bg-xdark-cyan/80">
                                <FontAwesomeIcon icon={faBars} className="duration-200" size="lg" rotation={showOptionsMenu ? 90 : 0}/>
                            </button>
                        ) : (
                            <div className="flex flex-row gap-2 items-center">
                                <a href="/" className="font-light hover:underline">Συνεργάτης</a>
                                <NavbarButton bgColor="bg-light-cyan" title="ΕΓΓΡΑΦΗ" callback={() => console.log('sign up')} />
                                <NavbarButton bgColor="bg-white" title="ΣΥΝΔΕΣΗ" callback={() => console.log('sign in')} />
                            </div>
                        )
                    }
                </Media>
                
            </div>
            <div
                className="bg-dark-cyan w-full flex flex-col items-center justify-center py-3 divide-gray-400 divide-y px-16"
                style={showOptionsMenu ? {} : {display: 'none'}}
            >
                <a href="/" className="font-light hover:underline pb-2">Για Συνεργάτες</a>
                <div className="flex flex-row gap-2 items-center pt-2 w-full justify-center">
                    <NavbarButton bgColor="bg-light-cyan" title="ΕΓΓΡΑΦΗ" callback={() => console.log('sign up')} />
                    <NavbarButton bgColor="bg-white" title="ΣΥΝΔΕΣΗ" callback={() => console.log('sign in')} />
                </div>
            </div>
        </nav>
    )
}
