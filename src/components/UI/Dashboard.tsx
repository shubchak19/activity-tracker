import { FC } from "react";
import { NavLink } from "react-router-dom";
const Dashboard: FC = () => {
  return (
    <div className="flex flex-col h-screen text-white gap-10 bg-blue-950">
      <h1 className="p-10 font-bold text-xl w-fit">Activity Monitor</h1>
      <nav className="flex-1 flex flex-col gap-5 font-semibold px-12">
        <NavLink
          className={({ isActive }) => `navlink ${isActive ? "active" : ""}`}
          to="/"
        >
          Timesheet
        </NavLink>
        <NavLink
          className={({ isActive }) => `navlink ${isActive ? "active" : ""}`}
          to="/assignment"
        >
          Assignments
        </NavLink>
        <NavLink
          to="/invite"
          className={({ isActive }) => `navlink ${isActive ? "active" : ""}`}
        >
          Invite
        </NavLink>
      </nav>
    </div>
  );
};

export default Dashboard;
