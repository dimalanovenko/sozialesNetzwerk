import {Link} from "react-router";
import {logout} from "../features/authSlice.js";
import {RxExit} from "react-icons/rx";
import Nav from "../components/Nav.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {getUser} from "../features/userSlice.js";
import ava from "../assets/img/ava.png";
import {follow, unfollow} from "../features/followSlice.js";

const User = () => {
    const {username} = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.user);
    const [followed, setFollowed] = useState(false);
    const [followers, setFollowers] = useState(user.followers);

    useEffect(() => {
        dispatch(getUser(username))
    }, [dispatch, username])

    useEffect(() => {
        const savedFollow = localStorage.getItem(`is_${username}_followed`);

        if (savedFollow === "true") {
            setFollowed(true);
        }
    }, [user.username]);

    useEffect(() => {
        setFollowers(user.followers);
    }, [dispatch, user.followers])

    return (
        <div className="flex flex-col items-center justify-between">
            <div>
                <ul className="mt-40 flex flex-col gap-3">
                    <img
                        className="w-40 h-40 rounded-full text-white text-center"
                        src={user.avatar === "" ? ava : user.avatar}
                        alt="avatar"
                    />
                    <li className="flex flex-col items-center text-teal-400 text-2xl font-bold">
                        username:
                        <span className="text-white text-sm font-medium">
                        {user.username}
                    </span>
                    </li>
                    <li className="flex flex-col items-center text-teal-400 text-2xl font-bold">
                        followers:
                        <span className="text-white text-sm font-medium">
                        {followers}
                    </span>
                    </li>
                    <li className="flex flex-col items-center text-teal-400 text-2xl font-bold">
                        following:
                        <span className="text-white text-sm font-medium">
                        {user.following}
                    </span>
                    </li>
                    <li className="flex flex-col items-center gap-5">
                        {followed ?
                            <button
                                onClick={() => {
                                    setFollowed(false)
                                    dispatch(unfollow(user.username))
                                    setFollowers((prev) => prev - 1);
                                    localStorage.setItem(`is_${username}_followed`, "false");
                                }}
                                className="bg-zinc-800 text-teal-400 rounded-2xl py-2 px-4 cursor-pointer mt-5
                                hover:bg-teal-400 hover:text-zinc-800">
                                unfollow
                            </button>
                            :
                            <button
                                onClick={() => {
                                    setFollowed(true)
                                    dispatch(follow(user.username))
                                    setFollowers((prev) => prev + 1);
                                    localStorage.setItem(`is_${username}_followed`, "true");
                                }}
                                className="bg-zinc-800 text-teal-400 rounded-2xl py-2 px-4 cursor-pointer mt-5
                                hover:bg-teal-400 hover:text-zinc-800">
                                follow
                            </button>
                        }
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default User
