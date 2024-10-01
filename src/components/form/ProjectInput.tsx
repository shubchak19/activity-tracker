import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setProjectName } from "../../redux/slices/formSlice";
import { resetAddedStatus } from "../../redux/slices/invitedSlice";

const ProjectInput: FC = () => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState("");
  const { projectName, allProjects } = useAppSelector((state) => state.form);
  const dispatch = useAppDispatch();

  function handleProjectName(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setProjectName(e.target.value));
    if (showSuggestions) setTimeout(() => setShowSuggestions(false), 150);
  }

  function handleClick() {
    dispatch(resetAddedStatus());
    setShowSuggestions(true);
  }

  useEffect(() => {
    if (!projectName) setInput("");
  }, [projectName]);

  return (
    <div className="mb-4 flex flex-col">
      <label htmlFor="project" className="block mb-1 font-semibold">
        Project Name
      </label>
      <div className="mb-4 flex items-center relative">
        <input
          id="project"
          type="text"
          value={input}
          onClick={handleClick}
          onBlur={handleProjectName}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Demo project"
          className="px-4 py-2 border rounded w-full"
        />
        {showSuggestions && (
          <ul className="absolute w-full top-full bg-white border rounded">
            {allProjects
              .filter((project) =>
                project.toLowerCase().includes(input.toLowerCase())
              )
              .map((project) => (
                <li
                  key={project}
                  className="px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setInput(project);
                    dispatch(setProjectName(project));
                    setShowSuggestions(false);
                  }}
                >
                  {project}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProjectInput;
