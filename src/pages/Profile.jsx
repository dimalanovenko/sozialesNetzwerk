import {useDispatch, useSelector} from "react-redux";
import {getProfile} from "../features/profileSlice.js";
import {useEffect} from "react";
import {getMyPosts} from "../features/feedSlice.js";
import MyPost from "../components/MyPost.jsx";
import Header from "../components/Header.jsx";
import ProfileNav from "../components/ProfileNav.jsx";
import MyProfile from "../components/MyProfile.jsx";
import Transaction from "./Transaction.jsx";
import Footer from "../components/Footer.jsx";
import Loading from "../components/Loading.jsx";

const Profile = () => {
    const dispatch = useDispatch();
    const myId = useSelector(state => state.profile.profile._id);
    const myPosts = useSelector(state => state.feed.filteredMyPosts);

    const isLoading = useSelector(state => state.feed.isLoading);

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    useEffect(() => {
        if (myId) {
            dispatch(getMyPosts(myId));
        }
    }, [dispatch, myId]);

    return (
        <section className="flex flex-col items-center justify-between lg:bg-[#FAFBFF]">
            <Header/>
            <MyProfile/>

            <hr className="w-full h-2 bg-[#FAFBFF] text-white z-50"/>
            <ProfileNav/>
            <hr className="w-full h-2 bg-[#FAFBFF] text-white"/>

            {isLoading ?
                (
                    <div className="z-50 mt-102">
                        <Loading/>
                    </div>
                ) :
                (
                    <ul className="flex flex-col items-center justify-between gap-5 mb-20 lg:w-4/10 lg:mt-98">
                        {myPosts.map((myPost) => (
                            <MyPost
                                myPost={myPost}
                                key={myPost._id}
                            />
                        ))}
                    </ul>
                )}

            <div className='hidden lg:block'>
                <Transaction/>
            </div>
            <Footer/>
        </section>
    )
}

export default Profile
