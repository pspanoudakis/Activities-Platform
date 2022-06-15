import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { submitActivityReview } from "../api/fetchAPI";
import { AppContext } from "../AppContext";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import { ModalResultMessage } from "../shared/ModalResultMessage";

function RateStarButton({
    clickCallback,
    isActive,
    id
}) {
    return (
        <button onClick={() => clickCallback(id)}>
            <FontAwesomeIcon
                icon={faStar}
                className={
                    isActive ? 'text-yellow-500' : 'text-yellow-500/50 hover:text-yellow-500'
                }
            />
        </button>
    )
}

function RateSelector({
    callback,
    currentRate
}) {

    return (
        <div className="w-full flex flex-row gap-3 text-3xl justify-start items-center">
            <div className="flex flex-row gap-1">
                {
                    [...Array(5).keys()].map(i => 
                        <RateStarButton
                            key={i}
                            id={i}
                            clickCallback={callback}
                            isActive={i <= currentRate}
                        />
                    )
                }
            </div>
            <span className="text-lg">{currentRate >= 0 ? currentRate + 1 : ''} / 5</span>
        </div>
    )
}

export function ActivityRateSelector({
    activityId
}) {
    
    // get userInfo.username & close modal from here
    const context = useContext(AppContext)

    const [selectedRate, setSelectedRate] = useState(-1)
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)

    function submitReview() {
        //console.log(`User: ${context.state.userInfo.username}, Rate: ${selectedRate + 1}`)
        //console.log(`${text}`)
        setLoading(true)
        submitActivityReview(activityId, context.state.userInfo.username, selectedRate + 1, text, (response) => {
            context.setState({
                ...context.state,
                showModal: true,
                modalProps: {
                    content: <ModalResultMessage
                                success={response.ok}
                                text={response.ok ?
                                    'Η αξιολόγησή σας υποβλήθηκε επιτυχώς.'
                                    :
                                    'Kάτι πήγε στραβά με την υποβολή της αξιολόγησής σας. Δοκιμάστε ξανά.'
                                }
                            />
                }
            })
        })
    }

    return (
        <div className="flex flex-col gap-3 justify-center relative">
            <span className="text-lg font-semibold">Η Αξιολόγησή σας:</span>
            <RateSelector callback={setSelectedRate} currentRate={selectedRate}/>
            <textarea
                className="rounded-xl px-4 pt-2 text-sm border border-gray-500 outline-none mt-2"
                rows="5"
                style={{resize: 'none', minWidth: 'min(30rem, 80vw)'}}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Αφήστε τα σχόλιά σας (προαιρετικά)"
            />
            <div className="flex justify-end">
                <button
                    disabled={selectedRate < 0}
                    className="
                        font-semibold
                        bg-dark-cyan hover:bg-xdark-cyan disabled:bg-cyan disabled:text-gray-500
                        rounded-xl
                        px-4 py-2"
                    onClick={submitReview}>
                    Υποβολή Αξιολόγησης
                </button>
            </div>
            {
                loading ?
                <LoadingIndicator stretchParent={true} customColor='bg-white/70'/>
                :
                null
            }
        </div>
    )
}
