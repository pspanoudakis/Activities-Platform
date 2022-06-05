import React, { useContext, useState } from "react";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faBars, faCreditCard, faRunning, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import Media from "react-media";
import { AppContext } from "../AppContext";
import { NavbarUserOption } from "./NavbarUserOption";

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

function NavbarUserOptionsMenu({
    userInfo,
    showBalance,
    showIcons
}) {
    return (
        <>
            <NavbarUserOption hoverColor="hover:bg-navbar-cyan" padding="py-2" url="/">
                <span>Το Προφίλ μου</span>
                {showIcons && <FontAwesomeIcon icon={faUser} size="lg"/>}
            </NavbarUserOption>
            {
                showBalance ?
                <NavbarUserOption hoverColor="hover:bg-navbar-cyan" padding="py-2" url="/">
                    <span className="w-max">Υπόλοιπο Πόντων:</span>
                    <span className="text-lg font-medium">{userInfo.balance}</span>
                    {showIcons && <FontAwesomeIcon icon={faCreditCard} size="lg"/>}
                </NavbarUserOption>
                :
                null
            }
            <NavbarUserOption hoverColor="hover:bg-navbar-cyan" padding="py-2" url="/">
                <span>Οι Δραστηριότητές μου</span>
                {showIcons && <FontAwesomeIcon icon={faRunning} size="lg"/>}
            </NavbarUserOption>
            <NavbarUserOption hoverColor="hover:bg-navbar-cyan" padding="py-2" url="/">
                <span>Αποσύνδεση</span>
                <FontAwesomeIcon icon={faArrowRightFromBracket} size="lg"/>
            </NavbarUserOption>
        </>
    )
}

const SMALL_DEVICE_PXLIMIT = 800

export function Navbar() {

    const context = useContext(AppContext)

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
                <Media queries={{ small: { maxWidth: SMALL_DEVICE_PXLIMIT } }}>
                    {matches =>
                        matches.small ? (
                            <button onClick={() => setShowOptionsMenu(!showOptionsMenu)} className="rounded-full px-2 duration-200 hover:bg-navbar-dark-cyan/80">
                                <FontAwesomeIcon icon={faBars} className="duration-200" size="lg" rotation={showOptionsMenu ? 90 : 0}/>
                            </button>
                        ) : (
                            context.state.userInfo ?
                            <div className="flex flex-row items-center">
                                <NavbarUserOption hoverColor="hover:bg-navbar-dark-cyan" url="/">
                                    <FontAwesomeIcon icon={faCreditCard} size="lg"/>
                                    <span className="w-max">Υπόλοιπο Πόντων:</span>
                                    <span className="text-lg font-medium">{context.state.userInfo.balance}</span>
                                </NavbarUserOption>
                                <button onClick={() => setShowOptionsMenu(!showOptionsMenu)} className="rounded-full px-3 duration-200 hover:bg-navbar-dark-cyan/80">
                                    <FontAwesomeIcon icon={faUser} className="duration-200" size="lg"/>
                                </button>
                            </div>
                            :
                            <div className="flex flex-row gap-2 items-center">
                                <a href="/" className="font-light hover:underline">Συνεργάτης</a>
                                <NavbarButton bgColor="bg-white hover:bg-light-cyan duration-200" title="ΕΓΓΡΑΦΗ" callback={() => console.log('sign up')} />
                                <NavbarButton bgColor="bg-white hover:bg-light-cyan duration-200" title="ΣΥΝΔΕΣΗ" callback={() => console.log('sign in')} />
                            </div>
                        )
                    }
                </Media>
                
            </div>
            <div
                className="bg-navbar-light-cyan w-full flex flex-col items-center justify-center py-3 font-light"
                style={showOptionsMenu ? {} : {display: 'none'}}
            >
            {
                context.state.userInfo ?
                <Media queries={{ small: { maxWidth: SMALL_DEVICE_PXLIMIT } }}>
                    {matches =>
                        matches.small ? (
                            <NavbarUserOptionsMenu
                                userInfo={context.state.userInfo}
                                showBalance={true}
                                showIcons={true}
                            />
                        ) : (        
                            <NavbarUserOptionsMenu
                                userInfo={context.state.userInfo}
                                showBalance={false}
                                showIcons={false}
                            />
                        )
                    }
                </Media>
                :
                <>
                    <a href="/" className="font-light hover:underline pb-2">Για Συνεργάτες</a>
                    <div className="flex flex-row gap-2 items-center pt-2 w-5/12 justify-center">
                        <NavbarButton bgColor="bg-white hover:bg-light-cyan duration-200" title="ΕΓΓΡΑΦΗ" callback={() => console.log('sign up')} />
                        <NavbarButton bgColor="bg-white hover:bg-light-cyan duration-200" title="ΣΥΝΔΕΣΗ" callback={() => console.log('sign in')} />
                    </div>
                </>
            }
            </div>
        </nav>
    )
}
