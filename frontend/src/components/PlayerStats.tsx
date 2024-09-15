import React, { useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";

type PlayerStatsProps = {
  score: number;
  time: number; 
  resetTime: boolean;
  setTime: React.Dispatch<React.SetStateAction<number>>; 
};

const PlayerStats: React.FC<PlayerStatsProps> = ({ score, resetTime }) => {
  const { keycloak } = useKeycloak();
  const playerName = keycloak?.tokenParsed?.preferred_username || "Player";
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (resetTime) {
      setTime(0);
    }
  }, [resetTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Player Stats</h2>
      <div className="mb-2">
        <span className="font-medium">Name:</span> {playerName}
      </div>
      <div className="mb-2">
        <span className="font-medium">Score:</span> {score}
      </div>
      <div className="mb-2">
        <span className="font-medium">Time:</span> {formatTime(time)}
      </div>
    </div>
  );
};

export default PlayerStats;
