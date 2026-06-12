/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { Clock } from 'lucide-react';
import { format } from 'date-fns';

/** components */
import { Input } from '@module-base/components/input.tsx';
import { Field, FieldLabel, FieldGroup } from '@module-base/components/field.tsx';
import { DatePicker } from '@module-base/components/date-picker.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@module-base/components/card.tsx';
import { CardResult } from '@module-global/screens/AgeCalculatorScreen/CardResult.tsx';

export function AgeCalculator() {
    const [birthDate, setBirthDate] = React.useState<Date | undefined>();
    const [birthTime, setBirthTime] = React.useState<string>('00:00');

    const date = birthDate ? new Date(`${format(birthDate, 'yyyy-MM-dd')}T${birthTime}`) : undefined;

    return (
        <Card className="mx-auto mt-20 w-full max-w-lg shadow-xl">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-center text-2xl font-bold">
                    <Clock className="text-primary h-6 w-6" />
                    Đồng hồ tuổi
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <FieldGroup className="w-full flex-row">
                    <Field>
                        <FieldLabel htmlFor="date">Ngày sinh</FieldLabel>
                        <DatePicker id="date" onChange={setBirthDate} />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="time">Giờ sinh</FieldLabel>
                        <Input
                            id="time"
                            type="time"
                            step="1"
                            defaultValue="00:00:00"
                            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                            onChange={(e) => setBirthTime(e.target.value)}
                        />
                    </Field>
                </FieldGroup>
            </CardContent>
            <CardResult date={date} />
        </Card>
    );
}
