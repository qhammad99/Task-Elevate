import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import Dashboard from "./components/Dashboard";
import Welcome from "./features/auth/Welcome";
import TaskList from "./features/tasks/TaskList";
import UsersList from "./features/users/UsersList";
import EditUser from "./features/users/EditUser";
import EditTask from "./features/tasks/EditTask";
import NewUserForm from "./features/users/NewUserForm";
import NewTask from "./features/tasks/NewTask";
import Prefetch from "./features/auth/Prefetch";

function App() {
  return (
    <Routes>
      <Route path = '/' element = {<Layout />}>
        <Route index element = {<Public />} />
        <Route path = 'login' element = {<Login />} />

        <Route element={<Prefetch />}>
          <Route path = 'dash' element = {<Dashboard />}>
            <Route index element={<Welcome />} />

            <Route path="users">
              <Route index element={<UsersList />} />
              <Route path=":id" element={<EditUser />} />
              <Route path="new" element={<NewUserForm />} />
            </Route>

            <Route path="tasks">
              <Route index element={<TaskList />} />
              <Route path=":id" element={<EditTask />} />
              <Route path="new" element={<NewTask />} />
            </Route>

          </Route>
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
