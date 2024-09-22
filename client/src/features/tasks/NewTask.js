import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewTaskForm from './NewTaskForm'

const NewTask = () => {
    const users = useSelector(selectAllUsers)

    if (!users?.length) return <p>Not Currently Available</p>

    const content = <NewTaskForm users={users} />

    return content
}
export default NewTask