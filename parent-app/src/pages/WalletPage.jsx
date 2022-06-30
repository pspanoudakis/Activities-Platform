import React, { useContext, useEffect, useState } from "react";
import { fetchUserCards, updateUserCard } from "../api/profileAPI";
import { AppContext } from "../AppContext";
import { CardInfoModifier } from "../components/CardInfoModifier";
import { NeedSignIn } from "../components/NeedSignIn";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import { ModalResultMessage } from "../shared/ModalResultMessage";

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

    function updateCardInfo({
        cardNumber,
        cvv,
        expirationDate,
        ownerName
    }) {
        setLoading(true)
        updateUserCard({
                cardNumber,
                ccv: cvv,
                expirationDate,
                ownerName
            },
            cardInfo ? cardInfo.id : null,
            (response) => {

                if (response.ok) {

                    // Backend MUST return new card info (response.data)
                    setCardInfo({
                        cardNumber,
                        ccv: cvv,
                        expirationDate,
                        ownerName,
                        id: cardInfo.id
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
        <div className="w-full flex flex-col px-4 py-3">
        {
            loading ?
            <LoadingIndicator/>
            :
            <>
                <CardInfoModifier cardInfo={cardInfo} updateCardInfo={updateCardInfo}/>
            </>
        }
        </div>
        :
        <NeedSignIn/>
    )
}
