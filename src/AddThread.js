import React, { useState, useContext, useEffect } from "react";
import { ThreadContext } from "./ThreadContext";
import './AddThread.css';
import image from "./img/image.png";
import link from "./img/link.png";
import poll from "./img/poll.png";
import post from "./img/post.png";
import talk from "./img/talk.png";
import { UserAuth } from './authContext';
import { db } from './firebase';
import { collection, doc, getDocs, getDoc, setDoc, addDoc } from "firebase/firestore";

const AddThread = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [threads, setThreads] = useContext(ThreadContext);
    const [posts, setPosts] = useState([]);

    const { user } = UserAuth();

    useEffect(() => {
        getData();
        console.log(posts);
    }, []);

    useEffect(() => {
        setThreads(posts);
    }, [posts]);

    const getData = () => {
        getDocs(collection(db, 'Posts')).then(query => {
            if (!query.empty) {
                const docPosts = [];
                query.forEach(doc => {
                    docPosts.push(doc.data());
                });
                setPosts(docPosts);
            }
        })
    }

    const addData = (data) => {
        if (user !== null && user !== undefined) {
            getDoc(doc(db, 'Posts', user.uid)).then(docc => {
                if (docc.exists()) {
                    if (docc.data()?.data) {
                        const doc_data = docc.data().data;
                        doc_data.push(data);
                        console.log(doc_data);
                        setDoc(doc(db, 'Posts', docc.id), doc_data).then(msg => {
                            //alert("Post Successfully");
                        })
                    }
                }
                else {
                    console.log("No data");
                    const doc_data = [];
                    doc_data.push(data);
                    console.log(doc_data);
                    setDoc(doc(db, 'Posts', user.uid.toString()),{title:"Test",content:"COntent-"}).then(msg => {
                        // alert("Post Successfully");
                    })
                }
            })
                .catch(e => {
                    console.log(e);
                })
        }
        else {
            alert("Please Login to continue");
        }
    }

    const updateTitle = (e) => {
        setTitle(e.target.value);
        if (e.target.value.length == 24) {
            $('alertTitle').innerHTML = '*You can enter a topic with only 24 characters*';
        }
    }

    const updateContent = (e) => {
        setContent(e.target.value);
    }

    const addThread = e => {
        e.preventDefault();
        setThreads(prevThreads => [...prevThreads, { title: title, content: content }]); // make copy of previous object
        ///////////////////////////////////////////////////////////////////////////
        const addD = {
            title: title,
            content: content,
            time: new Date(),
            name: user?.displayName,
            url: user?.photoUrl,
            id: user?.uid
        }
        addData(addD);
        setTitle('');
        setContent('');
        $("myForm").style.display = "none";
    };

    var recursiveOpening = 0;

    const closeForm = () => {
        $("myForm").style.display = "none";
        $('creatPost').style.display = 'block';
    }

    const saveForm = () => {
        $("myForm").style.display = "none";
        $('creatPost').style.display = 'block';
    }
    const openForm = () => {
        if (recursiveOpening % 2 == 0) {
            $("myForm").style.display = "block";
            $('creatPost').style.display = 'none';
            recursiveOpening++;
        }
        else {
            $("myForm").style.display = "none";
            recursiveOpening++;
        }
        setBlank("post", "postElement");
    }

    const setBlank = (top, desc) => {
        const find_top = ["post", "image", "link", "poll", "talk"];
        for (let item of find_top) {
            if (item != top)
                $(item).style.backgroundColor = 'white';
            else
                $(item).style.backgroundColor = '#f9e3a3';
        }
        const find_desc = ["postElement", "imageElement", "linkElement"
            , "pollElement", "talkElement"];
        for (let item of find_desc) {
            if (item != desc)
                $(item).style.display = 'none';
            else
                $(item).style.display = 'block';
        }
    }

    const postClicking = () => {
        setBlank("post", "postElement");
    }
    const imageClicking = () => {
        setBlank("image", "imageElement");
    }
    const linkClicking = () => {
        setBlank("link", "linkElement");
    }
    const pollClicking = () => {
        // setBlank("poll","pollElement");
    }
    const talkClicking = () => {
        // setBlank("talk","talkElement");
    }

    function $(id) {
        return document.getElementById(id); // <--- I don't actual know how this work
    }

    return (
        <div>
         <button className="topic text-white rounded-lg " onClick={openForm} id='creatPost'>+ Create Post</button>   
            <div className="form-popup" id="myForm">
                <form className="form-container" onSubmit={addThread}>
                    <input className="title"
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={title} required
                        maxLength={36}
                        onChange={updateTitle} />
                    <span className="barEl" id="alertTitle" />
                    <br />
                    <div className="menu">
                        <button id="post" type="button" className="bar" onClick={postClicking}>
                            <img src={post} />
                            <b>Post</b>
                        </button>
                        <button id="image" type="button" className="bar cursor-not-allowed" onClick={imageClicking}>
                            <img src={image} />
                            <b>Image & Video</b>
                        </button>
                        <button id="link" type="button" className="bar cursor-not-allowed" onClick={linkClicking}>
                            <img src={link} />
                            <b>Link</b>
                        </button>
                        <button id="poll" type="button" className="bar cursor-not-allowed" onClick={pollClicking}>
                            <img src={poll} />
                            <b>Poll</b>
                        </button>
                        <button type="button" className="bar2 cursor-not-allowed" onClick={talkClicking} id="talk">
                            <img src={talk} />
                            <b>Talk</b>
                        </button>
                    </div>

                    <div id="postElement" className="mt-2">
                        <textarea className="barCss barEl"
                            type="text"
                            name="content"
                            placeholder="Context"
                            value={content}
                            required
                            onChange={updateContent} />
                    </div>
                    <div id="imageElement" className="barEl ">
                        <p className=" mt-2">Drag and drop images or </p>
                        <input type="file" name="file" id="file" />
                    </div>
                    <div id="linkElement" className="mt-2">
                        <textarea className="barCss barEl"
                            type="text"
                            name="link"
                            placeholder="Url"
                            value={content}
                            required
                            onChange={updateContent} />
                    </div>
                    <div id="pollElement">
                        {/* none using */}
                    </div>
                    <div id="talkElement">
                        {/* none using */}
                    </div>

                    <br />
                    <div className='button'>
                        <button className="buttonConclude buttonSave rounded-lg hover:text-white hover:font-bold hover:animate-ping" type="submit" onClick={saveForm} >Save</button><br />
                        <button className="buttonConclude buttonClose rounded-lg hover:text-white hover:font-bold hover:animate-pulse" type='button' onClick={closeForm}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddThread;