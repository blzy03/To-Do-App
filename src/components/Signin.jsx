import React, { useState } from 'react'
import "../Styles/Signin.css"
import google from "../assets/google.png"
import appIcon from "../assets/appIcon.png"
import logo from"../assets/logo.png"
import{ useNavigate} from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from './Firebase'


function Signin() {
  const [redirect, setRedirect]= useState(false)
  const navigate = useNavigate()
  const handleClick=() => {
    signInWithPopup (auth , provider).then(()=>{
      setRedirect(true)
  })
 }
 



  return (
    <div className='signincontent'>
    <div className='signdiv'>
        <div className='signinText'>
        <div className='appIcon'>
            <img src={appIcon}  alt=' '/>
          </div>

        <h1>To-Do-List 🗸</h1>
          
        </div>
        <div className='logoDiv'>
          <img src={logo} className='logoSignin' alt='' />
        </div>
        <div className='googlediv'>
            <button onClick={handleClick}>
{/*               this button will show a pop up of our authentication provider to authenticate the user */}
              <img src={google} alt='' className='google' />
              <h3>
                Continue with Google
              </h3>
            </button>
        </div>
    </div>

    {redirect?navigate("/signin"):console.log("error")}
{/*       on successfull sign in page will be redirected,else it will show an error in the console */}
    </div>
  )
}

export default Signin
