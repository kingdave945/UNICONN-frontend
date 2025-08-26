export default function Status() {
    const status = true
    return (
        <div>
        <span style={{fontSize: '14px'}}>
            <strong>{status ? 
          <span style={{ backgroundColor: 'green', color: 'white', padding:'5px' }}>Active</span> : 
          <span style={{ backgroundColor: 'red', color: 'white', padding:'5px' }}>Inactive</span>}
             </strong>
        </span>
        </div>
    );
}