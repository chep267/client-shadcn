/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** hooks */
import { useGetTicketStatus } from '@module-dashboard/hooks/useGetTicketStatus';

/** components */
import { SelectBase } from '@module-base/components/select-base';

interface SelectTicketStatusProps {
    className?: string;
    placeholder?: string;
    hasClear?: boolean;
    disabled?: boolean;
    value?: string;
    onChange?: (value: string) => void;
}

export function SelectTicketStatus(props: SelectTicketStatusProps) {
    const { className, placeholder, hasClear, disabled, value, onChange } = props;

    const { isPending, data } = useGetTicketStatus();
    const statuses = data?.data.data;

    const items = React.useMemo(() => {
        return statuses?.map((status) => {
            return {
                className: 'capitalize',
                label: status.split('_').join(' '),
                value: status,
            } as App.ModuleBase.Component.TypeSelectItem;
        });
    }, [statuses]);

    return (
        <SelectBase
            className={cn('capitalize', className)}
            hasClear={hasClear}
            placeholder={placeholder}
            loading={isPending}
            disabled={disabled}
            value={value}
            items={items}
            onChange={onChange}
        />
    );
}
