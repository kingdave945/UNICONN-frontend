export default function MaterialReviewActions(){
    return(
        <>
        <div className="mat-action-features" style={{
            cursor: "pointer",
        }}>
        <div className="features-admin" >
    <i className="bi bi-check2"></i>
        <span>
        Approve
        </span>
        </div>
        <div >
          <i className="bi bi-x"></i>
            <span>Reject</span>
        </div>
      </div>
      
        </>
    )
}