import axios from "axios"
import { useEffect, useState } from "react"
import {toast} from "react-hot-toast"
import CloseIcon from '@mui/icons-material/Close';
import {IconButton} from '@mui/material'
import InputFW from "../../components/InputFW";

const GroupsPage = ({page, setLoading, loading, user}) => {
    const [groups, setGroups] = useState([])
    const [modal, setModal] = useState({
        open: false,
        name: ''
    })
    const [errors, setErrors] = useState({
        name: null
    })

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

    function createGroup(e) {
        e.preventDefault();
        if(loading) return
        setLoading(true)

        if(modal.name === '') {
            setErrors({name: 'Name is required'})
            return
        }

        if(modal.name.length > 30) {
            setErrors({name: 'Name is too long'})
            return
        }

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/groups/new`, {
            name: modal.name
        })
        .then((res) => {
            if(res.data.success) {
                window.location.reload();
            }
            setLoading(false)
        })
        .catch((err) => {
            console.error(err)
            toast.error('Failed to create group.')
            setLoading(false)
        })
    }
    
    return (
        <div className="text-start text-white w-full">
            
            <div id="myModal" className={`modal ${modal.open ? 'block' : 'hidden'}`}>

            <div className="modal-content">
                <div className="flex items-center gap-2">
                    <h1 className="font-inter text-xl font-semibold">New Group</h1>
                    <IconButton sx={{marginLeft: 'auto'}} onClick={() => setModal({open: false, name: ''})}>
                        <CloseIcon />
                    </IconButton>
                </div>

                <form onSubmit={createGroup}>
                    <p className="font-inter font-regular mb-1">Group Name</p>
                    {
                        errors.name && (
                            <p className="font-inter font-regular mb-1 text-red-400">{errors.name}</p>
                        )
                    }
                    <InputFW placeholder='Friday Nights' value={modal.name} onChange={((e) => setModal({open: true, name: e.target.value}))}/>
                    <button type='submit' className="button w-full mt-3">
                        Create Group
                    </button>
                </form>
            </div>

            </div>

            <div className="flex items-center">
                <h1 className="font-inter font-semibold text-3xl">
                    Groups
                </h1>
                <button onClick={() => setModal({open: true, name: ''})} className="button font-inter ml-auto">
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