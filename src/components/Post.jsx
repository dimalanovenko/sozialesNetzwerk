import ava from "../assets/img/ava.png";
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

        if (savedLike === "true") {
            setIsLiked(true);
        }
    }, [post._id]);

    useEffect(() => {
        setLikesCount(post.likes.length);
    }, [post.likes.length]);

    const handleLikeById = (id) => {
        if (isLiked) {
            dispatch(deleteLike(id));
            setLikesCount((prev) => prev - 1);
            localStorage.setItem(`post_${post._id}_liked`, "false");
        } else {
            dispatch(postLike(id));
            setLikesCount((prev) => prev + 1);
            localStorage.setItem(`post_${post._id}_liked`, "true");
        }
        setIsLiked(!isLiked);
    };

    return (
        <li
            className="flex flex-col items-start justify-between gap-2
            bg-white pb-5"
            key={post._id}
        >
            <span className="flex gap-2 items-center text-[#0C1024] font-bold mt-2 ml-2">
                <img
                    className="h-15 w-15 rounded-full"
                    src={post.user[0].avatar !== '' ? post.user[0].avatar : ava}
                    alt="logo"
                />
                <div className="flex flex-col">
                    <span>
                        {post.user[0].username}
                    </span>
                    <span className='text-sm text-[#27364B] font-normal'>
                        {post.user[0].fullName}
                    </span>
                </div>
            </span>
            {post.image ? (
                    <img className="w-full" src={post.image} alt=""/>
                )
                :
                (
                    <video src={post.video}></video>
                )
            }
            <div className="flex flex-col items-center justify-between text-[#0C1024]">
                <h1 className="text-left text-sm w-70 ml-2">
                    <span className="font-bold mr-2">
                        {post.user[0].username}
                    </span>
                    <br/>
                    {post.title}
                </h1>
                <p className="text-left text-sm w-70 mb-2 ml-2">
                    {post.description}
                </p>
            </div>
            <div className="flex flex-col-reverse items-center">
                <span className="text-[#27364B] m-2 mt-0">
                        {likesCount === 1 ? `${likesCount} like` : `${likesCount} likes`}
                </span>
                <div
                    onClick={() => handleLikeById(post._id)}
                    className="m-2 cursor-pointer"
                >
                    {isLiked ? (
                            <AiFillLike className="w-8 h-8 text-[#0C1024]"/>
                        )
                        :
                        (
                            <AiOutlineLike className="w-8 h-8 text-[#5D6778]"/>
                        )}
                </div>
            </div>
        </li>
    )
}

export default Post
