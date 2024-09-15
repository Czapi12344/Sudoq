import React, { useState, useEffect } from "react";
import { useKeycloak } from "@react-keycloak/web";

const PlayerStats: React.FC = () => {
  const { keycloak } = useKeycloak();


  const playerName = keycloak?.tokenParsed?.preferred_username || "Player";

  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
      {/* Add more stats as needed */}
    </div>
  );
};

export default PlayerStats;
