/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** components */
import { ModalAttachments } from '@module-base/components/modal-base/modal-attachments';
import { ModalTokenExpired } from '@module-auth/components/ModalTokenExpired';

export default function AppModal() {
    return (
        <React.Fragment>
            <ModalTokenExpired />
            <ModalAttachments />
        </React.Fragment>
    );
}
