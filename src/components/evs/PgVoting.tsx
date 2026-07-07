import React, { Fragment, useEffect, useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import confetti from "canvas-confetti"; //
import { useUserStore } from "../../utils/authService";
import Service from "../../utils/evsService";
import VotingCard from "./VotingCard";
import VotingCardNo from "./VotingCardNo";

function PgVoting() {
  const { electionId } = useParams();
  const navigate = useNavigate();
  const user = useUserStore.getState().user;

  // Local State
  const [voter, setVoter] = useState<Record<number, any>>({});
  const [pageview, setPageview] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5-minute session timer
  const [clientInfo, setClientInfo] = useState({ ip: null, location: "" });

  // 1. Fetch Ballots
  const { data, isLoading } = useQuery({
    queryKey: ["election-data", electionId],
    queryFn: () => Service.fetchVotes(electionId!),
    enabled: !!electionId,
    staleTime: Infinity,
  });

  // 2. Submit Vote Mutation with Confetti
  const voteMutation = useMutation({
    mutationFn: (payload: any) => Service.postVotes(electionId!, payload),
    onSuccess: () => {
      // Trigger Confetti Celebration
      confetti({
        particleCount: 180,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']
      });
      // Short delay before navigating to let user see the confetti
      setTimeout(() => navigate("/evs/dash"), 2000);
    },
    onError: (err: any) => {
      toast.error(err?.message || "Submission failed.");
    },
  });

  // 3. Session Timer Logic
  useEffect(() => {
    if (timeLeft <= 0) {
      toast.error("Session expired due to inactivity.");
      navigate("/evs/dash");
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, navigate]);

  // Reset timer on any user interaction
  const resetTimer = () => setTimeLeft(300);

  const choose = (e: any, pid: number, cid: any) => {
    resetTimer();
    e.preventDefault();
    setVoter((prev) => ({ ...prev, [pid]: cid }));
    if (pageview < (data?.portfolios?.length || 0) - 1) {
      setTimeout(() => setPageview((v) => v + 1), 500);
    }
  };

  const handleFinalSubmit = async (e: any) => {
    resetTimer();
    e.preventDefault();
    const ok = window.confirm("SUBMIT VOTES FOR SELECTED CANDIDATES?");
    if (ok) {
      voteMutation.mutate({
        id: electionId,
        tag: user?.user?.tag,
        votes: Object.values(voter),
      });
    }
  };

  if (isLoading) return <div className="p-10 text-center font-bold">Preparing...</div>;

  const portfolios = data?.portfolios || [];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div onMouseMove={resetTimer} className="py-3 px-3 flex-1 h-full rounded bg-[#f1f1f1]/30 space-y-6">
      <h1 className="px-4 py-2.5 flex items-center justify-between text-lg md:text-xl rounded bg-primary/80 font-semibold text-white">
        <div className="flex flex-col">
          <span>VOTING SESSION</span>
          <span className={`mt-1 text-xs ${timeLeft < 60 ? 'text-red-300 animate-pulse' : 'text-purple-100'}`}>
            Time remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </span>
        </div>
        <button
          onClick={() => { setVoter({}); setPageview(0); resetTimer(); }}
          className="p-0.5 px-2 rounded bg-purple-50 text-base text-primary font-bold tracking-wider"
        >
          START AGAIN
        </button>
      </h1>

      <div className="py-4 px-2 rounded bg-white space-y-4 shadow-inner">
        <div className="pt-2 flex items-center justify-center space-x-2">
          {portfolios.map((_: any, i: number) => (
            <div
              key={i}
              className={`h-4 w-4 md:h-6 md:w-6 rounded-full border-4 transition-colors ${
                pageview === i ? "bg-primary/80" : voter[portfolios[i]?.id] ? "bg-green-400" : "bg-slate-100"
              }`}
            />
          ))}
        </div>

        <div className="px-2 py-2 h-[35rem] bg-zinc-200/50 space-y-3 overflow-y-auto rounded shadow-inner">
          {portfolios.map((row: any, i: number) =>
            pageview === i ? (
              <Fragment key={row.id}>
                <div className="px-2 py-2 flex-1 bg-white rounded space-y-2 animate-in fade-in slide-in-from-right-4 duration-300">
                  <h2 className="relative px-6 py-1 rounded text-xs md:text-lg text-center text-primary font-extrabold tracking-widest bg-slate-200/70">
                    <span>{row?.title?.toUpperCase()}</span>
                    <button
                      onClick={(e) => choose(e, row?.id, row?.candidates?.find((m: any) => m.orderNo === 0)?.id)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-0.5 bg-red-100 border-2 border-red-300 text-sm hover:bg-red-200"
                    >
                      SKIP
                    </button>
                  </h2>

                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 place-content-start">
                    {row?.candidates
                      ?.sort((a: any, b: any) => a.orderNo - b.orderNo)
                      ?.filter((m: any) => m.orderNo !== 0)
                      ?.map((r: any) => (
                        <button key={r.id} onClick={(e) => choose(e, row.id, r.id)} className="text-left outline-none">
                          <VotingCard data={r} chosen={voter[row.id] === r.id} />
                        </button>
                      ))}
                  </div>
                </div>

                {portfolios.length === Object.keys(voter).length && i === portfolios.length - 1 && (
                  <button
                    onClick={handleFinalSubmit}
                    disabled={voteMutation.isPending}
                    className="block px-6 py-5 mx-auto w-3/5 rounded-full border-2 md:border-8 border-white bg-green-500 text-gray-800 font-bold text-base md:text-xl animate-pulse disabled:bg-gray-400"
                  >
                    {voteMutation.isPending ? "SUBMITTING..." : "SUBMIT FINAL VOTE"}
                  </button>
                )}
              </Fragment>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}

export default PgVoting;
