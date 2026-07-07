import React from 'react'
import ProgramStatPill from './ProgramStatPill'

type Props = {
  data: any;
}

function ProgramDashStats({ data }: Props) {
  return (
    <section className="p-3 w-full min-h-fit bg-[#1e1d22] rounded-xl flex flex-col space-y-4">
    <h1 className="px-3 md:px-3 py-1 w-fit rounded-lg bg-[#343438] font-poppins text-white text-sm md:text-xl tracking-wider">PROGRAM STATISTICS</h1>
    <div className="grid font-roboto">
      <ProgramStatPill data={data} />
    </div>
  </section>
  )
}

export default ProgramDashStats