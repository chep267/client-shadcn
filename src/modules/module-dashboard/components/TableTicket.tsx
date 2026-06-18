/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import dayjs from 'dayjs';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** hooks */
import { useGetTickets } from '@module-dashboard/hooks/useGetTickets';

/** components */
import { SelectBase } from '@module-base/components/select-base';
import { InputSearch } from '@module-base/components/input-search';
import { VirtualTable } from '@module-base/components/virtual-table';
import { StatusBadge } from '@module-dashboard/components/StatusBadge';
import { ActionMenu } from '@module-dashboard/components/ActionMenu';
import { Assignee } from '@module-dashboard/components/Assignee';
import { SelectTicketStatus } from '@module-dashboard/components/SelectTicketStatus';

type TypeFilterItem = NonNullable<
    App.ModuleBase.Component.BigdataStoreData<App.ModuleDashboard.Data.TypeTicketData>['filters']
>[number];

export function TableTicket() {
    const [searchValue, setSearchValue] = React.useState('');
    const [filters, setFilters] = React.useState<TypeFilterItem[]>([]);
    const { isPending, data } = useGetTickets();

    const handleFilter = (
        dataKey: App.ModuleBase.Component.BigdataKey<App.ModuleDashboard.Data.TypeTicketData>,
        value: string,
        item?: App.ModuleBase.Component.SelectBaseItem
    ) => {
        setFilters((prevFilters) => {
            const next = prevFilters.filter((filter) => filter.dataKey !== dataKey);
            if (value === 'null') return next;
            return [...next, { dataKey, value, fnFilter: item?.fnFilter as TypeFilterItem['fnFilter'] }];
        });
    };

    const filterYears = React.useMemo(() => {
        return Array.from({ length: 10 })
            .map((_, index) => '202' + index)
            .map((value) => {
                return {
                    label: value,
                    value,
                    fnFilter: (item: App.ModuleDashboard.Data.TypeTicketData) => {
                        return (
                            dayjs(item.createdAt).format('DD/MM/YYYY').includes(value) ||
                            dayjs(item.deadline).format('DD/MM/YYYY').includes(value)
                        );
                    },
                } as App.ModuleBase.Component.SelectBaseItem;
            });
    }, []);

    const columns = React.useMemo<App.ModuleBase.Component.TableColumn<App.ModuleDashboard.Data.TypeTicketData>[]>(
        () => [
            {
                dataKey: 'id',
                label: 'ID',
                sortable: true,
                render: ({ item }) => <span>Ticket {item.id}</span>,
            },
            {
                dataKey: 'description',
                label: 'Ticket',
                sortable: true,
                className: 'w-50 max-w-50 min-w-50 whitespace-pre-line',
            },
            {
                dataKey: 'assignee.name',
                label: 'Assignee',
                sortable: true,
                render: ({ item }) => <Assignee name={item.assignee.name} avatar={item.assignee.avatar} />,
            },
            {
                dataKey: 'status',
                label: 'Status',
                sortable: true,
                render: ({ item }) => <StatusBadge status={item.status} />,
            },
            {
                dataKey: 'createdAt',
                label: 'Start time',
                sortable: true,
                render: ({ item }) => dayjs(item.createdAt).format('DD/MM/YYYY'),
            },
            {
                dataKey: 'deadline',
                label: 'Deadline',
                sortable: true,
                render: ({ item }) => dayjs(item.deadline).format('DD/MM/YYYY'),
            },
            {
                dataKey: 'action',
                label: 'Action',
                render: ({ item }) => <ActionMenu item={item} />,
            },
        ],
        []
    );

    return (
        <div className={cn('flex flex-1 flex-col', 'tablet:pt-10 gap-4 p-4', 'rounded-md border')}>
            <div className={cn('flex w-full flex-col gap-2', 'tablet:flex-row tablet:items-center')}>
                <InputSearch value={searchValue} className="tablet:max-w-sm col-span-4" onSearch={setSearchValue} />
                <div className="flex w-full flex-row gap-2">
                    <SelectTicketStatus
                        className="tablet:max-w-40 tablet:min-w-25 w-full"
                        placeholder="Filter by status"
                        hasClear
                        value={filters.find((filter) => filter.dataKey === 'status')?.value ?? ''}
                        onChange={(value, item) => handleFilter('status', value, item)}
                    />
                    <SelectBase
                        className="tablet:max-w-40 tablet:min-w-25 w-full"
                        placeholder="Filter by year"
                        hasClear
                        value={filters.find((filter) => filter.dataKey === 'createdAt')?.value ?? ''}
                        items={filterYears}
                        onChange={(value, item) => handleFilter('createdAt', value, item)}
                    />
                </div>
            </div>

            <VirtualTable
                className="scrollbar-custom flex scrollbar-thin"
                setup={{
                    loading: isPending,
                    hasCheckbox: true,
                    dataKeyForCheckbox: 'id',
                    searchKey: searchValue,
                    filters,
                }}
                items={data?.items}
                columns={columns}
            />
        </div>
    );
}
