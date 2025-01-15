import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addTask, removeTask, toggleTaskStatus } from '@/redux/slices/todoSlice';
import { useRef, useState } from 'react';
import { X, Check, Menu, User } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';

function MainContent() {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const { user } = useUser();
  const tasks = useAppSelector(state => state.todos.tasks);
  const [selectedTask, setSelectedTask] = useState<{ id: number; task: string; completed?: boolean } | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="relative min-h-[812px] h-full">
      {/* Mobile Header */}
      <div className="sm:hidden flex items-center justify-between p-4 border-b">
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded"
        >
          <Menu size={24} />
        </button>
        <div className="w-10 h-10 rounded-full border overflow-hidden">
          <img src={user?.imageUrl} className="w-full h-full object-cover" alt="Profile" />
        </div>
      </div>

      <div className="flex h-[calc(100%-4rem)] sm:h-full">
        {/* Sidebar */}
        <div className={`
          fixed sm:relative inset-y-0 left-0 w-64 bg-white transform 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          sm:translate-x-0 transition-transform duration-200 ease-in-out
          z-30 border-r sm:block sm:w-72 sm:flex-none
        `}>
          {/* Sidebar Content Wrapper */}
          <div className="h-full flex flex-col">
            {/* Profile Section - Fixed Height */}
            <div className="h-48 flex-shrink-0 flex items-center justify-center border-b">
              <div className="rounded-full h-28 w-28 border border-gray-200 overflow-hidden">
                <img src={user?.imageUrl} className="w-full h-full object-cover" alt="Profile" />
              </div>
            </div>
            
            {/* Navigation Section - Flexible Height */}
            <div className="flex-grow overflow-y-auto">
              <nav className="p-4">
                <ul className="space-y-2">
                  <li className="p-3 hover:bg-green-400 rounded cursor-pointer">All tasks</li>
                  <li className="p-3 hover:bg-green-400 rounded cursor-pointer">Important</li>
                  <li className="p-3 hover:bg-green-400 rounded cursor-pointer">Completed</li>
                  <li className="p-3 hover:bg-green-400 rounded cursor-pointer">Upcoming</li>
                </ul>
              </nav>
            </div>
            
            {/* Bottom Section - Fixed Height */}
            <div className="h-auto flex-shrink-0 border-t">
              <div className="p-4 border-b">
                <button className="w-full py-2 px-4 rounded">
                  Add New List
                </button>
              </div>
              <div className="p-4 h-40">
                <div className="h-full bg-gray-50 rounded flex items-center justify-center text-gray-400">
                  Graph Placeholder
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col relative w-full">
          {/* Overlay for mobile when sidebar is open */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-20 sm:hidden"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
          )}

          {/* Active Tasks Section */}
          <div className={`flex-1 flex flex-col ${selectedTask ? 'lg:pr-80' : ''}`}>
            <div className="h-8 flex items-center px-4 font-medium">Active Tasks</div>
            
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="h-28 shrink-0 p-4 border-b">
                <textarea 
                  placeholder="Add Task" 
                  className="h-9 bg-transparent w-full resize-none p-2 focus:outline-none"
                  ref={inputRef}
                ></textarea>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500 hidden sm:inline">Press Enter to add</span>
                  <button 
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full sm:w-auto"
                    onClick={() => {
                      if (inputRef.current?.value.trim()) {
                        dispatch(addTask(inputRef.current.value));
                        inputRef.current.value = '';
                      }
                    }}
                  >
                    Add Task
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-hidden">
                 <ul className="h-full overflow-y-auto">
                   {activeTasks.map((t) => (
                    <li 
                      key={t.id} 
                      className={`p-4 border-b cursor-pointer hover:bg-gray-50 flex items-center gap-3
                        ${selectedTask?.id === t.id ? 'bg-blue-50' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={t.completed}
                        className="h-4 w-4 rounded border-gray-300 cursor-pointer"
                        onChange={() => dispatch(toggleTaskStatus(t.id))}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <span 
                        className="flex-1"
                        onClick={() => setSelectedTask(t)}
                      >
                        {t.task}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Completed Tasks Section */}
          <div className={`h-[325px] ${selectedTask ? 'lg:pr-80' : ''}`}>
            <div className="h-8 flex items-center px-4 font-medium border-t">
              Completed Tasks ({completedTasks.length})
            </div>
            <div className="h-[calc(100%-2rem)] overflow-hidden">
              <ul className="h-full overflow-y-auto">
                {completedTasks.map((t) => (
                  <li 
                    key={t.id} 
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 flex items-center gap-3
                      ${selectedTask?.id === t.id ? 'bg-blue-50' : ''} text-gray-500`}
                  >
                    <div className="h-4 w-4 rounded bg-green-500 flex items-center justify-center">
                      <Check size={12} className="text-white" />
                    </div>
                    <span 
                      className="flex-1 line-through"
                      onClick={() => setSelectedTask(t)}
                    >
                      {t.task}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Task Details Sidebar - Full screen on mobile */}
          {selectedTask && (
          <div className="absolute top-0 right-0 h-full w-80 bg-white border-l shadow-lg flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="font-semibold">Task Details</h2>
              <button 
                onClick={() => setSelectedTask(null)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedTask.completed}
                    className="h-4 w-4 rounded border-gray-300"
                    onChange={() => dispatch(toggleTaskStatus(selectedTask.id))}
                  />
                  <label className="block text-sm font-medium text-gray-700">
                    {selectedTask.completed ? 'Completed' : 'Mark as completed'}
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Task</label>
                  <p className={`mt-1 ${selectedTask.completed ? 'line-through text-gray-500' : ''}`}>
                    {selectedTask.task}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Created</label>
                  <p className="mt-1 text-sm text-gray-500">Today</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <p className="mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${selectedTask.completed 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {selectedTask.completed ? 'Completed' : 'In Progress'}
                    </span>
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea 
                    className="mt-1 w-full p-2 border rounded-md text-sm min-h-[100px]"
                    placeholder="Add a more detailed description..."
                  />
                </div>
              </div>
            </div>

            <div className="p-4 border-t mt-auto">
              <button
                onClick={() => {
                  dispatch(removeTask(selectedTask.id));
                  setSelectedTask(null);
                }}
                className="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center gap-2"
              >
                Delete Task
              </button>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default MainContent;
