/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** components */
import { AgeCalculator } from '@modules/global/screens/AgeCalculatorScreen/AgeCalculator';

export default function AgeCalculatorScreen() {
    return (
        <div className="tablet:p-5 flex size-full flex-col gap-10 px-2 py-4">
            <AgeCalculator />
        </div>
    );
}
