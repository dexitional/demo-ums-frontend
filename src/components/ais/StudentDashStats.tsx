import React from 'react'
import ProgramStatPill from './ProgramStatPill'
import StudentStatPill from './StudentStatPill'

type Props = {
   data:any;
}

function StudentDashStats({ data }: Props) {
  return (
    <section className="p-3 w-full min-h-fit bg-[#1e1d22] rounded-xl flex flex-col space-y-4">
    <h1 className="px-3 md:px-3 py-1 w-fit rounded-lg bg-[#343438] font-poppins text-white text-sm md:text-xl tracking-wider">STUDENT STATISTICS</h1>
    <div className="w-full grid font-roboto">
      <StudentStatPill data={data}/>
    </div>
  </section>
  )
}

export default StudentDashStats