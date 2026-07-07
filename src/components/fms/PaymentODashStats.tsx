import React from 'react'
import PaymentStatPill from './PaymentStatPill';

type Props = {
   data:any;
}

function PaymentODashStats({ data }: Props) {
  const label = `OTHER PAYMENTS`
  
  return (
    <section className="p-3 w-full min-h-fit bg-[#1e1d22] rounded-xl flex flex-col space-y-4">
    <h1 className="px-3 md:px-3 py-1 w-fit rounded-lg bg-[#343438] font-poppins text-white text-sm md:text-xl tracking-wider">{label}</h1>
    <div className="w-full grid font-roboto">
      { data.map((row:any,i: number) => 
        <PaymentStatPill key={i} data={row}/>
      )}


      {/* <PaymentStatPill label="ENGLISH PROFICIENCY" data={data}/>
      <PaymentStatPill label="GRADUATION FEES" data={data}/>
      <PaymentStatPill label="RESIT FEES" data={data}/>
      <PaymentStatPill label="VOUCHER FEES" data={data}/> */}
    </div>
  </section>
  )
}

export default PaymentODashStats