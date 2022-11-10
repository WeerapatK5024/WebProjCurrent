import React , {useEffect, useState} from 'react';
import './Thread.css';
import { UserAuth } from '../authContext';
import { db } from '../firebase';
import {dbs} from '../firebase';
import { collection, doc, getDocs, getDoc, setDoc, addDoc } from "firebase/firestore";
import styled from "styled-components";

import {getComments as getCommentsApi} from "./api";
import { sendEmailVerification } from 'firebase/auth';

const Thread = (props) => {
    const { user, } = UserAuth();
    const [commentsList, setCommentsList] = useState("");
    const [backendComments, setBackendComments] = useState("");
    const [activeBtn, setActiveBtn] = useState("none");
    const [Count,setCount] = useState(0) ;

    const Percent = styled.div`
    color: ${({ color }) => color};
     `;
    
    const handleColors = (value) => {
        if (value < 0) return "red";
    };

    const updateComment = (e) => {
        setBackendComments(...backendComments,[e.target.value]);
    }

    const handleLikeClick = () => {
        if (activeBtn === "none") {
          setCount(Count + 1);
          setActiveBtn("upvote");
          return;
        }
    
        if (activeBtn === 'upvote'){
          setCount(Count - 1);
          setActiveBtn("none");
          return;
        }
    
        if (activeBtn === "downvote") {
          setCount(Count + 2);
          setActiveBtn("upvote");
        }
      };
    
      const handleDisikeClick = () => {
        if (activeBtn === "none") {
          setCount(Count - 1);
          setActiveBtn("downvote");
          return;
        }
        
        if (activeBtn === 'downvote'){
          setCount(Count + 1);
          setActiveBtn("none");
          return;
        }
    
        if (activeBtn === "upvote") {
          setCount(Count - 2);
          setActiveBtn("downvote");
        }
      };
      

    const addComment = e => {
        e.preventDefault();
        setBackendComments(prevComments => [...prevComments, { backendComments: backendComments}]);
        const newComments = {
            id: Math.random(),
            backendComments: backendComments,
        }

        setCommentsList([...commentsList,newComments]); 
        // add comment
        setBackendComments("");
        console.log(backendComments)
    }

    const getComments = () => {
        getDocs(collection(db, 'Comments')).then(query => {
            if (!query.empty) {
                const allComments = [];
                query.forEach(doc => {
                    allComments.push(doc.data());
                });
                setBackendComments(allComments);
            }
        })
    }
    // useEffect(() => {
    //     getCommentsApi().then(data =>{
    //         setBackendComments(data)
    //     });
    // },[])
    
    return(
    <div>
         <div className="btn-container">
                    <button
                        aria-pressed ="false" 
                        className={`btn ${activeBtn === 'upvote' ? 'upvote-active' : ''}`}
                        onClick={handleLikeClick}
                    >
                        <div className='material-symbols-outlined'>arrow_upward</div>
                    </button>
                    <Percent className='btn-count' color={handleColors(Count)}>{Count}</Percent>
                    <button btn-count
                        aria-pressed ="false"
                        className={`btn ${activeBtn === 'downvote' ? 'downvote-active' : ''}`}
                        onClick={handleDisikeClick}
                    >
                        <div className='material-symbols-outlined'>arrow_downward</div>
                    </button>
                </div>
        <div className='frame'>
            <span>
            <p className='bg-[#1a2634] p-2 text-[#eec550]'>From :<>  </>  
                <a className='cursor-pointer text-[#eec550] rounded bg-[#203e5f] p-1 hover:font-bold hover:border-2'> {user?.displayName}</a> 
                </p>
            </span>

           
            <div>
            <h3 className='font-bold text-3xl mb-2 cursor-pointer p-2 hover:text-[#eec550]'>{props.title}</h3>
            </div>
            <div className='diffframe border-double border-b-8 border-[#1a2634]'>
        
            <p className='ml-3 mr-3 mb-3'>{props.content}</p>
             </div>
            <form>
            <input className='text-white border-2 border-[#1a2634] bg-[#203e5f] rounded mt-2 ml-2 mb-2 p-1 w-4/5'
            placeholder=" Add some comments"
            type="text"
            name="backendComments"
            id="backendComments"
            value={backendComments}
            onChange={(e) => setBackendComments(e.target.value)}
            ></input> 
            <button className='text-[#eec550] rounded p-1 border-2 border-[#1a2634] ml-3 bg-[#1a2634] hover:border-[#eec550]'
            onClick={addComment}
            >COMMENT</button>
            </form>

           
            </div>
        </div>
    )
}

export default Thread;