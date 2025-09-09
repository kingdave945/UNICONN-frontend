export default function Loader(){
    return(
        <>
         <div style={{  }}>
        <div style={{ display:'flex', flexDirection:'column', gap:'2rem'}}>
 <div
        style={{
          height: "7vh",
          width: "30%",
          backgroundColor: "#e0e0e0",
          borderRadius: "5px",
          animation: "pulse 1.5s infinite",
        }}
      />
      <div
        style={{
          height: "80vh",
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
        </>
    )
}