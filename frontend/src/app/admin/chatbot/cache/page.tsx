export default function CahceChat() {
  return (
    <>
      <div className="w-full bg-white rounded-2xl shadow-md">
        <div className="p-6">
          <div className="w-full flex justify-center mb-4">
            <h1 className="text-gray-900 text-lg font-semibold">
              Tabel Cache Chat
            </h1>
          </div>

          <div className="header">
            <div className="w-full flex justify-between mb-4 items-center">
              <div className="sortir flex gap-4">
                <select
                  name=""
                  className="p-2 border rounded-lg bg-[#3a3086] text-white"
                  id=""
                  defaultValue={""}
                >
                  <option value="" disabled>
                    {" "}
                    Sort By Value
                  </option>
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-gray-600">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-medium">
                <tr>
                  <th className="px-6 py-3 border-b border-gray-300 text-center w-5">
                    No
                  </th>
                  <th className="px-6 py-3 border-b border-gray-300 text-center">
                    User
                  </th>
                  <th className="px-6 py-3 border-b border-gray-300 text-center">
                    Text
                  </th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
