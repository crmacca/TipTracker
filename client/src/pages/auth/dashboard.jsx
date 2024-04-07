import { BottomNavigation, BottomNavigationAction, LinearProgress } from "@mui/material"
import Groups2Icon from '@mui/icons-material/Groups2';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import LockIcon from '@mui/icons-material/Lock';
import { useEffect, useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";

const DashboardPage = ({user}) => {

    const [page, setPage] = useState(0)

    useEffect(() => {
        if(user === null) window.location.pathname = '/signin'
    }, [user])
    

    useEffect(() => {
        if(page === 2) {
            axios.delete(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`)
            .then((res) => {
                window.location.pathname = '/'
                toast.success('Logged out')
            })
        }
    }, [page])

    return (
        <div>
            {
                user === 'loading' ? (
                    <div className="w-full">
                        <LinearProgress color="primary" />
                    </div>
                ) : (
                    <div className="w-full flex items-center min-h-screen">



                        <div className="fixed w-full bottom-0 left-0">
                            <div className="max-w-4xl w-full m-auto">


                            <BottomNavigation
                                showLabels
                                value={page}
                                onChange={(_, newValue) => {
                                    setPage(newValue);
                                }}
                            >
                                <BottomNavigationAction label="Groups" icon={<Groups2Icon />} />
                                <BottomNavigationAction label="Options" icon={<DisplaySettingsIcon />} />
                                <BottomNavigationAction label="Logout" icon={<LockIcon />} />
                            </BottomNavigation>

                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default DashboardPage