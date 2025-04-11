import ava from "../assets/ava.png";
import {AiFillLike, AiOutlineLike} from "react-icons/ai";
import {deleteLike, postLike} from "../features/likeSlice.js";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

const Post = ({post}) => {
    const dispatch = useDispatch();
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(post.likes.length);

    useEffect(() => {
        const savedLike = localStorage.getItem(`post_${post._id}_liked`);
        if (savedLike === "true") setIsLiked(true);
    }, [post._id]);

    useEffect(() => {
        setLikesCount(post.likes.length);
    }, [post.likes.length]);

    const handleLikeById = (id) => {
        if (isLiked) {
            dispatch(deleteLike(id));
            setLikesCount((prev) => prev === 0 ? 0 : prev - 1);
            localStorage.setItem(`post_${post._id}_liked`, "false");
        } else {
            dispatch(postLike(id));
            setLikesCount((prev) => prev + 1);
            localStorage.setItem(`post_${post._id}_liked`, "true");
        }
        setIsLiked(!isLiked);
    };

    const getVideoUrl = (url) => {
        if (!url) return '';

        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const separator = url.includes('?') ? '&' : '?';
            return `${url}${separator}autoplay=1&mute=1`;
        }

        return url;
    };

    return (
        <li
            className="w-full max-w-full flex flex-col items-start gap-3
            bg-white pb-4 shadow-md lg:rounded-lg"
            key={post._id}
        >

            <div className="flex gap-3 items-center w-full p-3 text-[#0C1024]">
                <img
                    className="h-15 w-15 object-cover rounded-full"
                    src={post.user[0].avatar || ava}
                    alt="Profilbild"
                />
                <div className="flex flex-col">
                    <span className="font-bold">{post.user[0].username}</span>
                    <span className='text-sm text-[#27364B]'>
                        {post.user[0].fullName}
                    </span>
                </div>
            </div>

            {post.image ? (
                <img
                    className="w-full object-cover max-h-[500px]"
                    src={post.image}
                    alt="Beitragsbild"
                    loading="lazy"
                />
            ) : (
                <div className="w-full aspect-video">
                    <iframe
                        className="w-full h-full"
                        src={getVideoUrl(post.video)}
                        title="Video-Beitrag"
                        allowFullScreen
                    />
                </div>
            )}

            <div className="w-full px-3">
                <h2 className="font-bold text-[#0C1024] mb-1">
                    {post.title}
                </h2>
                <p className="text-[#0C1024] text-sm">
                    {post.description}
                </p>
            </div>

            <div className="flex items-center gap-2 w-full px-3">
                <button
                    onClick={() => handleLikeById(post._id)}
                    className="flex items-center gap-1 cursor-pointer"
                    aria-label={isLiked ? "Like entfernen" : "Like hinzufügen"}
                >
                    {isLiked ? (
                        <AiFillLike className="w-6 h-6 text-[#0C1024]"/>
                    ) : (
                        <AiOutlineLike className="w-6 h-6 text-[#5D6778]"/>
                    )}
                    <span className="text-[#27364B] text-sm pt-1">
                        {likesCount} {isLiked ? 'gefällt' : 'gefällt nicht'}
                    </span>
                </button>
            </div>
        </li>
    )
}

export default Post;