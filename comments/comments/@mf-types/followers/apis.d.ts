
    export type RemoteKeys = 'followers/mount';
    type PackageType<T> = T extends 'followers/mount' ? typeof import('followers/mount') :any;