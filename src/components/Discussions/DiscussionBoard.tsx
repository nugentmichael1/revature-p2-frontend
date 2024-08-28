

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


    const toggleDropdown = (index: number) => {
        setDropdownOpen(dropdownOpen === index ? null : index);
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
        setCurrentDiscussion(discussion);
        setDiscussionIsSelected(true);
    };


    const handleDeselectCurrentDiscussion = () => {
        setDiscussionIsSelected(false);
        setCurrentDiscussion(null);
    };


    const handleDelete = (index: number) => {
        const newDiscussions = [...discussions];
        newDiscussions.splice(index, 1);
        setDiscussions(newDiscussions);
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
                            discussions.map((discussion, index) => (
                                <div key={index} 
                                className="m-4 p-4 rounded border border-gray-300 hover:bg-gray-200 hover:cursor-pointer"
                                onClick={() => handleSetCurrentDiscussion(discussion)}>
                                    <div className="flex justify-between items-center">
                                        <p className="mb-2"><strong>{discussion.title}</strong></p>
                                        <div className="relative">
                                            <button
                                                onClick={(e) => {e.stopPropagation(); toggleDropdown(index)}}
                                                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm text-gray-700 hover:bg-gray-200"
                                            >...</button>
                                            {dropdownOpen === index && (
                                                <div className="origin-top-right absolute right-0 mt-2 rounded-md">
                                                    <div className="py-1">
                                                        <button
                                                            onClick={(e) => {e.stopPropagation(); handleDelete(index)}}
                                                            className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-500 rounded shadow"
                                                        >Delete</button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <p>{discussion.author}</p>
                                    <p>{timeAgo(discussion.time)}</p>
                                    <p>{discussion.description}</p>
                                    <p>{discussion.comments.length} comments</p>
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
