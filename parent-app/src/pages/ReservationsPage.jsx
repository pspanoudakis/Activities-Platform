import React, { useContext, useEffect, useState } from "react";
import { fetchReservationHistory } from "../api/profileAPI";
import { AppContext } from "../AppContext";
import { NeedSignIn } from "../components/NeedSignIn";
import { ReservationResultsTable } from "../components/ReservationResultsTable";
import { SectionTitle } from "../shared/SectionTitle";

const defaultPaginationState = {
    currentPage: 0,
    pageSize: 8,
    totalPages: -1
}
export function ReservationsPage() {
    const context = useContext(AppContext)

    const [loading, setLoading] = useState(true)

    const [reservations, setReservations] =  useState([])
    const [paginationState, setPaginationState] = useState(defaultPaginationState)

    const updateResults = (newPage, newPageSize) => {
        setPaginationState({
            ...paginationState,
            currentPage: newPage,
            pageSize: newPageSize
        })
    }

    useEffect(() => {
        setLoading(true)
        fetchReservationHistory(paginationState.currentPage + 1, paginationState.pageSize, (response) => {
            if (response.ok) {
                console.log(response)
                setPaginationState({
                    ...paginationState,
                    totalPages: response.data.total_pages
                })
                setReservations(response.data.page)
                setLoading(false)
            }
        })
    }, [paginationState.currentPage, paginationState.pageSize])

    return (
        context.state.userInfo ?
        <div
            className="w-full flex flex-col items-center gap-3 py-5"
        >
            <SectionTitle>
                Ιστορικό Κρατήσεων
            </SectionTitle>
            <ReservationResultsTable
                currentPage={paginationState.currentPage}
                loading={loading}
                pageSize={paginationState.pageSize}
                results={reservations}
                totalPages={paginationState.totalPages}
                updateResults={updateResults}
            />
        </div>
        :
        <NeedSignIn/>
    )   
}
