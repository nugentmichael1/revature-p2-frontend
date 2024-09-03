

import { useState, useEffect } from "react";
import Discussion from "./Discussion";
import { useAppContext } from "../../contexts/AppContext";
import axios from 'axios';


type DiscussionType = {
    id?: number,
    title: string,
    author: string,
    time: string,
    description: string,
    comments: []
}

type DiscussionBoardProps = {
    courseId: number
}


export default function DiscussionBoard({ courseId }: DiscussionBoardProps ) {
    const url = import.meta.env.VITE_APP_API_URL;
    const { state } = useAppContext();
    const [errorMessage, setErrorMessage] = useState("");
    
    const [discussions, setDiscussions] = useState<DiscussionType[]>([]);
    const [discussionIsSelected, setDiscussionIsSelected] = useState(false);
    const [currentDiscussion, setCurrentDiscussion] = useState<DiscussionType | null>(null);
    const [addDiscussionErrorMessage, setAddDiscussionErrorMessage] = useState("");

    const [isFormExpanded, setIsFormExpanded] = useState(false);
    const [newDiscussionTitle, setNewDiscussionTitle] = useState("");
    const [newDiscussionDescription, setNewDiscussionDescription] = useState("");

    const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

    const [discussionBeingEdited, setDiscussionBeingEdited] = useState<number | null>(null);
    const [editedDiscussionTitle, setEditedDiscussionTitle] = useState("");
    const [editedDiscussionDescription, setEditedDiscussionDescription] = useState("");



    const getDiscussions = async () => {
        try {
			const response = await axios.get(`${url}/discussion/${courseId}`);
			setDiscussions(response.data);
		} catch (error) {
			console.error("Error getting discussions: ", error);
            setErrorMessage("Error getting discussions")
		}
    }


    const toggleDropdown = (i: number) => {
        setDropdownOpen(dropdownOpen === i ? null : i);
    };


    const handleAddDiscussion = async () => {
        if (newDiscussionTitle && state.user != null) {

            const newDiscussion: DiscussionType = {
                title: newDiscussionTitle, 
                author: state.user.username !== null ? state.user.username : "null", 
                time: getCurrDateTime(), 
                description: newDiscussionDescription, 
                comments: []};

            setDiscussions([...discussions, newDiscussion]);
            setNewDiscussionTitle("");
            setNewDiscussionDescription("");
            setIsFormExpanded(false);

            try {
                const response = await axios.post(`${url}/discussion/${courseId}`, newDiscussion);
                //setDiscussions(response.data);
            } catch (error) {
                console.error("Error adding discussion: ", error);
                setErrorMessage("Error adding discussion")
            }
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


    const handleDelete = async (i: number) => {
        const newDiscussions = [...discussions];
        newDiscussions.splice(i, 1);
        setDiscussions(newDiscussions);
        setDropdownOpen(null);
        handleCancelUpdateDiscussion();

        try {
			const response = await axios.delete(`${url}/discussion/${i}`);
			//setDiscussions(response.data);
		} catch (error) {
			console.error("Error deleting discussion: ", error);
            setErrorMessage("Error deleting discussion")
		}
    }


    const handleEdit = async (i: number) => {
        setDiscussionBeingEdited(i);
        setEditedDiscussionTitle(discussions[i].title);
        setEditedDiscussionDescription(discussions[i].description);
        
        try {
			const response = await axios.put(`${url}/discussion/${i}`, (discussions[i].title, discussions[i].description));
			//setDiscussions(response.data);
		} catch (error) {
			console.error("Error updating discussion: ", error);
            setErrorMessage("Error updating discussion")
		}
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


    useEffect(() => {

        // state.user = {
        //     id: 1,
        //     username: "temp",
        //     email: "",
        //     password: "",
        //     role: "EDUCATOR",
        // }

        getDiscussions();

        if (state.user === null) {
            setAddDiscussionErrorMessage("Must be logged in to add a discussion.");
        }
    }, []);


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

            <p className="text-red-700">{errorMessage}</p>

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
                                <p className="text-red-700">{addDiscussionErrorMessage}</p>
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
                                        {state.user !== null && (state.user.role === "EDUCATOR" || state.user.role === "INSTITUTION"|| state.user.username === discussion.author) && (
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
                                        )}
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
