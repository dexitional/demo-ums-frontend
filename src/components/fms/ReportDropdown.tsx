import React from 'react'

type Props = {
    label: string;
    name: string;
    options: any;
}

function ReportDropdown({ label, name, options }: Props) {
  return (
    <div className="flex flex-col space-y-0.5 border rounded bg-slate-50 overflow-hidden">
      <span className="px-3 py-1 w-fit bg-amber-50 text-gray-500 rounded-r shadow">{label}</span>
      <select name={name} className="border-0 bg-transparent text-[0.7rem] font-semibold uppercase text-primary-dark focus:ring-0">
        {/* { (['major'].includes(name)) && (<option value="">NO MAJOR</option>) } */}
        { (['rsession','session'].includes(name)) && (<option value="">----</option>) }
        { (['mode','year','program','major'].includes(name)) && (<option value="">----</option>) }
        {/* { (['rsession'].includes(name)) && (<option value="">NO MAJOR</option>) } */}
        { options.map((r,i) => (<option key={i} value={r.value}>{r.label}</option>))}
      </select>
    </div>
  )
}

export default ReportDropdown