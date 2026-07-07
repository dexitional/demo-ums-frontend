import React, { useRef } from "react";
import toast from "react-hot-toast";
import { FaUpload } from "react-icons/fa6";
import { GoPasskeyFill } from "react-icons/go";
import { ImFileExcel } from "react-icons/im";
import { IoLockClosedSharp } from "react-icons/io5";
import { MdAssignmentAdd, MdPublish, MdUnpublished } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Service from "../../utils/aisService";
import { useUserStore } from "../../utils/authService";
import { excelToJson, jsonToExcel } from "../../utils/util";

type Props = {
  data?: any;
  isUser: boolean;
};

function AISSheetAccountCard({ data, isUser }: Props) {
  const navigate = useNavigate();
  const importRef: any = useRef();
  const fileRef: any = useRef<HTMLInputElement>();
  const { user } = useUserStore((state) => state);
  const aisRole: any = user?.roles?.find((r) => r?.appRole?.app?.tag?.toLowerCase() == "ais");

  const assignSheet = async () => {
    const inp = window.prompt("Provide Staff ID of Assessor!");
    if (inp && inp != "") {
      const resp = await Service.assignSheet(data?.id, inp);
      navigate(0);
    }
  };

  const reverseSheet = async () => {
    const resp = await Service.reverseSheet(data?.id);
    if(resp) navigate(0);
  };

  const publishSheet = async () => {
    const ok = window.confirm("Publish Assessment Scores ?");
    if (ok) {
      await Service.publishSheet(data?.id);
      navigate(0);
    }
  };

  const unpublishSheet = async () => {
    const ok = window.confirm("Unpublish Assessment Scores ?");
    if (ok) {
      await Service.unpublishSheet(data?.id);
      navigate(0);
    }
  };

  const closeSheet = async () => {
    const ok = window.confirm("Close & Finalize Assessment Scores ?");
    if (ok) {
      await Service.closeSheet(data?.id);
      navigate(0);
    }
  };

  const submitSheet = async () => {
    const ok = window.confirm("Submit Assessment Scores ?");
    if (ok) {
      await Service.submitSheet(data?.id);
      navigate(0);
    }
  };

  const exportSheet = async () => {
    const rt = await Service.loadSheet(data?.id);
    var mdata: any = [];
    if (rt?.length) {
      // Load & Iterate Data for Students
      if (rt && rt.length > 0) {
        for (var row of rt) {
          let { indexno, classScore, examScore, totalScore } = row;
          mdata.push({
            sheet: data?.id,
            indexno,
            name: `${data.fname} ${data.mname && data.mname+' '}${data.lname} `,
            classScore,
            examScore,
            totalScore,
          });
        }
        jsonToExcel(
          mdata,
          `${rt[0].courseId}_YEAR${Math.ceil(rt[0].semesterNum / 2)}`
        );
      } else {
        toast.error(`PUBLISHED ASSESSMENT WON'T BE EXPORTED !`);
      }
    } else {
      toast.error(`NO ASSESSMENT DATA!`);
    }
  };

  const importTrigger = async () => {
    importRef.current.click();
  };

  const importSheet = async (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type.match("application/vnd.openxmlformats-officedocument.*") ||
        file.type.match("text/csv"))
    ) {
      var error_count = 0,
        dataToServer = {};
      excelToJson(file, async (mdata) => {
        console.log(mdata.length);
        await Service.uploadSheet(data?.id, mdata);
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
          data.finalized || data.assessed ? "md:grid-cols-1" : "md:grid-cols-4"
        }`}
      >
        {/* Upload Sheet  - Admin only, Disable futher editting */}
        {["ais admin", "ais techlead", "ais assessor", "ais head"].includes(
          aisRole?.appRole?.title?.toLowerCase()
        ) &&
        !data?.finalized &&
        !data?.assessed ? (
          <>
            <button
              onClick={importTrigger}
              className="p-1.5 md:py-1 md:px-1 rounded-full flex items-center space-x-4 bg-primary-dark/5 border border-primary-dark/20 shadow"
            >
              <FaUpload className="text-primary-dark/60 h-8 w-8 md:h-10 md:w-10 p-1 md:p-1.5 bg-white border-2 md:border-4 border-primary-dark/20 rounded-full" />
              <span className="font-semibold text-sm md:text-base text-primary/70 font-noto">
                Upload Sheet
              </span>
            </button>
            <input
              type="file"
              name="import"
              ref={importRef}
              onChange={importSheet}
              style={{ display: "none" }}
            />
          </>
        ) : null}

        {/* Upload Sheet  - Admin only, Disable futher editting */}
        {["ais admin", "ais techlead", "ais assessor", "ais head"].includes(
          aisRole?.appRole?.title?.toLowerCase()
        ) &&
        !data?.finalized &&
        !data?.assessed ? (
          <button
            onClick={exportSheet}
            className="p-1.5 md:py-1 md:px-1 rounded-full flex items-center space-x-4 bg-green-600/5 border border-primary/20 shadow"
          >
            <ImFileExcel className="text-green-800/60 h-8 w-8 md:h-10 md:w-10 p-1 md:p-1 bg-white border-2 md:border-4 border-green-600/20 rounded-full" />
            <span className="font-semibold text-sm md:text-base text-green-800/70 font-noto">
              Download Sheet
            </span>
          </button>
        ) : null}

        {/* Publish Sheet  - Admin only, Disable futher editting */}
        {["ais admin", "ais techlead"].includes(
          aisRole?.appRole?.title?.toLowerCase()
        ) &&
        !data?.finalized &&
        data?.certified ? (
          <button
            onClick={closeSheet}
            className="p-1.5 md:py-1 md:px-1 rounded-full flex items-center space-x-4 bg-primary/5 border border-primary/20 shadow"
          >
            <IoLockClosedSharp className="text-primary/60 h-8 w-8 md:h-10 md:w-10 p-1 md:p-1.5 bg-white border-2 md:border-4 border-primary/20 rounded-full" />
            <span className="font-semibold text-sm md:text-base text-primary/70 font-noto">
              Close Sheet
            </span>
          </button>
        ) : null}

        {/* Publish Sheet - Dean only, Publish All results except Late Registrations */}
        {["ais admin", "ais techlead", "ais dean"].includes(
          aisRole?.appRole?.title?.toLowerCase()
        ) &&
        !data?.finalized &&
        !data?.certified &&
        data?.assessed ? (
          <button
            onClick={publishSheet}
            className="p-1.5 md:py-1 md:px-1 rounded-full flex items-center space-x-4 bg-green-600/5 border border-green-600/20 shadow"
          >
            <MdPublish className="text-green-600/60 h-8 w-8 md:h-10 md:w-10 p-1 md:p-1.5 bg-white border-2 md:border-4 border-green-600/20 rounded-full" />
            <span className="font-semibold text-sm md:text-base text-green-700/50 font-noto">
              Publish Sheet
            </span>
          </button>
        ) : null}

        {/* UnPublish Sheet - Admin only, UnPublish All results for corrections */}
        {["ais admin", "ais techlead", "ais dean"].includes(
          aisRole?.appRole?.title?.toLowerCase()
        ) &&
        !data?.finalized &&
        data?.certified ? (
          <button
            onClick={unpublishSheet}
            className="p-1.5 md:py-1 md:px-1 rounded-full flex items-center space-x-4 bg-red-400/5 border border-red-400/20 shadow"
          >
            <MdUnpublished className="text-red-400/60 h-8 w-8 md:h-10 md:w-10 p-1 md:p-1.5 bg-white border-2 md:border-4 border-red-400/20 rounded-full" />
            <span className="font-semibold text-sm md:text-base text-red-400/70 font-noto">
              Unpublish Sheet
            </span>
          </button>
        ) : null}

        {/* Submit Sheet - Assessor only, SUbmit All results For further publishing */}
        {["ais admin", "ais techlead", "ais assessor", "ais head"].includes(
          aisRole?.appRole?.title?.toLowerCase()
        ) &&
        !data?.finalized &&
        !data?.assessed ? (
          <button
            onClick={submitSheet}
            className="p-1.5 md:py-1 md:px-1 rounded-full flex items-center space-x-4 bg-primary/5 border border-primary/20 shadow"
          >
            <GoPasskeyFill className="text-primary/60 h-8 w-8 md:h-10 md:w-10 p-1 md:p-1.5 bg-white border-2 md:border-4 border-primary/20 rounded-full" />
            <span className="font-semibold text-sm md:text-base text-primary/70 font-noto">
              Submit Sheet
            </span>
          </button>
        ) : null}

        {/* Assign Sheet - HOD, Admin only - Assign Sheet to Staff */}
        {
        [
          "ais admin",
          "ais techlead",
          "ais head",
          "ais clerk ii",
          "ais clerk iv",
        ].includes(aisRole?.appRole?.title?.toLowerCase()) &&
        !data?.finalized &&
        !data?.assessed ? (
          <button
            onClick={assignSheet}
            className="p-1.5 md:py-1 md:px-1 rounded-full flex items-center space-x-4 bg-primary/5 border border-primary/20 shadow"
          >
            <MdAssignmentAdd className="text-primary/60 h-8 w-8 md:h-10 md:w-10 p-1 md:p-1.5 bg-white border-2 md:border-4 border-primary/20 rounded-full" />
            <span className="font-semibold text-sm md:text-base text-primary/70 font-noto">
              Assign Sheet
            </span>
          </button>
        ) : null }

        {/* Reverse Sheet to Assessor - Deans, Admin only - Reverse Sheet to Staff */}
        {
        [
          "ais admin",
          "ais techlead",
          "ais dean",
        ].includes(aisRole?.appRole?.title?.toLowerCase()) &&
        !data?.finalized  ? (
          <button
            onClick={reverseSheet}
            className="p-1.5 md:py-1 md:px-1 rounded-full flex items-center space-x-4 bg-primary/5 border border-primary/20 shadow"
          >
            <MdAssignmentAdd className="text-primary/60 h-8 w-8 md:h-10 md:w-10 p-1 md:p-1.5 bg-white border-2 md:border-4 border-primary/20 rounded-full" />
            <span className="font-semibold text-sm md:text-base text-primary/70 font-noto">
              Reverse Sheet
            </span>
          </button>
        ) : null }

        {data?.finalized ? (
          <div className="mx-auto px-3 py-1 w-fit rounded border text-sm font-medium text-gray-400 tracking-wider bg-slate-50">
            Sheet is published and closed! No futher editting is allowed.
          </div>
        ) : null}

        {!data?.finalized && data?.assessed ? (
          <div className="mx-auto px-3 py-1 w-full rounded border text-sm font-medium text-gray-400 tracking-wider bg-slate-50">
            Sheet is submitted for publishing by Dean! No futher editting is
            allowed.
          </div>
        ) : null}
      </section>
    </div>
  );
}

export default AISSheetAccountCard;
