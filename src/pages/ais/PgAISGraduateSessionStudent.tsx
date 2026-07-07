import React, { useState, useEffect } from "react";
import { BsActivity, BsSearch, BsFilter } from "react-icons/bs";
import { useLoaderData, LoaderFunctionArgs } from "react-router-dom";
import AISGraduateStudentCard from "../../components/ais/AISGraduateStudentCard";
import Service from "../../utils/aisService";

// Custom hook to debounce fast-changing values
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

type GraduateRecord = [
  string, 
  { 
    name?: string; 
    email?: string; 
    indexNumber?: string; 
    status?: string; 
    [key: string]: any; 
  }
]; 

interface LoaderData {
  data: GraduateRecord[] | null;
  gis: string;
}

export async function loader({ params }: LoaderFunctionArgs) {
  const data = await Service.fetchGraduateSessionList(params.sessionId ?? "");
  return { data, gis: params.sessionId ?? "" };
}

function PgAISGraduateSessionStudent() {
  const { data } = useLoaderData() as LoaderData;
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Debounce the search input by 300ms
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Extract unique status types for the dropdown dynamic options
  const statusOptions = Array.from(
    new Set(data?.map((item) => item[1]?.status).filter(Boolean))
  );

  // Master Filter Logic
  const filteredData = data?.filter(([title, studentInfo]) => {
    console.log("studentInfo", studentInfo)
    // 1. Dropdown Filter
    if (statusFilter !== "all" && studentInfo?.status !== statusFilter) {
      return false;
    }

    // 2. Text Search Filter (Title, Name, Email, Index Number)
    if (!debouncedSearchTerm) return true;
    
    const searchLower = debouncedSearchTerm.toLowerCase();
    return (
      // title?.toLowerCase().includes(searchLower) ||
      studentInfo?.student?.lname?.toLowerCase()?.includes(searchLower) ||
      studentInfo?.student?.fname?.toLowerCase()?.includes(searchLower) ||
      studentInfo?.student?.indexno?.toLowerCase()?.includes(searchLower)
    );
  }) ?? [];

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center space-y-8">
      {/* Controls Bar */}
      <div className="flex w-full max-w-2xl flex-col gap-4 sm:flex-row sm:items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          <BsSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary/40" />
          <input
            type="text"
            placeholder="Search by name, email, index, or session..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-primary/20 bg-transparent py-2 pl-10 pr-4 outline-none focus:border-primary/50"
          />
        </div>

        {/* Dropdown Selector */}
        <div className="relative min-w-[160px]">
          <BsFilter className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary/40" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full appearance-none rounded-lg border border-primary/20 bg-transparent py-2 pl-10 pr-8 outline-none focus:border-primary/50"
          >
            <option value="all" className="text-black">All Statuses</option>
            {statusOptions.map((status) => (
              <option key={status} value={status} className="text-black">
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Records List */}
      <div className="flex w-full flex-1 flex-col space-y-8 md:space-y-10">
        {filteredData.map((graduateData, i) => (
          <AISGraduateStudentCard
            key={graduateData[0] || i}
            title={graduateData[0]}
            data={graduateData[1]}
            index={i}
          />
        ))}
        
        {/* Fallback View */}
        {filteredData.length === 0 ? (
          <div className="p-10 border border-primary/10 rounded-xl flex flex-col items-center justify-center space-y-3">
            <BsActivity className="h-20 w-20 text-primary/30 border rounded-md" />
            <span className="text-primary/40 font-medium">
              {searchTerm || statusFilter !== "all" 
                ? "No matching records found..." 
                : "No Graduate Records ..."}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default PgAISGraduateSessionStudent;
