import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {createPost} from "../features/createPostSlice.js";
import ava from "../assets/ava.png";
import {getPosts} from "../features/feedSlice.js";
import {getProfile} from "../features/profileSlice.js";

const AddPost = () => {
    const dispatch = useDispatch();

    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [mediaType, setMediaType] = useState('');
    const [showUrlInput, setShowUrlInput] = useState(false);

    useEffect(() => {
        dispatch(getProfile());
    }, []);

    const myProfile = useSelector(state => state.profile.profile);

    const handleSubmit = () => {
        if (!description.trim()) return;

        dispatch(createPost({
            title: "",
            description,
            status: "PUBLISHED",
            image: mediaType === 'image' ? imageUrl : null,
            video: mediaType === 'video' ? videoUrl : null,
        }));

        setDescription('');
        setImageUrl('');
        setVideoUrl('');
        setMediaType('');
        setShowUrlInput(false);

        dispatch(getPosts());
    };

    const toggleUrlInput = () => {
        if (showUrlInput) {
            setImageUrl('');
            setVideoUrl('');
            setMediaType('');
        }
        setShowUrlInput(!showUrlInput);
    };

    return (
        <div className='w-full bg-white mt-20 lg:mt-0 lg:mb-8 lg:py-2 lg:rounded-lg shadow-md'>
            <div className="w-[90%] mx-auto flex items-start justify-around gap-2 pb-2 pt-4">
                <img
                    className="w-14 h-14 rounded-full mr-2"
                    src={myProfile.avatar === "" ? ava : myProfile.avatar}
                    alt="ava"
                />
                <div className="flex flex-col gap-5 w-full">
                    <input
                        placeholder="Was hast du auf dem Herzen?"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full text-[#838B98] text-sm font-normal focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-sm mt-4 py-1 pl-2"
                        type="text"
                    />
                    {showUrlInput && (
                        <div className="flex flex-col gap-2">
                            <select
                                value={mediaType}
                                onChange={(e) => {
                                    setMediaType(e.target.value);
                                    setImageUrl('');
                                    setVideoUrl('');
                                }}
                                className="w-full text-sm text-[#838B98] border border-gray-300 rounded-sm py-1 pl-2 "
                            >
                                <option value="">Media-Typ wählen</option>
                                <option value="image">Bild</option>
                                <option value="video">Video</option>
                            </select>

                            {mediaType === 'image' && (
                                <input
                                    placeholder="Bild-URL eingeben"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    className="w-full text-[#838B98] text-sm border border-gray-300 rounded-sm py-1 pl-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    type="url"
                                />
                            )}

                            {mediaType === 'video' && (
                                <input
                                    placeholder="Video-URL eingeben"
                                    value={videoUrl}
                                    onChange={(e) => setVideoUrl(e.target.value)}
                                    className="w-full text-[#838B98] text-sm border border-gray-300 rounded-sm py-1 pl-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    type="url"
                                />
                            )}
                        </div>
                    )}

                    <hr className='w-full h-0.25 border-[#E2E8F0]'/>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <button
                                className="flex items-center cursor-pointer"
                                onClick={toggleUrlInput}
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M15.8333 2.5H4.16667C3.24619 2.5 2.5 3.24619 2.5 4.16667V15.8333C2.5 16.7538 3.24619 17.5 4.16667 17.5H15.8333C16.7538 17.5 17.5 16.7538 17.5 15.8333V4.16667C17.5 3.24619 16.7538 2.5 15.8333 2.5Z"
                                        stroke="#27364B" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path
                                        d="M7.08331 8.33331C7.77367 8.33331 8.33331 7.77367 8.33331 7.08331C8.33331 6.39296 7.77367 5.83331 7.08331 5.83331C6.39296 5.83331 5.83331 6.39296 5.83331 7.08331C5.83331 7.77367 6.39296 8.33331 7.08331 8.33331Z"
                                        stroke="#27364B" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M17.5 12.5L13.3334 8.33331L4.16669 17.5" stroke="#27364B" strokeWidth="1.75"
                                          strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span className="text-left text-[#27364B] text-md ml-2">
                                    {imageUrl ? 'Media verknüpft' : 'Media verknüpfen'}
                                </span>
                            </button>
                        </div>
                        <button
                            className="bg-[#4C68D5] text-white rounded-2xl cursor-pointer w-[71px] h-[32px] font-medium text-sm disabled:opacity-50"
                            onClick={handleSubmit}
                            disabled={!description.trim()}
                        >
                            Posten
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPost;