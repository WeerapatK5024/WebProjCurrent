import React , {useEffect, useState} from 'react';
import './Thread.css';
import { UserAuth } from '../authContext';
import { db } from '../firebase';
import { collection, doc, getDocs, getDoc, setDoc, addDoc } from "firebase/firestore";

import {getComments as getCommentsApi} from "./api";

const Thread = (props) => {
    const { user, } = UserAuth();
    // const [backendComments, setBackendComments] = useState([])

    // const getComments = () => {
    //     getDocs(collection(db, 'Comments')).then(query => {
    //         if (!query.empty) {
    //             const allComments = [];
    //             query.forEach(doc => {
    //                 allComments.push(doc.data());
    //             });
    //             setBackendComments(allComments);
    //         }
    //     })
    // }
    // useEffect(() => {
    //     getCommentsApi().then(data =>{
    //         setBackendComments(data)
    //     });
    // },[])
    
    return(
    <div>
        <div className='frame'>
            <span>
            <p className='bg-[#1a2634] p-2 text-[#eec550]'>From :<>  </>  
                <a className='cursor-pointer text-[#eec550] rounded bg-[#203e5f] p-1 hover:font-bold hover:border-2'> {user?.displayName}</a> 
                <a className='float-right ml-8 text-[#eec550]'>Date:</a></p>
            </span>
            <div>
            <h3 className='font-bold text-3xl mb-2 cursor-pointer p-2 hover:text-[#eec550]'>{props.title}</h3>
            </div>
            <div className='diffframe border-double border-b-8 border-[#1a2634]'>
            <p className='ml-3 mr-3 mb-3'>{props.content}</p>
             </div>
            <span>
            <input className='text-white border-2 border-[#1a2634] bg-[#203e5f] rounded mt-2 ml-2 mb-2 p-1 w-4/5'
            placeholder=" Add some comments"
            type="text"></input> 
            <button className='text-[#eec550] rounded p-1 border-2 border-[#1a2634] ml-3 bg-[#1a2634] hover:border-[#eec550]'>COMMENT</button>
            </span> 
            </div>
        </div>
    )
}

export default Thread;