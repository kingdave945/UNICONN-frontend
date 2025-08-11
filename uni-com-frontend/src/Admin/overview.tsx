import './admin.css'
import Actions from './actions'
export default function Overview(){

    const uploadTable = 
    [
      {
        Title:"CSE",
        Uploader:"David", 
        Department:"Software",
        Date:"Today",
        Status:"alright" ,
        Actions: <Actions/>
      }

    ]

    return(
        <div className='admin-dashboard'>
        <div className='admin-dashboard-title'>
        <h2>Admin Dashboard</h2>
        <br />
        <h3>Platform Overview</h3>    
        </div>
        <section id='Overview-sec1'>
            <ul className="card-platform">
                <li className="cards">
                 <h1>1000</h1>   
                <p>Total Users</p>
                </li>
                <li className="cards">
                 <h1>1000</h1>      
                <p>Total Materials</p>
                </li>
                <li className="cards">
                <h1>Sarah Lee</h1>
                <p>Top Contributor</p>
                </li>
                <li className="cards">
                <h1>1000</h1>   
                <p>Active Admins</p>
                </li>
            </ul>
        </section>
        <section id='Overview-sec2'>
        <h3>Recent Activites</h3>
          <div className='recent-uploads'>
            <div className='Uploads-recent'>
                  <h4>Recent Uploads</h4>
          <p>Monitor the latest material submissions.</p>
            </div>
          <table >
            <thead id='table-dashboard'>
                <td>Title</td>
                <td>Uploader</td>
                <td>Department</td>
                <td>Date</td>
                <td>Status</td>
                <td>Actions</td>
            </thead>
            {/* <tbody>
                <tr>
                    <td>
                        
                    </td>
                    <td>
                        
                    </td>
                    <td>
                        
                    </td>
                    <td>
                        
                    </td>
                    <td>
                        
                    </td>
                    <td className='for-actions'>
                       <i className="bi bi-eye"></i> 
                       <i className="bi bi-download"></i>
                    </td>
                </tr>
            </tbody> */}
           <tbody> {
             uploadTable.map((item) =>
             (
            <tr key={item.Title} >
             
            <td>{item.Title}</td>
            <td>{item.Uploader}</td>
            <td>{item.Department}</td>
            <td>{item.Date}</td>
            <td>{item.Status}</td>
            <td>{item.Actions}</td>
            </tr>
          
             ))

             }
            </tbody>
          </table>
          </div>
        </section>
        <section>
            
        </section>
        </div>
    )
}