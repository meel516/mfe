
    export type RemoteKeys = 'store/store';
    type PackageType<T> = T extends 'store/store' ? typeof import('store/store') :any;