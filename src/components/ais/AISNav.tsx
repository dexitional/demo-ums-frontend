import React from 'react'
import { FaChartBar, FaProjectDiagram } from 'react-icons/fa'
import { GrDashboard, GrDocument } from 'react-icons/gr'
import AISNavItem from './AISNavItem'
import { BsPeople } from 'react-icons/bs'
import { HiMiniClipboardDocumentList } from 'react-icons/hi2'
import { HiOutlineAcademicCap } from 'react-icons/hi'

type Props = {
  user:any
}

function AISNav({ user }: Props) {
  const aisRole = user?.roles?.findLast(r => r?.appRole?.app?.tag?.toLowerCase() == 'ais')
  return (
    <div className="py-2 px-2 flex flex-col space-y-1 md:space-y-2 h-[75vh] overflow-y-scroll scrollbar-hide">
        <AISNavItem title="User Dashboard" url="dash" Icon={GrDashboard} /> 
        {['ais provc','ais registrar','ais techlead','ais admin','ais clerk i',].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="System Reports" url="reports" Icon={FaChartBar} /> }
        {['ais registrar','ais techlead','ais admin','ais clerk i','ais clerk ii','ais clerk iii','ais clerk iv','ais dean','ais head'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Student Module" url="students" Icon={BsPeople} /> }
        {['ais provc','ais registrar','ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Course Module" url="courses" Icon={HiMiniClipboardDocumentList} /> } 
        {['ais provc','ais registrar','ais techlead','ais admin','ais dean','ais head'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Program Module" url="programs" Icon={FaProjectDiagram} /> } 
        {['ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Department Module" url="departments" Icon={HiOutlineAcademicCap} /> } 
        {['ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Faculty Module" url="faculties" Icon={GrDashboard} /> } 
        {['ais registrar','ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Curriculum Module" url="curriculums" Icon={GrDashboard} /> } 
        {['ais provc','ais registrar','ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Scheme Module" url="schemes" Icon={GrDashboard} /> } 
        
        {['ais provc','ais registrar','ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Academic Calendar" url="calendars" Icon={GrDashboard} /> }
        {['ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Progression Log" url="progression" Icon={GrDashboard} /> } 
        {['ais registrar','ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Registration Log" url="registrations" Icon={GrDashboard} /> } 
        {['ais registrar','ais techlead','ais admin','ais clerk i','ais clerk iii'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Evaluation Log" url="evaluations" Icon={GrDashboard} /> } 
        {['ais provc','ais dean','ais head','ais techlead','ais admin','ais clerk ii','ais clerk iv'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Assessment Sheet" url="sheets" Icon={GrDashboard} /> } 
        {['ais dean','ais head','ais assessor','ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Assessor Sheet" url="mysheets" Icon={GrDashboard} /> } 
        {['ais provc','ais registrar','ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Resit Session" url="resit-sessions" Icon={GrDashboard} /> }
        {['ais provc','ais registrar','ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Resit Module" url="resits" Icon={GrDashboard} /> }
        {['ais provc','ais registrar','ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Graduation Session" url="graduate-sessions" Icon={GrDashboard} /> } {/* Graduation Session */}
        {['ais provc','ais registrar','ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Graduation Module" url="graduates" Icon={GrDashboard} /> } {/* Graduation */}
        {['ais provc','ais registrar','ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Graduation Logs" url="graduate-logs" Icon={GrDashboard} /> } {/* Graduation */}
        
        {['ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Backlog Module" url="backlogs" Icon={GrDashboard} /> } 
        {['ais clerk i','ais clerk iii','ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Transwift Module" url="transwifts" Icon={GrDashboard} /> } 
        {['ais provc','ais registrar','ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Service Letter" url="letters" Icon={GrDashboard} /> } 
        
        {/* {['ais clerk','ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Pixo System &reg;" url="pixo" Icon={GrDashboard} /> } */}
        
        
        {['ais provc','ais registrar','ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Deferment Module" url="deferments" Icon={GrDashboard} /> } 
        {['ais provc','ais registrar','ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Circular Module" url="notices" Icon={GrDashboard} /> } 
        {/* {['ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Reports Module &reg;" url="reports" Icon={GrDashboard} /> } */}
        
        {['ais registrar','ais techlead','ais admin','ais clerk ii','ais clerk iv'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Staff Module" url="staff" Icon={GrDashboard} /> }
        {['ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title="Job Module" url="jobs" Icon={GrDashboard} /> }
        {['ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title=" Unit Module" url="units" Icon={GrDashboard} /> }
        {/* {['ais techlead','ais admin'].includes(aisRole?.appRole?.title?.toLowerCase()) && <AISNavItem title=" Utility Module" url="units" Icon={GrDashboard} /> } Religion,Region,Country,Disability, */}
        
    </div>
  )
}

export default AISNav