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

export type TypeAuthBreadcrumbsProps = {
    name?: 'signin' | 'register' | 'recover';
};

export type TypeAuthTitleProps = TypeAuthBreadcrumbsProps;

export interface TypeAuthButtonSubmitProps extends TypeAuthBreadcrumbsProps {
    loading?: boolean;
}

export interface TypeFormTextFieldProps<T extends FieldValues> extends React.ComponentProps<'input'> {
    name: FieldPath<T>;
    control: Control<T>;
    label?: string;
}
