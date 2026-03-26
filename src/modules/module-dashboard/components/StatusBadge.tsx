export function StatusBadge({ status }: { status: string }) {
    const map = {
        todo: 'bg-gray-300 text-gray-700',
        in_progress: 'bg-blue-300 text-blue-700',
        done: 'bg-green-300 text-green-700',
        warning: 'bg-amber-300 text-amber-700',
        error: 'bg-red-300 text-red-700',
    };

    const title = status.replace('_', ' ');

    return (
        <span className={`rounded-md px-2 py-1 text-xs ${map[status as keyof typeof map]} capitalize`}>{title}</span>
    );
}
