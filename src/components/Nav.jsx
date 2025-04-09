import ava from "../assets/ava.png"

import {NavLink} from "react-router-dom";
import {GrTransaction} from "react-icons/gr";
import {useSelector} from "react-redux";

const Nav = () => {

    const myProfile = useSelector(state => state.profile.profile);

    return (
        <ul className="w-full py-5 bg-white flex justify-around fixed bottom-0 left-0 z-50 border-t border-gray-200">
            <NavLink to="/feed">
                {({ isActive }) => (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M2.5 7.5L10 1.66667L17.5 7.5V16.6667C17.5 17.1087 17.3244 17.5326 17.0118 17.8452C16.6993 18.1577 16.2754 18.3333 15.8333 18.3333H4.16667C3.72464 18.3333 3.30072 18.1577 2.98816 17.8452C2.67559 17.5326 2.5 17.1087 2.5 16.6667V7.5Z"
                            stroke={isActive ? "#0C1024" : "#5D6778"}
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M7.5 18.3333V10H12.5V18.3333"
                            stroke={isActive ? "#0C1024" : "#5D6778"}
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
            </NavLink>
            <NavLink
                className={({isActive}) =>
                    isActive ? "text-[#0C1024]" : "text-[#838B98]"
                }
                to="/transaction"
            >
                <GrTransaction className="w-5 h-5 cursor-pointer"/>
            </NavLink>
            <NavLink to="/search">
                {({ isActive }) => (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
                            stroke={isActive ? "#0C1024" : "#5D6778"}
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M17.5 17.5L13.875 13.875"
                            stroke={isActive ? "#0C1024" : "#5D6778"}
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
            </NavLink>
            <NavLink
                className={({isActive}) =>
                    isActive ? "text-[#0C1024]" : "text-white"
                }
                to="/profile">
                <img
                    className="w-5 h-5 rounded-full"
                    src={myProfile.avatar === "" ? ava : myProfile.avatar}
                    alt="ava"/>
            </NavLink>
        </ul>
    )
}

export default Nav
