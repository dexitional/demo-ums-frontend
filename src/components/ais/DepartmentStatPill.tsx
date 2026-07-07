import React from 'react'
import DashStatPillet from './DashStatPillet'
import { GiFiles } from 'react-icons/gi'
import DepartmentStatPillet from './DepartmentStatPillet';

type Props = {
  data: any;
}

function DepartmentStatPill({ data }: Props) {
  return (
    <div className="m-2 md:m-2 md:w-fit min-h-fit bg-[#343438]/50 rounded-xl flex flex-col justify-between items-center">
        <div className="p-3 w-full">
            <p className="px-3 py-1 w-full rounded-lg bg-[#ffcb85] font-poppins font-semibold text-gray-800 text-xs md:text-base tracking-wide leading-[5rem]">{data?.label}</p>
        </div>
        <div className="p-3 w-full md:w-fit grid grid-cols-2 md:grid-cols-3 gap-2">
          <DepartmentStatPillet label="Programs" value={data?.programs} />
          <DepartmentStatPillet label="Students" value={data?.students} />
          <DepartmentStatPillet label="Staff" value={data?.staff} />
        </div>
    </div>
  )
}

export default DepartmentStatPill