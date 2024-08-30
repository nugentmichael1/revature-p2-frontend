

import { useState } from "react";
import Discussion from "./Discussion";


type DiscussionType = {
    title: string,
    author: string,
    time: string,
    description: string,
    comments: []
}


export default function DiscussionBoard() {
    const [discussions, setDiscussions] = useState<DiscussionType[]>([]);
    const [discussionIsSelected, setDiscussionIsSelected] = useState(false);
    const [currentDiscussion, setCurrentDiscussion] = useState<DiscussionType | null>(null);

    const [isFormExpanded, setIsFormExpanded] = useState(false);
    const [newDiscussionTitle, setNewDiscussionTitle] = useState("");
    const [newDiscussionDescription, setNewDiscussionDescription] = useState("");

    const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

    const [discussionBeingEdited, setDiscussionBeingEdited] = useState<number | null>(null);
    const [editedDiscussionTitle, setEditedDiscussionTitle] = useState("");
    const [editedDiscussionDescription, setEditedDiscussionDescription] = useState("");


    const toggleDropdown = (i: number) => {
        setDropdownOpen(dropdownOpen === i ? null : i);
    };


    const handleAddDiscussion = () => {
        if (newDiscussionTitle) {
            setDiscussions([...discussions, {title: newDiscussionTitle, author: "posted by", time: getCurrDateTime(), description: newDiscussionDescription, comments: []}]);
            setNewDiscussionTitle("");
            setNewDiscussionDescription("");
            setIsFormExpanded(false);
        }
    };


    const handleSetCurrentDiscussion = (discussion: DiscussionType) => {
        if (discussionBeingEdited === null) {
            setCurrentDiscussion(discussion);
            setDiscussionIsSelected(true);
        }
    };


    const handleDeselectCurrentDiscussion = () => {
        setDiscussionIsSelected(false);
        setCurrentDiscussion(null);
    };


    const handleDelete = (i: number) => {
        const newDiscussions = [...discussions];
        newDiscussions.splice(i, 1);
        setDiscussions(newDiscussions);
        setDropdownOpen(null);
        handleCancelUpdateDiscussion();
    }


    const handleEdit = (i: number) => {
        setDiscussionBeingEdited(i);
        setEditedDiscussionTitle(discussions[i].title);
        setEditedDiscussionDescription(discussions[i].description);
    }


    const handleUpdateDiscussion = () => {
        if (discussionBeingEdited !== null) {
            const curr = discussions[discussionBeingEdited];
            
            if (curr !== null && (curr.title !== editedDiscussionTitle || curr.description !== editedDiscussionDescription)) {
                const newDiscussions = [...discussions];
                newDiscussions[discussionBeingEdited] = {
                    title: editedDiscussionTitle,
                    author: curr.author,
                    time: getCurrDateTime(),
                    description: editedDiscussionDescription,
                    comments: curr.comments
                };
                setDiscussions(newDiscussions);
                setEditedDiscussionTitle("");
                setEditedDiscussionDescription("");
                setDiscussionBeingEdited(null);
            }
        }
    };


    const handleCancelUpdateDiscussion = () => {
        setEditedDiscussionTitle("");
        setEditedDiscussionDescription("");
        setDiscussionBeingEdited(null);
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


    return (<>

        <div className="bg-white w-full p-4 text-black">

            <div className="p-4 rounded border border-gray-300">
                <h2 className="text-2xl font-bold">Discussions</h2>
            </div>

            {!discussionIsSelected && (
                <div>
                    <div className="py-4 mb-4">
                        <button
                            className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-500 rounded shadow"
                            onClick={() => setIsFormExpanded(!isFormExpanded)}
                        >
                            {isFormExpanded ? "Cancel" : "New Discussion"}
                        </button>
                        {isFormExpanded && (
                            <div className="mt-4">
                                <textarea
                                    className="bg-white w-full p-2 mb-2 border rounded"
                                    rows={1}
                                    value={newDiscussionTitle}
                                    onChange={(e) => setNewDiscussionTitle(e.target.value)}
                                    placeholder="Enter discussion title"
                                ></textarea>
                                <textarea
                                    className="bg-white w-full p-2 mb-2 border rounded"
                                    rows={3}
                                    value={newDiscussionDescription}
                                    onChange={(e) => setNewDiscussionDescription(e.target.value)}
                                    placeholder="Enter description"
                                ></textarea>
                                <button
                                    className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-500 rounded shadow"
                                    onClick={handleAddDiscussion}
                                >Submit</button>
                            </div>
                        )}
                    </div>


                    <div>
                        {discussions.length === 0 ? (
                            <p>No discussions yet.</p>
                        ) : (
                            discussions.map((discussion, i) => (
                                <div key={i} 
                                className="m-4 p-4 rounded border border-gray-300 hover:bg-gray-200 hover:cursor-pointer"
                                onClick={() => handleSetCurrentDiscussion(discussion)}>
                                    <div className="flex justify-between items-center">
                                        <p className="mb-2"><strong>{discussion.title}</strong></p>
                                        <div className="relative">
                                            <button
                                                onClick={(e) => {e.stopPropagation(); toggleDropdown(i)}}
                                                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm text-gray-700 hover:bg-gray-200"
                                            >...</button>
                                            {dropdownOpen === i && (
                                                <div className="origin-top-right absolute right-0 mt-2 rounded-md">
                                                    <div className="py-1">
                                                        <button
                                                            onClick={(e) => {e.stopPropagation(); handleEdit(i); toggleDropdown(i)}}
                                                            className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-500 rounded shadow"
                                                        >Edit</button>
                                                        <button
                                                            onClick={(e) => {e.stopPropagation(); handleDelete(i); toggleDropdown(i)}}
                                                            className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-500 rounded shadow"
                                                        >Delete</button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {
                                        (discussionBeingEdited === null || discussionBeingEdited !== i) ? (
                                            <div>
                                                <p>{discussion.author}</p>
                                                <p>{timeAgo(discussion.time)}</p>
                                                <p>{discussion.description}</p>
                                                <p>{discussion.comments.length} comments</p>
                                            </div>
                                        ) : (
                                            <div>
                                                <label>Title: </label><textarea
                                                    className="bg-white w-full p-2 mb-2 border rounded"
                                                    rows={1}
                                                    value={editedDiscussionTitle}
                                                    onChange={(e) => {e.stopPropagation(); setEditedDiscussionTitle(e.target.value)}}
                                                >{discussion.title}</textarea>
                                                <label>Description: </label><textarea
                                                    className="bg-white w-full p-2 mb-2 border rounded"
                                                    value={editedDiscussionDescription}
                                                    onChange={(e) => {e.stopPropagation(); setEditedDiscussionDescription(e.target.value)}}
                                                >{discussion.description}</textarea>
                                                <button
                                                    className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-500 rounded shadow"
                                                    onClick={(e) => {e.stopPropagation(); handleCancelUpdateDiscussion()}}
                                                >Cancel</button>
                                                <button
                                                    className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-500 rounded shadow ml-2"
                                                    onClick={(e) => {e.stopPropagation(); handleUpdateDiscussion()}}
                                                >Submit</button>
                                            </div>
                                        )
                                    }
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {discussionIsSelected && currentDiscussion != null && (
                <div className="py-4">
                    <button
                        className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-500 rounded shadow"
                        onClick={handleDeselectCurrentDiscussion}
                    >Go Back</button>
                    <Discussion discussion={currentDiscussion} />
                </div>
            )}

        </div>
        
        </>)
}
