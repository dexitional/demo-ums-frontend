import React from 'react'
import { FaChartBar } from 'react-icons/fa'
import { GrDashboard } from 'react-icons/gr'
import FMSNavItem from './FMSNavItem'

type Props = {
  user:any;
}

function FMSNav({ user }: Props) {
  const fmsRole = user?.roles?.find(r => r?.appRole?.app?.tag?.toLowerCase() == 'fms');
  console.log("roles", fmsRole)
  return (
    <div className="py-2 px-2 flex-1 flex flex-col space-y-1 md:space-y-2">
        {['fms techlead','fms admin'].includes(fmsRole?.appRole?.title?.toLowerCase()) && <FMSNavItem title="System Reports" url="reports" Icon={FaChartBar} /> }
        <FMSNavItem title="User Dashboard" url="dash" Icon={GrDashboard} /> 
        <FMSNavItem title="Student Bills" url="bills" Icon={GrDashboard} /> 
        <FMSNavItem title="Student Charges" url="charges" Icon={GrDashboard} /> 
        <FMSNavItem title="Student Accounts" url="accounts" Icon={GrDashboard} /> 
        <FMSNavItem title="Student Debtors" url="debtors" Icon={GrDashboard} /> 
        <FMSNavItem title="Fees Payments" url="payments" Icon={GrDashboard} /> 
        <FMSNavItem title="Other Payments" url="transacts" Icon={GrDashboard} />
        <FMSNavItem title="Voucher Sales" url="vsales" Icon={GrDashboard} /> 
        <FMSNavItem title="Voucher Prices" url="vcosts" Icon={GrDashboard} /> 
        <FMSNavItem title="Service Costs" url="services" Icon={GrDashboard} /> 
        
    </div>
  )
}

export default FMSNav