import ava from "../assets/img/ava.png";
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

    if (!isVisible) return null;

    return (
        <li
            className="flex flex-col items-start justify-between gap-2
            bg-zinc-800 shadow-lg rounded-lg"
            key={myPost._id}
        >
                <div className="flex items-center gap-2 text-white font-bold mt-2 ml-2">
                        <img
                            className="h-8 w-8 rounded-full"
                            src={myPost.user[0].avatar !== '' ? myPost.user[0].avatar : ava}
                            alt="logo"
                        />
                        {myPost.user[0].username}
                        <div onClick={() => handleDelete(myPost._id)}>
                            <MdDelete className="h-6 w-6 text-red-400 cursor-pointer ml-25"/>
                        </div>
                </div>
            <img className="w-75" src={myPost.image} alt=""/>
            <div className="flex flex-col items-center justify-between text-white">
                <h1 className="text-left text-md w-70 ml-2">
                    <span className="font-bold mr-2">
                        {myPost.user[0].username}
                    </span>
                    <br/>
                    {myPost.title}
                </h1>
                <p className="text-left text-sm w-70 mb-2 ml-2">
                    {myPost.description}
                </p>
            </div>
        </li>
    )
}

export default MyPost