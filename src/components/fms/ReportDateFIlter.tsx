import React from 'react'

type Props = {
    label: string;
    name: string;
    options: any;
}

function ReportDateFilter({ label, name, options }: Props) {
  return (
    <div className="flex flex-col space-y-0.5 border rounded bg-slate-50 overflow-hidden">
      <span className="px-3 py-1 w-fit bg-amber-50 text-gray-500 rounded-r shadow">{label}</span>
      <input type="date" name={name} className="border-0 bg-transparent text-[0.7rem] font-semibold uppercase text-primary-dark focus:ring-0"/>
    </div>
  )
}

export default ReportDateFilter