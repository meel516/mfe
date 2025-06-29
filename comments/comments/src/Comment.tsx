import axios from "axios";
import React, { useEffect, useState } from "react";
import store from "store/store";

const Comment = ({
  parentId,
  blogId,
}: {
  parentId: Number;
  blogId: string;
}) => {
  // Use objects with comment IDs as keys to track state per comment
  const [showReplies, setShowReplies] = useState<any>({});
  const [commentData, setCommentData] = useState([]);
  const [editingStates, setEditingStates] = useState<any>({});
  const [replyingStates, setReplyingStates] = useState<any>({});
  const [editMessages, setEditMessages] = useState<any>({});
  const [replyMessages, setReplyMessages] = useState<any>({});
  const [newComment, setNewComment] = useState("");
  const [showNewCommentForm, setShowNewCommentForm] = useState(false);
  const currentUserId = store.getState().user.userId;
  const isLoggedIn = store.getState().user.isLoggedIn;

  useEffect(() => {
    fetchComments();
  }, [parentId]);

  const fetchComments = () => {
    axios
      .get(
        `https://commentservice-vzt8.onrender.com/v1/comments/${blogId}/${parentId}`,
        {
          headers: {
            Authorization: `Bearer ${store.getState().user.accessToken}`,
          },
        }
      )
      .then((res) => {
        setCommentData(res.data.data);
      });
  };

  const handleAddNewComment = () => {
    axios
      .post(
        `https://commentservice-vzt8.onrender.com/v1/comments/${blogId}`,
        {
          message: newComment,
          blogId: blogId,
          parentId: parentId,
        },
        {
          headers: {
            Authorization: `Bearer ${store.getState().user.accessToken}`,
          },
        }
      )
      .then(() => {
        fetchComments();
        setNewComment("");
        setShowNewCommentForm(false);
      })
      .catch((error) => {
        console.error("Error adding new comment:", error);
      });
  };

  const handleEditComment = (commentId: any) => {
    axios
      .patch(
        `https://commentservice-vzt8.onrender.com/v1/comments/${blogId}`,
        { message: editMessages[commentId], id: commentId },
        {
          headers: {
            Authorization: `Bearer ${store.getState().user.accessToken}`,
          },
        }
      )
      .then(() => {
        fetchComments();
        setEditingStates((prev: any) => ({ ...prev, [commentId]: false }));
      })
      .catch((error) => {
        console.error("Error updating comment:", error);
      });
  };

  const handleAddReply = (parentId: any) => {
    axios
      .post(
        `https://commentservice-vzt8.onrender.com/v1/comments/${blogId}`,
        {
          message: replyMessages[parentId],
          parentId,
          blogId: blogId,
        },
        {
          headers: {
            Authorization: `Bearer ${store.getState().user.accessToken}`,
          },
        }
      )
      .then(() => {
        fetchComments();
        setReplyMessages((prev: any) => ({ ...prev, [parentId]: "" }));
        setReplyingStates((prev: any) => ({ ...prev, [parentId]: false }));
      })
      .catch((error) => {
        console.error("Error adding reply:", error);
      });
  };

  const toggleReplies = (commentId: any) => {
    setShowReplies((prev: any) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const startEditing = (commentId: any, message: any) => {
    setEditingStates((prev: any) => ({ ...prev, [commentId]: true }));
    setEditMessages((prev: any) => ({ ...prev, [commentId]: message }));
  };

  const cancelEditing = (commentId: any) => {
    setEditingStates((prev: any) => ({ ...prev, [commentId]: false }));
  };

  const startReplying = (commentId: any) => {
    setReplyingStates((prev: any) => ({ ...prev, [commentId]: true }));
    setReplyMessages((prev: any) => ({ ...prev, [commentId]: "" }));
  };

  const cancelReplying = (commentId: any) => {
    setReplyingStates((prev: any) => ({ ...prev, [commentId]: false }));
  };

  const handleEditMessageChange = (commentId: any, value: any) => {
    setEditMessages((prev: any) => ({ ...prev, [commentId]: value }));
  };

  const handleReplyMessageChange = (commentId: any, value: any) => {
    setReplyMessages((prev: any) => ({ ...prev, [commentId]: value }));
  };

  return (
    <div>
      {/* Add new comment form (only shown for top-level comments when there are no comments or when explicitly shown) */}
      {parentId === null && (
        <div className="mb-6">
          {commentData.length === 0 && !showNewCommentForm ? (
            <button
              onClick={() => setShowNewCommentForm(true)}
              className="
          w-full py-3 px-4 text-center 
          bg-gradient-to-r from-gray-50 to-gray-100 
          dark:from-gray-800 dark:to-gray-700
          hover:from-gray-100 hover:to-gray-200 
          dark:hover:from-gray-700 dark:hover:to-gray-600
          rounded-xl transition-all duration-300
          text-sm font-medium text-gray-700 dark:text-gray-200
          shadow-sm hover:shadow-md
          border border-gray-200 dark:border-gray-700
          transform hover:-translate-y-0.5
          flex items-center justify-center gap-2
        "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Be the first to comment
            </button>
          ) : (
            (showNewCommentForm || commentData.length > 0) && (
              <div className="space-y-3 animate-fadeIn">
                <div className="relative">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="
                w-full px-4 py-3 text-sm 
                border border-gray-300 dark:border-gray-600 
                rounded-xl focus:ring-2 focus:ring-blue-500 
                focus:border-transparent dark:bg-gray-800 
                dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                shadow-sm focus:shadow-md transition-all
                resize-none min-h-[100px]
              "
                    placeholder="Share your thoughts..."
                    rows={3}
                    autoFocus
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400 dark:text-gray-500">
                    {newComment.length}/500
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleAddNewComment}
                    disabled={!newComment.trim()}
                    className={`
                px-4 py-2 text-sm font-medium 
                bg-gradient-to-r from-blue-600 to-blue-500 
                text-white rounded-xl transition-all
                ${
                  !newComment.trim()
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:from-blue-700 hover:to-blue-600 hover:shadow-lg"
                }
                flex items-center gap-2
                transform hover:scale-[1.02]
                focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
              `}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 5l7 7-7 7M5 5l7 7-7 7"
                      />
                    </svg>
                    Post Comment
                  </button>
                  <button
                    onClick={() => {
                      setNewComment("");
                      setShowNewCommentForm(false);
                    }}
                    className="
                px-4 py-2 text-sm font-medium 
                bg-gray-100 hover:bg-gray-200 
                dark:bg-gray-700 dark:hover:bg-gray-600 
                text-gray-700 dark:text-gray-200 rounded-xl 
                transition-all hover:shadow-md
                border border-gray-200 dark:border-gray-600
                transform hover:scale-[1.02]
                focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
              "
                  >
                    Cancel
                  </button>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Markdown supported
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* Existing comments */}
      {commentData?.map((comment: any) => (
        <div
          key={comment.id}
          className={`
            mb-4 transition-all duration-300 ease-in-out
            ${
              comment.parentId
                ? "ml-6 md:ml-8 pl-4 border-l-2 border-gray-100 dark:border-gray-700"
                : ""
            }
            hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg p-3
            ${comment.deleted ? "opacity-70" : ""}
          `}
        >
          <div className="flex items-start gap-3">
            {/* Avatar with user initials */}
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
              {comment.userId?.slice(0, 2).toUpperCase() || "U"}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  User #{comment.userId?.slice(-4)}
                </span>

                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {comment?.edited
                      ? new Date(comment.updatedAt).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : new Date(comment.createdAt).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                  </span>

                  {comment.edited && !comment.deleted && (
                    <span className="text-xs text-gray-400 dark:text-gray-500 italic">
                      (edited)
                    </span>
                  )}

                  {comment.deleted && (
                    <span className="text-xs text-gray-400 dark:text-gray-500 italic">
                      (deleted)
                    </span>
                  )}
                </div>
              </div>

              {editingStates[comment.id] ? (
                <div className="mt-2 space-y-2">
                  <textarea
                    value={editMessages[comment.id] || ""}
                    onChange={(e) =>
                      handleEditMessageChange(comment.id, e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    rows={3}
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditComment(comment.id)}
                      className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => cancelEditing(comment.id)}
                      className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 rounded-lg transition-colors"
                    >
                      Discard
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className={`mt-1 text-sm ${
                    comment.deleted
                      ? "text-gray-400 italic"
                      : "text-gray-800 dark:text-gray-200"
                  } font-medium leading-snug`}
                >
                  {comment.deleted
                    ? "This comment has been deleted"
                    : comment.message}
                </div>
              )}

              {!comment.deleted && (
                <div className="mt-2 flex items-center gap-4">
                  <button className="text-xs flex items-center gap-1 text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      />
                    </svg>
                    Like
                  </button>

                  <button
                    onClick={() => startReplying(comment.id)}
                    className="text-xs flex items-center gap-1 text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    Reply
                  </button>

                  {comment.userId === currentUserId && (
                    <button
                      onClick={() => startEditing(comment.id, comment.message)}
                      className="text-xs flex items-center gap-1 text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Edit
                    </button>
                  )}
                </div>
              )}

              {replyingStates[comment.id] && (
                <div className="mt-4 space-y-2">
                  <textarea
                    value={replyMessages[comment.id] || ""}
                    onChange={(e) =>
                      handleReplyMessageChange(comment.id, e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Write your reply..."
                    rows={3}
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddReply(comment.id)}
                      disabled={!replyMessages[comment.id]?.trim()}
                      className={`px-3 py-1 text-sm bg-blue-600 text-white rounded-lg transition-colors ${
                        !replyMessages[comment.id]?.trim()
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-blue-700"
                      }`}
                    >
                      Post Reply
                    </button>
                    <button
                      onClick={() => cancelReplying(comment.id)}
                      className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {comment._count?.comments > 0 && (
                <button
                  onClick={() => toggleReplies(comment.id)}
                  className="mt-2 flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                  {showReplies[comment.id]
                    ? "Hide replies"
                    : `Show replies (${comment._count.comments})`}
                </button>
              )}
            </div>
          </div>

          {showReplies[comment.id] && comment.comments?.length > 0 && (
            <div className="mt-4 space-y-3 ml-2">
              <Comment blogId={blogId} parentId={comment.id} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Comment;
