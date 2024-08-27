
import { useState } from "react";


type CommentType = {
    name: string,
    time: string,
    content: string
}

type DiscussionInfoType = {
    name: string;
    time: string;
    question: string;
};


export default function Discussion() {
    
    const [discussionInfo, setDiscussionInfo] = useState<DiscussionInfoType>({
        name: "Discussion Topic",
        time: "",
        question: "What are your thoughts on this?"
    });
    const [comments, setComments] = useState<CommentType[]>([]);
    const [newComment, setNewComment] = useState("");
    const [isFormExpanded, setIsFormExpanded] = useState(false);


    const handleAddComment = () => {
        if (newComment) {
            setComments([...comments, {name: "my name", time: getCurrDateTime(), content: newComment}]);
            setNewComment("");
            setIsFormExpanded(false);
        }
    };


    const getCurrDateTime = (): string => {
        let date: Date = new Date();
        return date.toLocaleDateString() + ", " + date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
	};


    return (
        <>
            <div className="bg-white w-full p-4 text-black">
                <div className="p-4 rounded border border-gray-300">
                    <h2 className="text-2xl font-bold">{discussionInfo.name}</h2>
                    <p className="mt-2">{discussionInfo.time}</p>
                    <p className="mt-2">{discussionInfo.question}</p>
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
                                    className="bg-white w-full p-2 border rounded"
                                    rows={4}
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Enter your comment"
                                ></textarea>
                                <button
                                    className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-500 rounded shadow"
                                    onClick={handleAddComment}
                                >
                                    Submit
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="p-4 mb-4 rounded border border-gray-300">
                        <h3 className="text-xl font-bold mb-4">Comments</h3>
                        {comments.length === 0 ? (
                            <p>No comments yet.</p>
                        ) : (
                            comments.map((comment, index) => (
                                <div key={index} className="p-4 mb-4 rounded border border-gray-300">
                                    <p className="mb-2"><strong>{comment.name}</strong> at {comment.time}</p>
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
