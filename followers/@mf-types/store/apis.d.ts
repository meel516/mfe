
    export type RemoteKeys = 'store/userActions' | 'store/store' | 'store/commentsActions';
    type PackageType<T> = T extends 'store/commentsActions' ? typeof import('store/commentsActions') :T extends 'store/store' ? typeof import('store/store') :T extends 'store/userActions' ? typeof import('store/userActions') :any;