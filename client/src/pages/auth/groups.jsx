import { useEffect } from "react"

const GroupsPage = ({page, setLoading, user}) => {

    useEffect(() => {
        console.log(page)
        if(page === 0) {
            setTimeout(() => {
                setLoading(false)
            }
            , 1000)
        }
    }, [page]) // Rerun function every time page number in parent element changes, check if page is current then handle loading.
    
    return (
        <div className="text-start text-white w-full">
            <div className="flex items-center">
                <h1 className="font-inter font-semibold text-3xl">
                    Groups
                </h1>
                <button className="button font-inter ml-auto">
                    New Group
                </button>
            </div>

            <div className="flex flex-col gap-3 py-2">
                <button className="button font-inter">
                    Friday Nights
                </button>
                <button className="button font-inter">
                    Friday Nights
                </button>
            </div>
        </div>
    )
}

export default GroupsPage