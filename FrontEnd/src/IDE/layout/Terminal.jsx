import React, { useState } from "react"

const Terminal = () => {
  const [result, setResult] = useState(
    "Hello world !!!\nprogram exit with 0 in status"
  )
  return (
    <div className=' h-full min-w-[400px] bg-[#202327] outline outline-1 outline-[#363e55] rounded-xl flex flex-col ml-3 mr-2'>
      <header className='w-full min-h-[30px] border-b border-[#363e55] flex items-center justify-center text-white font-semibold text-xl'>
        console
      </header>
      <div className='w-full h-full'></div>
    </div>
  )
}

export default Terminal
