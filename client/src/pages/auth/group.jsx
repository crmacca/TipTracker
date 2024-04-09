import { useEffect } from 'react';
import { useParams } from 'react-router-dom'

const GroupPage = ({user}) => {
    const params = useParams();

    useEffect(() => {
        console.log(params)
    }, [params])

    return (
        <div>

        </div>
    )
}

export default GroupPage