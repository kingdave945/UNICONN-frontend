import MaterialReviewActions from "./materialreviewactions"
export default function MaterialReview(){
    const materialReview =
     [
      {
        Title:"Controversial Political Essay",
        Uploader:"Liam Brown",
      }
    ]
    return(
        <>
        <div>
              <div >
              <h3>Material Review</h3>
              </div>
              <div className="recent-uploads">
              <div className="material-review">              
              <h4>Material Review</h4>
              <p>Review and moderate new or flagged study materials</p>
              </div>
              <div className="user-man-container">
               <div className="user-man">
                {materialReview.map((item, index) => (
                  <ul key={index}>
                    <li className="mat-review">
                      <span> {item. Title}</span>
                      <span>{item.Uploader}</span>
                    </li>
                  </ul>
                ))}
              </div>
              <div>
                <MaterialReviewActions/>
              </div>
              </div>
              </div>
        </div>
        </>
    )
}