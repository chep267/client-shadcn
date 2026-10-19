/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type * as TypeComponent from '@modules/global/types/component.d';

declare global {
    namespace App.Module.Global {
        export import Component = TypeComponent;
    }
}
