const ServerErrorPage = () => {
    return (
        <div className="flex items-center flex-col m-auto p-20 gap-2 font-inter justify-center min-h-screen">
            <img alt='TipTracker brand logo' className="smLogo rounded-3xl border-2 border-gray-500 border-opacity-40" src='logoSM.png'/>
            <h1 className="text-white font-semibold font-inter mt-5 text-3xl">
                Server Error
            </h1>
            <p className="font-inter text-white font-regular text-1xl text-center">
                    The server appears to be down/not responding. Please try again later.
            </p>
            <div className="flex gap-2 items-center mt-5">
                <button className="font-inter" onClick={() => window.location.pathname = '/'}>
                    Try Again
                </button>
            </div>
            <h1 className="fixed w-full text-center bottom-0 left-0 text-gray-400 text-md mb-2">
                This is a private app, not intended for public use / not documented. <br/> © 2024 Christian McNamara
            </h1>
        </div>
    )
}

export default ServerErrorPage