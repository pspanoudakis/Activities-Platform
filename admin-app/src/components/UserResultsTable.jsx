import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { PaginatedTable } from '../shared/PaginatedTable';

function UserHeaders(headerGroup) {
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

function UserRow({
    row
}) {

    const navigate = useNavigate()

    const roleText = {
        'ROLE_PARENT': <div>Γονέας</div>,
        'ROLE_SELLER': <div>Πάροχος</div>,
        'ROLE_ADMIN': <div className='text-blue-700 font-semibold'>Διαχειριστής</div>
    }

    const statusText = {
        'active': <div className='text-green-700 font-semibold'>Ενεργός</div>,
        'blocked': <div className='text-red-700 font-semibold'>Ανεσταλμένος</div>
    }

    return (
        <tr
            className='result-table-row hover:bg-light-cyan duration-200'
            style={{cursor: 'pointer'}}
            onClick={() => navigate(`/users/${row.original.username}`)}
            {...row.getRowProps()}
        >
            <td>
                <div className='font-medium'>
                    {row.original.username}
                </div>
            </td>
            <td className=''>
                {roleText[row.original.role]}
            </td>
            <td>
                {statusText[row.original.status]}
            </td>
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
            accessor: 'status'
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
            renderRow={(row, key) => <UserRow row={row} key={key}/>}
            renderHeaders={UserHeaders}
            availablePageSizes={[8, 12, 24]}
            loading={loading}
            doublePageSelector={true}
        />
      )
}
