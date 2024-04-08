import { useEffect, useState } from "react"
import Input from "../../components/Input"
import toast from "react-hot-toast"
import axios from "axios"

const SignInPage = ({user}) => {
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

        setErrors(errs)

        if(validationErr) return setLoading(false)

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
            username: e.target[0].value,
            password: e.target[1].value
        })
        .then((res) => {
            toast.success('Successfully logged in!')
            window.location.pathname = '/dashboard'
            setLoading(false)
        })
        .catch((err) => {
            setLoading(false)
            console.error(err)
            
            if(err.response.status === 400) {
                if(err.response.data === 'NO_CREDENTIAL_COMBO_FOUND') {
                    setErrors({generic: 'No user found with those credentials.'})
                    toast.error('No user found with those credentials.')
                }
            } else {
                setErrors({generic: 'An unknown error occurred. Please try again later.'})
            }
        })

    }

    useEffect(() => {
        if(user !== null && user !== 'loading') window.location.pathname = '/dashboard'
    }, [user])

    return (
        <div className="flex items-center flex-col m-auto p-20 gap-2 font-inter justify-center min-h-screen">
            <img alt='TipTracker brand logo' className="smLogo rounded-3xl border-2 border-gray-500 border-opacity-40" src='logoSM.png'/>
            <h1 className="text-white font-semibold font-inter mt-5 text-2xl">
                TipTracker
            </h1>
            <p className="font-inter text-white font-regular text-xl">
                Please login to continue!
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
                    <button type="submit" className="button font-inter min-w-full mt-2">
                        Sign In
                    </button>
                    <a href='/signup' className="mt-2 font-inter text-sm underline cursor-pointer text-white" onClick={() => {
                        window.location.pathname = '/signup'
                    }}>
                        Create an account instead?
                    </a>
                </form>
            </div>
            <h1 className="fixed w-full text-center bottom-0 left-0 text-gray-400 text-md pb-2 bgMain">
                This is a private app, not intended for public use / not documented. <br/> © 2024 Christian McNamara
            </h1>
        </div>
    )
}

export default SignInPage