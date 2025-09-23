// components/AgentSkeleton.tsx
export default function MatSkeleton() {
  return (
    <div>
      <div style={{ margin: "20px" }}>

        <div
          style={{
            height: "615px",
            width: "100%",
            backgroundColor: "#e0e0e0",
            borderRadius: "5px",
            animation: "pulse 1.5s infinite",
          }}
        />
      </div>

      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}
