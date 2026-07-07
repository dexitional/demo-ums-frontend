import React from 'react'
import { useUserStore } from '../../utils/authService';
import Service from '../../utils/aisService'
import PrintHeader from './PrintHeader';


type Props = {}

export async function loader() {
    const user = useUserStore.getState().user;
    const slip = await Service.fetchRegistration(user?.user?.tag);
    return { slip }
  }

function PrintRegisterSlip({}: Props) {
  return (
    <div className="w-full flex flex-col justify-center items-center bg-white print:m-0">
        <div className="my-20 mx-auto px-16 py-20 w-full max-w-6xl rounded border shadow-sm shadow-slate-300 print:px-6 print:py-8 print:m-0 print:w-full print:max-w-screen print:shadow-none print:border-0 print:scale-100">
            <PrintHeader /> 
           
            <div className="my-10 mx-auto max-w-4xl w-full flex flex-col space-y-8" style={{'font': "16px 'Arial Narrow MT Std', sans-serif" }}>
                <div className="text-xl">
                    <p><b>AR/BAA/18/0039</b></p><br/>
                    <p>Joseph Darko Agyiri</p>
                    <p>0541031131</p>
                </div>
                <div className="space-y-4 text-xl">
                    <p>Dear Madam,</p>
                    <h1 className="font-semibold font-serif text-xl underline">RE: APPLICATION FOR DEFERMENT</h1>
                    <div className="space-y-4">
                        <p>We write to inform you that your request for deferment of programme for the 2021/2022 academic year has been approved.</p>
                        <p>Please note that by our Academic Programmes, Policies, Policies and Regulations for Undergraduate Studies, deferment may be granted for one Academic Year only within the entire duration of the programme. You are, therefore, required to report at the beginning of the First Semester of the 2022/2023 academic year to continue your programme after payment of the required fees for the academic year.</p>
                        <p>Yours sincerely,</p>
                        <p className="my-4 text-5xl italic ">Signature</p>
                        <div className="my-4">
                            <span>Gideon Enoch Abbeyquaye, Esq</span><br/>
                            <b className="italic font-serif text-lg">DIRECTOR (ACADEMIC AFFAIRS)<br/>for: REGISTRAR</b>
                            <div className="my-10 flex space-x-12">
                                <span className="italic font-medium text-sm">CC:</span>
                                <div className="italic">
                                    <p>Provost, College of Humanities and Legal Studies</p>
                                    <p>Dean, Faculty of Arts</p>
                                    <p>Dean of Students</p>
                                    <p>Dean of Finance</p>
                                    <p>Head, Department of Ghanaian Languages and Linguistics</p>
                                    <p>Asst. Registrar (Teaching and Examinations)</p>
                                    <p>Head, SRS</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PrintRegisterSlip