type BadgeProps = {
    status: string;
};

export function StatusBadge({ status }: BadgeProps) {
    const statusStyles: Record<string, string> = {
        todo: 'bg-gray-600 text-white',
        in_progress: 'bg-blue-600 text-white',
        done: 'bg-green-600 text-white',
        warning: 'bg-amber-600 text-white',
        error: 'bg-red-600 text-white',
    };

    const title = status.replace('_', ' ');

    return (
        <span className={`rounded-md px-2 py-1 text-xs ${statusStyles[status]} font-medium capitalize`}>{title}</span>
    );
}
