import React from 'react'

function MainContent() {
  return (
    <div className='border-red-500 border-2 h-[812px] sm:grid sm:grid-cols-5'>
        <div className='col-span-1 border-red-600 border-2'>
            <div className='border-red-700 border-2 h-1/5 flex flex-col justify-center items-center'>
                <div className='rounded-full h-28 w-28 border-red-400 border-2'></div>
                <div className=''>hey there</div>
            </div>
            <div className='border-red-700 border-2 h-2/5 p-5'>
                <div className='border-red-500 border-2 h-full'>
                    <ul className='h-4/5 border-red-500 border-2 mt-6'>
                        <li className='h-1/4 p-3'>All tasks</li>
                        <li className='h-1/4 p-3'>All tasks</li>
                        <li className='h-1/4 p-3'>All tasks</li>
                        <li className='h-1/4 p-3'>All tasks</li>
                    </ul>
                </div>
            </div>
            <div className='border-red-700 border-2 h-1/6'>Add list</div>
            <div className='border-red-700 border-2 h-1/5'>Graph</div>

        </div>
        <div className='col-span-4'>
            <div className='border-red-500 border-2 h-4/6'>
                <div className='h-8 flex items-center border-red-500 border-2'>Todo</div>
                <ul>
                    <li>Text</li>
                    <li>Map</li>

                </ul>
            </div>
            <div className='border-red-500 border-2 h-2/6'></div>
        </div>
      
    </div>
  )
}

export default MainContent
