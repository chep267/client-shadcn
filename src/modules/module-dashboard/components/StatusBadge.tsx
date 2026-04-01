type BadgeProps = {
    status: 'todo' | 'in_progress' | 'done' | 'warning' | 'error';
};

export function StatusBadge({ status }: BadgeProps) {
    const statusStyles: Record<BadgeProps['status'], string> = {
        todo: 'bg-gray-600 text-gray-50',
        in_progress: 'bg-blue-600 text-blue-50',
        done: 'bg-green-600 text-green-50',
        warning: 'bg-amber-600 text-amber-50',
        error: 'bg-red-600 text-red-50',
    };

    const title = status.replace('_', ' ');

    return <span className={`rounded-md px-2 py-1 text-xs ${statusStyles[status]} capitalize`}>{title}</span>;
}
