/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type * as TypeComponent from '@module-global/types/component.d';

declare global {
    namespace App.ModuleGlobal {
        export import Component = TypeComponent;
    }
}
