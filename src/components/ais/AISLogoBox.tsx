import React from 'react'

type Props = {}

function AISLogoBox({}: Props) {
  return (
    <div className="my-2 p-4 rounded-l-md bg-gradient-to-l to-primary via-white from-white">
        <div className="h-10 flex items-center justify-center space-x-0 font-sans text-xl rounded-t-md border-2 bg-white border-b-8 border-primary text-primary tracking-widest">
            <span className="font-extrabold">ACADEMICS</span> 
            <span className="font-mono">&reg;</span>
        </div>
    </div>   
  )
}

export default AISLogoBox