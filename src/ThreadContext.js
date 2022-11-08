import React,{useState,createContext}  from "react";
import ThreadList from "./components/ThreadList";

export const ThreadContext = createContext();

export const ThreadProvider = (props) => {
    const [threads , setThreads] = useState([
        {
            title : 'Thread name#1',
            content : 'Just trying to create thread',
            upVote : 0,
            downVote : 0,
            id : 0
        },
        {
            title : 'Thread name #2',
            content : `I hear the drums echoing tonight
            But she hears only whispers of some quiet conversation
            She's coming in, 12:30 flight
            The moonlit wings reflect the stars that guide me towards salvation
            I stopped an old man along the way
            Hoping to find some old forgotten words or ancient melodies
            He turned to me as if to say
            "Hurry boy, it's waiting there for you"`,
            upVote : 0,
            downVote : 0,
            id :1
        },
        {
            title : 'Thread name #3',
            content : 'dafuq',
            upVote : 0,
            downVote : 0,
            id :2
        },
        {
            title : 'Thread name #4',
            content : `So I called up the Captain
            "Please bring me my wine"
            He said, 'We haven't had that spirit here
            Since 1969"
            And still those voices are calling from far away
            Wake you up in the middle of the night
            Just to hear them say`,
            upVote : 0,
            downVote : 0,
            id :3
        },
            
    ]);
    return (
        <ThreadContext.Provider value={[threads, setThreads]}>
            {props.children}
        </ThreadContext.Provider>
    );
} 