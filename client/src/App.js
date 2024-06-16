import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import Dashboard from "./components/Dashboard";
import Welcome from "./features/auth/Welcome";
import TaskList from "./features/tasks/TaskList";
import UsersList from "./features/users/UsersList";

function App() {
  return (
    <Routes>
      <Route path = '/' element = {<Layout />}>
        <Route index element = {<Public />} />
        <Route path = 'login' element = {<Login />} />

        <Route path = 'dash' element = {<Dashboard />}>
          <Route index element={<Welcome />} />
          <Route path="tasks">
            <Route index element={<TaskList />} />
          </Route>

          <Route path="users">
            <Route index element={<UsersList />} />
          </Route>
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
