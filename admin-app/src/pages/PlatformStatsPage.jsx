import React, { useEffect, useState } from "react";
import { fetchPlatformStats } from "../api";
import { ContentTile } from "../components/ContentTile";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import { PageTitle } from "../components/PageTitle";

export function PlatformStatsPage() {

    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState(null)

    useEffect(() => {
        fetchPlatformStats((response) => {
            setStats(response)
            setLoading(false)
        })
    }, [])

    return (
        <div className="pt-6 flex flex-col items-center gap-7">
            <PageTitle>Στατιστικά Πλατφόρμας</PageTitle>
            {
                loading ?
                <LoadingIndicator stretchParent={false}/>
                :
                <div className="grid grid-flow-row md:grid-cols-2 md:grid-rows-4 sm:grid-cols-1 sm:grid-rows-8 gap-4 text-xl font-light">
                    <ContentTile dimensions="row-span-2 col-span-1" bgColor="bg-cyan">
                        <div className="flex flex-col h-full gap-2 justify-center items-center text-2xl p-8">
                            <span className="text-center">Εγγεγραμμένοι Γονείς</span>
                            <span className="text-center">{stats.parents}</span>
                        </div>
                    </ContentTile>
                    <ContentTile dimensions="row-span-2 col-span-1" bgColor="bg-cyan">
                        <div className="flex flex-col h-full gap-2 justify-center items-center text-2xl p-8">
                            <span className="text-center">Εγγεγραμμένοι Πάροχοι</span>
                            <span className="text-center">{stats.providers}</span>
                        </div>
                    </ContentTile>
                    <ContentTile bgColor="bg-white" padding="p-8">
                        <div className="flex flex-col h-full gap-2 justify-center items-center">
                            <span className="text-center">Συνολικές Κρατήσεις</span>
                            <span className="text-center">{stats.bookings}</span>
                        </div>
                    </ContentTile>
                    <ContentTile bgColor="bg-white" padding="p-8">
                        <div className="flex flex-col h-full gap-2 justify-center items-center">
                            <span className="text-center">Καταχωρημένες Δραστηριότητες</span>
                            <span className="text-center">{stats.activities}</span>
                        </div>
                    </ContentTile>
                    <ContentTile bgColor="bg-white" padding="p-8">
                        <div className="flex flex-col h-full gap-2 justify-center items-center">
                            <span className="text-center">Καταχωρημένες Εγκαταστάσεις</span>
                            <span className="text-center">{stats.facilities}</span>
                        </div>
                    </ContentTile>
                    <ContentTile bgColor="bg-white" padding="p-8">
                        <div className="flex flex-col h-full gap-2 justify-center items-center">
                            <span className="text-center">Δραστηριότητες σε Εκκρεμότητα</span>
                            <span className="text-center">{stats.pendingActivities}</span>
                        </div>
                    </ContentTile>
                </div>
            }
        </div>
    )
}
