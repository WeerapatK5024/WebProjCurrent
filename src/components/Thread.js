import React , {useState} from 'react';
import './Thread.css';
import { UserAuth } from '../authContext';

const Thread = (props) => {
    const { user, } = UserAuth();

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
            <div className='diffframe'>
            <p className='ml-3 mr-3 mb-3'>{props.content}</p>
             </div>
        </div>
    </div>
    )
}

export default Thread;