import React from 'react'
import { IconType } from 'react-icons';

type Props = {
  data?: any;
  label: string;
  value: string;
  Icon: IconType;
}

function AISPBioCard({ label, value, Icon }: Props) {

  return (
    <div className="md:py-3 md:px-5 py-1 px-1 shadow rounded-full flex space-x-4 bg-gradient-to-r from-green-50/50 via-green-50 to-white">
      <div className="flex flex-col space-y-2.5">
        <div className="p-2 border-4 border-primary-accent/10 bg-white rounded-full">
          <Icon className="h-4 w-4 text-primary-accent/70" />
        </div>
      </div>
      <div className="md:space-y-1 flex-1">
          <span className="text-xs md:text-sm font-noto text-primary-dark/80 tracking-wider">{label}</span>
          <p className="text-xs md:text-[0.85rem] font-roboto font-medium text-primary/60 tracking-wider leading-5">{value?.toUpperCase()}</p>
      </div>
    </div>
  )
}

export default AISPBioCard