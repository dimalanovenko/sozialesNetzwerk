import {Link} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../features/userSlice.js";
import ava from "../assets/ava.png";

const UserList = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.usersArr);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [value, setValue] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);


    useEffect(() => {
        dispatch(getUsers());
    }, []);

    useEffect(() => {
        const filtered = users.filter(user =>
            user.username.toLowerCase().trim().includes(value.toLowerCase().trim())
        );
        setFilteredUsers(filtered);
    }, [value, users]);

    const handleBlur = () => {
        setTimeout(() => setIsFocused(false), 150);
    };

    return (
        <section className='w-full'>
            <div className="relative lg:w-full w-9/10 mx-auto lg:mx-0 lg:h-24 lg:flex lg:items-center">
                <svg
                    width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none lg:mt-0 mt-2 lg:ml-3"
                >
                    <path
                        d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
                        stroke="#5D6778" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17.5 17.5L13.875 13.875" stroke="#5D6778" strokeWidth="1.75" strokeLinecap="round"
                          strokeLinejoin="round"/>
                </svg>

                <input
                    ref={inputRef}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={handleBlur}
                    className="lg:pl-15 pl-10 text-gray-600 border border-[#E2E8F0] rounded-lg lg:mt-0 mt-5 py-2 px-4 lg:h-11 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-transparent"
                    type="text"
                    placeholder="Suchen"
                />
            </div>


            {isFocused && (
                <ul className="lg:w-4/10 lg:absolute lg:mt-[-1rem] mt-2 mx-auto w-9/10 max-h-64 overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                    {filteredUsers.length === 0 ? (
                            <li className="p-4 text-center text-gray-400">
                                Nicht gefunden
                            </li>
                        )
                        :
                        (
                            filteredUsers.map((user) => (
                                <li className='lg:w-full' key={user._id}>
                                    <Link to={isMobile ? `/search/${user.username}` : `/feed/${user.username}`}>
                                        <div className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer">
                                            <img
                                                className="w-10 h-10 rounded-full"
                                                src={user.avatar || ava}
                                                alt="avatar"
                                            />
                                            <span className="text-[#0C1024] font-medium">{user.username}</span>
                                        </div>
                                    </Link>
                                </li>
                            ))
                        )}
                </ul>
            )}
        </section>
    );
};

export default UserList;
