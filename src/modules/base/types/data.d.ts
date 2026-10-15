/**
 *
 * @author dongntd267@gmail.com
 *
 */

export type ItemId = string | number;
export type ItemIds = ItemId[];
export type Items<Data = unknown> = Data[];

export type StorageName = 'localStorage' | 'sessionStorage';
export type StorageValue = string | null | undefined;

export type Locale = 'vi' | 'en';
export type LanguageMessages = Record<string, string>;
export type Theme = 'dark' | 'light';

export type OrderType = 'asc' | 'desc';

export type Constant<Root extends string = string> = Readonly<{ [Key in Root]: Key }>;
