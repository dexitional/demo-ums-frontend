import React from 'react'
import PaymentStatPill from './PaymentStatPill';
import moment from 'moment';

type Props = {
   data:any;
}

function PaymentDashStats({ data }: Props) {
  data.label = `${moment().format("YYYY")} STATISTICS PERIOD`
  const label = `ACADEMIC FEE PAYMENTS`
  return (
    <section className="p-3 w-full min-h-fit bg-[#1e1d22] rounded-xl flex flex-col space-y-4">
    <h1 className="px-3 md:px-3 py-1 w-fit rounded-lg bg-[#343438] font-poppins text-white text-sm md:text-xl tracking-wider">{label}</h1>
    <div className="w-full grid font-roboto">
      <PaymentStatPill data={data}/>
    </div>
  </section>
  )
}

export default PaymentDashStats