import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidateData } from '../utils/validate'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/Firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';


const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate()
  const name = useRef(null)
  const email = useRef(null)
  const password = useRef(null)
  const dispatch = useDispatch()

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm)
  }

  const handleButtonClick = () => {
    const message = checkValidateData(email.current.value, password.current.value, name?.current?.value)
    setErrorMessage(message)
    if (message) return
    if (!isSignInForm) {
      createUserWithEmailAndPassword
        (
          auth,
          email.current.value,
          password.current.value
        )
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgy4ps3zYNdcmAFhjCDH_Gjgp8gYxRE7547T5ueaB0&s"
          }).then(() => {
            // Profile updated!

            //getting updated(uid, email....) from auth(updated user)
            const { uid, email, displayName, photoURL } = auth.currentUser
            dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }))
            navigate("/browse")
          }).catch((error) => {
            // An error occurred
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + ":-" + errorMessage)
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + ":-" + errorMessage)
          // ..
        });
    }
    else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          navigate("/browse")
          console.log(user, 'USER')
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + ":-" + errorMessage)

        });

    }
  }

  return (
    <div>
      <Header />
      <div className='absolute'>
        <img
          src='https://assets.nflxext.com/ffe/siteui/vlv3/dc1cf82d-97c9-409f-b7c8-6ac1718946d6/14a8fe85-b6f4-4c06-8eaf-eccf3276d557/IN-en-20230911-popsignuptwoweeks-perspective_alpha_website_large.jpg'
          alt='background image'
        />
      </div>
      <form onSubmit={(e) => e.preventDefault()} className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
        <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm &&
          <input ref={name} type='text' placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700' />

        }
        <input ref={email} type='text' placeholder='Email Address' className='p-4 my-4 w-full bg-gray-700' />
        <input ref={password} type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-700' />
        <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>
        <button className='p-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now"}  </p>
      </form>
    </div>
  )
}

export default Login