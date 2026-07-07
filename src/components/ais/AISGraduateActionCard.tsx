import React, { useRef } from "react";
import { BsFileExcel, BsPeople } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Service from "../../utils/aisService";
import { useUserStore } from "../../utils/authService";
import { FaFileExcel } from "react-icons/fa6";
import { excelToJson } from "../../utils/util";
import toast from "react-hot-toast";

type Props = {
  data?: any;
  isUser: boolean;
};

function AISGraduateActionCard({ data, isUser }: Props) {
  const navigate = useNavigate();
  const { user } = useUserStore((state) => state);
  const aisRole: any = user?.roles?.find(
    (r) => r?.appRole?.app?.tag?.toLowerCase() == "ais"
  );

  const importRef: any = useRef();
  
  const importTrigger = async () => {
    importRef.current.click();
  };

  const importSheet = async (e) => {
    const file = e.target.files[0];
    if (file && (file.type.match("application/vnd.openxmlformats-officedocument.*") || file.type.match("text/csv"))) {
      excelToJson(file, async (data) => {
       await Service.uploadGraduate(data);
       setTimeout(() => navigate(0), 2000);
      });
    } else {
      toast.error(`PLEASE CHOOSE EXCEL ( .XLSX ) FILE ONLY !`);
    }
  };

  const generateList = async () => {
    const ok = window.confirm("Generate New Graduation List?");
    if (ok) {
      await Service.generateGraduates(data?.id);
      navigate(0);
    }
  };

  const importSupplement = async (e) => {
    const file = e.target.files[0];
    if (file && (file.type.match("application/vnd.openxmlformats-officedocument.*") || file.type.match("text/csv"))) {
      excelToJson(file, async (data) => {
       await Service.uploadGraduateSupplement(data);
       setTimeout(() => navigate(0), 2000);
      });
    } else {
      toast.error(`PLEASE CHOOSE EXCEL ( .XLSX ) FILE ONLY !`);
    }
  };

  return (
    <div className="w-full rounded flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-6">
      <section
        className={`w-full grid  gap-2 md:gap-4 ${
          data.finalized ? "md:grid-cols-1" : "md:grid-cols-2"
        }`}
      >
        {/* Publish Sheet  - Admin only, Disable futher editting */}
        {["ais admin", "ais techlead"].includes(
          aisRole?.appRole?.title?.toLowerCase()
        ) ? (
          <>

            <input
              type="file"
              name="import"
              ref={importRef}
              onChange={importSupplement}
              style={{ display: "none" }}
            />

            <button
              onClick={generateList}
              className="p-1.5 md:py-1 md:px-1 rounded-full flex items-center space-x-4 bg-primary/5 border border-primary/20 shadow"
            >
              <BsPeople className="text-primary/60 h-8 w-8 md:h-10 md:w-10 p-1 md:p-1 bg-white border-2 md:border-4 border-primary/20 rounded-full" />
              <span className="font-semibold text-sm md:text-base text-primary/70 font-noto">
                Generate Graduation List
              </span>
            </button>

          {/* <button
            onClick={generateList}
            className="p-1.5 md:py-1 md:px-1 rounded-full flex items-center space-x-4 bg-primary/5 border border-primary/20 shadow"
          >
            <BsPeople className="text-primary/60 h-8 w-8 md:h-10 md:w-10 p-1 md:p-1 bg-white border-2 md:border-4 border-primary/20 rounded-full" />
            <span className="font-semibold text-sm md:text-base text-primary/70 font-noto">
              Generate Certificate Numbers
            </span>
          </button> */}

          {/* <button
            onClick={generateList}
            className="p-1.5 md:py-1 md:px-1 rounded-full flex items-center space-x-4 bg-primary/5 border border-primary/20 shadow"
          >
            <BsPeople className="text-primary/60 h-8 w-8 md:h-10 md:w-10 p-1 md:p-1 bg-white border-2 md:border-4 border-primary/20 rounded-full" />
            <span className="font-semibold text-sm md:text-base text-primary/70 font-noto">
              Graduand Broadsheet
            </span>
          </button> */}

          {/* <button
            onClick={generateList}
            className="p-1.5 md:py-1 md:px-1 rounded-full flex items-center space-x-4 bg-primary/5 border border-primary/20 shadow"
          >
            <BsPeople className="text-primary/60 h-8 w-8 md:h-10 md:w-10 p-1 md:p-1 bg-white border-2 md:border-4 border-primary/20 rounded-full" />
            <span className="font-semibold text-sm md:text-base text-primary/70 font-noto">
              Import Graduates ( Legacy Data )
            </span>
          </button> */}

            <button
              onClick={importTrigger}
              className="p-1.5 md:py-1 md:px-1 rounded-full flex items-center space-x-4 bg-primary/5 border border-primary/20 shadow"
            >
              <FaFileExcel className="text-primary/60 h-8 w-8 md:h-10 md:w-10 p-1 md:p-1 bg-white border-2 md:border-4 border-primary/20 rounded-full" />
              <span className="font-semibold text-sm md:text-base text-primary/70 font-noto">Import Supplementary List</span>
            </button>

          </>
        ) : null}
      </section>
    </div>
  );
}

export default AISGraduateActionCard;
