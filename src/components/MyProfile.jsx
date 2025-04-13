import ava from "../assets/ava.png";
import {useSelector} from "react-redux";

const MyProfile = () => {

    const myProfile = useSelector(state => state.profile.profile);

    return (
        <ul className='w-full lg:w-65/100 mt-30 lg:mt-0 flex flex-col lg:flex-row items-center gap-3.5 bg-white lg:top-35 lg:right-1/20 lg:h-42 lg:absolute lg:shadow-md lg:rounded-t-lg lg:justify-between lg:px-16'>

            <img
                className="lg:hidden w-40 h-40 rounded-full"
                src={myProfile.avatar === "" ? ava : myProfile.avatar}
                alt="avatar"
            />

            <li className='hidden lg:flex lg:items-center lg:gap-6'>
                <img
                    className="w-30 h-30 rounded-full"
                    src={myProfile.avatar === "" ? ava : myProfile.avatar}
                    alt="avatar"
                />
                <div className='lg:flex lg:flex-col lg:gap-3 lg:items-start'>
                    <ul className='lg:flex lg:items-center lg:justify-between lg:gap-2'>
                        <li className="flex flex-col items-center text-[#27364B] text-xl font-bold">
                            {myProfile.fullName}
                        </li>
                        <li className=' text-[#5D6778] font-medium text-lg'>
                            /
                        </li>
                        <li className="flex flex-col items-center text-[#5D6778] text-sm">
                            {'@' + myProfile.username}
                        </li>
                    </ul>
                    <div
                        className="w-[50%] lg:w-auto mx-auto lg:m-0 text-center flex-col items-center text-sm text-[#4B5669]">
                        {myProfile.bio}
                    </div>
                </div>
            </li>

            <li className="lg:hidden flex flex-col items-center text-[#27364B] text-2xl font-bold">
                {myProfile.fullName}
            </li>
            <li className="lg:hidden flex flex-col items-center text-[#5D6778] text-xl">
                {'@' + myProfile.username}
            </li>
            <li className="lg:hidden w-[50%] lg:w-auto mx-auto lg:m-0 text-center flex-col items-center text-lg text-[#4B5669]">
                {myProfile.bio}
            </li>

            <li className='hidden lg:flex lg:gap-6'>
                <div className="flex flex-col items-center text-sm text-[#4B5669]">
                    <span className="text-[#27364B] text-3xl font-bold">
                        {myProfile.posts_count}
                    </span>
                    Posten
                </div>
                <div className="flex flex-col items-center text-sm text-[#4B5669]">
                    <span className="text-[#27364B] text-3xl font-bold">
                        {myProfile.followers}
                    </span>
                    Verfolger
                </div>
                <div className="flex flex-col items-center text-sm text-[#4B5669]">
                    <span className="text-[#27364B] text-3xl font-bold">
                        {myProfile.following}
                    </span>
                    Verfolgte
                </div>
            </li>

            <li className="lg:hidden flex flex-col items-center text-lg text-[#4B5669]">
                    <span className="text-[#27364B] text-2xl font-medium">
                        {myProfile.posts_count}
                    </span>
                Posten
            </li>
            <li className="lg:hidden flex flex-col items-center text-lg text-[#4B5669]">
                    <span className="text-[#27364B] text-2xl font-medium">
                        {myProfile.followers}
                    </span>
                Verfolger
            </li>
            <li className="lg:hidden flex flex-col items-center text-lg text-[#4B5669]">
                    <span className="text-[#27364B] text-2xl font-medium">
                        {myProfile.following}
                    </span>
                Verfolgte
            </li>
        </ul>
    )
}

export default MyProfile
