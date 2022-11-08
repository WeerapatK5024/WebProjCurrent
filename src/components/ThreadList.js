    import React , {useState, useContext} from 'react';
import { ThreadContext } from '../ThreadContext';
import Thread from './Thread';

const ThreadList = () => {
    const [threads , setThreads] = useContext(ThreadContext);
  
    return(
        <div>
            {threads.map(thread =>(
                <Thread title={thread?.title} content={thread?.content} key={thread?.id} />
            ))}
        </div>
    )
}

export default ThreadList;