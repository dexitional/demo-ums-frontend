import React from 'react'
import DricNav from './AISPNav'
import { Menu } from '@headlessui/react'
import { CgMenuGridO } from "react-icons/cg";
import { GrDashboard } from 'react-icons/gr';
import { TbChecklist, TbReportMoney } from 'react-icons/tb';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import { BsPersonCircle, BsPersonVcard, BsReceipt } from 'react-icons/bs';
import { VscAccount } from 'react-icons/vsc';
import { FaAddressCard, FaChartBar, FaVoteYea } from 'react-icons/fa';
import LASNavItem from './AISPNavItem';
import { useUserStore } from '../../utils/authService';
import NSSNavItem from './AISPNavItem';
import { MdOutlineAddTask, MdOutlineDashboard } from 'react-icons/md';
import { CiUser } from 'react-icons/ci';
import { PiLockKey } from 'react-icons/pi';
import AISPNavItem from './AISPNavItem';
import { BiSpreadsheet } from 'react-icons/bi';

type Props = {
  user:any;
}

function AISPRoleNav({ user }: Props) {
  const hrsRole = user?.roles?.find(r => r?.app_tag?.toLowerCase() == 'hrs')
  return (
    <Menu as='div' className="relative">
        <div className="px-4 p-2 md:hidden flex items-center justify-between border-b-2 border-slate-200/50 bg-slate-100 text-gray-400">
         
          <div className="flex items-center">
             <span className="px-3 p-1 text-sm tracking-widest font-bold text-primary/60 bg-white border-2 border-primary/60 rounded-md"><span className="text-primary/40">STUDENT</span> PORTAL</span>
          </div>
          <Menu.Button className="p-0.5 bg-white border shadow-sm rounded-md">
            <CgMenuGridO className="h-7 w-7 text-gray-500/70"/>
          </Menu.Button>
        </div>
        {/* Mobile Navigation Slide */}
        <Menu.Items className="z-20 absolute top-13 left-0 min-h-max w-full rounded-b-[2.5rem] md:rounded-none border-b-8 border-blue-100/90 bg-primary backdrop-blur-lg backdrop-opacity-50 bg-opacity-95">
          <div className="py-4 px-6 pr-0  flex-1 flex flex-col space-y-1 md:space-y-4">
            {/* <Menu.Item as={AISPNavItem} title="Dashboard" url="dash" Icon={MdOutlineDashboard}></Menu.Item> */}
            <Menu.Item as={AISPNavItem} title="My Profile" url="profile" Icon={FaAddressCard}></Menu.Item>
            <Menu.Item as={AISPNavItem} title="Fees & Charges" url="fees" Icon={BsReceipt}></Menu.Item>
            <Menu.Item as={AISPNavItem} title="Course Registration" url="registration" Icon={TbChecklist}></Menu.Item>
            <Menu.Item as={AISPNavItem} title="Academic Results" url="results" Icon={BiSpreadsheet}></Menu.Item>
            <Menu.Item as={AISPNavItem} title="Elections Portal" url="/evs/dash" Icon={FaVoteYea}></Menu.Item>
            {/* <Menu.Item as={AISPNavItem} title="MLK Circulars" url="notices" Icon={MdOutlineAddTask}></Menu.Item> */}
            {/* <Menu.Item as={AISPNavItem} title="Service Requests" url="services" Icon={MdOutlineAddTask}></Menu.Item> */}
            <Menu.Item as={AISPNavItem} title="Change Password" url="changepwd" Icon={PiLockKey}></Menu.Item>
            {['hrs techlead','hrs admin'].includes(hrsRole?.role_name?.toLowerCase()) && <Menu.Item as={NSSNavItem} title="Roles" url="roles" Icon={VscAccount} ></Menu.Item>}
          </div>
        </Menu.Items>
    </Menu>
  )
}

export default AISPRoleNav