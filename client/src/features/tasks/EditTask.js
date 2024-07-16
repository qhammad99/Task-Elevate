import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectTasksById } from './tasksApiSlice'
import { selectAllUsers } from '../users/usersApiSlice'
import EditTaskForm from './EditTaskForm'

const EditTask = () => {
    const { id } = useParams()

    const note = useSelector(state => selectTasksById(state, id))
    const users = useSelector(selectAllUsers)

    const content = note && users ? <EditTaskForm note={note} users={users} /> : <p>Loading...</p>

    return content
}
export default EditTask