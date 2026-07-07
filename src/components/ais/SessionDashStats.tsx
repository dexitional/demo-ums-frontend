import React from 'react'

type Props = {
    data:any;
}

function SessionDashStats({ data }: Props) {
  return (
    <section className="py-3 px-6 w-full min-h-fit bg-[#1e1d22] rounded-xl flex flex-col space-y-4">
    <h1 className="px-3 md:px-6 py-1 w-fit rounded-lg bg-[#343438] font-poppins text-white text-sm md:text-xl tracking-wider">DEFAULT SYSTEM SESSIONS</h1>
    <div className="grid md:grid-cols-4 gap-4 md:gap-3 font-roboto">
      {/* ACADEMIC  */}
      <div className="p-2 md:col-span-2 font-poppins rounded-xl bg-[#343438] space-y-2">
        <h2 className="px-4 py-1 w-fit font-poppins font-bold text-gray-700 bg-[#ffcb85] rounded-lg">ACADEMIC</h2>
        <div className="p-1 grid md:grid-cols-2 gap-2 md:gap-1">
          { data?.academic.map((r,i) => (
          <div key={i} className="p-2.5 bg-black rounded-xl flex flex-col space-y-2">
             <h3 className="px-2 py-1 text-amber-100 text-[0.65rem] rounded-lg font-roboto font-semibold leading-4 tracking-wider  bg-white/20">{r.label}</h3>
             <div className="grid grid-cols-2 md:grid-cols-1 gap-1">
                <div className="px-2 py-1 w-full font-poppins font-bold text-gray-700 bg-[#fbfd8e] rounded">
                   <div className="text-[0.65rem]">REGISTERED</div>
                   <div className="text-sm italic">{r.register}</div>
                </div>
                <div className="px-2 py-1 w-full font-poppins font-bold text-gray-700 bg-[#ffcb85] rounded">
                   <div className="text-[0.62rem]">UNREGISTERED</div>
                   <div className="text-sm italic">{r.unregister}</div>
                </div>
             </div>
          </div>
          ))}
        </div>
      </div>

      {/* RESIT  */}
      <div className="p-2 font-poppins rounded-xl bg-[#343438] space-y-2">
        <h2 className="px-4 py-1 w-fit font-poppins font-bold text-gray-700 bg-[#ffcb85] rounded-lg">RESIT</h2>
        <div className="p-1">
          <div className="p-2.5 bg-black rounded-xl flex flex-col space-y-2">
             <h3 className="px-2 py-1 text-amber-100 text-[0.65rem] rounded-lg font-roboto font-semibold leading-4 tracking-wider  bg-white/20">{data?.resit?.label}</h3>
             <div className="grid grid-cols-2 gap-1">
                <div className="px-2 py-1 w-full font-poppins font-bold text-gray-700 bg-[#fbfd8e] rounded">
                   <div className="text-[0.65rem]">REGISTERED</div>
                   <div className="text-sm italic">{data?.resit?.register}</div>
                </div>
                <div className="px-2 py-1 w-full font-poppins font-bold text-gray-700 bg-[#ffcb85] rounded">
                   <div className="text-[0.62rem]">ESTIMATED</div>
                   <div className="text-sm italic">{data?.resit?.estimate}</div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* GRADUATION  */}
      <div className="p-2 font-poppins rounded-xl bg-[#343438] space-y-2">
        <h2 className="px-4 py-1 w-fit font-poppins font-bold text-gray-700 bg-[#ffcb85] rounded-lg">GRADUATION</h2>
        <div className="p-1">
          <div className="p-2.5 bg-black rounded-xl flex flex-col space-y-2">
             <h3 className="px-2 py-1 text-amber-100 text-[0.65rem] rounded-lg font-roboto font-semibold leading-4 tracking-wider  bg-white/20">2025 GRADUATION SESSION</h3>
             <div className="grid grid-cols-2 gap-1">
                <div className="px-2 py-1 w-full font-poppins font-bold text-gray-700 bg-[#fbfd8e] rounded">
                   <div className="text-[0.65rem]">COMPLETED</div>
                   <div className="text-sm italic">{data?.graduation?.complete}</div>
                </div>
                <div className="px-2 py-1 w-full font-poppins font-bold text-gray-700 bg-[#ffcb85] rounded">
                   <div className="text-[0.62rem]">GRADUANDS</div>
                   <div className="text-sm italic">{data?.graduation?.graduand}</div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default SessionDashStats