
    export type RemoteKeys = 'REMOTE_ALIAS_IDENTIFIER/store';
    type PackageType<T> = T extends 'REMOTE_ALIAS_IDENTIFIER/store' ? typeof import('REMOTE_ALIAS_IDENTIFIER/store') :any;