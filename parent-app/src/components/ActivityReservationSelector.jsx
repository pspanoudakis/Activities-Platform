import React, { useState } from "react";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';

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

    function dateHasSlot({date}) {
        return slots.some(slot => date.getDay() === slot.day)
    }

    function addReservation(date) {
        for (const slot of slots) {
            if (date.getDay() == slot.day) {
                updateReservations([
                    ...reservations,
                    {
                        slot: slot.id,
                        date: date,
                        quantity: quantity
                    }
                ])
                break
            }
        }
    }

    return (
        <div className="flex flex-col gap-2 justify-center items-center p-3">
            <DatePicker
                value={selectedDate}
                clearIcon={null}
                minDate={startDate}
                maxDate={endDate}
                onChange={setSelectedDate}
                tileDisabled={dateHasSlot}
                view="month"
            />
        </div>
    )
}
