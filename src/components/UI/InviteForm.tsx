import { CheckCircle2Icon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  addToProjects,
  setEmail,
  setProjectName,
} from "../../redux/slices/formSlice";
import { addUser } from "../../redux/slices/invitedSlice";
import { User } from "../../types";
import EmailInput from "../form/EmailInput";
import ProjectInput from "../form/ProjectInput";

const InviteForm = () => {
  const { projectName, email } = useAppSelector((state) => state.form);
  const { newUserAdded } = useAppSelector((state) => state.invited);
  const dispatch = useAppDispatch();

  const handleInvite = () => {
    if (projectName && email) {
      const newUser: User = { email, projectAssigned: projectName };
      dispatch(setProjectName(""));
      dispatch(setEmail(""));
      dispatch(addToProjects(projectName));
      dispatch(addUser(newUser));
    }
  };

  const isInviteButtonEnabled = () => projectName && email;

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form
        className="w-1/3 min-w-72 relative rounded-md flex flex-col bg-white p-10"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col gap-6">
          <EmailInput />
          <ProjectInput />
        </div>

        <button
          className={`px-4 py-2 bg-blue-800 text-white disabled:bg-blue-300 font-bold rounded ${
            isInviteButtonEnabled() ? "" : "disabled"
          }`}
          onClick={handleInvite}
          disabled={!isInviteButtonEnabled()}
        >
          Send Invitation
        </button>
        {newUserAdded && (
          <p className="absolute top-full left-0 p-4 flex justify-center font-semibold w-full text-green-600">
            <CheckCircle2Icon className="mr-2" />
            Invitation has been sent successfully
          </p>
        )}
      </form>
    </div>
  );
};

export default InviteForm;
