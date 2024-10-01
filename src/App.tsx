import { FC } from "react";
import Dashboard from "./components/UI/Dashboard";
import { Outlet } from "react-router-dom";
import TimeMonitor from "./components/UI/TimeMonitor";

const App: FC = () => {
  return (
    <section className="w-screen h-screen bg-gray-200 flex overflow-hidden">
      <Dashboard />
      <div className="flex-1 flex flex-col justify-center items-center p-10">
        <TimeMonitor />
        <Outlet />
      </div>
    </section>
  );
};

export default App;
