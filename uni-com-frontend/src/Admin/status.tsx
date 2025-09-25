interface UserManProps {
  userStats: {
    totalUsers: number;
    activeUsers: number;
    disabledUsers: number;
  };
}

export default function Status({ userStats }: UserManProps) {
    const status = userStats.activeUsers > 0;
    return (
        <div className="status-indicator">
        <span className="status-label">
            <strong>{status ? 
          <span style={{ backgroundColor: 'green', color: 'white', padding:'5px' }}>Active</span> 
          : 
          <span style={{ backgroundColor: 'red', color: 'white', padding:'5px' }}>Inactive</span>}
             </strong>
        </span>
        </div>
    );
}