
import { useState } from "react";


type CommentType = {
    name: string,
    time: string,
    content: string
}

type DiscussionType = {
    title: string,
    time: string,
    description: string,
    comments: CommentType[]
}

type DiscussionProp = {
    discussion: DiscussionType
}


export default function Discussion({discussion}: DiscussionProp) {
    
    const [discussionInfo] = useState<DiscussionType>(discussion);
    const [comments, setComments] = useState<CommentType[]>([]);
    const [newComment, setNewComment] = useState("");
    const [isFormExpanded, setIsFormExpanded] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);


    const handleAddComment = () => {
        if (newComment) {
            setComments([...comments, {name: "my name", time: getCurrDateTime(), content: newComment}]);
            setNewComment("");
            setIsFormExpanded(false);
        }
    };


    const toggleDropdown = (index: number) => {
        setDropdownOpen(dropdownOpen === index ? null : index);
    };


    const handleDelete = (index: number) => {
        const newComments = [...comments];
        newComments.splice(index, 1);
        setComments(newComments);
        setDropdownOpen(null);
    }


    const getCurrDateTime = (): string => {
        let date: Date = new Date();
        return date.toUTCString();
    };

    const timeAgo = (postDateTime: string): string => {
        let currDateTime = new Date(getCurrDateTime());
        let postDate = new Date(postDateTime);
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
                    <h2 className="text-2xl font-bold">{discussionInfo.title}</h2>
                    <p className="mt-2">{timeAgo(discussionInfo.time)}</p>
                    <p className="mt-2">{discussionInfo.description}</p>
                </div>

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
                            comments.map((comment, index) => (
                                <div key={index} className="p-4 mb-4 rounded border-t border-gray-300">
                                    <div className="flex justify-between items-center">
                                        <p className="mb-2"><strong>{comment.name}</strong> {timeAgo(comment.time)}</p>
                                        <div className="relative">
                                            <button
                                                onClick={() => toggleDropdown(index)}
                                                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm text-gray-700 hover:bg-gray-200"
                                            >...</button>
                                            {dropdownOpen === index && (
                                                <div className="origin-top-right absolute right-0 mt-2 rounded-md">
                                                    <div className="py-1">
                                                        <button
                                                            onClick={() => handleDelete(index)}
                                                            className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-500 rounded shadow"
                                                        >Delete</button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <p>{comment.content}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
