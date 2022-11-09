import React, { useContext } from 'react';
import './Thread.css';
import './Nav.css'
import { ThreadContext } from '../ThreadContext';
import { UserAuth } from '../authContext';


const Nav = () => {
    const [threads, setThreads] = useContext(ThreadContext);
    const { signIn, user,logout } = UserAuth();

    const handleAuth = () => {
        if (user === null || user === undefined) {
            return (
                <>
                <button
                className='rounded-md border-2 border-slate-500 p-1 mt-2 text-black hover:bg-green-500 hover:text-white'
                    onClick={() => {
                        signIn();
                    }}
                    
                >Sign In with Google</button>
                
                </>
            )
        }
        else{
            return (
                <button 
                    className='rounded-md border-2 border-slate-500 p-1 mt-2 text-black hover:bg-red-500 hover:text-white'
                    onClick={() => {
                        logout();
                    }}
                ><a className='ml-9 mr-9'>Sign Out</a></button>
            )
        }
    }
        if (user === null || user === undefined){
            return(
        <div className='userdash '>
            <p className='font-bold'>WELCOME! </p> 
            <p className='font-bold border-2 border-orange-500 mt-2 mb-2 p-1 cursor-default '>Please Sign-In!</p>
            <p>Threads count : {threads.length} </p>
            {
                handleAuth()
            }
        </div>
        )
    }
    else{
        return(
            <div className='userdash'>
                <p className='font-bold'>WELCOME! </p> 
                <p className='border-2 border-green-500 mt-2 mb-2 p-1 cursor-default hover:border-green-800'>{user?.displayName}</p>
                <p>Threads count : {threads.length} </p>
                {
                    handleAuth()
                }
            </div>
        )
    }
    
}

export default Nav;