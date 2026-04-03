import { ModalConfirm } from '@module-base/components/modal-base/modal-confirm';
import { Trash2Icon } from 'lucide-react';
import type { TaskData } from '@module-dashboard/services/project';

interface ModalDeleteProps {
    item?: TaskData;
    onCancel?(): void;
    onConfirm?(): void;
}

export function ModalEdit(props: ModalDeleteProps) {
    const { item, onCancel, onConfirm } = props;

    return (
        <ModalConfirm
            open={!!item}
            title="Delete Task"
            description={`Are you sure you want to delete this task "${item?.title}"?`}
            confirmText="Delete"
            variant="destructive"
            media={<Trash2Icon className="text-red-500" />}
            onCancel={onCancel}
            onConfirm={onConfirm}
        />
    );
}
