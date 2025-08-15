// src/test/TestUseMetricsWebSocket.tsx
import React from "react";
import { useMetricsWebSocket } from "../shared/hooks/useMetricsWebSocket";

const TestUseMetricsWebSocket: React.FC = () => {
  const {
    timeFrame,
    setTimeFrame,
    metrics,
    connected,
    connecting,
    error,
    lastUpdate,
  } = useMetricsWebSocket();

  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h2>🧪 Test useMetricsWebSocket</h2>
      <p>Time Frame: {timeFrame}</p>
      <button
        onClick={() => setTimeFrame("yesterday")}
        style={{ marginBottom: "20px", padding: "10px" }}
      >
        Cambiar a Yesterday
      </button>
      <p>
        Status:{" "}
        {connecting
          ? "Connecting..."
          : connected
          ? "Connected"
          : "Disconnected"}
      </p>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {lastUpdate && <p>Last Update: {lastUpdate}</p>}
      <h3>Metrics:</h3>
      <pre>{JSON.stringify(metrics, null, 2)}</pre>
    </div>
  );
};

export default TestUseMetricsWebSocket;
