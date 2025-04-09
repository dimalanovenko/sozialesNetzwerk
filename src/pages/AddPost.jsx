import {useDispatch} from "react-redux";
import {useState} from "react";
import {createPost} from "../features/createPostSlice.js";

const addPost = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState("");
    const [image, setImage] = useState("");
    const [video, setVideo] = useState("");

    const dispatch = useDispatch();

    return (
            <div className="flex flex-col items-center justify-between mt-20">
                <ul className="flex flex-col mt-40 font-bold text-xl">
                    <li className="flex flex-col gap-2 mt-2 text-white">
                        <h1>Title</h1>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border rounded-lg border-teal-400"
                            type="text"/>
                    </li>
                    <li className="flex flex-col gap-2 mt-2 text-white">
                        <h1>Description</h1>
                        <input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border rounded-lg border-teal-400"
                            type="text"/>
                    </li>
                    <li className="flex flex-col gap-2 mt-2 text-white">
                        <h1>Status</h1>
                        <input
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="border rounded-lg border-teal-400"
                            type="text"/>
                    </li>
                    <li className="flex flex-col gap-2 mt-2 text-white">
                        <h1>Image</h1>
                        <input
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="border rounded-lg border-teal-400"
                            type="text"/>
                    </li>
                    <li className="flex flex-col gap-2 mt-2 text-white">
                        <h1>Video</h1>
                        <input
                            value={video}
                            onChange={(e) => setVideo(e.target.value)}
                            className="border rounded-lg border-teal-400"
                            type="text"/>
                    </li>
                    <button
                        className="bg-zinc-800 text-teal-400 rounded-2xl py-2 px-4 cursor-pointer mt-5"
                        onClick={() => {
                            dispatch(createPost({title, description, status, image, video}))
                            setTitle('');
                            setDescription('');
                            setStatus('');
                            setImage('');
                            setVideo('');
                        }}>
                        Create Post
                    </button>
                </ul>
            </div>
    )
}

export default addPost
