import React, { useState } from "react";
import DatePicker from 'react-date-picker';
import { dateText, dateTimeText, DAY_NAMES, equalDates } from "../dates";

function ActionButton({
    text,
    onClick,
    disabled
}) {
    return (
        <button
            className="text-sm rounded-xl bg-navbar-cyan hover:bg-navbar-dark-cyan h-max py-1 px-3 disabled:bg-dark-cyan disabled:text-gray-500"
            disabled={disabled}
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export function ActivityReservationSelector({
    activityInfo: {
        startDate,
        endDate,
        slots,
    },    
    reservations,
    updateReservations,
    quantity,
    setQuantity
}) {
    const [selectedDate, setSelectedDate] = useState(null)
    const [slotsAtDate, setSlotsAtDate] = useState([])
    const [selectedSlot, setSelectedSlot] = useState(null)

    function dateHasSlot(date) {
        return slots.some(slot => dateText(date) === dateText(slot.date))
    }

    function getDateSlots(date) {
        return slots.filter(s => equalDates(s.date, date))
    }

    const setSelectedDateIfValid = (date) => {
        const slots = getDateSlots(date)
        if (slots.length > 0) {
            setSelectedDate(date)
            setSlotsAtDate(slots)
            setSelectedSlot(slots[0])
        }
    }
    
    function updateSlot(timeText) {
        for (const slot of slotsAtDate) {
            if (timeText === dateTimeText(slot.date)) {
                setSelectedSlot(slot)
                break;
            }
        }
    }

    function addReservation() {
        updateReservations([
            ...reservations,
            {
                slot: selectedSlot,
                quantity: quantity
            }
        ])
    }

    return (
        <div className="reservation-wrapper flex h-full flex-col gap-2 justify-start items-start">
            <style>
            {`
                .react-date-picker__wrapper {
                    background-color: white;
                }

                .react-calendar__tile:disabled {
                    background-color: white;
                    color: #cacaca;
                }
                
                .react-date-picker__calendar {
                    width: 20rem;
                }
            `}
            </style>
            <div className="flex flex-row gap-3">
                <div className="flex flex-col gap-1">
                    <span className="font-semibold">Επιλέξτε Ημερομηνία:</span>
                    <DatePicker
                        value={selectedDate}
                        clearIcon={null}
                        minDate={startDate}
                        maxDate={endDate}
                        onChange={setSelectedDateIfValid}
                        tileDisabled={({date}) => !dateHasSlot(date)}
                        view="month"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <span className="font-semibold">Επιλέξτε Ώρα:</span>
                    <select
                        className="outline-none border border-gray-400 h-full"
                        value={selectedSlot ? dateTimeText(selectedSlot.date) : ''}
                        onChange={(e) => updateSlot(e.target.value)}
                    >
                    {
                        slotsAtDate.map((s, i) => 
                            <option key={i}>{dateTimeText(s.date)}</option>    
                        )
                    }
                    </select>
                </div>
                <div className="flex items-end">
                    <ActionButton
                        disabled={selectedSlot === null}
                        onClick={addReservation}
                        text="Προσθήκη"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                Επιλεγμένες Ημερομηνίες:
            {
                reservations.map((r, i) => 
                    <div key={i}>{`${DAY_NAMES[r.slot.date.getDay()]} ${dateText(r.slot.date)}, ${dateTimeText(r.slot.date)} #${r.quantity}`}</div>    
                )
            }
            </div>
        </div>
    )
}
