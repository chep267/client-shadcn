/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

/** constants */
import { AuthRouterPath } from '@module-auth/constants/AuthRouterPath';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** components */
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '@module-base/components/breadcrumb';

export default function AuthBreadcrumbs(props: App.ModuleAuth.Component.AuthBreadcrumbsProps) {
    const { name = 'signin' } = props;

    const items: App.ModuleAuth.Component.AuthBreadcrumbsItem[] = [
        {
            title: AuthLanguage.component.title.signin,
            path: AuthRouterPath.signin,
            hidden: name === 'signin',
        },
        {
            title: AuthLanguage.component.title.register,
            path: AuthRouterPath.register,
            hidden: name === 'register',
        },
        {
            title: AuthLanguage.component.title.recover,
            path: AuthRouterPath.recover,
            hidden: name === 'recover',
        },
    ];

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {items
                    .filter((item) => !item.hidden)
                    .map((item, index) => (
                        <React.Fragment key={item.path}>
                            {index > 0 && <BreadcrumbSeparator />}
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild className="hover:text-main text-base">
                                    <Link key={item.path} to={item.path} replace>
                                        <FormattedMessage id={item.title} defaultMessage={item.title} />
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </React.Fragment>
                    ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
