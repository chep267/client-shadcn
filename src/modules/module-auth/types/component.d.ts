/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import * as React from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';

export type TypeAuthBreadcrumbsItem = {
    title: string;
    path: string;
    append?: string;
    hidden?: boolean;
};

export type AuthBreadcrumbsProps = {
    name?: 'signin' | 'register' | 'recover';
};

export type AuthTitleProps = AuthBreadcrumbsProps;

export interface AuthButtonSubmitProps extends AuthBreadcrumbsProps {
    loading?: boolean;
}

export interface FormTextFieldProps<T extends FieldValues = FieldValues> extends React.ComponentProps<'input'> {
    name: FieldPath<T>;
    control: Control<T>;
    label?: string;
}
