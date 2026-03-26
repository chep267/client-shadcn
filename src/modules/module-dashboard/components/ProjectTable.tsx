import dayjs from 'dayjs';
import { TableBase } from '@module-base/components/table-base';
import { StatusBadge } from '@module-dashboard/components/StatusBadge';
import { ActionMenu } from '@module-dashboard/components/ActionMenu';
import type { TaskData } from '@module-dashboard/services/project';
import { User } from '@module-dashboard/components/User';

interface ProjectTableProps {
    data: TaskData[];
    onDelete?: (item: TaskData) => void;
}

export function ProjectTable(props: ProjectTableProps) {
    const { data, onDelete } = props;

    return (
        <TableBase
            className="scrollbar-thin scrollbar-custom flex flex-1 overflow-hidden"
            items={data}
            columns={[
                { dataKey: 'id', label: 'ID', sortable: true },
                { dataKey: 'title', label: 'Task', sortable: true },
                {
                    dataKey: 'assignee',
                    label: 'Assignee',
                    render: ({ item }) => <User name={item.assignee.name} avatar={item.assignee.avatar} />,
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
