import React, { useContext, useEffect, useState } from "react";

import { Link, useNavigate, useSearchParams, createSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faBars, faCreditCard, faPersonSwimming, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../AppContext";
import { useHasMaxWidth } from "@johnvaiosdimopoulos/software-engineering-project-spring-2022-team1";
import { MD_PXLIMIT } from "../utils/deviceConstants";
import { SignUpForm } from "./SignUpForm";
import { SignInForm } from "./SignInForm";
import { deleteJwt } from "../api/jwt";

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

function NavbarUserOption({
    isLink,
    url,
    callback,
    hoverColor,
    padding,
    children
}) {

    if (isLink) {
        return (
            <Link to={url} className="flex-1">
                <div
                    onClick={callback}
                    className={`w-full flex flex-row gap-2 items-center rounded-2xl px-4 ${hoverColor} duration-200 ${padding}`}
                >
                    {children}
                </div>
            </Link>
        )
    }
    return (
        <button
            className={`flex flex-row gap-2 items-center rounded-2xl px-4 ${hoverColor} duration-200 ${padding}`}
            onClick={callback}
        >
            {children}
        </button>
    )
}

function NavbarUserOptionsMenu({
    userInfo,
    showBalance,
    showIcons,
    closeMenu
}) {

    const context = useContext(AppContext)
    const navigate = useNavigate()

    const logOut = () => {
        deleteJwt()
        navigate("/")
        context.setState({
            ...context.state,
            userInfo: null
        })
    }

    return (
        <>
            <NavbarUserOption
                hoverColor="hover:bg-navbar-cyan"
                padding="py-2"
                isLink={true}
                url="/profile"
                callback={closeMenu}
            >
                <span className="font-medium text-lg">{context.state.userInfo.username}</span>
                {showIcons && <FontAwesomeIcon icon={faUser} size="lg"/>}
            </NavbarUserOption>
            {
                showBalance ?
                <NavbarUserOption
                    hoverColor="hover:bg-navbar-cyan"
                    padding="py-2"
                    isLink={true}
                    url="/profile/wallet"
                    callback={closeMenu}
                >
                    <span className="w-max">Υπόλοιπο Πόντων:</span>
                    <span className="text-lg font-medium">{userInfo.balance}</span>
                    {showIcons && <FontAwesomeIcon icon={faCreditCard} size="lg"/>}
                </NavbarUserOption>
                :
                null
            }
            <NavbarUserOption
                hoverColor="hover:bg-navbar-cyan"
                padding="py-2"
                isLink={true}
                url="/profile/upcoming"
                callback={closeMenu}
            >
                <span>Οι Δραστηριότητές μου</span>
                {showIcons && <FontAwesomeIcon icon={faPersonSwimming} size="lg"/>}
            </NavbarUserOption>
            <NavbarUserOption
                hoverColor="hover:bg-navbar-cyan"
                padding="py-2"
                isLink={false}
                callback={logOut}
            >
                <span className="font-light">Αποσύνδεση</span>
                <FontAwesomeIcon icon={faArrowRightFromBracket} size="lg"/>
            </NavbarUserOption>
        </>
    )
}

export function Navbar() {

    const context = useContext(AppContext)
    const navigate = useNavigate()
    const [params,] = useSearchParams()

    const [textSearchValue, setTextSearchValue] = useState('')
    const [showOptionsMenu, setShowOptionsMenu] = useState(false)

    const mdDevice = useHasMaxWidth(MD_PXLIMIT)

    useEffect(() => {
        if (!context.state.userInfo) {
            setShowOptionsMenu(false)
        }
    }, [mdDevice, context.state.userInfo])

    const triggerTextSearch = (e) => {
        e.preventDefault()
        //navigate(`/searchActivity?text=${textSearchValue}&categories=${encodeURIComponent( params.get('categories') ?? '')}`, )
        navigate({
            pathname: '/searchActivity',
            search: createSearchParams({
                text: textSearchValue,
                categories: params.get('categories') ?? ''
            }).toString()
        })
    }

    const openSignUpModal = () => {
        context.setState({
            ...context.state,
            showModal: true,
            modalProps: {
                content: <SignUpForm/>,
                bgColor: 'bg-cyan',
                scroll: true
            }
        })
    }

    const openSignInModal = () => {
        context.setState({
            ...context.state,
            showModal: true,
            modalProps: {
                content: <SignInForm/>,
                bgColor: 'bg-cyan',
                scroll: true
            }
        })
    }

    return (
        <nav className='w-full bg-navbar-cyan flex flex-col justify-center items-center h-max'>
            <div className='w-full py-3 flex justify-between gap-4 px-3' style={{ maxWidth: "60rem", minWidth: "20rem"}}>
                <div className="flex-1 flex flex-row justify-start gap-5">
                    <Link to="/" className="font-bold text-2xl">Logo</Link>
                    <form method="GET" className="bg-white rounded-3xl pl-3 flex-1 flex flex-row gap-3 items-center" onSubmit={triggerTextSearch}>
                        <input
                            value={textSearchValue}
                            onChange={e => setTextSearchValue(e.target.value)}
                            type="text"
                            className="focus:outline-none placeholder:italic flex-1"
                            placeholder="Αναζητήστε μια δραστηριότητα..."
                        />
                        <button type="submit" className="hover:bg-light-cyan rounded-full px-3 py-1">
                            <FontAwesomeIcon icon={faSearch} color="gray"/>                        
                        </button>
                    </form>
                </div>
                {
                    mdDevice ?
                    <button onClick={() => setShowOptionsMenu(!showOptionsMenu)} className="rounded-full px-2 hover:bg-navbar-dark-cyan/80">
                        <FontAwesomeIcon icon={faBars} className="duration-200" size="lg" rotation={showOptionsMenu ? 90 : 0}/>
                    </button>
                    :
                    (
                        context.state.userInfo ?
                        <div className="flex flex-row items-center">
                            <NavbarUserOption hoverColor="hover:bg-navbar-dark-cyan"isLink={true} url="/profile/wallet">
                                <FontAwesomeIcon icon={faCreditCard} size="lg"/>
                                <span className="w-max text-sm">Υπόλοιπο Πόντων:</span>
                                <span className="text-lg font-medium">{context.state.userInfo.balance}</span>
                            </NavbarUserOption>
                            <button onClick={() => setShowOptionsMenu(!showOptionsMenu)} className="rounded-full h-full px-3 hover:bg-navbar-dark-cyan/80">
                                <FontAwesomeIcon icon={faUser} className="duration-200" size="lg"/>
                            </button>
                        </div>
                        :
                        <div className="flex flex-row gap-2 items-center">
                            <a href="/" className="font-light hover:underline">Συνεργάτης</a>
                            <NavbarButton bgColor="bg-white hover:bg-light-cyan" title="ΕΓΓΡΑΦΗ" callback={openSignUpModal} />
                            <NavbarButton bgColor="bg-white hover:bg-light-cyan" title="ΣΥΝΔΕΣΗ" callback={openSignInModal} />
                        </div>
                    )
                }
            </div>
            <div
                className="bg-navbar-light-cyan w-full flex flex-col items-center justify-center py-3 font-light"
                style={showOptionsMenu ? {} : {display: 'none'}}
            >
            {
                context.state.userInfo ? (
                    mdDevice ?
                    <NavbarUserOptionsMenu
                        userInfo={context.state.userInfo}
                        showBalance={true}
                        showIcons={true}
                        closeMenu={() => setShowOptionsMenu(false)}
                    />
                    :
                    <NavbarUserOptionsMenu
                        userInfo={context.state.userInfo}
                        showBalance={false}
                        showIcons={false}
                        closeMenu={() => setShowOptionsMenu(false)}
                    />
                ) : (
                    <>
                        <a href="/" className="font-light hover:underline pb-2">Για Συνεργάτες</a>
                        <div className="flex flex-row gap-2 items-center pt-2 w-5/12 justify-center">
                            <NavbarButton bgColor="bg-white hover:bg-light-cyan" title="ΕΓΓΡΑΦΗ" callback={openSignUpModal} />
                            <NavbarButton bgColor="bg-white hover:bg-light-cyan" title="ΣΥΝΔΕΣΗ" callback={openSignInModal} />
                        </div>
                    </>
                )
            }
            </div>
        </nav>
    )
}
