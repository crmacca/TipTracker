const LandingPage = () => {
    return (
        <div className="flex items-center flex-col m-auto p-20 gap-2 font-inter justify-center min-h-screen">
            <img alt='TipTracker brand logo' className="smLogo rounded-3xl border-2 border-gray-500 border-opacity-40" src='logoSM.png'/>
            <h1 className="text-white font-semibold font-inter mt-5 text-2xl">
                TipTracker
            </h1>
            <p className="font-inter text-white font-regular text-xl">
                Please select an option.
            </p>
            <div className="flex gap-2 items-center mt-5">
                <button onClick={() => window.location.pathname = '/signin'} className="font-inter">
                    Sign In
                </button>
                <button onClick={() => window.location.pathname = '/signup'} className="font-inter">
                    Sign Up
                </button>
            </div>
            <h1 className="fixed w-full text-center bottom-0 left-0 text-gray-400 text-md mb-2">
                This is a private app, not intended for public use / not documented. <br/> © 2024 Christian McNamara
            </h1>
        </div>
    )
}

export default LandingPage