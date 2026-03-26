export function StatusBadge({ status }: { status: string }) {
    const map = {
        todo: 'bg-gray-200 text-gray-700',
        in_progress: 'bg-blue-200 text-blue-700',
        done: 'bg-green-200 text-green-700',
        warning: 'bg-amber-200 text-amber-700',
        error: 'bg-red-200 text-red-700',
    };

    const title = status.replace('_', ' ');

    return (
        <span className={`rounded-md px-2 py-1 text-xs ${map[status as keyof typeof map]} capitalize`}>{title}</span>
    );
}
