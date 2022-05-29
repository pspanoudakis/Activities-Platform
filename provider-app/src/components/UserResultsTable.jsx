import React, { useMemo } from 'react'
import { PaginatedTable } from './PageableTable';


function renderUserHeaders(headerGroup) {
    return (
        <thead>            
            <tr {...headerGroup.getHeaderGroupProps()}>
                <th className='bg-cyan rounded-tl-3xl p-1'>
                    Όνομα Χρήστη
                </th>
                <th className='bg-cyan p-1'>
                    Ρόλος
                </th>
                <th className='bg-cyan rounded-tr-3xl p-1'>
                    Κατάσταση
                </th>
            </tr>
        </thead>
    )
}

function renderUserRow(row) {

    const roleText = {
        'parent': <div>Γονέας</div>,
        'provider': <div>Πάροχος</div>,
        'admin': <div className='text-blue-700 font-semibold'>Διαχειριστής</div>
    }

    const isLockedText = {
        false: <div className='text-green-700 font-semibold'>Ενεργός</div>,
        true: <div className='text-red-700 font-semibold'>Ανεσταλμένος</div>
    }

    return (
        <tr className='result-table-row hover:bg-light-cyan duration-200' style={{cursor: 'pointer'}} onClick={() => console.log(row)} {...row.getRowProps()}>
            <td>
                <div className='font-medium'>
                    {row.original.username}
                </div>
            </td>
            <td className=''>{roleText[row.original.role]}</td>
            <td>{isLockedText[row.original.isLocked]}</td>
        </tr>
    )
}

export function UserResultsTable(
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
            accessor: 'username'
        },
        {
            Header: 'Ρόλος',
            accessor: 'role'
        },
        {
            Header: 'Κατάσταση',
            accessor: 'isLocked'
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
            renderRow={renderUserRow}
            renderHeaders={renderUserHeaders}
            availablePageSizes={[8, 12, 24]}
            loading={loading}
        />
      )
}
