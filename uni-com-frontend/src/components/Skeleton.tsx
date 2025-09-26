// components/AgentSkeleton.tsx
export default function Skeleton() {
  return (
    <div style={{ padding: "2rem" }}>  
      <div  
        style={{
          height: "40px",
          width: "250px",
          backgroundColor: "#e0e0e0",
          borderRadius: "8px",
          marginBottom: "0.4rem",
          animation: "pulse 1.5s infinite",
        }}
      />
      <div style={{display: "flex",gap:"20px", marginBottom:'2rem'}}>

      <div
        style={{
          backgroundColor: "#e0e0e0",
       padding:'2rem',
       marginBottom:'1rem',
       width:'80%',
       height:'12vh',
          animation: "pulse 1.5s infinite",
        }}
      />
      <div
        style={{
          backgroundColor: "#e0e0e0",
       padding:'2rem',
       marginBottom:'1rem',
       width:'80%',
       height:'12vh',
          animation: "pulse 1.5s infinite",
        }}
      />
    
    
  
   
        </div>



        <div style={{margin:'20px'}}>
  <div  
        style={{
          height: "40px",
          width: "250px",
          backgroundColor: "#e0e0e0",
          borderRadius: "8px",
          marginBottom: "1rem",
          animation: "pulse 1.5s infinite",
        }}
      />
      <div
        style={{
          height: "300px",
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
