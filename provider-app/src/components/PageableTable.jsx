import React, { useEffect } from "react";
import { useTable, usePagination } from 'react-table'
import { SpinnerCircular } from 'spinners-react';

export function PaginatedTable({
    columns,
    data,
    fetchData,
    totalPages,
    renderRow,
    renderHeaderGroup,
    initialPage,
    initialPageSize,
    availablePageSizes,
    loading
}) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize }
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: initialPage, pageSize: initialPageSize },
            manualPagination: true,
            pageCount: totalPages,
        },
        usePagination
    );

    useEffect(() => {
        fetchData(pageIndex, pageSize)
    }, [pageIndex, pageSize])

    return (
        <div className="relative">
            <div className="flex flex-col">
                <table {...getTableProps()}>
                    <thead>
                        {
                            headerGroups.map(headerGroup => (
                                renderHeaderGroup(headerGroup)
                            ))
                        }
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {
                            page.map(row => {
                                prepareRow(row)
                                return renderRow(row)
                            })
                        }
                    </tbody>
                </table>
                
                <div>
                    Showing {page.length} of ~{totalPages * pageSize}{' '}
                    results
                </div>

                <div className="pagination">
                    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                    </button>{' '}
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                    </button>{' '}
                    <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                    </button>{' '}
                    <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                    </button>{' '}
                    <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                    </span>
                    <span>
                    | Go to page:{' '}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0
                        gotoPage(page)
                        }}
                        style={{ width: '100px' }}
                    />
                    </span>{' '}
                    <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                    >
                    {availablePageSizes.map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                    </select>
                </div>
            </div>
            {
                (loading | totalPages === -1) ?
                <div className="absolute top-0 right-0 w-full h-full flex justify-center items-center bg-white/75">
                    <SpinnerCircular thickness={150} color="#D1E8E8" secondaryColor="rgba(0,0,0,0.15)"/>
                </div>
                :
                null
            }
        </div>
    )
}
