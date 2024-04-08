import axios from "axios"
import { useEffect, useState } from "react"
import {toast} from "react-hot-toast"

const GroupsPage = ({page, setLoading, user}) => {
    const [groups, setGroups] = useState([])

    useEffect(() => {
        if(page === 0) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/groups`)
            .then((res) => {
                if(res.data.success) {
                    setGroups(res.data.groups)
                    setLoading(false)
                }
            })
            .catch((err) => {
                console.error(err)
                toast.error('Failed to get groups from server.')
                window.location.pathname = '/servererr'
            })
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
                {
                    groups.map((group) => (
                        <button key={group.id} className="text-start button font-inter">
                            {group.name}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default GroupsPage