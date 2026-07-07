import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BsActivity } from "react-icons/bs";
import EVSPortfolioCard from "../../components/evs/EVSPortfolioCard";
import Service from "../../utils/evsService";

function PgEVSPortfolios() {
  const { electionId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // 1. Fetch Portfolios
  const { data, isLoading } = useQuery({
    queryKey: ["portfolios", electionId],
    queryFn: () => Service.fetchPortfolios(electionId!),
    enabled: !!electionId,
  });


  if (isLoading) return <div className="p-10 text-center font-bold">Loading...</div>;

  const isGeneral = data && data[0]?.election?.type === "GENERAL";

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center space-y-8 md:space-y-8 ">
      <div className="flex w-full flex-1 flex-col space-y-8 md:space-y-10 ">
        {data && data.length > 0 ? (
          <EVSPortfolioCard
            title={isGeneral ? "PORTFOLIOS" : "ISSUES"}
            data={data}
          />
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

export default PgEVSPortfolios;
