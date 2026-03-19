// import * as React from 'react';
//
// /** components */
// import { Table, TableBody, TableHead, TableHeader, TableRow } from '@module-base/components/table';
//
// import {
//     type ColumnDef,
//     flexRender,
//     getCoreRowModel,
//     getSortedRowModel,
//     type OnChangeFn,
//     type Row,
//     type SortingState,
//     useReactTable,
// } from '@tanstack/react-table';
// import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
// import { useVirtualizer } from '@tanstack/react-virtual';
//
// import { fetchData, type Person, type PersonApiResponse } from './makeData';
// import { cn } from '@module-base/utils/shadcn';
//
// const fetchSize = 50;
//
// interface VirtualTableProps {
//     className?: string;
//     data: Person[];
// }
//
// export default function VirtualTable(props: VirtualTableProps) {
//     const { className } = props;
//
//     //we need a reference to the scrolling element for logic down below
//     const tableContainerRef = React.useRef<HTMLDivElement>(null);
//
//     const [sorting, setSorting] = React.useState<SortingState>([]);
//
//     const columns = React.useMemo<ColumnDef<Person>[]>(
//         () => [
//             {
//                 accessorKey: 'id',
//                 header: 'ID',
//                 size: 60,
//             },
//             {
//                 accessorKey: 'firstName',
//                 cell: (info) => info.getValue(),
//             },
//             {
//                 accessorFn: (row) => row.lastName,
//                 id: 'lastName',
//                 cell: (info) => info.getValue(),
//                 header: () => <span>Last Name</span>,
//             },
//             {
//                 accessorKey: 'age',
//                 header: () => 'Age',
//                 size: 50,
//             },
//             {
//                 accessorKey: 'visits',
//                 header: () => <span>Visits</span>,
//                 size: 50,
//             },
//             {
//                 accessorKey: 'status',
//                 header: 'Status',
//             },
//             {
//                 accessorKey: 'progress',
//                 header: 'Profile Progress',
//                 size: 80,
//             },
//             {
//                 accessorKey: 'createdAt',
//                 header: 'Created At',
//                 cell: (info) => info.getValue<Date>().toLocaleString(),
//                 size: 200,
//             },
//         ],
//         []
//     );
//
//     //react-query has a useInfiniteQuery hook that is perfect for this use case
//     const { data, fetchNextPage, isFetching, isLoading } = useInfiniteQuery<PersonApiResponse>({
//         queryKey: [
//             'people',
//             sorting, //refetch when sorting changes
//         ],
//         queryFn: async ({ pageParam = 0 }) => {
//             const start = (pageParam as number) * fetchSize;
//             const fetchedData = await fetchData(start, fetchSize, sorting); //pretend api call
//             return fetchedData;
//         },
//         initialPageParam: 0,
//         getNextPageParam: (_lastGroup, groups) => groups.length,
//         refetchOnWindowFocus: false,
//         placeholderData: keepPreviousData,
//     });
//
//     //flatten the array of arrays from the useInfiniteQuery hook
//     const flatData = React.useMemo(() => data?.pages?.flatMap((page) => page.data) ?? [], [data]);
//     const totalDBRowCount = data?.pages?.[0]?.meta?.totalRowCount ?? 0;
//     const totalFetched = flatData.length;
//
//     //called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
//     const fetchMoreOnBottomReached = React.useCallback(
//         (containerRefElement?: HTMLDivElement | null) => {
//             if (containerRefElement) {
//                 const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
//                 //once the user has scrolled within 500px of the bottom of the table, fetch more data if we can
//                 if (scrollHeight - scrollTop - clientHeight < 500 && !isFetching && totalFetched < totalDBRowCount) {
//                     fetchNextPage();
//                 }
//             }
//         },
//         [fetchNextPage, isFetching, totalFetched, totalDBRowCount]
//     );
//
//     //a check on mount and after a fetch to see if the table is already scrolled to the bottom and immediately needs to fetch more data
//     React.useEffect(() => {
//         fetchMoreOnBottomReached(tableContainerRef.current);
//     }, [fetchMoreOnBottomReached]);
//
//     const table = useReactTable({
//         data: flatData,
//         columns,
//         state: {
//             sorting,
//         },
//         getCoreRowModel: getCoreRowModel(),
//         getSortedRowModel: getSortedRowModel(),
//         manualSorting: true,
//         debugTable: true,
//     });
//
//     //scroll to top of table when sorting changes
//     const handleSortingChange: OnChangeFn<SortingState> = (updater) => {
//         setSorting(updater);
//         if (table.getRowModel().rows.length) {
//             rowVirtualizer.scrollToIndex?.(0);
//         }
//     };
//
//     //since this table option is derived from table row model state, we're using the table.setOptions utility
//     table.setOptions((prev) => ({
//         ...prev,
//         onSortingChange: handleSortingChange,
//     }));
//
//     const { rows } = table.getRowModel();
//
//     const rowVirtualizer = useVirtualizer({
//         count: rows.length,
//         estimateSize: () => 40, //estimate row height for accurate scrollbar dragging
//         getScrollElement: () => tableContainerRef.current,
//         //measure dynamic row height, except in firefox because it measures table border height incorrectly
//         measureElement:
//             typeof window !== 'undefined' && navigator.userAgent.indexOf('Firefox') === -1
//                 ? (element) => element?.getBoundingClientRect().height
//                 : undefined,
//         overscan: 5,
//     });
//
//     if (isLoading) {
//         return <>Loading...</>;
//     }
//
//     return (
//         <Table
//             className={cn('relative overflow-auto rounded-sm border', className)}
//             onScroll={(e) => fetchMoreOnBottomReached(e.currentTarget)}
//             ref={tableContainerRef}
//         >
//             <TableHeader className={cn('sticky top-0 z-10')}>
//                 {table.getHeaderGroups().map((headerGroup) => (
//                     <TableRow key={headerGroup.id}>
//                         {headerGroup.headers.map((header) => {
//                             return (
//                                 <TableHead
//                                     key={header.id}
//                                     style={{
//                                         width: header.getSize(),
//                                     }}
//                                 >
//                                     <div
//                                         className={cn({ 'cursor-pointer select-none': header.column.getCanSort() })}
//                                         onClick={header.column.getToggleSortingHandler}
//                                     >
//                                         {flexRender(header.column.columnDef.header, header.getContext())}
//                                         {{
//                                             asc: ' 🔼',
//                                             desc: ' 🔽',
//                                         }[header.column.getIsSorted() as string] ?? null}
//                                     </div>
//                                 </TableHead>
//                             );
//                         })}
//                     </TableRow>
//                 ))}
//             </TableHeader>
//
//             <TableBody
//                 className={cn('relative')}
//                 style={{
//                     height: `${rowVirtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
//                     position: 'relative', //needed for absolute positioning of rows
//                 }}
//             >
//                 {rowVirtualizer.getVirtualItems().map((virtualRow) => {
//                     const row = rows[virtualRow.index] as Row<Person>;
//                     return (
//                         <tr
//                             data-index={virtualRow.index} //needed for dynamic row height measurement
//                             ref={(node) => rowVirtualizer.measureElement(node)} //measure dynamic row height
//                             key={row.id}
//                             style={{
//                                 display: 'flex',
//                                 position: 'absolute',
//                                 transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
//                                 width: '100%',
//                             }}
//                         >
//                             {row.getVisibleCells().map((cell) => {
//                                 return (
//                                     <td
//                                         key={cell.id}
//                                         style={{
//                                             display: 'flex',
//                                             width: cell.column.getSize(),
//                                         }}
//                                     >
//                                         {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                                     </td>
//                                 );
//                             })}
//                         </tr>
//                     );
//                 })}
//             </TableBody>
//         </Table>
//     );
// }
