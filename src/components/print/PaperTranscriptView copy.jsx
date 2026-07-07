import ReactHtml from "html-react-parser"
import React, { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import './FormPrint.css'
import TranscriptHeader from './TranscriptHeader'
import { getPoint, isCreditPassed } from "../../utils/util"
import Service from '../../utils/aisService'

// Loader for Single Project
export async function loader({ params }){
  const data = await Service.fetchTranswift(params.transwiftId)
  return { data }
}

const PaperTranscriptView = () => {
    const { sso } = useSelector(state=>state)
    const { modal } = sso
    const [ mdata, setMdata ] = useState({})
    const [ vdata, setVdata ] = useState([])
    const [ fgpa, setFgpa ] = useState(0.0)
    const [ cgpa, setCgpa ] = useState(0.0)
    const [ user, setUser ] = useState({})
    const printRef = useRef();
 


    const handlePrint = useReactToPrint({
      content: () => printRef.current,
    });

    const stageAverages = () => {
        let dt = [], cgp = 0, ccr = 0, ccs = 0, fgpa = 0, cgpa = 0, j = 0;
        const semesters = modal.content.data && Object.entries(modal.content.data).length || 0;
        modal.content.data && Object.entries(modal.content.data).map(([name,data],i) => {
            if(data && data.length > 0){
                let cct = 0, cgt = 0;
                data.map((row,i) => {
                    cgp += getPoint(row.total_score,JSON.parse(row.grade_meta)) * row.credit
                    ccs += isCreditPassed(row.total_score,JSON.parse(row.grade_meta)) ? row.credit : 0;
                    ccr += row.credit
                    
                    cgt += getPoint(row.total_score,JSON.parse(row.grade_meta)) * row.credit
                    //ccp += helperData.getPoint(row.total_score,JSON.parse(row.grade_meta)) * row.credit
                    cct += row.credit
                    if( i == 0 ) setUser({ indexno: row.indexno, refno: row.refno, name: row.name, fname:row.fname, mname: row.mname, lname: row.lname, program_name: row.program_name, major_name: row.major_name,gender: row.gender, stype:row.stype, template: row.template  })
                }) 
                
                // FGPA Algorithm
                if(i%semesters == 1 || i%semesters == 3) fgpa += (1/6*(cgp/ccr))
                if(i%semesters == 5 || i%semesters == 7) fgpa += (2/6*(cgp/ccr))
                
                // CGPA & GPA Algorithm
                dt.push({ cgpa: (cgp/ccr).toFixed(2), gpa:(cgt/cct).toFixed(2), ccp:ccs, cct:ccr  })
          }
        }) 
        setVdata(dt)
        setCgpa((cgp/ccr))
        
        setFgpa(semesters > 2 ? fgpa: vdata[vdata.length-1]?.cgpa)
    }

    
    useEffect(() => {
        modal.content.data && setMdata({ ...modal.content.data });
        stageAverages()
    },[])

	
    return (
    <>
    <div className="row">
        <div className="Box small-12 columns" style={{width:'900px', margin:'0px auto',float:'none',overflow:'hidden'}}>
            <div className="small-12 columns u-pr-0 right">
                <button onClick={handlePrint} className="Button u-floatRight u-mb-2">&nbsp;&nbsp;Print&nbsp;&nbsp;</button>
            </div>
        </div>
     </div>
    <div className="print" ref={printRef}>
    <div className="cover1">
       <content>
           {/* REGISTRATION SLIP */}
           <section>
                {/* <TranscriptHeader user={user} fgpa={fgpa} />
                <br/><br/> */}
                { mdata && Object.entries(mdata).map(([name,data],i) => {
                 var sdata = { cgpa:0, ccr:0, cgp: 0, tcr:0, tgp: 0 }
                 const sem = getLevelSemester(data[0].session_sem)
                return (
                <div key={i}>
                { i%2 == 0 && <div style={{ pageBreakBefore: 'left', margin: i == 0 ? '330pt auto 70px':'350pt auto 70px'}}><TranscriptHeader user={user} fgpa={fgpa} cgpa={cgpa} />
                </div>}
                <div className={ i%2 == 0 && ``} style={{ marginBottom:'20px',marginTop:'10px', fontFamily:'monospace'}}>
                    <h1 className="h1title page-mono p0" style={{ textAlign:'left', textIndent: '3.2rem', margin:'-10px', fontWeight:'bolder' }}>ACADEMIC YEAR: &nbsp;{ data[0].session_year }</h1>
                    <table className="stable2">
                        <tbody>
                           <tr className="tbody page-mono p0" style={{ margin:0,fontSize:'14px'}}>
                                <td colSpan={2} className="tdtitle page-mono">
                                  <h1 className="" style={{ textAlign:'left', textIndent: '1.2rem' }}><b className="h2title page-mono" style={{ textTransform:'uppercase'}}>{ sem[1] } SEMESTER</b></h1>
                                </td>
                                <td className="p0" colSpan={2}>
                                    <div className="page-mono" style={{ fontSize:'13px',marginBottom:'5px' }}>CCT: &nbsp;<span className="page-mono">{vdata[i].cct}</span></div>
                                    <div className="page-mono" style={{ fontSize:'13px',marginBottom:'5px' }}>CCP: &nbsp;<span className="page-mono">{vdata[i].ccp}</span></div>
                                </td>
                                <td className="p0" colSpan={2}>
                                    <div className="page-mono" style={{ fontSize:'13px',marginBottom:'5px' }}>GPA: &nbsp;<span className="page-mono">{vdata[i].gpa}</span></div>
                                    <div className="page-mono" style={{ fontSize:'13px',marginBottom:'5px' }}>CGPA: <span className="page-mono">{vdata[i].cgpa}</span></div>
                                </td>
                           </tr>
                           <tr className="p0" style={{ borderBottom:'1px solid black',borderTop:'none', fontWeight:'bold', fontSize: '13.5px'}}>
                                <td className="page-mono p2" align="left" >CODE</td>
                                <td className="page-mono p0" align="left" colSpan={2}>COURSE TITLE</td>
                                <td className="page-mono p0" align="center" style={{ width:'80px' }}>CREDIT</td>
                                <td className="page-mono p0" align="left" style={{ width:'80px' }}>GRADE</td>
                                <td className="page-mono p0" align="left" style={{ width:'95px' }}>GPT</td>
                            </tr>
                            { data && data.length > 0 ?
                            data.map((row) => {
                             sdata = { ...sdata, tcr: sdata.tcr+row.credit, tgp: sdata.tgp+(helperData.getPoint(row.total_score,JSON.parse(row.grade_meta)) * row.credit)}
                             //setVata({...vdata, cgp: vdata.cgp+sdata.tgp, ccr: vdata.ccr+sdata.tcr })
                            return (    
                            <tr className="" style={{ margin:'0px 0px',border:'none', fontWeight:'bolder', fontSize: '14px', lineHeight:'18px'}}>
                                <td className="page-mono p5" align="left">{row.course_code && row.course_code.toUpperCase()}</td>
                                <td className="page-mono p5" align="left" colSpan={2}>{row.course_name && row.course_name.toUpperCase()}</td>
                                <td className="page-mono p5" align="center">{row.credit}</td>
                                <td className="page-mono p5" align="left" style={{ textIndent:'15px'}}>{row.grade}</td>
                                <td className="page-mono p5" align="left">
                                    <span>{ parseFloat(helperData.getPoint(row.total_score,JSON.parse(row.grade_meta))).toFixed(1)}</span>
                                    &nbsp;
                                    <span style={{ fontSize:'14px'}}>{row.score_type && row.score_type == 'R' ? 'Resit':''}</span>
                                </td>
                                {/* <td>{row.score_type && row.score_type == 'R' ? 'Resit':''}</td> */}
                            </tr>
                             )}) : null }
                             <tr className="tbody">
                                <td className="codetitle">&nbsp;</td>
                                <td className="tdtitle">&nbsp;</td>
                                <td align="center">&nbsp;</td>
                                <td align="center">&nbsp;</td>
                                <td align="center">&nbsp;</td>
                                <td></td>
                            </tr>
                           
                        </tbody>
                    </table>
                </div>
                </div>
                )})}
                <table className="stable2">
                 <tr className="tbody" rowSpan={3}>
                    <td className="codetitle">&nbsp;</td>
                    <td className="tdtitle">&nbsp;</td>
                    <td align="center">&nbsp;</td>
                    <td className="" align="left" colSpan={3}>
                        <br/><br/>
                        <img src={user.template && user.template.signature} style={{ height: '70px', width:'auto', margin:'30px auto 10px 50px', textAlign:'right' }} />
                        <p style={{ textAlign:'left',fontFamily:'monospace', fontSize:'12pt', fontWeight:'bold'}}>{ReactHtml(user && user.template && user.template.signatory || '')}</p>
                    </td>
                 </tr>
                 </table>
            </section>

        </content>
    </div>
    </div>
    </> 
    )
}

export default PaperTranscriptView
