import { BottomNavigation, BottomNavigationAction, CircularProgress, LinearProgress } from "@mui/material"
import Groups2Icon from '@mui/icons-material/Groups2';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import LockIcon from '@mui/icons-material/Lock';
import { useEffect, useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";
import GroupsPage from "./groups";

const DashboardPage = ({user}) => {

    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(false)

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
                    <div className="w-full flex flex-col items-center min-h-screen max-w-xl mx-auto">

                        <LinearProgress color="primary" />

                        <div className="py-2 mx-auto flex flex-col w-full">
                            <div className="flex gap-2 items-center justify-start mx-auto select-none">
                                <img src="logoSM.png" alt='tiptracker brand logo' className="rounded-2xl w-20" />
                                <div className="flex flex-col text-start items-start justify-start">
                                    <h1 className="text-white font-inter font-semibold text-3xl">TipTracker</h1>
                                    <h1 className="text-white font-inter font-regular text-1xl">Hello @{user.username}</h1>
                                </div>
                            </div> 

                            <main className="w-full">
                                {
                                    loading && (
                                        <div className="pt-[30vh] flex items-center justify-center">
                                            <CircularProgress />
                                        </div>
                                    )
                                }

                                {
                                    page === 0 && (
                                        <div className={loading && 'hidden'}>
                                            <GroupsPage page={page} setLoading={setLoading} user={user} />
                                        </div>
                                    )
                                }
                            </main>

                            <div className="fixed w-full bottom-0 left-0">
                                <div className="max-w-4xl w-full m-auto">
                                    <BottomNavigation
                                        sx={{background: 'none', fontFamily: 'Inter, sans-serif'}}
                                        showLabels
                                        value={page}
                                        onChange={(_, newValue) => {
                                           if(page !== newValue) {
                                            setLoading(true);
                                            setPage(newValue);
                                           }
                                        }}
                                    >
                                        <BottomNavigationAction label="Groups" icon={<Groups2Icon />} />
                                        <BottomNavigationAction label="Options" icon={<DisplaySettingsIcon />} />
                                        <BottomNavigationAction label="Logout" icon={<LockIcon />} />
                                    </BottomNavigation>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default DashboardPage