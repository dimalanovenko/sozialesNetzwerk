import ava from "../assets/ava.png"

import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {GrTransaction} from "react-icons/gr";
import {useSelector} from "react-redux";

const Nav = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const isProfileActive = location.pathname === '/profile';
    const isHomeActive = location.pathname === '/feed';

    const myProfile = useSelector(state => state.profile.profile);

    return (
        <ul className="w-full lg:w-1/5 lg:max-h-80 py-5 bg-white flex lg:flex-col justify-around fixed bottom-0 lg:top-35 left-0 lg:left-1/20 z-50 lg:z-0 lg:rounded-lg lg:shadow-md">
            <div className="hidden lg:block w-full rounded-xl overflow-hidden -mt-7 mb-5">

                <div className="lg:h-20 bg-cover lg:bg-center lg:bg-[url('https://i.ibb.co/bwBvx1q/bg.jpg')]"/>

                <div className="flex ml-8 -mt-10">
                    <img
                        className="w-20 h-20 rounded-full border-4 border-white"
                        src={myProfile.avatar.length >= 1 ? myProfile.avatar : null}
                        alt="Avatar"
                    />
                </div>

                <div className="lg:ml-8 lg:mt-4">
                    <h3 className="text-lg font-semibold text-gray-900">{myProfile.fullName}</h3>
                    <p className="text-sm text-gray-500">{myProfile.bio}</p>
                </div>
            </div>

            <li className='lg:flex lg:items-start lg:gap-2.5 lg:ml-8'>
                <NavLink to="/feed">
                    {({isActive}) => (
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
                <span
                    className={`hidden lg:flex lg:cursor-pointer ${
                        isHomeActive ? "text-[#0C1024]" : "text-[#5D6778]"
                    }`}
                    onClick={() => navigate('/feed')}
                >
                    Home
                </span>
            </li>
            <hr className='hidden lg:block lg:w-8/10 lg:border-t lg:border-[#E2E8F0]'/>
            <li className='lg:hidden'>
                <NavLink
                    className={({isActive}) =>
                        isActive ? "text-[#0C1024]" : "text-[#838B98]"
                    }
                    to="/transaction"
                >
                    <GrTransaction className="w-5 h-5 cursor-pointer"/>
                </NavLink>
            </li>

            <NavLink
                className='lg:hidden'
                to="/search">
                {({isActive}) => (
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
            <li className="lg:flex lg:items-start lg:gap-2.5 lg:ml-8">
                <NavLink
                    to="/profile"
                    className={({isActive}) => (isActive ? "text-[#0C1024]" : "lg:text-[#5D6778] text-white")}
                >
                    {({isActive}) => (
                        <>
                            <img
                                className="lg:hidden w-5 h-5 rounded-full"
                                src={myProfile.avatar === "" ? ava : myProfile.avatar}
                                alt="ava"
                            />
                            <svg
                                className="hidden lg:flex"
                                width="20"
                                height="21"
                                viewBox="0 0 20 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M16.6666 18V16.3333C16.6666 15.4493 16.3155 14.6014 15.6903 13.9763C15.0652 13.3512 14.2174 13 13.3333 13H6.66665C5.78259 13 4.93474 13.3512 4.30962 13.9763C3.6845 14.6014 3.33331 15.4493 3.33331 16.3333V18"
                                    stroke={isActive ? "#0C1024" : "#5D6778"}
                                    strokeWidth="1.75"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M10 9.66667C11.841 9.66667 13.3334 8.17428 13.3334 6.33333C13.3334 4.49238 11.841 3 10 3C8.15907 3 6.66669 4.49238 6.66669 6.33333C6.66669 8.17428 8.15907 9.66667 10 9.66667Z"
                                    stroke={isActive ? "#0C1024" : "#5D6778"}
                                    strokeWidth="1.75"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </>
                    )}
                </NavLink>

                <span
                    className={`hidden lg:flex lg:cursor-pointer ${
                        isProfileActive ? "text-[#0C1024]" : "text-[#5D6778]"
                    }`}
                    onClick={() => navigate('/profile')}
                >
                    Profile
                </span>
            </li>
        </ul>
    )
}

export default Nav
