import React,{useState} from 'react';
import './Login.css';

function Login(){
    const [click,setClick] = useState(false);
    
    const closeForm = () => {
        document.getElementById('form').style.display = 'none';
    }
    return(
        <div className='body'>
            <div className='center'>
            <button onClick={()=>{setClick(!click);
            console.log(click);}
            
            }>Login</button>
            </div>
            <div className={click?'popup-open':'popup'} >
                <form>
                <div className="form" id='form'>
                <button className='close-btn' type='button' onClick={closeForm} >x</button>
                    <h2>Log in</h2>
                    <div className="form-element">
                        <label for="username">Username</label>
                        <input type="text" id="username" placeholer="Enter Username" />
                    </div>
                    <div className="form-element"> 
                        <label for="password">Password</label>
                        <input type="password" id="password" placeholer="Enter Password"/>
                    </div>
                    <div className="form-element">
                        <input type="checkbox" id="remember-me"/>
                        <label for="remember-me">Remember Me</label>
                    </div>
                    <div className="form-element">
                        <button type='submit'>Sign in</button>
                    </div>
                </div>
                </form>
            </div>
        </div>
    )
};



export default Login;