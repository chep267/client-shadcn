'use client';

/** libs */
import * as React from 'react';
import { format } from 'date-fns';
import { ChevronDownIcon } from 'lucide-react';

/** components */
import { Button } from '@module-base/components/button';
import { Calendar } from '@module-base/components/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@module-base/components/popover';

interface DatePickerProps {
    id?: string;
    value?: Date;
    onChange?: (date: Date | undefined) => void;
}

export function DatePicker(props: DatePickerProps) {
    const { id, value, onChange } = props;
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState<DatePickerProps['value']>(value);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    id={id}
                    variant="outline"
                    data-empty={!date}
                    className="data-[empty=true]:text-muted-foreground w-[212px] justify-between text-left font-normal"
                >
                    <span>{date ? format(date, 'dd/MM/yyyy') : 'dd/mm/yyyy'}</span>
                    <ChevronDownIcon />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    classNames={{
                        months_dropdown: 'scrollbar-hidden',
                        years_dropdown: 'scrollbar-hidden',
                    }}
                    mode="single"
                    selected={date}
                    defaultMonth={date}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                        setDate(date);
                        setOpen(false);
                        onChange?.(date);
                    }}
                />
            </PopoverContent>
        </Popover>
    );
}
