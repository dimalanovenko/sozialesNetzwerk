import {Link} from "react-router";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../features/userSlice.js";
import ava from "../assets/img/ava.png"

const UserList = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.usersArr);

    const [value, setValue] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        dispatch(getUsers());
    }, [])

    useEffect(() => {
        const filtered = users.filter(user =>
            user.username.toLowerCase().trim().includes(value.toLowerCase().trim())
        );
        setFilteredUsers(filtered);
    }, [value, users]);

    return (
        <div className="flex flex-col items-center justify-between h-full">
            <div className="text-white bg-zinc-900">
                <div className="flex fixed bg-zinc-900">
                    <input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="fixed border border-teal-400 rounded-lg mt-10 mb-3 py-1 px-2 w-70"
                        type="text"
                        placeholder="Search"
                    />
                </div>
                <ul className="flex flex-col gap-2 text-white overflow-scroll my-20">
                    {filteredUsers.map((user) => (
                        <li
                            className="mt-2 w-70"
                            key={user._id}>
                            <Link to={user.username}>
                                <div
                                    className="flex items items-center gap-2 bg-zinc-800 rounded-lg p-2 cursor-pointer">
                                    <img
                                        className="w-10 h-10 rounded-full"
                                        src={user.avatar || ava}
                                        alt="avatar"
                                    />
                                    <h1>{user.username}</h1>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default UserList
