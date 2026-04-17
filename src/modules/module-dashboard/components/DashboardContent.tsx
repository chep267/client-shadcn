/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** components */
import { TableTicket } from '@module-dashboard/components/TableTicket';
import { ModalDeleteTicket } from '@module-dashboard/components/ModalDeleteTicket';
import { ModalEditTicket } from '@module-dashboard/components/ModalEditTicket';

export default function DashboardContent() {
    return (
        <>
            <TableTicket />
            <ModalDeleteTicket />
            <ModalEditTicket />
        </>
    );
}
