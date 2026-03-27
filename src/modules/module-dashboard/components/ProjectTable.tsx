/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import dayjs from 'dayjs';

/** components */
import { VirtualTable } from '@module-base/components/vitual-table';
import { StatusBadge } from '@module-dashboard/components/StatusBadge';
import { ActionMenu } from '@module-dashboard/components/ActionMenu';
import { Assignee } from '@module-dashboard/components/Assignee';

/** types */
import type { TaskData } from '@module-dashboard/services/project';

interface ProjectTableProps {
    data: TaskData[];
    onDelete?: (item: TaskData) => void;
}

export function ProjectTable(props: ProjectTableProps) {
    const { data, onDelete } = props;

    return (
        <VirtualTable
            className="scrollbar-thin scrollbar-custom flex flex-1"
            hasCheckbox
            dataKeyForCheckbox="id"
            items={data}
            columns={[
                { dataKey: 'id', label: 'ID', sortable: true },
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
    );
}
