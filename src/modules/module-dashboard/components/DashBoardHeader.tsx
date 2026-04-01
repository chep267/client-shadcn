/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** components */
import { Button } from '@module-base/components/button';
import { Card, CardContent } from '@module-base/components/card';

export default function DashBoardHeader(props: { data: any[] }) {
    const { data } = props;

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

    return (
        <>
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
        </>
    );
}
