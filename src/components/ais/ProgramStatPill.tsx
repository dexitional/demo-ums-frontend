import React from 'react'
import DashProgStatPillet from './DashProgStatPillet';

type Props = {
  data: any;
}

function ProgramStatPill({ data }: Props) {
  return (
    <div className="m-2 md:m-4 md:w-fit min-h-fit bg-[#ffcb85] rounded-xl flex flex-col justify-between items-center">
        {/* <div className="pt-3 md:pt-6 px-6 w-full self-start flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
            <h1 className="px-3 md:px-6 py-1 w-full rounded-lg bg-[#343438]/60 font-poppins font-semibold text-amber-100 text-sm md:text-xl tracking-wider">{data?.label}</h1>
        </div> */}
        <div className="p-3 md:p-6 w-full md:w-fit grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          { data.map((r,i) => (<DashProgStatPillet key={i} label={r.label} y1={r.y1} y2={r.y2} y3={r.y3} y4={r.y4}  iconBg="bg-[#fbfd8e]" />))}
        </div>
    </div>
  )
}

export default ProgramStatPill