import { FaComments, FaCreditCard, FaHistory, FaSearch } from "react-icons/fa";

const recordTypes = [
  "scanHistory",
  "searchHistory",
  "chatHistory",
  "paymentHistory",
] as const;

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function ActivityRecords() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Activity & Records</h2>
      <p className="text-gray-600 mb-6">
        Control what activity and records are stored in your account.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {recordTypes.map((record) => (
          <div
            key={record}
            className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {record === "scanHistory" && (
              <FaHistory className="text-teal-500 text-4xl mb-2" />
            )}
            {record === "searchHistory" && (
              <FaSearch className="text-teal-500 text-4xl mb-2" />
            )}
            {record === "chatHistory" && (
              <FaComments className="text-teal-500 text-4xl mb-2" />
            )}
            {record === "paymentHistory" && (
              <FaCreditCard className="text-teal-500 text-4xl mb-2" />
            )}
            <h3 className="text-lg font-semibold">
              {capitalizeFirstLetter(record)}
            </h3>
            <p className="text-gray-500 mb-4">{getRecordDescription(record)}</p>
            <p className="text-gray-400 text-sm italic">No records available</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function getRecordDescription(record: (typeof recordTypes)[number]) {
  const descriptions: Record<(typeof recordTypes)[number], string> = {
    scanHistory: "View your history of scanned items.",
    searchHistory: "See your past searches in the app.",
    chatHistory: "Keep or delete your chat history.",
    paymentHistory: "View your payment history.",
  };
  return descriptions[record];
}
