import React from 'react'
import DricNavItem from './HRSNavItem'
import { FaChartBar, FaRegChartBar } from 'react-icons/fa'
import { MdAccountCircle, MdSwitchAccount } from 'react-icons/md'
import { VscAccount } from 'react-icons/vsc'
import { BsPersonCircle, BsPersonVcard } from 'react-icons/bs'
import { AiOutlineFundProjectionScreen } from 'react-icons/ai'
import { TbReportMoney } from 'react-icons/tb'
import { GrDashboard } from 'react-icons/gr'
import { useUserStore } from '../../utils/authService'
import HRSNavItem from './HRSNavItem'

type Props = {}

function HRSNav({}: Props) {

  const { user } = useUserStore(state => state)
  const hrsRole = user?.roles?.find(r => r?.app_tag?.toLowerCase() == 'hrs')
  
  return (
    <div className="py-2 px-2 flex-1 flex flex-col space-y-1 md:space-y-2">
        {['hrs techlead','hrs admin'].includes(hrsRole?.role_name?.toLowerCase()) && <HRSNavItem title="System Reports" url="reports" Icon={FaChartBar} /> }
        <HRSNavItem title="Staff Module" url="staff" Icon={GrDashboard} /> {/* Staff DOB, Active Staff, In-active Staff, Contract Staff ( Part-timers )  ->   { Staff Printout, Staff Relative, Staff Qualification, Staff Bank Details, Update Staff Data } */} 
        <HRSNavItem title="Elevation Module" url="staff" Icon={GrDashboard} />  {/* Appointments, promotions, Confirmations, Renewals, Post-retirements */}
        <HRSNavItem title="Leave Module" url="staff" Icon={GrDashboard} /> {/* HR Requests, Head Requests, Complete Requests, Leave Types, Leave Holidays, Leave Constants, Leave Entitlements, Leave Balances */}
        <HRSNavItem title="Transfer Module" url="staff" Icon={GrDashboard} /> Effective Transfers, Transfer Requests
        <HRSNavItem title="NSS Module" url="nss" Icon={GrDashboard} /> {/* Active Personel, In-active Personel */}
        <HRSNavItem title="Circular Module" url="staff" Icon={GrDashboard} /> {/* */}
        <HRSNavItem title="Disciplinary Records" url="staff" Icon={GrDashboard} />
        <HRSNavItem title="Position Module" url="staff" Icon={GrDashboard} />
        <HRSNavItem title="Appraisal Module" url="staff" Icon={GrDashboard} />
        <HRSNavItem title="Promotion Module" url="staff" Icon={GrDashboard} />
        <HRSNavItem title="Study Leave Module" url="staff" Icon={GrDashboard} />
        <HRSNavItem title="Units Module" url="staff" Icon={GrDashboard} />
        <HRSNavItem title="Designation Module" url="staff" Icon={GrDashboard} /> {/* List of Designation -> [ Next promotion period, Next Promotion ID, Probation period, Set Reminders for promotion, & Struction -> Set Reminders, Effected Change Request, Designation Change Requests  */}
        <HRSNavItem title="Scale Module" url="staff" Icon={GrDashboard} />  {/*  Grade with 5 Notch fields each, start range, end rang ,*/}


        

        
        {/* <HRSNavItem title="Dashboard" url="dash" Icon={GrDashboard} />
        <HRSNavItem title="Funders" url="funders" Icon={TbReportMoney} />
        <HRSNavItem title="Projects" url="projects" Icon={AiOutlineFundProjectionScreen} />
        <HRSNavItem title="Investigators" url="investigators" Icon={BsPersonVcard} />
        <HRSNavItem title="Personels" url="personels" Icon={BsPersonCircle} />
        {['hrs techlead','dric admin'].includes(dricRole?.role_name?.toLowerCase()) && <HRSNavItem title="Roles" url="roles" Icon={VscAccount} /> } */}
    </div>
  )
}

export default HRSNav