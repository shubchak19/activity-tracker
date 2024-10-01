import App from "../App";
import InvitedUsers from "../components/UI/InvitedUsers";
import InviteForm from "../components/UI/InviteForm";
import TimeSheet from "../components/UI/TimeSheet";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <TimeSheet /> },
      { path: "invite", element: <InviteForm /> },
      { path: "assignment", element: <InvitedUsers /> },
    ],
  },
];

export default routes;
