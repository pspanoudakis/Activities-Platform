import React, { useEffect } from "react";
import { useTable, usePagination } from 'react-table'
import { SpinnerCircular } from 'spinners-react';

function LoadingIndicator({ stretchParent }) {
    return (
        <div
            className={ stretchParent ?
                "absolute top-0 right-0 w-full h-full flex justify-center items-center flex-col gap-3 bg-white/80"
                :
                "flex justify-center items-center flex-col gap-3 p-4"
            }
        >
            <SpinnerCircular thickness={195} color="#D1E8E8" secondaryColor="rgba(0,0,0,0.15)"/>
            Φόρτωση...
        </div>
    )
}

function PaginationOptions({
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    currentPage,
    totalPages,
    pageSize,
    availablePageSizes,
    setPageSize
}) {
    return (
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
            <button onClick={() => gotoPage(totalPages - 1)} disabled={!canNextPage}>
            {'>>'}
            </button>{' '}
            <span>
            Page{' '}
            <strong>
                {currentPage + 1} of {totalPages}
            </strong>{' '}
            </span>
            <span>
            | Go to page:{' '}
            <input
                type="number"
                defaultValue={currentPage + 1}
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
    )
}

export function PaginatedTable({
    columns,
    data,
    fetchData,
    totalPages,
    renderRow,
    renderHeaders,
    initialPage,
    initialPageSize,
    availablePageSizes,
    loading
}) {

    console.log('remounting')

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        //pageOptions,
        //pageCount,
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
        <div className="relative w-full">
            {
                (totalPages === -1) ?
                <LoadingIndicator stretchParent={false}/>
                :
                <>
                <div className="flex items-center flex-col w-full">
                    <table {...getTableProps()} className='md:w-9/12 sm:w-11/12'>
                        { renderHeaders(headerGroups[0]) }
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

                    <PaginationOptions
                        canPreviousPage={canPreviousPage}
                        canNextPage={canNextPage}
                        gotoPage={gotoPage}
                        previousPage={previousPage}
                        nextPage={nextPage}
                        currentPage={pageIndex}
                        totalPages={totalPages}
                        pageSize={pageSize}
                        availablePageSizes={availablePageSizes}
                        setPageSize={setPageSize}
                    />
                </div>
                {
                    loading ?
                    <LoadingIndicator stretchParent={true}/>
                    :
                    null
                }
                </>
            }
        </div>
    )
}
