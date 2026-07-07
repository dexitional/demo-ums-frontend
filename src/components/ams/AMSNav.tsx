import React from 'react'
import { FaChartBar } from 'react-icons/fa'
import { GrDashboard } from 'react-icons/gr'
import { default as AISNavItem, default as AMSNavItem } from './AMSNavItem'
import { FaDashcube } from 'react-icons/fa6'

type Props = { user:any; }

function AMSNav({ user }: Props) {
  const amsRole = user?.roles?.find(r => r?.appRole?.app?.tag?.toLowerCase() == 'ams')
  return (
    <div className="py-2 px-2 flex-1 flex flex-col space-y-1 md:space-y-2">
      <AISNavItem title="Dashboard" url="dash" Icon={FaDashcube} /> 
      {/* {['ams techlead','ams super','ams admin i','ams admin ii'].includes(amsRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="System Reports" url="reports" Icon={FaChartBar} /> } */}
      {['ams techlead','ams super'].includes(amsRole?.appRole?.title?.toLowerCase()) && <AMSNavItem title="Session Module" url="sessions" Icon={GrDashboard} /> }
      {['ams techlead','ams super','ams admin i','ams admin ii','ams clerk i','ams clerk ii'].includes(amsRole?.appRole?.title?.toLowerCase()) && <AMSNavItem title="Voucher Module" url="vouchers" Icon={GrDashboard} /> }
      {['ams techlead','ams super'].includes(amsRole?.appRole?.title?.toLowerCase()) && <AMSNavItem title="Letters Module" url="letters" Icon={GrDashboard} /> }
      {['ams techlead','ams super','ams admin i','ams admin ii','ams clerk i','ams clerk ii'].includes(amsRole?.appRole?.title?.toLowerCase()) && <AMSNavItem title="Applicant Module" url="applicants" Icon={GrDashboard} /> }
      {['ams techlead','ams super','ams admin i','ams admin ii',].includes(amsRole?.appRole?.title?.toLowerCase()) && <AMSNavItem title="Shortlist Module" url="shortlists" Icon={GrDashboard} /> }
      {['ams techlead','ams super','ams admin i','ams admin ii','ams clerk i','ams clerk ii'].includes(amsRole?.appRole?.title?.toLowerCase()) && <AMSNavItem title="Admitted Students" url="matriculants" Icon={GrDashboard} /> } 
    </div>
  )
}

export default AMSNav