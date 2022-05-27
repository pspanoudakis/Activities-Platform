import React from "react";
import { ContentTile } from "../components/ContentTile";

export function PlatformStats() {
    return (
        <div className="pt-6 flex flex-col items-center gap-7">
            <span className="font-light text-4xl">Στατιστικά Πλατφόρμας</span>
            <div className="grid grid-flow-row grid-cols-2 grid-rows-4 gap-4 text-xl font-light">
                <ContentTile dimensions="row-span-2 col-span-1" bgColor="bg-cyan">
                    <div className="flex flex-col h-full gap-2 justify-center items-center text-2xl p-8">
                        <span className="text-center">Εγγεγραμμένοι Γονείς</span>
                        <span className="text-center">1124</span>
                    </div>
                </ContentTile>
                <ContentTile dimensions="row-span-2 col-span-1" bgColor="bg-cyan">
                    <div className="flex flex-col h-full gap-2 justify-center items-center text-2xl p-8">
                        <span className="text-center">Εγγεγραμμένοι Πάροχοι</span>
                        <span className="text-center">321</span>
                    </div>
                </ContentTile>
                <ContentTile dimensions="" bgColor="bg-white" padding="p-8">
                    <div className="flex flex-col h-full gap-2 justify-center items-center">
                        <span className="text-center">Συνολικές Κρατήσεις</span>
                        <span className="text-center">520</span>
                    </div>
                </ContentTile>
                <ContentTile dimensions="" bgColor="bg-white" padding="p-8">
                    <div className="flex flex-col h-full gap-2 justify-center items-center">
                        <span className="text-center">Καταχωρημένες Δραστηριότητες</span>
                        <span className="text-center">404</span>
                    </div>
                </ContentTile>
                <ContentTile dimensions="" bgColor="bg-white" padding="p-8">
                    <div className="flex flex-col h-full gap-2 justify-center items-center">
                        <span className="text-center">Καταχωρημένες Εγκαταστάσεις</span>
                        <span className="text-center">316</span>
                    </div>
                </ContentTile>
                <ContentTile dimensions="" bgColor="bg-white" padding="p-8">
                    <div className="flex flex-col h-full gap-2 justify-center items-center">
                        <span className="text-center">Δραστηριότητες σε Εκκρεμότητα</span>
                        <span className="text-center">68</span>
                    </div>
                </ContentTile>
            </div>
        </div>
    )
}
