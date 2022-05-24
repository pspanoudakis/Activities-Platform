import React, { useMemo } from 'react'
import { PaginatedTable } from './PageableTable';


function renderHeader(headerGroup) {
    return (
        <tr {...headerGroup.getHeaderGroupProps()}>
            {
                headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>
                        {column.render('Header')}
                    </th>
                ))
            }
        </tr>
    )
}

function renderRow(row) {
    return (
        <tr style={{cursor: 'pointer'}} onClick={() => console.log(row)} {...row.getRowProps()}>
            {
                row.cells.map(cell =>
                    <td {...cell.getCellProps()}>
                        {cell.render('Cell')}
                    </td>
                )
            }
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
    ])

    return (
        <PaginatedTable
            columns={columns}
            data={results}
            fetchData={updateResults}
            initialPageSize={pageSize}
            totalPages={totalPages}
            initialPage={currentPage}
            renderRow={renderRow}
            renderHeaderGroup={renderHeader}
            availablePageSizes={[4, 8, 12]}
            loading={loading}
        />
      )
}
