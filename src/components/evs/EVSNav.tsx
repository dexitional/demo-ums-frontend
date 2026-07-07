import React from 'react'
import { GrDashboard } from 'react-icons/gr'
import EVSAdminNavItem from './EVSAdminNavItem'

type Props = {
  user:any
}

function EVSNav({ user }: Props) {
  const aisRole = user?.roles?.find(r => r?.appRole?.app?.tag?.toLowerCase() == 'ais')
  return (
    <div className="py-2 px-2 flex flex-col space-y-1 md:space-y-2 h-[75vh] overflow-y-scroll scrollbar-hide">
        {/* <EVSAdminNavItem title="System Reports" url="reports" Icon={FaChartBar} /> */}
        <EVSAdminNavItem title="Elections Module" url="elections" Icon={GrDashboard} />
    </div>
  )
}

export default EVSNav