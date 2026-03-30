import * as React from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@module-base/components/select';
import { cn } from '@module-base/utils/shadcn';

type TypeFilterItem = {
    label: React.ReactNode;
    value: string;
};

interface TableFilterProps {
    className?: string;
    value?: string;
    placeholder?: string;
    items?: TypeFilterItem[];
    onChange?: (value: string) => void;
}

export function TableFilter(props: TableFilterProps) {
    const { className, placeholder = 'Select...', value, items, onChange } = props;

    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className={cn('w-full cursor-pointer', className)}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent position="popper">
                <SelectGroup>
                    {items?.map((item) => {
                        return (
                            <SelectItem key={item.value} value={item.value} className="cursor-pointer">
                                {item.label}
                            </SelectItem>
                        );
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
