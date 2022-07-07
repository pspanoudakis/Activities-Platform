import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { PaginatedTable } from '../shared/PaginatedTable';

function ActivityHeaders(headerGroup) {
    return (
        <thead>            
            <tr {...headerGroup.getHeaderGroupProps()}>
                <th className='bg-cyan rounded-tl-3xl p-1'>
                    Όνομα
                </th>
                <th className='bg-cyan rounded-tr-3xl p-1'>
                    Πάροχος
                </th>
            </tr>
        </thead>
    )
}

function ActivityRow({
    row
}) {

    const navigate = useNavigate()

    return (
        <tr
            className='result-table-row hover:bg-light-cyan duration-200'
            style={{cursor: 'pointer'}}
            onClick={() => navigate(`/pendingActivities/${row.original.activity_id}`)}
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
        </tr>
    )
}

export function ActivityResultsTable(
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
            accessor: 'providerName'
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
            renderRow={(row, key) => <ActivityRow row={row} key={key}/>}
            renderHeaders={ActivityHeaders}
            availablePageSizes={[8, 12, 24]}
            loading={loading}
            doublePageSelector={true}
        />
      )
}
