// src/components/OfflinePage.tsx
export default function OfflinePage() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f8f9fa",
      color: "#333",
      textAlign: "center",
      padding: "20px"
    }}>
      <h1> You are Offline</h1>
      <p>Please check your internet connection.</p>
      <button 
        onClick={() => window.location.reload()} 
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          background: "#007bff",
          color: "#fff",
          cursor: "pointer"
        }}
      >
        Retry
      </button>
    </div>
  );
}
