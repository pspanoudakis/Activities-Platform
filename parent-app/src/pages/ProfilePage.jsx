import React, { useContext, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { updateUser } from "../api/profileAPI";
import { AppContext } from "../AppContext";
//import { SingleMarkerMap } from "@johnvaiosdimopoulos/software-engineering-project-spring-2022-team1";
import { SingleMarkerMap } from "../shared/Maps";
import { NeedSignIn } from "../components/NeedSignIn";
import { FormInputField } from "../shared/FormUtils";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import { ModalResultMessage } from "../shared/ModalResultMessage";
import { SectionTitle } from "../shared/SectionTitle";
import { defaultHomePosition, PLACEHOLDER_USER_IMG } from "@johnvaiosdimopoulos/software-engineering-project-spring-2022-team1";
//import { GoogleUtils } from "@johnvaiosdimopoulos/software-engineering-project-spring-2022-team1";
import { GoogleUtils } from "../shared/GoogleUtils";

export function ProfilePage() {

    const context = useContext(AppContext)

    const [loading, setLoading] = useState(false)

    const [currentName, setCurrentName] = useState(context.state.userInfo.name ?? '')
    const [currentSurname, setCurrentSurname] = useState(context.state.userInfo.surname ?? '')
    const [currentEmail, setCurrentEmail] = useState(context.state.userInfo.email ?? '')
    const [currentAddress, setCurrentAddress] = useState(context.state.userInfo.address ?? '')
    const [currentHomePosition, setCurrentHomePosition] = useState(
        context.state.userInfo && context.state.userInfo.latitude && context.state.userInfo.longitude ? {
            lat: context.state.userInfo.latitude,
            lng: context.state.userInfo.longitude
        }
        :
        defaultHomePosition
    )

    const canSaveChanges = useMemo(() => {
        return (
            (currentName !== (context.state.userInfo.name ?? '')) ||
            (currentSurname !== (context.state.userInfo.surname ?? '')) ||
            (currentEmail !== (context.state.userInfo.email ?? '')) ||
            (currentAddress !== (context.state.userInfo.address ?? '')) ||
            (!(context.state.userInfo.latitude && context.state.userInfo.longitude) && currentAddress !== '') ||
            (context.state.userInfo.latitude && (context.state.userInfo.latitude !== currentHomePosition.lat)) ||
            (context.state.userInfo.longitude && (context.state.userInfo.longitude !== currentHomePosition.lng))
        )
    }, [currentName, currentSurname, currentEmail, currentAddress, currentHomePosition, context.state.userInfo])

    function resetValues() {
        setCurrentName(context.state.userInfo.name ?? '')
        setCurrentSurname(context.state.userInfo.surname ?? '')
        setCurrentEmail(context.state.userInfo.email ?? '')
        setCurrentAddress(context.state.userInfo.address ?? '')
        setCurrentHomePosition(
            context.state.userInfo && context.state.userInfo.latitude && context.state.userInfo.longitude ? {
                lat: context.state.userInfo.latitude,
                lng: context.state.userInfo.longitude
            }
            :
            defaultHomePosition
        )
    }

    function homePositionSelected(pos) {
        setCurrentHomePosition(pos)        
        GoogleUtils.coordinatesToAddressAsync(pos.lat, pos.lng).then(newAddress => setCurrentAddress(newAddress))
    }

    function saveChanges() {
        setLoading(true)
        console.log(context.state.userInfo);
        updateUser({
                ...context.state.userInfo,
                name: currentName ? currentName : null,
                surname: currentSurname ? currentSurname : null,
                email: currentEmail ? currentEmail : null,
                address: currentAddress ? currentAddress : null,
                latitude: context.state.userInfo.latitude ? currentHomePosition.lat : (currentAddress !== '' ? currentHomePosition.lat : null),
                longitude: context.state.userInfo.longitude ? currentHomePosition.lng : (currentAddress !== '' ? currentHomePosition.lng : null)
            },
            (response) => {
                context.setState({
                    ...context.state,
                    userInfo: response.ok ? {
                        ...context.state.userInfo,
                        name: response.data.name,
                        surname: response.data.surname,
                        email: response.data.email,
                        address: response.data.address,
                        latitude: response.data.latitude,
                        longitude: response.data.longitude,
                    } : context.state.userInfo,
                    showModal: true,
                    modalProps: {
                        scroll: false,
                        bgColor: 'bg-white',
                        content: <ModalResultMessage
                                    success={response.ok}
                                    text={`${response.ok ? 'Τα στοιχεία σας ενημερώθηκαν επιτυχώς.' : 'Αδυναμία ενημέρωσης στοιχείων. Προσπαθήστε ξανά.'}`}
                                />
                    }
                })
                setLoading(false)
            }
        )
    }

    return (
        context.state.userInfo ?
        <div className="pt-4 w-full flex flex-col gap-3 justify-center items-center">
            <SectionTitle>
                Το Προφίλ μου
            </SectionTitle>
            <div
                className="flex flex-row flex-wrap justify-evenly gap-8 w-full rounded-xl p-8 items-start relative"
                style={{
                    minHeight: '15rem'
                }}
            >
                <div className="flex flex-col gap-3 items-center">
                    <div
                        className="rounded-full border-4 border-navbar-cyan"
                        style={{
                            width: `${/* mdDevice ? '8rem' :  */'10rem'}`,
                            height: `${/* mdDevice ? '8rem' :  */'10rem'}`,
                            backgroundImage: `url('${context.state.userInfo.image ?? PLACEHOLDER_USER_IMG}')`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover'
                        }}
                    />
                    <Link to="/profile/upcoming" className="w-full text-center rounded-2xl py-1 px-4 text-white bg-navbar-cyan hover:bg-navbar-dark-cyan">
                        Οι Δραστηριότητές μου
                    </Link>
                    <Link to="/profile/wallet" className="w-full text-center rounded-2xl py-1 px-3 text-white bg-navbar-cyan hover:bg-navbar-dark-cyan">
                        Αγορά Πόντων
                    </Link>
                    <Link to="/profile/history" className="w-full text-center rounded-2xl py-1 px-3 text-white bg-navbar-cyan hover:bg-navbar-dark-cyan">
                        Ιστορικό Αγορών
                    </Link>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <div className="w-full flex flex-col gap-2">
                        <div className="w-full flex flex-row justify-between gap-3">
                            <div className="flex-1 flex flex-col gap-1">
                                <FormInputField
                                    classExtra="w-full border"
                                    labelFor="name"
                                    labelText="Όνομα"
                                    placeholder="Όνομα"
                                    value={currentName}
                                    setValue={setCurrentName}
                                />
                            </div>
                            <div className="flex-1 flex flex-col gap-1">
                                <FormInputField
                                    classExtra="w-full border"
                                    labelFor="surname"
                                    labelText="Επίθετο"
                                    placeholder="Επίθετο"
                                    value={currentSurname}
                                    setValue={setCurrentSurname}
                                />
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-1">
                            <FormInputField
                                classExtra="w-full border"
                                labelFor="email"
                                labelText="Email"
                                placeholder="Διεύθυνση Email"
                                value={currentEmail}
                                setValue={setCurrentEmail}
                            />
                        </div>
                        <div className="w-full flex flex-col gap-1">
                            <FormInputField
                                classExtra="w-full border"
                                labelFor="address"
                                labelText="Διεύθυνση"
                                placeholder="Επιλέξτε μια διεύθυνση..."
                                value={currentAddress}
                                setValue={setCurrentAddress}
                            />
                            <span className="italic text-sm">Μπορείτε να εισάγετε την διεύθυνσή σας, αν δεν εμφανίζεται σωστά.</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span>Επιλέξτε στο χάρτη:</span>
                        <SingleMarkerMap
                            position={currentHomePosition}
                            style={{width: 'min(30rem,70vw)', height: '20rem'}}
                            onClick={homePositionSelected}
                            notifyOnClick={true}
                            hideMarker={currentAddress === ''}
                            initialZoom={10}
                        />
                    </div>
                    <div className="flex flex-row w-full flex-wrap justify-between">
                        <button
                            disabled={!canSaveChanges}
                            className="
                                w-max text-center rounded-xl
                                py-2 px-5
                                text-red-800 bg-white hover:bg-red-800 hover:text-white
                                disabled:bg-gray-200 disabled:hover:bg-gray-200 disabled:text-gray-500
                                border
                                border-red-800
                            "
                            onClick={resetValues}
                        >
                            Επαναφορά Στοιχείων
                        </button>
                        <button
                            disabled={!canSaveChanges}
                            className="w-max text-center rounded-xl py-2 px-5 text-white bg-navbar-cyan hover:bg-navbar-dark-cyan disabled:bg-dark-cyan disabled:hover:bg-dark-cyan"
                            onClick={saveChanges}
                        >
                            Αποθήκευση Στοιχείων
                        </button>
                    </div>
                    {
                        loading ?
                        <LoadingIndicator stretchParent={true} text="Ενημερώνουμε τα στοιχεία σας..." customColor="bg-xlight-cyan/80 rounded-xl"/>
                        :
                        null
                    }
                </div>
            </div>
        </div>
        :
        <NeedSignIn/>
    )    
}
