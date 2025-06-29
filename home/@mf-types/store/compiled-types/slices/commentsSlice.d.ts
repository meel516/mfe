export interface commentSlice {
    blogId: string;
}
export declare const setBlogId: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<string, "comments/setBlogId">;
declare const _default: import("redux").Reducer<commentSlice>;
export default _default;
