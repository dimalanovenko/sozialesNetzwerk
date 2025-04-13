import {getPosts} from "../features/feedSlice.js";
import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import Post from "../components/Post.jsx";
import AddPost from "../components/AddPost.jsx";
import Transaction from "./Transaction.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const Feed = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, []);

    const filteredPosts = useSelector((state) => state.feed.filteredPosts);

    return (
        <main className="w-full flex flex-col items-center justify-between bg-[#FAFBFF]">
            <Header/>

            <div className='lg:hidden w-full'>
                <AddPost/>
            </div>

            <div className="hidden lg:flex items-center w-4/10 mt-35">

                <div>
                    <AddPost/>
                    <ul className="flex flex-col items-center justify-between mt-2 pb-18 gap-2">
                        {filteredPosts.map((post) => (
                            <Post
                                post={post}
                                key={post._id}
                            />
                        ))}
                    </ul>
                </div>

                <Transaction/>

                <Footer/>
            </div>

            <ul className="lg:hidden flex flex-col items-center justify-between mt-2 pb-18 gap-2">
                {filteredPosts.map((post) => (
                    <Post
                        post={post}
                        key={post._id}
                    />
                ))}
            </ul>
        </main>
    )
}

export default Feed
