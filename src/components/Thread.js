import React , {useState} from 'react';
import './Thread.css';
import { UserAuth } from '../authContext';

const Thread = (props) => {
    const { user, } = UserAuth();
    return(
    <div>
        <div className='frame'>
            <span>
            <p>From :
                <a className='text-blue-600 underline cursor-pointer'>{user?.displayName}</a> 
                <a className='ml-8'>Date:</a></p>
            </span>
            <div>
            <h3 className='font-bold text-3xl mb-2'>{props.title}</h3>
            </div>
            <div className='diffframe'>
            <p>{props.content}</p>
             </div>
        </div>
    </div>
    )
}

export default Thread;