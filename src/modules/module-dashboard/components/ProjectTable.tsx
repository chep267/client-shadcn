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

/** components */
import { InputSearch } from '@module-base/components/input-search';
import { VirtualTable } from '@module-base/components/vitual-table';
import { StatusBadge } from '@module-dashboard/components/StatusBadge';
import { ActionMenu } from '@module-dashboard/components/ActionMenu';
import { Assignee } from '@module-dashboard/components/Assignee';
import { TableFilter } from '@module-dashboard/components/TableFilter';

/** types */
import type { TaskData } from '@module-dashboard/services/project';

interface ProjectTableProps {
    data: TaskData[];
    onDelete?: (item: TaskData) => void;
}

export function ProjectTable(props: ProjectTableProps) {
    const { data, onDelete } = props;
    const [searchValue, setSearchValue] = React.useState('');
    const [filters, setFilters] = React.useState<{ dataKey: string; value: string }[]>([]);

    const handleFilter = (dataKey: string, value: string) => {
        setFilters((prevFilters) => {
            const next = prevFilters.filter((filter) => filter.dataKey !== dataKey);
            if (value === 'null') return next;
            return [...next, { dataKey, value }];
        });
    };

    return (
        <div className={cn('flex flex-1 flex-col', 'gap-4 p-4 pt-10', 'rounded-md border')}>
            <div className={cn('flex flex-col gap-2', 'tablet:flex-row tablet:items-center')}>
                <InputSearch value={searchValue} className="tablet:max-w-sm col-span-4" onSearch={setSearchValue} />
                <div className="flex flex-row gap-2">
                    <TableFilter
                        className="tablet:max-w-40 tablet:min-w-25"
                        placeholder="Filter by status"
                        value={filters.find((filter) => filter.dataKey === 'status')?.value || ''}
                        items={[
                            { label: '--select--', value: 'null' },
                            { label: 'All', value: 'all' },
                            { label: 'Todo', value: 'todo' },
                            { label: 'In progress', value: 'in_progress' },
                            { label: 'Done', value: 'done' },
                            { label: 'Warning', value: 'warning' },
                            { label: 'Error', value: 'error' },
                        ]}
                        onChange={(value) => handleFilter('status', value)}
                    />
                </div>
            </div>

            <VirtualTable
                className="scrollbar-thin scrollbar-custom flex"
                initialSetup={{ hasCheckbox: true, dataKeyForCheckbox: 'id' }}
                initialValue={{
                    searchValue,
                    filters: filters.filter((filter) => filter.value !== 'all'),
                }}
                items={data}
                columns={[
                    {
                        dataKey: 'id',
                        label: 'ID',
                        sortable: true,
                        render: ({ item }) => <span>Task {item.id}</span>,
                    },
                    {
                        dataKey: 'title',
                        label: 'Task',
                        sortable: true,
                        className: 'width-[200px] max-w-[200px] min-w-[200px] whitespace-pre-line',
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
                        render: ({ item }) => <ActionMenu item={item} onDelete={onDelete} />,
                    },
                ]}
            />
        </div>
    );
}
