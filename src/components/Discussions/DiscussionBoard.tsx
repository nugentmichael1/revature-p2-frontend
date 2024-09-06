

import { useState, useEffect } from "react";
import Discussion from "./Discussion";
import { useAppContext } from "../../contexts/AppContext";
import axios from 'axios';


type DiscussionType = {
    discussionBoardId?: number,
    courseId: number,
    discussionBoardTitle: string,
    userId: number,
    discussionBoardDescription: string,
    discussionPosts?: []
}

type DiscussionBoardProps = {
    courseId: number
}


export default function DiscussionBoard({ courseId }: DiscussionBoardProps ) {
    const url = import.meta.env.VITE_APP_API_URL;
    const { state } = useAppContext();
    const [errorMessage, setErrorMessage] = useState("");

    const [usernamesById, setUsernamesById] = useState<{[key: number]: string}>({});
    
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
			const response = await axios.get(`${url}/discussion_board/${courseId}`);
            if (response.headers['content-type'].includes('application/json')) {

                setDiscussions(response.data);

                if (Object.keys(usernamesById).length === 0) {
                    getUsernames();
                }

            } else {
                throw Error("Unexpected response type");
            }
		} catch (error) {
			console.error("Error getting discussions: ", error);
            setErrorMessage("Error getting discussions")
		}
    }


    const getUsernames = async () => {
        try {
            const response = await axios.get(`${url}/user`);
            if (response.headers['content-type'].includes('application/json')) {
                const data = response.data;
                const newUserNamesById: {[key: number]: string} = {};

                for (let i = 0; i < data.length; i++) {
                    newUserNamesById[data[i].id] = data[i].username;
                }

                setUsernamesById(newUserNamesById);

            }
        } catch (error) {
            console.error("Error getting usernames: ", error);
        }
    }


    const toggleDropdown = (i: number) => {
        setDropdownOpen(dropdownOpen === i ? null : i);
    };


    const handleAddDiscussion = async () => {
        if (newDiscussionTitle && state.user != null) {

            const newDiscussion: DiscussionType = {
                courseId: courseId,
                userId: state.user.id, 
                discussionBoardTitle: newDiscussionTitle, 
                discussionBoardDescription: newDiscussionDescription
            };

            try {
                await axios.post(`${url}/discussion_board`, newDiscussion);

                newDiscussion.discussionPosts = [];
                setDiscussions([...discussions, newDiscussion]);
                setNewDiscussionTitle("");
                setNewDiscussionDescription("");
                setIsFormExpanded(false);

                getDiscussions();

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
        getDiscussions();
    };


    const handleDelete = async (i: number) => {

        try {
			await axios.delete(`${url}/discussion_board/${discussions[i].discussionBoardId}`);
			
            const newDiscussions = [...discussions];
            newDiscussions.splice(i, 1);
            setDiscussions(newDiscussions);
            setDropdownOpen(null);
            handleCancelUpdateDiscussion();

		} catch (error) {
			console.error("Error deleting discussion: ", error);
            setErrorMessage("Error deleting discussion")
		}
    }


    const handleEdit = (i: number) => {
        setDiscussionBeingEdited(i);
        setEditedDiscussionTitle(discussions[i].discussionBoardTitle);
        setEditedDiscussionDescription(discussions[i].discussionBoardDescription);
    }


    const handleUpdateDiscussion = async () => {
        if (discussionBeingEdited !== null) {
            const curr = discussions[discussionBeingEdited];
            
            if (curr !== null && (curr.discussionBoardTitle !== editedDiscussionTitle || curr.discussionBoardDescription !== editedDiscussionDescription)) {
                const newDiscussions = [...discussions];
                newDiscussions[discussionBeingEdited] = {
                    courseId: courseId,
                    userId: curr.userId,
                    discussionBoardTitle: editedDiscussionTitle,
                    discussionBoardDescription: editedDiscussionDescription
                };

                try {
                    await axios.put(`${url}/discussion_board/${discussions[discussionBeingEdited].discussionBoardId}`, newDiscussions[discussionBeingEdited]);

                    setDiscussions(newDiscussions);
                    setEditedDiscussionTitle("");
                    setEditedDiscussionDescription("");
                    setDiscussionBeingEdited(null);

                    getDiscussions();

                } catch (error) {
                    console.error("Error updating discussion: ", error);
                    setErrorMessage("Error updating discussion")
                }
            }
        }
    };


    const handleCancelUpdateDiscussion = () => {
        setEditedDiscussionTitle("");
        setEditedDiscussionDescription("");
        setDiscussionBeingEdited(null);
    }


    useEffect(() => {

        getDiscussions();

        if (state.user === null) {
            setAddDiscussionErrorMessage("Must be logged in to add a discussion.");
        }
    }, []);


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
                                        <p className="text-xl font-bold">{discussion.discussionBoardTitle}</p>
                                        {state.user !== null && (state.user.role === "EDUCATOR" || state.user.role === "INSTITUTION"|| state.user.id === discussion.userId) && (
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
                                                <p className="text-xl mt-2">{discussion.discussionBoardDescription}</p>
                                                <p className="mt-2">created by: {usernamesById[discussion.userId]}</p>
                                                <p>{(discussion.discussionPosts != undefined) ? discussion.discussionPosts.length : 0} comments</p>
                                            </div>
                                        ) : (
                                            <div>
                                                <label>Title: </label><textarea
                                                    className="bg-white w-full p-2 mb-2 border rounded"
                                                    rows={1}
                                                    value={editedDiscussionTitle}
                                                    onChange={(e) => {e.stopPropagation(); setEditedDiscussionTitle(e.target.value)}}
                                                >{discussion.discussionBoardTitle}</textarea>
                                                <label>Description: </label><textarea
                                                    className="bg-white w-full p-2 mb-2 border rounded"
                                                    value={editedDiscussionDescription}
                                                    onChange={(e) => {e.stopPropagation(); setEditedDiscussionDescription(e.target.value)}}
                                                >{discussion.discussionBoardDescription}</textarea>
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
                    <Discussion discussion={currentDiscussion} usersById={usernamesById}/>
                </div>
            )}

        </div>
        
        </>)
}
