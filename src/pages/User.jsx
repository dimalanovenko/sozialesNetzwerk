import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {getUser} from "../features/userSlice.js";
import ava from "../assets/ava.png";
import {follow, unfollow} from "../features/followSlice.js";
import Loading from "../components/Loading.jsx";

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

    const isLoading = useSelector(state => state.users.isLoading)

    return isLoading ? (<Loading/>) : (
        <section className="flex flex-col justify-between">
            <ul className="mt-20 flex flex-col items-center gap-3.5">
                <img
                    className="w-40 h-40 rounded-full"
                    src={user.avatar === "" ? ava : user.avatar}
                    alt="avatar"
                />
                <li className="flex flex-col items-center text-[#27364B] text-2xl font-bold">
                    {user.fullName}
                </li>
                <li className="flex flex-col items-center text-[#5D6778] text-xl">
                    {'@' + user.username}
                </li>
                <li className="w-[90%] lg:w-full mx-auto text-center flex-col items-center text-lg text-[#4B5669]">
                    {user.bio}
                </li>
                <li className="flex flex-col items-center text-lg text-[#4B5669]">
                    <span className="text-[#27364B] text-2xl font-medium">
                        {user.posts_count}
                    </span>
                    Posten
                </li>
                <li className="flex flex-col items-center text-lg text-[#4B5669]">
                    <span className="text-[#27364B] text-2xl font-medium">
                        {followers}
                    </span>
                    Verfolger
                </li>
                <li className="flex flex-col items-center text-lg text-[#4B5669]">
                    <span className="text-[#27364B] text-2xl font-medium">
                        {user.following}
                    </span>
                    Verfolgte
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
                            className="bg-[#4C68D5] text-white rounded-2xl py-2 px-4 cursor-pointer mt-5">
                            nicht folgen
                        </button>
                        :
                        <button
                            onClick={() => {
                                setFollowed(true)
                                dispatch(follow(user.username))
                                setFollowers((prev) => prev + 1);
                                localStorage.setItem(`is_${username}_followed`, "true");
                            }}
                            className="bg-[#4C68D5] text-white rounded-2xl py-2 px-4 cursor-pointer mt-5 lg:mb-0 mb-30">
                            folgen
                        </button>
                    }
                </li>
            </ul>
        </section>
    )
}

export default User
