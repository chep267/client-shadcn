/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

interface TimeBoxProps {
    label: string;
    value?: number;
}

export const TimeBox = React.memo(function TimeBox(props: TimeBoxProps) {
    const { label, value } = props;

    return (
        <div className="bg-primary/5 border-primary/10 rounded-lg border p-3 text-center transition-all hover:scale-105">
            <div className="text-primary text-2xl font-bold">{value ?? 0}</div>
            <div className="text-xs font-medium tracking-wider text-slate-500 uppercase">{label}</div>
        </div>
    );
});
