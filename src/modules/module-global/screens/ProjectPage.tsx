import * as React from 'react';

import { Button } from '@module-base/components/button';
import { Card, CardContent } from '@module-base/components/card';
import { ProjectTable } from '@module-global/components/Project/ProjectTable';
import { generateTasks, type TaskData } from '@module-global/services/project';
import { ModalConfirm } from '@module-base/components/modal-base/modal-confirm';
import { Trash2Icon } from 'lucide-react';

export default function ProjectPage() {
    const [data, setData] = React.useState(() => generateTasks(50));
    const [deleteItem, setDeleteItem] = React.useState<TaskData | null>(null);

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

    const handleDelete = (id: number) => {
        setData(data.filter((task) => task.id !== id));
    };

    return (
        <div className="flex h-full max-h-[calc(100dvh-64px)] w-full flex-col space-y-6 overflow-hidden p-6">
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
                        <p className="text-muted-foreground text-sm">Total Tasks</p>
                        <p className="text-xl font-bold">{data.length}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <p className="text-muted-foreground text-sm">In Progress</p>
                        <p className="text-xl font-bold">{status['in_progress']}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <p className="text-muted-foreground text-sm">Done</p>
                        <p className="text-xl font-bold">{status['done']}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Table */}
            <ProjectTable data={data} onDelete={setDeleteItem} />
            <ModalConfirm
                open={!!deleteItem}
                title="Delete Task"
                description={`Are you sure you want to delete this task "${deleteItem?.title}"?`}
                confirmText="Delete"
                variant="destructive"
                media={<Trash2Icon className="text-red-500" />}
                onCancel={() => setDeleteItem(null)}
                onConfirm={() => handleDelete(deleteItem?.id ?? 0)}
            />
        </div>
    );
}
