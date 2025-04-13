import {useEffect, useState} from "react";
import {changeProfile, getProfile} from "../features/profileSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {FaPencilAlt} from "react-icons/fa";
import ava from "../assets/ava.png";
import {NavLink} from "react-router-dom";
import Header from "../components/Header.jsx";
import MyProfile from "../components/MyProfile.jsx";
import ProfileNav from "../components/ProfileNav.jsx";
import Transaction from "./Transaction.jsx";
import Footer from "../components/Footer.jsx";

const ChangeProfile = () => {

    const dispatch = useDispatch();

    const [username, setUsername] = useState('')
    const [avatar, setAvatar] = useState('')
    const [age, setAge] = useState('')
    const [bio, setBio] = useState('')
    const [fullName, setFullName] = useState('')
    const [balance, setBalance] = useState('')

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
        <section className="flex flex-col items-center justify-between lg:h-[100vh] lg:bg-[#FAFBFF]">
            <Header/>
            <MyProfile/>

            <hr className="lg:hidden w-full h-2 bg-[#FAFBFF] text-white z-50"/>
            <ProfileNav/>
            <hr className="lg:hidden w-full h-2 bg-[#FAFBFF] text-white"/>
            <div
                className="flex flex-col items-center justify-between pb-20 lg:pb-0 lg:bg-white lg:shadow-md lg:rounded-lg lg:w-4/10 lg:h-134 lg:top-102 lg:right-30/100 lg:fixed">
                <ul className="flex flex-col mt-10 font-normal text-lg gap-4">
                    <li>
                        <input
                            placeholder="Avatar"
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' ? handleChangeMyProfile() : null}
                            className="text-[#4B5669] border rounded-lg border-[#E2E8F0] py-2 pl-6 lg:w-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            type="text"/>
                    </li>
                    <li>
                        <input
                            placeholder='Vollständiger Name'
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' ? handleChangeMyProfile() : null}
                            className="text-[#4B5669] border rounded-lg border-[#E2E8F0] py-2 pl-6 lg:w-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            type="text"/>
                    </li>
                    <li>
                        <input
                            placeholder='Benutzername'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' ? handleChangeMyProfile() : null}
                            className="text-[#4B5669] border rounded-lg border-[#E2E8F0] py-2 pl-6 lg:w-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            type="text"/>
                    </li>
                    <li>
                        <input
                            placeholder="Alter"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' ? handleChangeMyProfile() : null}
                            className="text-[#4B5669] border rounded-lg border-[#E2E8F0] py-2 pl-6 lg:w-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            type="text"/>
                    </li>
                    <li>
                    <textarea
                        placeholder="Biografie"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' ? handleChangeMyProfile() : null}
                        className="text-[#4B5669] border rounded-lg border-[#E2E8F0] pt-2 pl-6 pb-14 lg:w-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        style={{whiteSpace: "pre-wrap"}}
                    />
                    </li>
                    <button
                        onClick={() => {
                            handleChangeMyProfile()
                        }}
                        className="flex justify-center items-center gap-2 bg-[#4C68D5] text-white rounded-2xl py-2 px-4 cursor-pointer mt-5 lg:w-2/3">
                        <FaPencilAlt/>
                        <span>Profil ändern</span>
                    </button>
                </ul>
                <div className='hidden lg:block'>
                    <Transaction/>
                </div>
                <Footer/>
            </div>
        </section>
    )
}

export default ChangeProfile
