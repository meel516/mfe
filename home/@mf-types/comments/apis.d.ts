
    export type RemoteKeys = 'comments/comments';
    type PackageType<T> = T extends 'comments/comments' ? typeof import('comments/comments') :any;