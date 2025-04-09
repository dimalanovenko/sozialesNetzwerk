import {useState} from "react";
import {changeProfile} from "../features/profileSlice.js";
import {useDispatch} from "react-redux";

const ChangeProfile = () => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState('')
    const [avatar, setAvatar] = useState('')
    const [age, setAge] = useState('')
    const [bio, setBio] = useState('')
    const [fullName, setFullName] = useState('')
    const [balance, setBalance] = useState('')

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
            <ul className="flex flex-col mt-40 font-bold text-xl">
                <li className="flex flex-col gap-2 mt-2 text-white">
                    <h1>username</h1>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' ? handleChangeMyProfile() : null}
                        className="border rounded-lg border-teal-400"
                        type="text"/>
                </li>
                <li className="flex flex-col gap-2 mt-2 text-white">
                    <h1>avatar</h1>
                    <input
                        value={avatar}
                        onChange={(e) => setAvatar(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' ? handleChangeMyProfile() : null}
                        className="border rounded-lg border-teal-400"
                        type="text"/>
                </li>
                <li className="flex flex-col gap-2 mt-2 text-white">
                    <h1>age</h1>
                    <input
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' ? handleChangeMyProfile() : null}
                        className="border rounded-lg border-teal-400"
                        type="text"/>
                </li>
                <li className="flex flex-col gap-2 mt-2 text-white">
                    <h1>bio</h1>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' ? handleChangeMyProfile() : null}
                        className="border rounded-lg border-teal-400"
                        style={{whiteSpace: "pre-wrap"}}
                    />
                </li>
                <li className="flex flex-col gap-2 mt-2 text-white">
                    <h1>fullName</h1>
                    <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' ? handleChangeMyProfile() : null}
                        className="border rounded-lg border-teal-400"
                        type="text"/>
                </li>
                <li className="flex flex-col gap-2 mt-2 text-white">
                    <h1>balance</h1>
                    <input
                        value={balance}
                        onChange={(e) => setBalance(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' ? handleChangeMyProfile() : null}
                        className="border rounded-lg border-teal-400"
                        type="text"/>
                </li>
                <button
                    className="bg-zinc-800 text-teal-400 rounded-2xl py-2 px-4 cursor-pointer mt-5"
                    onClick={() => {
                        handleChangeMyProfile()
                    }}>
                    Change Profile
                </button>
            </ul>
        </div>
    )
}

export default ChangeProfile
