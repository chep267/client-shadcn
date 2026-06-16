/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { intervalToDuration } from 'date-fns';

/** utils */
import { delay } from '@module-base/utils/delay';

/** components */
import { CardFooter } from '@module-base/components/card';
import { WavyLoading } from '@module-base/components/animation/wavy-loading';
import { TimeBox } from '@module-global/screens/AgeCalculatorScreen/TimeBox';

/** types */
import type { Duration } from 'date-fns';

interface CardResultProps {
    date?: Date;
}

export function CardResult(props: CardResultProps) {
    const { date } = props;

    const [age, setAge] = React.useState<Duration | null>();
    const [loading, setLoading] = React.useState(false);
    const timerRef = React.useRef<number | undefined>(undefined);

    React.useEffect(() => {
        // start loading
        setLoading(!!date);
        setAge(null);

        // calc duration
        if (!date) {
            clearInterval(timerRef.current);
        } else {
            timerRef.current = setInterval(() => {
                const now = new Date();
                const duration =
                    date > now
                        ? null
                        : intervalToDuration({
                              start: date,
                              end: now,
                          });
                setAge(() => duration);
            }, 1000);
        }

        return () => clearInterval(timerRef.current);
    }, [date]);

    React.useEffect(() => {
        if (date && age && loading) {
            delay(600).then(() => setLoading(false));
        }
    }, [age]);

    return (
        <CardFooter className="grid grid-cols-3 gap-3">
            {loading ? (
                <WavyLoading text="waiting..." />
            ) : age ? (
                <>
                    <TimeBox label="Năm" value={age.years} />
                    <TimeBox label="Tháng" value={age.months} />
                    <TimeBox label="Ngày" value={age.days} />
                    <TimeBox label="Giờ" value={age.hours} />
                    <TimeBox label="Phút" value={age.minutes} />
                    <TimeBox label="Giây" value={age.seconds} />
                </>
            ) : (
                <span className="col-span-3 text-sm italic">Hãy nhập ngày, tháng, năm sinh của bạn!</span>
            )}
        </CardFooter>
    );
}
