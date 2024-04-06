import Input from "../../components/Input"

const SignInPage = () => {

    function submit(e) {
        e.preventDefault()
        console.log(e)
    }

    return (
        <div className="flex items-center flex-col m-auto p-20 gap-2 font-inter justify-center min-h-screen">
            <img alt='TipTracker brand logo' className="smLogo rounded-3xl border-2 border-gray-500 border-opacity-40" src='logoSM.png'/>
            <h1 className="text-white font-semibold font-inter mt-5 text-2xl">
                TipTracker
            </h1>
            <p className="font-inter text-white font-regular text-xl">
                Please login to continue!
            </p>
            <div className="flex gap-2 items-center mt-5">
                <form onSubmit={submit} className="flex flex-col gap-2">
                    <p className="font-inter text-white">
                        Username
                    </p>
                    <Input type='text' placeholder='Username'/>
                    <p className="font-inter text-white">
                        Password
                    </p>
                    <Input type='password' placeholder='Password'/>
                    <button type="submit" className="font-inter min-w-full mt-2">
                        Sign In
                    </button>
                    <a className="mt-2 font-inter text-sm underline cursor-pointer text-white" onClick={() => {
                        window.location.pathname = '/signup'
                    }}>
                        Create an account instead?
                    </a>
                </form>
            </div>
            <h1 className="fixed w-full text-center bottom-0 left-0 text-gray-400 text-md mb-2">
                This is a private app, not intended for public use / not documented. <br/> © 2024 Christian McNamara
            </h1>
        </div>
    )
}

export default SignInPage