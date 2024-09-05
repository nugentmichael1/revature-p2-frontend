
import { useEffect, useState } from "react";
import { useAppContext } from "../../contexts/AppContext";
import axios from 'axios';


type CommentType = {
    discussionBoardId?: number,
    discussionId?: number,
    courseId: number,
    userId: number,
    updatedAt?: string,
    content: string
}

type DiscussionType = {
    discussionBoardId?: number,
    courseId: number,
    discussionBoardTitle: string,
    userId: number,
    discussionBoardDescription: string,
    discussionPosts?: CommentType[]
}

type DiscussionProps = {
    discussion: DiscussionType,
    usersById: {[key: number]: string}
}


export default function Discussion({discussion, usersById}: DiscussionProps) {
    const url = import.meta.env.VITE_APP_API_URL;
    const { state } = useAppContext();
    const [errorMessage, setErrorMessage] = useState("");

    const [usernamesById] = useState<{[key: number]: string}>(usersById);
    
    const [discussionInfo] = useState<DiscussionType>(discussion);
    const [comments, setComments] = useState<CommentType[]>([]);
    const [newComment, setNewComment] = useState("");
    const [isFormExpanded, setIsFormExpanded] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
    const [addCommentErrorMessage, setAddCommentErrorMessage] = useState("");

    const [commentBeingEdited, setCommentBeingEdited] = useState<number | null>(null);
    const [editedCommentContent, setEditedCommentContent] = useState("");



    const getComments = async () => {
        if (discussion.discussionPosts === undefined) {
            setErrorMessage("Error getting comments");
            return;
        }
        setComments(discussion.discussionPosts);
    }


    const getUpdatedComments = async () => {
        try {
			const response = await axios.get(`${url}/discussion_board/${discussion.courseId}`);

            if (response.headers['content-type'].includes('application/json')) {
                for (let i = 0; i < response.data.length; i++) {
                    if (discussion.discussionBoardId === response.data[i].discussionBoardId) {
                        setComments(response.data[i].discussionPosts);
                        break;
                    }
                }
            }

		} catch (error) {
			console.error("Error updating comments: ", error);
            setErrorMessage("Error updating comments")
		}
    }


    const handleAddComment = async () => {
        if (newComment && state.user !== null) {

            const commentToAdd: CommentType = {
                discussionBoardId: discussion.discussionBoardId,
                courseId: discussion.courseId,
                userId: state.user.id, 
                content: newComment};

            try {
                await axios.post(`${url}/discussion`, commentToAdd);
                
                commentToAdd.updatedAt = getCurrDateTime();
                setComments([...comments, commentToAdd]);
                setNewComment("");
                setIsFormExpanded(false);

                getUpdatedComments();

            } catch (error) {
                console.error("Error adding comment: ", error);
                setErrorMessage("Error adding comment")
            }
        }
    };


    const toggleDropdown = (i: number) => {
        setDropdownOpen(dropdownOpen === i ? null : i);
    };


    const handleDelete = async (i: number) => {

        try {
            await axios.delete(`${url}/discussion/${comments[i].discussionId}`);
            
            const newComments = [...comments];
            newComments.splice(i, 1);
            setComments(newComments);
            setDropdownOpen(null);
            handleCancelCommentUpdate();

        } catch (error) {
            console.error("Error deleting comment: ", error);
            setErrorMessage("Error deleting comment")
        }
    }


    const handleEdit = (i: number) => {
        setCommentBeingEdited(i);
        setEditedCommentContent(comments[i].content)
    }


    const handleUpdateComment = async () => {
        if (commentBeingEdited !== null) {
            const curr = comments[commentBeingEdited];

            if (curr !== null && curr.content !== editedCommentContent) {

                const newComment: CommentType = {
                    courseId: curr.courseId,
                    userId: curr.userId, 
                    content: editedCommentContent
                };

                try {
                    await axios.put(`${url}/discussion/${comments[commentBeingEdited].discussionId}`, newComment);

                    const newComments = [...comments];
                    newComments[commentBeingEdited] = {
                        courseId: curr.courseId,
                        userId: curr.userId, 
                        updatedAt: getCurrDateTime(), 
                        content: editedCommentContent}
                    setComments(newComments);
                    setEditedCommentContent("");
                    setCommentBeingEdited(null);

                    getUpdatedComments();

                } catch (error) {
                    console.error("Error updating comment: ", error);
                    setErrorMessage("Error updating comment")
                }
            };
        }
    }


    const handleCancelCommentUpdate = () => {
        setEditedCommentContent("");
        setCommentBeingEdited(null);
    }


    useEffect(() => {

        getComments();

        if (state.user === null) {
            setAddCommentErrorMessage("Must be logged in to add a response.");
        }
    }, []);


    // Currently, time in db is local time, but should ideally be UTC
    const getCurrDateTime = (): string => {
        let date: Date = new Date();
        return date.toLocaleString();
    };
    
    
    const timeAgo = (postDateTime: string | number[]): string => {
        let currDateTime = new Date(getCurrDateTime());
        let postDate: Date;
    
        if (Array.isArray(postDateTime)) {
            postDate = new Date(
                postDateTime[0],
                postDateTime[1] - 1,
                postDateTime[2],
                postDateTime[3],
                postDateTime[4],
                postDateTime[5],
            );
        } else {
            postDate = new Date(postDateTime);
        }
    
        let diffInSeconds = Math.floor((currDateTime.getTime() - postDate.getTime()) / 1000);
        let interval = Math.floor(diffInSeconds / 86400);
        if (interval >= 1) return interval + " day" + (interval > 1 ? "s" : "") + " ago";
        interval = Math.floor(diffInSeconds / 3600);
        if (interval >= 1) return interval + " hour" + (interval > 1 ? "s" : "") + " ago";
        interval = Math.floor(diffInSeconds / 60);
        if (interval >= 1) return interval + " minute" + (interval > 1 ? "s" : "") + " ago";
        return diffInSeconds + " second" + (diffInSeconds > 1 ? "s" : "") + " ago";
    };  


    return (
        <>
            <div className="bg-white w-full p-4 text-black">
                <div className="p-4 rounded border border-gray-300">
                    <h2 className="text-2xl font-bold">{discussionInfo.discussionBoardTitle}</h2>
                    <p className="text-xl my-2">{discussionInfo.discussionBoardDescription}</p>
                    <p>created by: {usernamesById[discussion.userId]}</p>
                </div>

                <p className="text-red-700">{errorMessage}</p>

                <div className="px-6">
                    <div className="py-4 mb-4">
                        <button
                            className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-500 rounded shadow"
                            onClick={() => setIsFormExpanded(!isFormExpanded)}
                        >
                            {isFormExpanded ? "Cancel" : "Add Response"}
                        </button>
                        {isFormExpanded && (
                            <div className="mt-4">
                                <p className="text-red-700">{addCommentErrorMessage}</p>
                                <textarea
                                    className="bg-white w-full p-2 mb-2 border rounded"
                                    rows={4}
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Enter your comment"
                                ></textarea>
                                <button
                                    className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-500 rounded shadow"
                                    onClick={handleAddComment}
                                >Submit</button>
                            </div>
                        )}
                    </div>

                    <div className="p-4 mb-4 rounded border border-gray-300">
                        <h3 className="text-xl font-bold mb-4">Comments</h3>
                        {comments.length === 0 ? (
                            <p>No comments yet.</p>
                        ) : (
                            comments.map((comment, i) => (
                                <div key={i} className="p-4 mb-4 rounded border-t border-gray-300">
                                    <div className="flex justify-between items-center">
                                        <p className="mb-2"><strong>{usernamesById[comment.userId]}</strong> {(comment.updatedAt != undefined) ? timeAgo(comment.updatedAt) : ""}</p>
                                        {state.user !== null && (state.user.role === "EDUCATOR" || state.user.role === "INSTITUTION"|| state.user.id === comment.userId) && (
                                            <div className="relative">
                                                <button
                                                    onClick={() => toggleDropdown(i)}
                                                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm text-gray-700 hover:bg-gray-200"
                                                    >...</button>
                                                {dropdownOpen === i && (
                                                    <div className="origin-top-right absolute right-0 mt-2 rounded-md">
                                                        <div className="py-1 flex space-x-2">
                                                            <button
                                                                onClick={() => {handleEdit(i); toggleDropdown(i)}}
                                                                className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-500 rounded shadow"
                                                                >Edit</button>
                                                            <button
                                                                onClick={() => {handleDelete(i); toggleDropdown(i)}}
                                                                className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-500 rounded shadow"
                                                                >Delete</button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    {
                                        (commentBeingEdited === null || commentBeingEdited !== i) ? (
                                            <p>{comment.content}</p>
                                        ) : (
                                            <div>
                                                <textarea
                                                    className="bg-white w-full p-2 mb-2 border rounded"
                                                    value={editedCommentContent}
                                                    onChange={(e) => setEditedCommentContent(e.target.value)}
                                                >{comment.content}</textarea>
                                                <button
                                                    className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-500 rounded shadow"
                                                    onClick={() => handleCancelCommentUpdate()}
                                                >Cancel</button>
                                                <button
                                                    className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-500 rounded shadow ml-2"
                                                    onClick={() => handleUpdateComment()}
                                                >Submit</button>
                                            </div>
                                        )
                                    }
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
