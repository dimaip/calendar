type Truthy<T> = T extends false | '' | 0 | null | undefined ? never : T;

export const truthy = <T>(value: T): value is Truthy<T> => Boolean(value);
