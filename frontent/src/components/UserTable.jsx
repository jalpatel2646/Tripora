import React from 'react';
import './UserTable.css';

export default function UserTable({ users, onToggleStatus, onDeleteUser }) {
  if (users.length === 0) {
    return (
      <div className="ut-empty">
        <div className="ut-empty-icon">👥</div>
        <h3 className="ut-empty-title">No users found</h3>
        <p className="ut-empty-subtitle">Try changing your search keywords or checking other filters.</p>
      </div>
    );
  }

  return (
    <div className="ut-wrapper">
      <h3 className="ut-title">Manage Registered Users</h3>
      <div className="ut-responsive-container">
        <table className="ut-table">
          <thead>
            <tr>
              <th scope="col">User</th>
              <th scope="col">Email</th>
              <th scope="col">City</th>
              <th scope="col">Trips</th>
              <th scope="col">Joined Date</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="ut-user-col">
                    <div className="ut-avatar">
                      {user.name.charAt(0)}
                    </div>
                    <span className="ut-user-name">{user.name}</span>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.city}</td>
                <td className="ut-center">{user.trips} Trips</td>
                <td>{user.joinedDate}</td>
                <td>
                  <span className={`ut-status-badge ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <div className="ut-actions-row">
                    <button
                      type="button"
                      className="ut-action-btn view-btn"
                      onClick={() => alert(`Viewing details for ${user.name}`)}
                    >
                      View
                    </button>
                    <button
                      type="button"
                      className={`ut-action-btn disable-btn ${user.status === 'Disabled' ? 'enable' : ''}`}
                      onClick={() => onToggleStatus(user.id)}
                    >
                      {user.status === 'Disabled' ? 'Enable' : 'Disable'}
                    </button>
                    <button
                      type="button"
                      className="ut-action-btn delete-btn"
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
                          onDeleteUser(user.id);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
