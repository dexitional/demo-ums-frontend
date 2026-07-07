import React from 'react';
import ResultListItem from './ResultListItem';

type Props = { 
  data?: any;
  title?: string;
  index: number;
  cgpa?: any
}

function ResultListView({ title,data,index,cgpa }: Props) {

  let credit = data?.filter((r:any) => !!r?.status).reduce((sum,cur) => cur.credit+sum, 0);
  let gradepoint = data?.filter((r:any) => !!r?.status).reduce((sum,cur) => (cur.credit*cur.gradepoint)+sum,0);
  let gpa = gradepoint/credit;
  

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <h1 className="w-full text-sm md:text-base font-bold font-roboto tracking-wider text-primary-dark/80 flex flex-col space-y-2 md:space-y-0 md:flex-row justify-between">
          <div className='py-1 px-5 bg-primary/90 md:rounded-l md:rounded-tr-3xl text-white'>{title}</div>
          {/* <div className="px-6 py-1 bg-primary-dark/80 flex items-center rounded-full text-xs md:text-sm text-white md:font-bold">LEVEL {data && Math.ceil(data[0].semesterNum/2) * 100 || 'NONE'}</div> */}
          <div className="px-5 py-1 w-fit bg-primary-dark/80 flex items-center rounded-3xl text-xs md:text-sm text-white md:font-bold">YEAR {data && Math.ceil(data[0].semesterNum/2) || 'NONE'}</div>
        </h1>
      </div>
      <div className="pt-6 grid grid-cols-1 gap-y-4 border bg-slate-50/50 rounded-xl shadow-[0px_0px_8px_#ddd_inset]">
        <div className="px-6 pb-4  hidden md:grid grid-cols-6 place-items-center border-b border-slate-200 text-xs text-primary font-sans font-semibold uppercase tracking-widest">
            <div className="place-self-start">Code</div>
            <div className="col-span-2 place-self-start">Course</div>
            <div>CR</div>
            <div>GD</div>
            <div>GP</div>
        </div>
        <div className="grid grid-cols-1 text-xs text-slate-600 font-roboto font-medium tracking-widest">
          { data && data?.map((row:any) => (<ResultListItem key={row.id} row={row} />))}
          { !data && (<h1 className="w-full text-center text-gray-400 text-[0.65rem] font-semibold tracking-widest uppercase">No Record ...</h1>)}
        </div>
        { data && 
        <div className="px-6 pb-4 md:grid grid-cols-6 place-items-center border-slate-200 text-xs text-primary/70 font-sans font-semibold uppercase tracking-widest">
            <div className="place-self-start">&nbsp;</div>
            <div className="col-span-2 place-self-start flex items-center justify-between"><span>CGPA:</span>&nbsp;&nbsp;&nbsp;<span>{ isNaN(cgpa && cgpa[index]) ? '--' : (cgpa && cgpa[index]|| 0) }</span></div>
            <div className="flex items-center justify-between"><span>GPA:</span>&nbsp;&nbsp;&nbsp;<span>{isNaN(gpa) ? '--' : gpa?.toFixed(2) }</span></div>
            <div className="flex items-center justify-between"><span>TCR:</span>&nbsp;&nbsp;&nbsp;<span>{ isNaN(credit) ? '--' : credit?.toFixed(1)}</span></div>
            <div className="flex items-center justify-between"><span>TGP:</span>&nbsp;&nbsp;&nbsp;<span>{ isNaN(gradepoint) ? '--' : gradepoint?.toFixed(1)}</span></div>
        </div>
        }
      </div>
    </div>
  )
}

export default ResultListView