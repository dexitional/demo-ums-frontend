import React from 'react'
import DepartmentStatPill from './DepartmentStatPill'

type Props = {
  data: any;
}

function DepartmentDashStats({ data }: Props) {
  // const data = [
  //   { label: "Department of Communication Studies", statistics: { program: 12, student: 43, staff: 73 }},
  //   { label: "Department of Business Administration", statistics: { program: 14, student: 23, staff: 43 }},
  //   { label: "Department of Procurement & Marketting", statistics: { program: 25, student: 70, staff: 22 }},
    
  // ];

  return (
    <section className="p-3 w-full min-h-fit bg-[#1e1d22] rounded-xl flex flex-col space-y-4">
    <h1 className="px-3 md:px-3 py-1 w-fit rounded-lg bg-[#343438] font-poppins text-white text-sm md:text-xl tracking-wider">DEPARTMENT STATISTICS</h1>
    <div className="grid grid-cols-2 font-roboto">
      { data.map((row,i) => (<DepartmentStatPill key={i} data={row}/>))}
    </div>
  </section>
  )
}

export default DepartmentDashStats