import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setEmail } from "../../redux/slices/formSlice";
import { resetAddedStatus } from "../../redux/slices/invitedSlice";

const EmailInput: FC = () => {
  const [input, setInput] = useState("");
  const dispatch = useAppDispatch();
  const { email } = useAppSelector((state) => state.form);

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    if (validateEmail(input)) {
      dispatch(setEmail(e.target.value));
    }
  }
  useEffect(() => {
    if (!email) setInput("");
  }, [email]);

  return (
    <div>
      <label className="block font-semibold mb-1">Email</label>
      <input
        type="email"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onClick={() => dispatch(resetAddedStatus())}
        onBlur={handleEmail}
        placeholder="someone@gmail.com"
        className={`px-4 py-2 border rounded w-full${
          !validateEmail(input) && input ? "border-red-500" : ""
        }`}
      />
      {input && !validateEmail(input) && (
        <p className="text-red-500 text-sm">Invalid email address</p>
      )}
    </div>
  );
};

export default EmailInput;
