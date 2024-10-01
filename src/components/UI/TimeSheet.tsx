import { FC } from "react";
import { useAppSelector } from "../../redux/hooks";

const TimeSheet: FC = () => {
  const allScreenshots = useAppSelector((state) => state.screenshots.all);

  return (
    <div className="w-full h-full overflow-y-auto">
      <table className="table-auto w-full">
        <thead className="bg-blue-950 text-white text-left">
          <tr>
            <th className="px-4 py-2">Screenshot</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {allScreenshots.map(({ imageUrl, timeStamp }, index) => (
            <tr key={index} className="border-b bg-white hover:bg-gray-100">
              <td className="p-4">
                <img src={imageUrl} alt="Screenshot" width="100" height="50" />
              </td>
              <td className="p-4">{new Date(timeStamp).toDateString()}</td>
              <td className="p-4">
                {new Date(timeStamp).toLocaleTimeString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeSheet;
