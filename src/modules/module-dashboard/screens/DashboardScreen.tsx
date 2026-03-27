/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { toast } from 'sonner';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** services */
import { generateTasks, type TaskData } from '@module-dashboard/services/project';

/** components */
import { Button } from '@module-base/components/button';
import { Card, CardContent } from '@module-base/components/card';
import { ProjectTable } from '@module-dashboard/components/ProjectTable';
import { ModalDelete } from '@module-dashboard/components/ModalDelete';

export default function DashboardScreen() {
    const [data, setData] = React.useState(() => generateTasks(100));
    const [deleteItem, setDeleteItem] = React.useState<TaskData>();

    const status = React.useMemo(() => {
        return data.reduce(
            (output, task) => {
                output['in_progress'] += task.status === 'in_progress' ? 1 : 0;
                output['done'] += task.status === 'done' ? 1 : 0;
                return output;
            },
            { in_progress: 0, done: 0 }
        );
    }, [data]);

    const handleDelete = () => {
        setData(data.filter((task) => task.id !== deleteItem?.id));
        setDeleteItem(undefined);
        toast.success('Successfully deleted!', {
            description: 'You have successfully deleted the task',
            richColors: true,
        });
    };

    return (
        <div
            className={cn(
                'flex shrink grow flex-col',
                'w-full max-w-dvw space-y-6 py-4',
                'max-h-[calc(100dvh-var(--app-size-height-header)-var(--app-size-height-sidebar-mini))] px-2',
                'tablet:px-4 tablet:max-h-[calc(100dvh-var(--app-size-height-header))]'
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Dashboard for Nhat Minh</h1>
                </div>

                <div className="flex gap-2">
                    <Button variant="outline">+ Member</Button>
                    <Button>+ Task</Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <p className="text-warning text-xl">Total Tasks</p>
                        <p className="text-warning text-xl font-bold">{data.length}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <p className="text-info text-xl">In Progress</p>
                        <p className="text-info text-xl font-bold">{status['in_progress']}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <p className="text-success text-xl">Done</p>
                        <p className="text-success text-xl font-bold">{status['done']}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Table */}
            <ProjectTable data={data} onDelete={setDeleteItem} />
            <ModalDelete item={deleteItem} onCancel={() => setDeleteItem(undefined)} onConfirm={handleDelete} />
        </div>
    );
}
