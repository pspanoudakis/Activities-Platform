import React, { useContext, useMemo } from 'react'
import { AppContext } from '../AppContext';
import { PaginatedTable } from './PageableTable';


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

function ActivityRow(row, navigate) {

    return (
        <tr
            className='result-table-row hover:bg-light-cyan duration-200'
            style={{cursor: 'pointer'}}
            onClick={() => navigate(`/pendingActivities/${row.original.id}`)}
            {...row.getRowProps()}>
            <td>
                <div className='font-medium'>
                    {row.original.name}
                </div>
            </td>
            <td>
                <div>
                    {row.original.providerName}
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

    const context = useContext(AppContext)

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
            renderRow={(row) => ActivityRow(row, context.state.navigate)}
            renderHeaders={ActivityHeaders}
            availablePageSizes={[8, 12, 24]}
            loading={loading}
            doublePageSelector={true}
        />
      )
}
