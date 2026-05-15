/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** utils */
import { cn } from '@module-base/utils/shadcn';

interface ListEmptyProps {
    loading?: boolean;
    isEmpty?: boolean;
    emptyContent?: React.ReactNode | (() => React.ReactNode);
}

export function ListEmpty(props: ListEmptyProps) {
    const { loading, isEmpty, emptyContent } = props;

    if (loading || !isEmpty) return null;

    if (!emptyContent || typeof emptyContent === 'string' || typeof emptyContent === 'number') {
        return (
            <div className={cn('absolute inset-0', 'flex items-center justify-center')}>
                <span className="opacity-50">{emptyContent || 'No data!'}</span>
            </div>
        );
    }

    return (
        <div className={cn('absolute inset-0', 'flex items-center justify-center')}>
            {typeof emptyContent === 'function' ? emptyContent() : emptyContent}
        </div>
    );
}
