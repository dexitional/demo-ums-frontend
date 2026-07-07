import React, { useEffect, useRef, useState } from "react";
import { Chart } from "react-google-charts";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Service from "../../utils/evsService";
const NOTICE_WAV_PATH = '/sounds/notice.wav'; 
//@ts-ignore
const { REACT_APP_WS_URL }:any = import.meta.env;

function PgPublic() {
  const { electionId } = useParams();
  const queryClient = useQueryClient();
  const [pageview, setPageview] = useState(0);

  const playRef:any = useRef();
  const handlePlay = () => {
    const audio = new Audio(NOTICE_WAV_PATH);
    audio.play().catch(error => console.error("Playback failed:", error));
  };
  
  const { data: mdata, isLoading } = useQuery({
    queryKey: ["election-monitor", electionId],
    queryFn: () => Service.fetchVotes(electionId!),
    enabled: !!electionId,
    // staleTime: Infinity,
  });

  const [ data, setData ] = useState(mdata);
  const portfolios = data?.portfolios || [];
  

  // 2. Real-time WebSocket with Sound Trigger 
  useEffect(() => {
    if (!electionId) return;

    let socket: WebSocket | null = null;
    let shouldReconnect = true;
    let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
    let subscribed = false; 

    const connect = () => {
      socket = new WebSocket(REACT_APP_WS_URL);
      socket.onopen = async () => {
         socket?.send(JSON.stringify({ type: "subscribe", electionId: Number(electionId) }));
      };

      socket.onmessage = async (event) => {
        try {
          const message = JSON.parse(event?.data);
          if (message.type === "election") {
            if(message?.data?.portfolios){
              setData(message?.data);
            } else {
              queryClient.invalidateQueries({ queryKey: ["election-monitor", electionId] });
            }
          }
        } catch (err) {}
      };

      socket.onclose = () => {
        if (shouldReconnect) {
          reconnectTimeout = setTimeout(connect, 3000);
        }
      };
    };

    connect();

    return () => {
      shouldReconnect = false;
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
      if (socket) socket.close();
    };
  }, [electionId, queryClient]);

  // 3. Carousel Logic
  useEffect(() => {
    if (portfolios?.length > 0) {
      const timer = setTimeout(() => setPageview((p) => (p + 1) % portfolios?.length), 5000);
      return () => clearTimeout(timer);
    }
  }, [pageview, portfolios?.length]);


  const getChartData = (index: number) => {
    const header = [["Candidate", "Votes"]];
    const portfolio = portfolios[index];
    if (!portfolio) return header;
    const rows = portfolio.candidates
      ?.filter((r: any) => r.votes > 0)
      .sort((a: any, b: any) => b.votes - a.votes)
      .map((d: any, i: number) => [`LEADER ${i + 1}`, d.votes]);
    return [...header, ...rows];
  }

  if (isLoading) return <div className="p-10 text-center font-bold">Connecting...</div>;

  return (
    <div className="py-3 px-3 flex-1 h-full rounded bg-[#f1f1f1]/30 space-y-6">
      <h1 className="px-4 py-2.5 text-xl rounded bg-primary/80 font-bold text-white flex-col space-y-2 flex md:space-y-0 md:flex-row justify-between">
        <span>PUBLIC MONITOR</span>
        {/* <span className="animate-pulse">TURNOUT: {data?.electors?.length || 0}</span> */}
        <div className="flex items-center space-x-2">
          <span className="p-1 px-2 rounded text-sm font-bold bg-primary-accent tracking-wider disabled:opacity-50">TURNOUT</span>
          <span className="p-0.5 px-2 rounded bg-purple-50 text-base text-primary font-extrabold tracking-wider">{data?.electors?.length || 0}</span>
        </div>
      </h1>

      <div className="py-4 px-2 rounded bg-white space-y-4">
        <div className="flex justify-center space-x-2">
          {portfolios?.map((_, i) => (
            <div key={i} className={`h-3 w-3 rounded-full border-2 ${pageview === i ? "bg-primary" : "bg-slate-200"}`} />
          ))}
        </div>

        {portfolios?.map((row: any, i: number) =>
          pageview === i ? (
            <div key={row.id} className="p-3 bg-zinc-100 rounded space-y-4 transition-all duration-700 ease-in-out">
              <h3 className="px-6 py-3 bg-white text-lg rounded shadow-sm font-bold text-red-900 text-center">
                {row?.title?.toUpperCase()}
              </h3>
              <div className="bg-white rounded overflow-hidden">
                <Chart
                  chartType="PieChart"
                  data={getChartData(i)}
                  options={{ is3D: true, animation: { startup: true, duration: 1000, easing: 'out' } }}
                  width={"100%"}
                  height={"400px"}
                />
              </div>
            </div>
          ) : null
        )}
      </div>
      <button onClick={handlePlay} ref={playRef} className="px-6 py-1.5 bg-gray-200 border-2 border-gray-300 hover:bg-gray-300 text-gray-500 font-medium text-sm rounded-md">Activate Sound Notifications</button>
    </div>
  );
}

export default PgPublic;
