import { Link } from "react-router-dom";
import { useState } from "react";

const COLORS = {
  redDark: "#8B0000",
  redMid: "#C0392B",
  bg: "whitesmoke",
};

const initialUsers = [
  { id: 1, name: "John Cruz", email: "john@email.com", role: "Student", status: "Active", lastLogin: "2 hrs ago" },
  { id: 2, name: "Anna Reyes", email: "anna@email.com", role: "Student", status: "Active", lastLogin: "1 day ago" },
  { id: 3, name: "Mark Santos", email: "mark@email.com", role: "Admin", status: "Active", lastLogin: "5 mins ago" },
];

function Badge({ label }) {
  const map = {
    Student: { bg: "#D6EAF8", color: "#1A5276" },
    Admin: { bg: "#FADBD8", color: "#8B0000" },
    Active: { bg: "#D5F5E3", color: "#1E8449" },
    Disabled: { bg: "#E5E7E9", color: "#555" },
  };

  const c = map[label] || { bg: "#eee", color: "#333" };

  return (
    <span style={{
      padding: "4px 10px",
      borderRadius: 12,
      fontSize: 11,
      fontWeight: 500,
      background: c.bg,
      color: c.color,
    }}>
      {label}
    </span>
  );
}

function Modal({ open, title, children, onClose }) {
  if (!open) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3 style={{ marginBottom: 10 }}>{title}</h3>
        {children}
        <button onClick={onClose} style={styles.btnClose}>Close</button>
      </div>
    </div>
  );
}

export default function ManageUsers() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);

  const q = search.toLowerCase();

  const filtered = users.filter(u => {
    const matchSearch =
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q);

    const matchFilter = filter === "All" || u.role === filter;

    return matchSearch && matchFilter;
  });

  function toggleStatus(id) {
    setUsers(prev =>
      prev.map(u =>
        u.id === id
          ? { ...u, status: u.status === "Active" ? "Disabled" : "Active" }
          : u
      )
    );
  }

  function removeUser(id) {
    setUsers(prev => prev.filter(u => u.id !== id));
  }

  return (
   <div style={{ display: "flex", minHeight: "100vh", background: "whitesmoke", color: "black"}}>
      {/* Sidebar */}
      <div className="sidebar">
         <h1 className="sidebar-title">Pathly</h1> 

         <ul className="sidebar-menu"> 
            <li><Link to="/AdminDashboard">Dashboard</Link></li>
            <li><Link to="/manageCourses">Manage Courses</Link></li>
            <li>Quiz Questions</li>
            <li><Link to="/users">Users</Link></li>
            <li><a href="http://127.0.0.1:3000/project-folder/html/loginforms.html?vscode-livepreview=true">Logout</a></li> 
          </ul> 
      </div>


      {/* MAIN */}
      <div style={{ flex: 1, padding: 24, background: COLORS.bg }}>

        {/* HEADER */}
        <div style={{ fontSize: 24, fontWeight: 700, color: COLORS.redDark }}>
          Users Management
        </div>

        {/* STATS */}
        <div style={styles.stats}>
          <div style={styles.card}>Total Users <b>{users.length}</b></div>
          <div style={styles.card}>Active <b>{users.filter(u => u.status === "Active").length}</b></div>
          <div style={styles.card}>Students <b>{users.filter(u => u.role === "Student").length}</b></div>
          <div style={styles.card}>Admins <b>{users.filter(u => u.role === "Admin").length}</b></div>
        </div>

        {/* CONTROLS */}
        <div style={{ display: "flex", gap: 10, marginTop: 15 }}>
          <input
            placeholder="Search user..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={styles.input}
          />

          <select value={filter} onChange={e => setFilter(e.target.value)} style={styles.input}>
            <option value="All">All Roles</option>
            <option value="Student">Student</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        {/* TABLE */}
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Role</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Last Login</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map(u => (
                <tr key={u.id}>
                  <td style={styles.td}>{u.name}</td>
                  <td style={styles.td}>{u.email}</td>
                  <td style={styles.td}><Badge label={u.role} /></td>
                  <td style={styles.td}><Badge label={u.status} /></td>
                  <td style={styles.td}>{u.lastLogin}</td>

                  <td style={styles.td}>
                    <button onClick={() => setSelectedUser(u)} style={styles.btnView}>View</button>
                    <button onClick={() => toggleStatus(u.id)} style={styles.btnToggle}>Toggle</button>
                    <button onClick={() => removeUser(u.id)} style={styles.btnDel}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MODAL */}
        <Modal open={!!selectedUser} title="User Details" onClose={() => setSelectedUser(null)}>
          {selectedUser && (
            <div>
              <p><b>Name:</b> {selectedUser.name}</p>
              <p><b>Email:</b> {selectedUser.email}</p>
              <p><b>Role:</b> {selectedUser.role}</p>
              <p><b>Status:</b> {selectedUser.status}</p>
              <p><b>Last Login:</b> {selectedUser.lastLogin}</p>
            </div>
          )}
        </Modal>

      </div>
    </div>
  );
}

/* STYLES */
const styles = {
  sidebar: {
    width: 220,
    background: "#8B0000",
    padding: 20,
    color: "#fff",
  },

  link: {
    color: "#fff",
    textDecoration: "none",
    display: "block",
    padding: "8px 0",
  },

  active: {
    padding: "8px 0",
    color: "#fff",
    fontWeight: "bold",
  },

  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: 10,
    marginTop: 15,
  },

  card: {
    background: "#fff",
    padding: 12,
    borderRadius: 10,
    border: "1px solid #eee",
  },

  input: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ccc",
    width: 200,
    background: "#fff",
  },

  tableWrap: {
    marginTop: 20,
    background: "#fff",
    padding: 10,
    borderRadius: 10,
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 13,
  },

  th: {
    textAlign: "left",
    padding: 10,
    borderBottom: "1px solid #eee",
    color: "#888",
  },

  td: {
    padding: 10,
    borderBottom: "1px solid #f0f0f0",
  },

  btnView: {
    marginRight: 5,
    padding: "4px 8px",
    border: "1px solid #ccc",
    background: "#fff",
    cursor: "pointer",
  },

  btnToggle: {
    marginRight: 5,
    padding: "4px 8px",
    border: "1px solid #C0392B",
    background: "#FDECEA",
    cursor: "pointer",
  },

  btnDel: {
    padding: "4px 8px",
    border: "1px solid red",
    background: "#fff",
    cursor: "pointer",
    color: "red",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  modal: {
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    width: 400,
  },

  btnClose: {
    marginTop: 10,
    padding: "8px 12px",
    background: "#eee",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
}; 