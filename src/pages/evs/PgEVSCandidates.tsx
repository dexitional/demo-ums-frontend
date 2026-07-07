import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { BsActivity } from "react-icons/bs";
import { useParams } from "react-router-dom";
import EVSCandidateCard from "../../components/evs/EVSCandidateCard";
import Service from "../../utils/evsService";

function PgEVSCandidates() {
  const { electionId } = useParams();
  const queryClient = useQueryClient();

  // 1. Fetch Candidates/Votes with Caching
  const { data, isLoading } = useQuery({
    queryKey: ["election-candidates", electionId],
    queryFn: () => Service.fetchVotes(electionId!),
    enabled: !!electionId
  });

  

  if (isLoading) return <div className="p-10 text-center font-bold">Loading Candidates...</div>;

  const portfolios = data?.portfolios || [];
  
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center space-y-8 md:space-y-8 ">
      <div className="flex w-full flex-1 flex-col space-y-8 md:space-y-10 ">
        {/* 
           If EVSCandidateCard has a delete button, pass the mutation.mutate function 
           down to it so it can trigger the deletion.
        */}
        {portfolios?.length > 0 ? (
          portfolios?.map((row: any) => (
            <EVSCandidateCard
              key={row?.id || row?.title}
              title={row?.title?.toUpperCase()}
              data={row?.candidates}
            />
          ))
        ) : (
          <div className="p-10 border border-primary/10 rounded-xl flex flex-col items-center justify-center space-y-3">
            <BsActivity className="h-20 w-20 text-primary/30 border rounded-md" />
            <span className="text-primary/40 font-medium">No Records ...</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default PgEVSCandidates;
