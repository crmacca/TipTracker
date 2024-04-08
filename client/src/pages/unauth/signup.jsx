import { useEffect, useState } from "react"
import Input from "../../components/Input"
import axios from "axios"
import toast from "react-hot-toast"

const SignUpPage = ({user}) => {
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false) 

    function submit(e) {
        e.preventDefault()
        if(loading) return
        setLoading(true)

        setErrors({})

        let validationErr = false // Used to determine if there was any validation errors
        let errs = {}

        if(e.target[0].value.length === 0) {
            errs = {...errs, username: 'Username cannot be empty.'}
            validationErr = true
        }

        if(e.target[0].value.length > 30) {
            errs = {...errs, username: 'Username must be less than 30 characters.'}
            validationErr = true
        }

        if(e.target[1].value.length < 4) {
            errs = {...errs, password: 'Password must be at least 4 characters.'}
            validationErr = true
        }

        if(e.target[1].value !== e.target[2].value) {
            errs = {...errs, password: 'Passwords do not match.'}
            validationErr = true
        }
        setErrors(errs)
        
        if(validationErr) return setLoading(false)

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/signup`, {
            username: e.target[0].value,
            password: e.target[1].value
        })
        .then(res => {
            toast.success('Account created successfully!')
            setLoading(false)
            window.location.pathname = '/dashboard'
        })
        .catch((err) => {
            setLoading(false)
            console.error(err)
            if(err.response.status === 400) {
                if(err.response.data === 'USERNAME_TOO_LONG') {
                    setErrors({username: 'Username must be less than 30 characters.'})
                } else if(err.response.data === 'PASSWORD_TOO_SHORT') {
                    setErrors({password: 'Password must be at least 4 characters.'})
                } else if(err.response.data === 'PASSWORD_TOO_LONG') {
                    setErrors({password: 'Password must be less than 300 characters.'})
                } else if(err.response.data === 'ALREADY_EXISTS') {
                    setErrors({username: 'An account with that username already exists.'})
                }
            } else {
                toast.error('An error occurred. Please try again later.')
                setErrors({generic: 'An error occurred. Please try again later.'})
            }
        })
    }

    useEffect(() => {
        if(user !== null && user !== 'loading') {
            toast.error('You must be logged out to view this page!')
            window.location.pathname = '/'
        }
    }, [user])

    return (
        <div className="flex items-center flex-col m-auto p-20 gap-2 font-inter justify-center min-h-screen">
            <img alt='TipTracker brand logo' className="smLogo rounded-3xl border-2 border-gray-500 border-opacity-40" src='logoSM.png'/>
            <h1 className="text-white font-semibold font-inter mt-5 text-2xl">
                TipTracker
            </h1>
            <p className="font-inter text-white font-regular text-xl">
                Please fill out your details to create an account.
            </p>
            {
                errors.generic && (
                <p className="font-inter text-red-400">
                    {errors.generic}
                </p>
                )   
            }
            <div className="flex gap-2 items-center mt-5">
                <form onSubmit={submit} className="flex flex-col gap-2">
                    <p className="font-inter text-white">
                        Username
                    </p>
                    {
                     errors.username && (
                        <p className="font-inter text-red-400">
                            {errors.username}
                        </p>
                     )   
                    }
                    <Input type='text' placeholder='Username'/>
                    <p className="font-inter text-white">
                        Password
                    </p>
                    {
                     errors.password && (
                        <p className="font-inter text-red-400">
                            {errors.password}
                        </p>
                     )   
                    }
                    <Input type='password' placeholder='Password'/>
                    <Input type='password' placeholder='Confirm Password'/>
                    <button type="submit" className="button font-inter min-w-full mt-2">
                        Create an Account
                    </button>
                    <a href='/signin' className="mt-2 font-inter text-sm underline cursor-pointer text-white" onClick={() => {
                        window.location.pathname = '/signin'
                    }}>
                        Already have an account? Login instead
                    </a>
                </form>
            </div>
            <h1 className="fixed w-full text-center bottom-0 left-0 text-gray-400 text-md pb-2 bgMain">
                This is a private app, not intended for public use / not documented. <br/> © 2024 Christian McNamara
            </h1>
        </div>
    )
}

export default SignUpPage