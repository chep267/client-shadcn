/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** components */
import { AgeCalculator } from '@module-global/screens/AgeCalculatorScreen/AgeCalculator';

export default function AgeCalculatorScreen() {
    return (
        <div className="tablet:p-5 flex h-full w-full flex-col gap-10 px-2 py-4">
            <AgeCalculator />
        </div>
    );
}
