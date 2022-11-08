import './post.css';
import React, { useContext, useState } from 'react';

function Post(){
    const createPost = () => {
        $("myForm").style.display = "block";
    }
    const closePost = () => {
        $("myForm").style.display = "none";
    }
    
    // [posts, setPost] = useState([
    //     { 
    //         title: 'Bangkok',
    //         content: 'Not gonna lie, Chiang Mai is better for living.',
    //         likes: 0,
    //         id: 0
    //     },
    //     {
    //         title: 'Surin',
    //         content: 'I lived in Surin when I was kid.',
    //         likes: 0,
    //         id: 1
    //     },
    // ]);

    function $(id)
    {
        return document.getElementById(id);
    }
    return(
        <div>
            <button onClick={createPost}>createPost</button>
            <div class="form-popup" id="myForm">
                <form class="form-container" >
                    <div style={{ textAlign: 'center' }}>
                        <input className='title' type="text" 
                        name="title" placeholder='Title' />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <textarea className='text' name="content" 
                        placeholder='text(optional)' ></textarea>
                    </div>
                    <div className='button'>
                        <button type="submit" >Save</button>
                        <button type='button' onClick={closePost}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Post;