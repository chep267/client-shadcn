/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** components */
import { ModalAttachments } from '@modules/base/components/modal-base/modal-attachments';
import { ModalTokenExpired } from '@modules/auth/components/ModalTokenExpired';

export default function AppModal() {
    return (
        <React.Fragment>
            <ModalTokenExpired />
            <ModalAttachments />
        </React.Fragment>
    );
}
