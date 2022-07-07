import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom';
import { PaginatedTable } from '../shared/PaginatedTable';
import { roundRating } from "../utils/ratings"

function ReservationHeaders(headerGroup) {
    return (
        <thead>            
            <tr {...headerGroup.getHeaderGroupProps()}>
                <th className='bg-cyan rounded-tl-3xl py-1 px-2'>
                    Όνομα
                </th>
                <th className='bg-cyan py-1 px-2'>
                    Πάροχος
                </th>
                <th className='bg-cyan py-1 px-2'>
                    Ημ. Κράτησης
                </th>
                <th className='bg-cyan py-1 px-2'>
                    Αρ. Θέσεων
                </th>
                <th className='bg-cyan py-1 px-2'>
                    Αξιολόγηση
                </th>
                <th className='bg-cyan rounded-tr-3xl py-1 px-2'>
                    Ποσό
                </th>
            </tr>
        </thead>
    )
}

function ReservationRow({row}) {

    const navigate = useNavigate()

    return (
        <tr
            className='result-table-row hover:bg-light-cyan duration-200 cursor-pointer'
            onClick={() => navigate(`/activities/${row.original.activity_id}`)}
            {...row.getRowProps()}
        >
            <td>
                <div className='font-medium'>
                    {row.original.name}
                </div>
            </td>
            <td>
                <div>
                    {row.original.sellerName}
                </div>
            </td>
            <td>
                <div>
                    {row.original.reservationDate}
                </div>
            </td>
            <td>
                <div>
                    {row.original.number}
                </div>
            </td>
            <td>
                <div>
                    {roundRating(row.original.rating)}
                </div>
            </td>
            <td>
                <div>
                    {row.original.cost}
                </div>
            </td>
        </tr>
    )
}

export function ReservationResultsTable(
    {
        results,
        updateResults,
        pageSize,
        totalPages,
        currentPage,
        loading
    }
) {

    const columns = useMemo(() => [
        {
            Header: 'Όνομα',
            accessor: 'name'
        },
        {
            Header: 'Πάροχος',
            accessor: 'sellerName'
        },
        {
            Header: 'Ημ. Κράτησης',
            accessor: 'reservationDate'
        },
        {
            Header: 'Αρ. Θέσεων',
            accessor: 'number'
        },
        {
            Header: 'Αξιολόγηση',
            accessor: 'rating'
        },
        {
            Header: 'Ποσό',
            accessor: 'cost'
        }
    ], [])

    return (
        <PaginatedTable
            columns={columns}
            data={results}
            fetchData={updateResults}
            initialPageSize={pageSize}
            totalPages={totalPages}
            initialPage={currentPage}
            renderRow={(row, key) => <ReservationRow row={row} key={key}/>}
            renderHeaders={ReservationHeaders}
            availablePageSizes={[8, 12, 24]}
            loading={loading}
            doublePageSelector={true}
        />
      )
}
