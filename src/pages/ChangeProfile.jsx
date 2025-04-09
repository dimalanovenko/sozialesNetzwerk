import {useEffect, useState} from "react";
import {changeProfile, getProfile} from "../features/profileSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {FaPencilAlt} from "react-icons/fa";
import ava from "../assets/ava.png";
import {NavLink} from "react-router-dom";

const ChangeProfile = () => {

    const dispatch = useDispatch();

    const [username, setUsername] = useState('')
    const [avatar, setAvatar] = useState('')
    const [age, setAge] = useState('')
    const [bio, setBio] = useState('')
    const [fullName, setFullName] = useState('')
    const [balance, setBalance] = useState('')

    const myProfile = useSelector(state => state.profile.profile);

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    const handleChangeMyProfile = () => {
        dispatch(changeProfile({username, avatar, age, bio, fullName, balance}))
        setUsername('');
        setAvatar('');
        setAge('');
        setBio('');
        setFullName('');
        setBalance('');
    }

    return (
        <div className="flex flex-col items-center justify-between">
            <ul className="mt-20 flex flex-col items-center gap-3.5">
                <img
                    className="w-40 h-40 rounded-full"
                    src={myProfile.avatar === "" ? ava : myProfile.avatar}
                    alt="avatar"
                />
                <li className="flex flex-col items-center text-[#27364B] text-2xl font-bold">
                    {myProfile.fullName}
                </li>
                <li className="flex flex-col items-center text-[#5D6778] text-xl">
                    {'@' + myProfile.username}
                </li>
                <li className="w-[50%] mx-auto text-center flex-col items-center text-lg text-[#4B5669]">
                    {myProfile.bio}
                </li>
                <li className="flex flex-col items-center text-lg text-[#4B5669]">
                    <span className="text-[#27364B] text-2xl font-medium">
                        {myProfile.posts_count}
                    </span>
                    Posts
                </li>
                <li className="flex flex-col items-center text-lg text-[#4B5669]">
                    <span className="text-[#27364B] text-2xl font-medium">
                        {myProfile.followers}
                    </span>
                    Followers
                </li>
                <li className="flex flex-col items-center text-lg text-[#4B5669]">
                    <span className="text-[#27364B] text-2xl font-medium">
                        {myProfile.following}
                    </span>
                    Following
                </li>
            </ul>
            <hr className="w-full h-2 bg-[#FAFBFF] text-white"/>
            <nav className="w-1/2 flex justify-around items-center">
                <NavLink to="/profile">
                    {({isActive}) => (
                        <svg className='cursor-pointer' width="30" height="30" viewBox="0 0 20 21" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.33333 3H2.5V8.83333H8.33333V3Z" stroke={isActive ? "#0C1024" : "#5D6778"}
                                  strokeWidth="1.75"
                                  strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M17.5001 3H11.6667V8.83333H17.5001V3Z" stroke={isActive ? "#0C1024" : "#5D6778"}
                                  strokeWidth="1.75"
                                  strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M17.5001 12.1667H11.6667V18H17.5001V12.1667Z"
                                  stroke={isActive ? "#0C1024" : "#5D6778"} strokeWidth="1.75"
                                  strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8.33333 12.1667H2.5V18H8.33333V12.1667Z" stroke={isActive ? "#0C1024" : "#5D6778"}
                                  strokeWidth="1.75"
                                  strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    )}
                </NavLink>
                <NavLink to="/change_profile">
                    {({isActive}) => (
                        <svg
                            className="cursor-pointer my-5"
                            width="30" height="30" viewBox="0 0 20 20" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_118_737)">
                                <path
                                    d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
                                    stroke={isActive ? "#0C1024" : "#5D6778"} strokeWidth="1.75" strokeLinecap="round"
                                    strokeLinejoin="round"/>
                                <path
                                    d="M16.1667 12.5C16.0557 12.7513 16.0226 13.0302 16.0717 13.3005C16.1207 13.5708 16.2496 13.8203 16.4417 14.0167L16.4917 14.0667C16.6466 14.2214 16.7696 14.4053 16.8534 14.6076C16.9373 14.8099 16.9805 15.0268 16.9805 15.2458C16.9805 15.4649 16.9373 15.6817 16.8534 15.8841C16.7696 16.0864 16.6466 16.2702 16.4917 16.425C16.3369 16.58 16.1531 16.7029 15.9507 16.7868C15.7484 16.8706 15.5315 16.9138 15.3125 16.9138C15.0935 16.9138 14.8766 16.8706 14.6743 16.7868C14.4719 16.7029 14.2881 16.58 14.1333 16.425L14.0833 16.375C13.8869 16.1829 13.6375 16.054 13.3672 16.005C13.0968 15.956 12.818 15.9891 12.5667 16.1C12.3202 16.2056 12.11 16.381 11.9619 16.6046C11.8139 16.8282 11.7344 17.0902 11.7333 17.3583V17.5C11.7333 17.942 11.5577 18.3659 11.2452 18.6785C10.9326 18.9911 10.5087 19.1667 10.0667 19.1667C9.62464 19.1667 9.20072 18.9911 8.88816 18.6785C8.5756 18.3659 8.4 17.942 8.4 17.5V17.425C8.39355 17.1492 8.30427 16.8817 8.14376 16.6572C7.98325 16.4328 7.75895 16.2619 7.5 16.1667C7.24865 16.0557 6.96984 16.0226 6.69951 16.0717C6.42918 16.1207 6.17973 16.2495 5.98333 16.4417L5.93333 16.4917C5.77854 16.6466 5.59473 16.7696 5.3924 16.8534C5.19007 16.9373 4.97319 16.9805 4.75417 16.9805C4.53514 16.9805 4.31826 16.9373 4.11593 16.8534C3.9136 16.7696 3.72979 16.6466 3.575 16.4917C3.42004 16.3369 3.29711 16.1531 3.21323 15.9507C3.12936 15.7484 3.08619 15.5315 3.08619 15.3125C3.08619 15.0935 3.12936 14.8766 3.21323 14.6743C3.29711 14.4719 3.42004 14.2881 3.575 14.1333L3.625 14.0833C3.81711 13.8869 3.94599 13.6375 3.995 13.3672C4.04402 13.0968 4.01093 12.818 3.9 12.5667C3.79436 12.3202 3.61896 12.11 3.39539 11.9619C3.17181 11.8139 2.90982 11.7344 2.64167 11.7333H2.5C2.05797 11.7333 1.63405 11.5577 1.32149 11.2452C1.00893 10.9326 0.833333 10.5087 0.833333 10.0667C0.833333 9.62463 1.00893 9.20071 1.32149 8.88815C1.63405 8.57559 2.05797 8.4 2.5 8.4H2.575C2.85083 8.39354 3.11834 8.30426 3.34275 8.14375C3.56716 7.98325 3.7381 7.75894 3.83333 7.5C3.94426 7.24865 3.97735 6.96983 3.92834 6.6995C3.87932 6.42918 3.75045 6.17973 3.55833 5.98333L3.50833 5.93333C3.35337 5.77854 3.23044 5.59473 3.14657 5.3924C3.06269 5.19007 3.01952 4.97319 3.01952 4.75416C3.01952 4.53514 3.06269 4.31826 3.14657 4.11593C3.23044 3.9136 3.35337 3.72978 3.50833 3.575C3.66312 3.42003 3.84694 3.2971 4.04927 3.21323C4.2516 3.12935 4.46847 3.08618 4.6875 3.08618C4.90653 3.08618 5.1234 3.12935 5.32573 3.21323C5.52806 3.2971 5.71188 3.42003 5.86667 3.575L5.91667 3.62499C6.11307 3.81711 6.36251 3.94598 6.63284 3.995C6.90317 4.04401 7.18199 4.01092 7.43333 3.89999H7.5C7.74647 3.79436 7.95668 3.61896 8.10474 3.39538C8.25281 3.17181 8.33226 2.90982 8.33333 2.64166V2.49999C8.33333 2.05797 8.50893 1.63404 8.82149 1.32148C9.13405 1.00892 9.55797 0.833328 10 0.833328C10.442 0.833328 10.866 1.00892 11.1785 1.32148C11.4911 1.63404 11.6667 2.05797 11.6667 2.49999V2.57499C11.6677 2.84315 11.7472 3.10514 11.8953 3.32872C12.0433 3.55229 12.2535 3.72769 12.5 3.83333C12.7513 3.94426 13.0302 3.97735 13.3005 3.92833C13.5708 3.87932 13.8203 3.75044 14.0167 3.55833L14.0667 3.50833C14.2215 3.35337 14.4053 3.23044 14.6076 3.14656C14.8099 3.06269 15.0268 3.01952 15.2458 3.01952C15.4649 3.01952 15.6817 3.06269 15.8841 3.14656C16.0864 3.23044 16.2702 3.35337 16.425 3.50833C16.58 3.66312 16.7029 3.84693 16.7868 4.04926C16.8706 4.25159 16.9138 4.46847 16.9138 4.6875C16.9138 4.90652 16.8706 5.1234 16.7868 5.32573C16.7029 5.52806 16.58 5.71187 16.425 5.86666L16.375 5.91666C16.1829 6.11306 16.054 6.36251 16.005 6.63284C15.956 6.90317 15.9891 7.18198 16.1 7.43333V7.5C16.2056 7.74647 16.381 7.95668 16.6046 8.10474C16.8282 8.2528 17.0902 8.33226 17.3583 8.33333H17.5C17.942 8.33333 18.366 8.50892 18.6785 8.82148C18.9911 9.13404 19.1667 9.55797 19.1667 10C19.1667 10.442 18.9911 10.8659 18.6785 11.1785C18.366 11.4911 17.942 11.6667 17.5 11.6667H17.425C17.1568 11.6677 16.8949 11.7472 16.6713 11.8953C16.4477 12.0433 16.2723 12.2535 16.1667 12.5Z"
                                    stroke={isActive ? "#0C1024" : "#5D6778"} strokeWidth="1.75" strokeLinecap="round"
                                    strokeLinejoin="round"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_118_737">
                                    <rect width="20" height="20" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                    )}
                </NavLink>
            </nav>
            <hr className="w-full h-2 bg-[#FAFBFF] text-white"/>
            <div className="flex flex-col items-center justify-between pb-20">
                <ul className="flex flex-col mt-10 font-normal text-lg gap-4">
                    <li>
                        <input
                            placeholder="Avatar"
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' ? handleChangeMyProfile() : null}
                            className="text-[#4B5669] border rounded-lg border-[#E2E8F0] py-2 pl-6"
                            type="text"/>
                    </li>
                    <li>
                        <input
                            placeholder='Full name'
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' ? handleChangeMyProfile() : null}
                            className="text-[#4B5669] border rounded-lg border-[#E2E8F0] py-2 pl-6"
                            type="text"/>
                    </li>
                    <li>
                        <input
                            placeholder='Username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' ? handleChangeMyProfile() : null}
                            className="text-[#4B5669] border rounded-lg border-[#E2E8F0] py-2 pl-6"
                            type="text"/>
                    </li>
                    <li>
                        <input
                            placeholder="Age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' ? handleChangeMyProfile() : null}
                            className="text-[#4B5669] border rounded-lg border-[#E2E8F0] py-2 pl-6"
                            type="text"/>
                    </li>
                    <li>
                    <textarea
                        placeholder="Bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' ? handleChangeMyProfile() : null}
                        className="text-[#4B5669] border rounded-lg border-[#E2E8F0] pt-2 pl-6 pb-14"
                        style={{whiteSpace: "pre-wrap"}}
                    />
                    </li>
                    <button
                        onClick={() => {
                            handleChangeMyProfile()
                        }}
                        className="flex justify-center items-center gap-2 bg-[#4C68D5] text-white rounded-2xl py-2 px-4 cursor-pointer mt-5">
                        <FaPencilAlt/>
                        <span>Change Profile</span>
                    </button>
                </ul>
            </div>
        </div>
    )
}

export default ChangeProfile
