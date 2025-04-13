import {getPosts} from "../features/feedSlice.js";
import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import Post from "../components/Post.jsx";
import AddPost from "../components/AddPost.jsx";
import Transaction from "./Transaction.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Loading from "../components/Loading.jsx";

const Feed = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, []);

    const filteredPosts = useSelector((state) => state.feed.filteredPosts);
    const {isLoading} = useSelector(state => state.createPost);

    const isLoadingFeed = useSelector(state => state.feed.isLoading);

    const isDesktop = window.innerWidth >= 1024;

    return (
        <main className="w-full flex flex-col items-center justify-between bg-[#FAFBFF]">
            <Header/>

            <div className='lg:hidden w-full'>
                <AddPost/>
            </div>

            <div className="hidden lg:flex items-center w-4/10 mt-35">

                <div className='w-full'>
                    <AddPost/>
                    {isLoading && isDesktop ? (
                        <Loading/>
                    ) : isLoadingFeed && isDesktop ? (
                        <Loading/>
                    ) : (
                        <ul className="flex flex-col items-center justify-between mt-2 pb-18 gap-2">
                            {filteredPosts.map((post) => (
                                <Post post={post} key={post._id}/>
                            ))}
                        </ul>
                    )}
                </div>

                <Transaction/>

                <Footer/>
            </div>

            {isLoading && !isDesktop ? (
                <Loading/>
            ) : isLoadingFeed && !isDesktop ? (
                    <Loading/>
                ) : (
                    <ul className="lg:hidden flex flex-col items-center justify-between mt-2 pb-18 gap-2">
                        {filteredPosts.map((post) => (
                            <Post
                                post={post}
                                key={post._id}
                            />
                        ))}
                    </ul>
                )}
        </main>
    )
}

export default Feed
