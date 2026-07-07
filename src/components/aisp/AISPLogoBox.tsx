import React from 'react'

type Props = {}

function AISPLogoBox({}: Props) {
  return (
    <div className="my-2 px-4 py-2 bg-gradient-to-l to-primary/80 via-primary from-primary/90">
        {/* <div className="h-10 flex items-center justify-center s pace-x-0 font-sans text-sm rounded-full border-2 bg-lime-100 border-b-8 border-primary/70 text-blue-950/70 tracking-widest"> */}
        <div className="h-10 flex items-center justify-center s pace-x-0 font-sans text-sm rounded-full border-4 border-slate-400 bg-white tracking-widest">
            <span className="font-extrabold text-primary-dark/90">STUDENT</span> 
            <span className="font-mono font-bold text-primary-accent/90">&nbsp;PORTAL</span>
        </div>
    </div>   
  )
}

export default AISPLogoBox