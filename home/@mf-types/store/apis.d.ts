
    export type RemoteKeys = 'store/userActions' | 'store/store';
    type PackageType<T> = T extends 'store/store' ? typeof import('store/store') :T extends 'store/userActions' ? typeof import('store/userActions') :any;