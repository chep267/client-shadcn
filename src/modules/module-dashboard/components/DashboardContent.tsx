/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { toast } from 'sonner';

/** services */
import { type TaskData } from '@module-dashboard/services/project';

/** components */
import { ProjectTable } from '@module-dashboard/components/ProjectTable';
import { ModalDelete } from '@module-dashboard/components/ModalDelete';
import { ModalEdit } from '@module-dashboard/components/ModalEdit';

export default function DashboardContent(props: { data: any[] }) {
    const { data: _data } = props;
    const [data, setData] = React.useState(_data);
    const [deleteItem, setDeleteItem] = React.useState<TaskData>();
    const [editItem, setEditItem] = React.useState<TaskData>();

    const handleDelete = () => {
        setData(data.filter((task) => task.id !== deleteItem?.id));
        setDeleteItem(undefined);
        toast.success('Successfully deleted!', {
            description: 'You have successfully deleted the task',
        });
    };

    return (
        <>
            <ProjectTable data={data} onDelete={setDeleteItem} />
            <ModalDelete item={deleteItem} onCancel={() => setDeleteItem(undefined)} onConfirm={handleDelete} />
            <ModalEdit item={editItem} onCancel={() => setEditItem(undefined)} onConfirm={handleDelete} />
        </>
    );
}
