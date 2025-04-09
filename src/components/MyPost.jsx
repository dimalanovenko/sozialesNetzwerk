import ava from "../assets/ava.png";
import {MdDelete} from "react-icons/md";
import {deletePost} from "../features/feedSlice.js";
import {useDispatch} from "react-redux";
import {useState} from "react";

const MyPost = ({myPost}) => {

    const dispatch = useDispatch();
    const [isVisible, setIsVisible] = useState(true);

    const handleDelete = (postId) => {
        setIsVisible(false);

        dispatch(deletePost(postId))
            .unwrap()
            .catch((err) => {
                console.error("Ошибка при удалении:", err);
                setIsVisible(true);
            });
    };

    const getVideoUrl = (url) => {
        if (!url) return '';

        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const separator = url.includes('?') ? '&' : '?';
            return `${url}${separator}autoplay=1&mute=1`;
        }

        return url;
    };

    if (!isVisible) return null;

    return (
        <li
            className="w-full max-w-full flex flex-col items-start gap-3
            bg-white pb-4 shadow-md"
            key={myPost._id}
        >

            <div className="flex gap-3 items-center justify-between w-[90%] mx-auto text-[#0C1024]">
                <div className='flex items-center gap-2'>
                    <img
                        className="h-15 w-15 object-cover rounded-full"
                        src={myPost.user[0].avatar || ava}
                        alt="Profilbild"
                    />
                    <div className="flex flex-col">
                        <span className="font-bold">
                            {myPost.user[0].username}
                        </span>
                        <span
                            className='text-sm text-[#27364B]'
                        >
                        {myPost.user[0].fullName}
                        </span>
                    </div>
                </div>
                    <div onClick={() => handleDelete(myPost._id)}>
                        <MdDelete className="h-6 w-6 text-red-400 cursor-pointer"/>
                    </div>
            </div>

            {myPost.image ? (
                <img
                    className="w-full object-cover max-h-[500px]"
                    src={myPost.image}
                    alt="Beitragsbild"
                    loading="lazy"
                />
            ) : (
                <div className="w-full aspect-video">
                    <iframe
                        className="w-full h-full"
                        src={getVideoUrl(myPost.video)}
                        title="Video-Beitrag"
                        allowFullScreen
                    />
                </div>
            )}

            <div className="w-full px-3">
                <h2 className="font-bold text-[#0C1024] mb-1">
                    {myPost.title}
                </h2>
                <p className="text-[#0C1024] text-sm">
                    {myPost.description}
                </p>
            </div>
        </li>
    )
}

export default MyPost