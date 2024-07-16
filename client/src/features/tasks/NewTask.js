import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewTaskForm from './NewTaskForm'

const NewTask = () => {
    const users = useSelector(selectAllUsers)

    const content = users ? <NewTaskForm users={users} /> : <p>Loading...</p>

    return content
}
export default NewTask