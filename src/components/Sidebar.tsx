function Sidebar() {
  return (
    <div className="w-1/4 bg-gray-800 p-5">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-6">
        <img
          src="https://via.placeholder.com/80"
          alt="Profile"
          className="rounded-full w-20 h-20"
        />
        <h3 className="mt-3 text-lg font-semibold">Hey, ABCD</h3>
      </div>

      {/* Menu */}
      <ul className="space-y-4">
        <li className="p-2 rounded-md bg-gray-700">All Tasks</li>
        <li className="p-2 rounded-md bg-green-700">Today</li>
        <li className="p-2 rounded-md hover:bg-gray-700 cursor-pointer">
          Important
        </li>
        <li className="p-2 rounded-md hover:bg-gray-700 cursor-pointer">
          Planned
        </li>
        <li className="p-2 rounded-md hover:bg-gray-700 cursor-pointer">
          Assigned to me
        </li>
      </ul>

      {/* Add List Button */}
      <button className="mt-6 w-full py-2 bg-green-600 rounded-md text-center">
        + Add List
      </button>

      {/* Today Tasks Section */}
      <div className="mt-10">
        <h4 className="text-lg font-semibold">Today Tasks</h4>
        <div className="mt-4 h-32 w-32 mx-auto">
          {/* Placeholder for Pie Chart */}
          <div className="bg-green-500 w-full h-full rounded-full"></div>
        </div>
        <p className="text-center mt-4">11 Tasks</p>
      </div>
    </div>
  );
}

export default Sidebar;