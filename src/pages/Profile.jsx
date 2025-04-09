import {useDispatch, useSelector} from "react-redux";
import {getProfile} from "../features/profileSlice.js";
import {useEffect} from "react";
import ava from "../assets/img/ava.png"
import {getMyPosts} from "../features/feedSlice.js";
import MyPost from "../components/MyPost.jsx";
import {FaPencilAlt} from "react-icons/fa";
import {useNavigate} from "react-router";

const Profile = () => {
    const dispatch = useDispatch();
    const myProfile = useSelector(state => state.profile.profile);
    const myId = useSelector(state => state.profile.profile._id);
    const myPosts = useSelector(state => state.feed.filteredMyPosts);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getProfile());
        if (myId) {
            dispatch(getMyPosts(myId));
        }
    }, [myId, dispatch, myPosts.length]);

    const handleChangeProfile = () => {
        navigate("/profile/change");
    }

    return (
        <div className="flex flex-col items-center justify-between">
            <ul className="mt-10 flex flex-col gap-3">
                <img
                    className="w-40 h-40 rounded-full"
                    src={myProfile.avatar === "" ? ava : myProfile.avatar}
                    alt="ava"/>
                <li className="flex flex-col items-center text-teal-400 text-2xl font-bold">
                    username:
                    <span className="text-white text-sm font-medium">
                        {myProfile.username}
                    </span>
                </li>
                <li className="flex flex-col items-center text-teal-400 text-2xl font-bold">
                    followers:
                    <span className="text-white text-sm font-medium">
                        {myProfile.followers}
                    </span>
                </li>
                <li className="flex flex-col items-center text-teal-400 text-2xl font-bold">
                    following:
                    <span className="text-white text-sm font-medium">
                        {myProfile.following}
                    </span>
                </li>
            </ul>
            <button
                onClick={() => {handleChangeProfile()}}
                className="flex items-center gap-2 bg-zinc-800 text-teal-400 rounded-2xl py-2 px-4 cursor-pointer mt-5">
                <FaPencilAlt/>
                <span>Change Profile</span>
            </button>
            <ul className="flex flex-col items-center justify-between my-10 gap-5 mb-50">
                {myPosts.map((myPost) => (
                    <MyPost
                        myPost={myPost}
                        key={myPost._id}
                    />
                ))}
            </ul>
        </div>
    )
}

export default Profile
