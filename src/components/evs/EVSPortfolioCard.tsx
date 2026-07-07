import React from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Service from "../../utils/evsService";

type Props = {
  data?: any;
  title?: string;
};

function EVSPortfolioCard({ title, data }: Props) {
  const { electionId } = useParams();
  const queryClient = useQueryClient();

  // 1. Setup Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: (portfolioId: string) => Service.deletePortfolio(portfolioId),
    onSuccess: () => {
      // Refresh the portfolios list cache instantly
      queryClient.invalidateQueries({ queryKey: ["portfolios", electionId] });
    },
    onError: (error) => {
      console.error("Delete failed:", error);
      alert("Failed to delete portfolio.");
    }
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this portfolio?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="w-full space-y-3 rounded">
      <h1 className="text-sm font-bold font-roboto tracking-wider text-primary-dark/60 flex flex-col md:flex-row space-y-2 md:space-y-0 justify-between">
        <span className="px-3 py-0.5 rounded border border-primary/50">
          {title}
        </span>
        <div className="flex items-center justify-between space-x-3">
          <Link
            to={`create`}
            className="px-3 py-0.5 w-fit rounded border-2 border-primary/70 text-xs text-primary/70 font-semibold flex items-center"
          >
            CREATE
          </Link>
          <span className="px-3 py-0.5 w-fit rounded bg-primary/70 text-xs text-white font-bold flex items-center">
            {data?.length} POSITIONS
          </span>
        </div>
      </h1>

      <div className="w-full rounded-lg shadow-md text-xs overflow-x-scroll md:overflow-hidden bg-white">
        <div className="px-3 py-2 md:grid bg-primary/10 text-primary-dark/70 font-bold grid grid-cols-7 tracking-wider">
          <span className="hidden md:grid justify-self-center">NO</span>
          <span className="hidden md:grid col-span-3">TITLE</span>
          <span className="hidden md:grid justify-self-center">CANDIDATES</span>
          <span className="hidden md:grid justify-self-center">STATUS</span>
          <span className="hidden md:grid justify-self-center">ACTION</span>
        </div>

        {data.map((row: any, i: number) => {
          const isDeleting = deleteMutation.isPending && deleteMutation.variables === row.id;

          return (
            <div 
              key={row.id} 
              className={`px-3 py-2 border-b grid md:grid-cols-7 gap-y-3 font-medium text-xs text-primary/80 ${isDeleting ? 'opacity-50 grayscale' : ''}`}
            >
              <span className="justify-self-center">
                <span className="md:hidden text-primary-dark text-[0.65rem]">NO: </span>
                {i + 1}
              </span>
              <span className="md:col-span-3 font-medium justify-self-center md:justify-self-start">
                <span className="md:hidden text-primary-dark text-[0.65rem]">TITLE: </span>
                {row.title.toUpperCase()}
              </span>
              <span className="justify-self-center text-sm">
                <span className="md:hidden text-primary-dark text-[0.65rem]">CANDIDATES: </span>
                {(row?._count?.candidate > 0 ? row?._count?.candidate - 1 : 0) || 0}
              </span>
              <span className="justify-self-center">
                <span className="md:hidden text-primary-dark text-[0.65rem]">STATUS: </span>
                {row.status ? "ENABLED" : "DISABLED"}
              </span>
              <span className="flex md:flex-row flex-col items-center md:justify-center space-y-3 md:space-y-0 md:space-x-2">
                <Link
                  to={`${row?.id}/edit?cache`}
                  className="px-2 py-0.5 w-fit rounded border border-primary flex items-center hover:bg-primary/5"
                >
                  <BiEdit className="h-4 w-4" />
                </Link>
                
                {row?._count?.candidate <= 0 ? (
                  <button
                    onClick={() => handleDelete(row.id)}
                    disabled={isDeleting}
                    className="px-2 py-0.5 w-fit rounded border border-red-400 text-red-500 flex items-center hover:bg-red-50 disabled:opacity-50"
                  >
                    <BiTrash className="h-4 w-4" />
                  </button>
                ) : null}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EVSPortfolioCard;
