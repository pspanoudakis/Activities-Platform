import React, { useEffect } from "react";
import { useTable, usePagination } from 'react-table'
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoadingIndicator } from "./LoadingIndicator";
import { useHasMaxWidth } from "./useHasMaxWidth";

function PageSizeSelector({
    pageSize,
    availablePageSizes,
    setPageSize
}) {
    return (
        <select
            value={pageSize}
            onChange={e => {
                setPageSize(Number(e.target.value))
            }}
            >
            {availablePageSizes.map(pageSize => (
                <option key={pageSize} value={pageSize}>
                    Εμφάνιση {pageSize}
                </option>
            ))}
        </select>
    )
}

export function PageSelector({
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    currentPage,
    totalPages
}) {
    return (
        <div className="pagination-options">
            <div className="flex flex-row gap-1 justify-center">
                {
                    canPreviousPage ?
                    <>
                        <button className="bg-light-cyan hover:bg-dark-cyan" onClick={() => gotoPage(0)}>
                            1
                        </button>
                        <button className="bg-light-cyan hover:bg-dark-cyan" onClick={() => previousPage()}>
                            <FontAwesomeIcon icon={faChevronLeft} size="xs"/>
                        </button>
                    </>
                    :
                    <>
                        <button className="bg-gray-200" disabled={true}>
                            1
                        </button>
                        <button className="bg-gray-200" disabled={true}>
                        <FontAwesomeIcon icon={faChevronLeft} size="xs"/>
                        </button>
                    </>
                }
                <button className="font-bold bg-dark-cyan" disabled={true}>
                    {currentPage + 1}
                </button>
                {
                    canNextPage ?
                    <>
                        <button className="bg-light-cyan hover:bg-dark-cyan" onClick={() => nextPage()}>
                            <FontAwesomeIcon icon={faChevronRight} size="xs"/>
                        </button>
                        <button className="bg-light-cyan hover:bg-dark-cyan" onClick={() => gotoPage(totalPages - 1)}>
                            {totalPages}
                        </button>
                    </>
                    :
                    <>
                        <button className="bg-gray-200" disabled={true}>
                            <FontAwesomeIcon icon={faChevronRight} size="xs"/>
                        </button>
                        <button className="bg-gray-200" disabled={true}>
                            {totalPages}
                        </button>
                    </>
                }
            </div>
            {/* <span>
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
            </span>{' '} */}
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
    loading,
    doublePageSelector
}) {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
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

    const likelyOverflow = useHasMaxWidth(800)

    useEffect(() => {
        fetchData(pageIndex, pageSize)
    }, [pageIndex, pageSize])

    const pageSelector = (
        <PageSelector
            canPreviousPage={canPreviousPage}
            canNextPage={canNextPage}
            gotoPage={gotoPage}
            previousPage={previousPage}
            nextPage={nextPage}
            currentPage={pageIndex}
            totalPages={totalPages}
        />
    )

    return (
        <div className="relative w-full">
            {
                (totalPages === -1) ?
                <LoadingIndicator stretchParent={false}/>
                :
                <>
                <div className="flex items-center flex-col w-full gap-3">
                    <div className="flex md:w-9/12 md:gap-0 w-11/12 gap-3 flex-col items-end">
                        <PageSizeSelector
                            availablePageSizes={availablePageSizes}
                            pageSize={pageSize}
                            setPageSize={setPageSize}
                        />
                        <div className="w-full flex justify-center">
                            {doublePageSelector ? pageSelector : null}
                        </div>
                    </div>
                    <div className={`flex ${likelyOverflow ? 'justify-start' : 'justify-center'} rounded-3xl overflow-x-auto whitespace-nowrap w-full`}
                        style={{
                            width: 'min(65rem, 70vw)'
                        }}
                    >
                        <table {...getTableProps()}
                            style={{
                                width: 'max(50rem, 55vw)'
                            }}
                        >
                            { renderHeaders(headerGroups[0]) }
                            <tbody {...getTableBodyProps()} className='w-full'>
                                {
                                    page.map((row, i) => {
                                        prepareRow(row)
                                        return renderRow(row, i)
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    {/* <div>
                        Showing {page.length} of ~{totalPages * pageSize}{' '}
                        results
                    </div> */}

                    {pageSelector}
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
