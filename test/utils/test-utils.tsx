/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { type ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
    render(ui, {
        wrapper: ({ children }) => <IntlProvider locale="en">{children}</IntlProvider>,
        ...options,
    });

export { customRender as render };
