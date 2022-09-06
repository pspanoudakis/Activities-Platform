import React, { useContext, useEffect, useState } from "react";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addPoints, fetchUserCards, updateUserCard } from "../api/profileAPI";
import { AppContext } from "../AppContext";
import { CardInfoModifier } from "../components/CardInfoModifier";
import { NeedSignIn } from "../components/NeedSignIn";
import { PointsPurchaseSelector } from "../components/PointsPurchaseSelector";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import { ModalResultMessage } from "../shared/ModalResultMessage";
import { SectionTitle } from "../shared/SectionTitle";
import { ModalVerifyPrompt } from "../shared/ModalVerifyPrompt";

export function WalletPage() {

    const context = useContext(AppContext)

    const [loading, setLoading] = useState(true)
    const [cardInfo, setCardInfo] = useState(null)

    useEffect(() => {
        if (context.state.userInfo) {
            fetchUserCards((response) => {
                if (response.ok) {
                    console.log(response.data)
                    if (response.data.length > 0) {
                        setCardInfo(response.data[0])
                    }
                    setLoading(false)
                }
                else {
                    console.log('Failed to fetch Bank Cards');
                }
            })
        }
    }, [context])

    function makePurchase(amount) {
        setLoading(true)
        addPoints(amount, (response) => {
            if (response.ok) {
                context.setState({
                    ...context.state,
                    userInfo: {
                        ...context.state.userInfo,
                        balance: response.data
                    },
                    showModal: true,
                    modalProps: {
                        bgColor: 'bg-white',
                        canScroll: false,
                        content: <ModalResultMessage success={true} text="Η αγορά πραγματοποιήθηκε επιτυχώς."/>
                    }
                })
            }
            else {
                context.setState({
                    ...context.state,
                    showModal: true,
                    modalProps: {
                        bgColor: 'bg-white',
                        canScroll: false,
                        content: <ModalResultMessage success={false} text="Η αγορά δεν μπόρεσε να πραγματοποιηθεί. Προσπαθήστε Ξανά."/>
                    }
                })
            }
            setLoading(false)
        })
    }

    function openPurchasePrompt(purchaseAmount) {
        context.setState({
            ...context.state,
            showModal: true,
            modalProps: {
                bgColor: 'bg-white',
                canScroll: false,
                content: <ModalVerifyPrompt
                            text="Είστε βέβαιοι οτι θέλετε να πραγματοποιήσετε την επιλεγμένη αγορά?"
                            onVerify={() => makePurchase(purchaseAmount)}
                        />
            }
        })
    }

    function updateCardInfo({
        cardNumber,
        cvv,
        expirationDate,
        ownerName
    }) {
        setLoading(true)
        updateUserCard({
                cardNumber,
                cvv,
                expirationDate,
                ownerName
            },
            cardInfo ? cardInfo.id : null,
            (response) => {

                if (response.ok) {
                    setCardInfo({
                        cardNumber,
                        cvv,
                        expirationDate,
                        ownerName,
                        id: cardInfo ? cardInfo.id : response.data.id
                    })
                    context.setState({
                        ...context.state,
                        showModal: true,
                        modalProps: {
                            bgColor: 'bg-white',
                            canScroll: false,
                            content: <ModalResultMessage success={true} text="Τα στοιχεία της κάρτας σας ενημερώθηκαν επιτυχώς."/>
                        }
                    })
                }
                else {
                    context.setState({
                        ...context.state,
                        showModal: true,
                        modalProps: {
                            bgColor: 'bg-white',
                            canScroll: false,
                            content: <ModalResultMessage success={false} text="Τα στοιχεία της κάρτας σας δεν μπόρεσαν να ενημερωθούν. Προσπαθήστε Ξανά."/>
                        }
                    })
                }

                setLoading(false)
            }
        )
    }

    return (
        context.state.userInfo ?
        <div className="w-full flex flex-col px-4">
        {
            loading ?
            <LoadingIndicator/>
            :
            <>
                <div className="flex flex-col gap-5 items-center py-7 border-b-navbar-dark-cyan border-b-2">
                    <SectionTitle>
                        Υπόλοιπο Πόντων
                    </SectionTitle>
                    <div className="flex flex-row gap-8 items-center">
                        <FontAwesomeIcon icon={faCreditCard} size="5x"/>
                        <span className="text-4xl font-semibold">{context.state.userInfo.balance}</span>
                    </div>
                </div>
                <PointsPurchaseSelector onPurchase={openPurchasePrompt}/>
                <CardInfoModifier cardInfo={cardInfo} updateCardInfo={updateCardInfo}/>
            </>
        }
        </div>
        :
        <NeedSignIn/>
    )
}
