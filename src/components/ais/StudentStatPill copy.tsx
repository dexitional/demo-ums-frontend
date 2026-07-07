import React from 'react'
import DashStatPillet from './DashStatPillet'
import { GiFiles } from 'react-icons/gi'

type Props = {
  data: any;
}

function StudentStatPill({ data }: Props) {
  return (
    <div className="m-2 md:m-4 md:w-fit min-h-fit bg-[#ffcb85] rounded-xl flex flex-col justify-between items-center">
        {/* <div className="pt-3 md:pt-6 px-6 w-full self-start flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
            <h1 className="px-3 md:px-6 py-1 w-full rounded-lg bg-[#343438]/60 font-poppins font-semibold text-amber-100 text-sm md:text-xl tracking-wider">{data?.label}</h1>
        </div> */}
        <div className="p-3 md:p-6 w-full md:w-fit grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            <DashStatPillet label="Active" value={56} male={33}  female={23}  iconBg="bg-[#fbfd8e]" />
            <DashStatPillet label="Deffered" value={54}  male={44}  female={10}  iconBg="bg-[#fbfd8e]" />
            <DashStatPillet label="Completed" value={55}  male={34}  female={34}  iconBg="bg-[#fbfd8e]" />
            <DashStatPillet label="Graduated" value={43}  male={32}  female={11}  iconBg="bg-[#fbfd8e]" />
        </div>
    </div>
  )
}

export default StudentStatPill