import { useAppSelector } from "../../redux/hooks";

export default function InvitedUsers() {
  const allUsers = useAppSelector((state) => state.invited.users);
  return (
    <div className="w-full h-full">
      <h2 className="text-lg font-bold mb-2">Invited Users</h2>
      <table className="p-5 table-auto w-full">
        <thead className="bg-blue-950 text-white text-left">
          <tr>
            <th className="px-4 py-2">User</th>
            <th className="px-4 py-2">Project Assigned</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user, index) => (
            <tr key={index} className="border-b bg-white hover:bg-gray-100">
              <td className="p-4">{user.email}</td>
              <td className="p-4">{user.projectAssigned}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
