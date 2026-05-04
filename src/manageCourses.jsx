import { Link } from "react-router-dom";
import { useState } from "react";

const COLORS = {
  redDark: "#8B0000",
  redMid: "#C0392B",
  redLight: "#FADBD8",
  redSoft: "#FDECEA",
};

const initialColleges = [
  { id: 1, name: "College of Computing Studies", code: "CCS", dean: "Dr. Maria Santos" },
  { id: 2, name: "College of Liberal Arts", code: "CLA", dean: "Dr. Jose Reyes" },
  { id: 3, name: "College of Nursing", code: "CON", dean: "Dr. Ana Lopez" },
  { id: 4, name: "College of Education", code: "CON", dean: "Dr. Ana Lopez" },
];

const initialDepartments = [
  { id: 1, name: "College of Computing Studies", code: "CCS", college: "CCS" },
  { id: 2, name: "College of Liberal Arts", code: "CLA", college: "CLA" },
  { id: 3, name: "College of Nursing", code: "CN", college: "CN" },
  { id: 4, name: "College of Engineering", code: "COE", college: "COE" },
];

const initialDegrees = [
  { id: 1, name: "BS Computer Science", code: "BSCS", deptId: 1 },
  { id: 2, name: "BS Information Technology", code: "BSIT", deptId: 1 },
  { id: 3, name: "BS Accountancy", code: "BSA", deptId: 2 },
  { id: 4, name: "BS Nursing", code: "BSN", deptId: 3 },
];

let nextId = 20;

function Modal({ open, title, onClose, onSubmit, children }) {
  if (!open) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.38)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
    }}>
      <div style={{
        background: "#fee2e2", borderRadius: 12, padding: 24, width: 420,
        maxWidth: "95vw", border: "0.5px solid #fee2e2",
      }}>
        <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 16 }}>{title}</div>
        {children}
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 18 }}>
          <button onClick={onClose} style={styles.btnCancel}>Cancel</button>
          <button onClick={onSubmit} style={styles.btnSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
}

function ConfirmModal({ open, name, onClose, onConfirm }) {
  if (!open) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.38)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
    }}>
      <div style={{ background: "#fee2e2", borderRadius: 12, padding: 24, width: 360, border: "0.5px solid #e0e0e0" }}>
        <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>Confirm Removal</div>
        <div style={{ fontSize: 14, color: "#666", marginBottom: 18 }}>
          Remove <strong>"{name}"</strong>? This action cannot be undone.
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={styles.btnCancel}>Cancel</button>
          <button onClick={onConfirm} style={{ ...styles.btnSubmit, background: COLORS.redMid }}>Remove</button>
        </div>
      </div>
    </div>
  );
}

function Toast({ message }) {
  if (!message) return null;
  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24, background: "#1E8449", color: "#fff",
      padding: "10px 20px", borderRadius: 8, fontSize: 13, zIndex: 200,
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    }}>
      {message}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ fontSize: 12, color: "#888", display: "block", marginBottom: 5 }}>{label}</label>
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder }) {
  return (
    <input
      value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      style={styles.input}
    />
  );
}

function Select({ value, onChange, children }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} style={styles.input}>
      {children}
    </select>
  );
}

function Badge({ label, color }) {
  const colorMap = {
    blue: { bg: "#D6EAF8", text: "#1A5276" },
    red: { bg: COLORS.redLight, text: COLORS.redDark },
    green: { bg: "#D5F5E3", text: "#1E8449" },
  };
  const c = colorMap[color] || colorMap.blue;
  return (
    <span style={{
      display: "inline-block", padding: "3px 10px", borderRadius: 12,
      fontSize: 11, fontWeight: 500, background: c.bg, color: c.text,
    }}>
      {label}
    </span>
  );
}

export default function ManageCourses() {
  const [activeTab, setActiveTab] = useState("degrees");
  const [colleges, setColleges] = useState(initialColleges);
  const [departments, setDepartments] = useState(initialDepartments);
  const [degrees, setDegrees] = useState(initialDegrees);

  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");

  const [degModal, setDegModal] = useState(false);
  const [deptModal, setDeptModal] = useState(false);
  const [colModal, setColModal] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState(null);

  const [degForm, setDegForm] = useState({ name: "", code: "", deptId: "" });
  const [deptForm, setDeptForm] = useState({ name: "", code: "", college: "" });
  const [colForm, setColForm] = useState({ name: "", code: "", dean: "" });

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  }

  function saveDegree() {
    if (!degForm.name || !degForm.code || !degForm.deptId) return alert("Fill in all fields.");
    setDegrees(prev => [...prev, { id: nextId++, ...degForm, deptId: Number(degForm.deptId) }]);
    setDegModal(false);
    setDegForm({ name: "", code: "", deptId: "" });
    showToast("Degree added successfully.");
  }

  function saveDepartment() {
    if (!deptForm.name || !deptForm.code || !deptForm.college) return alert("Fill in all fields.");
    setDepartments(prev => [...prev, { id: nextId++, ...deptForm }]);
    setDeptModal(false);
    setDeptForm({ name: "", code: "", college: "" });
    showToast("Department added successfully.");
  }

  function saveCollege() {
    if (!colForm.name || !colForm.code) return alert("Fill in required fields.");
    setColleges(prev => [...prev, { id: nextId++, ...colForm }]);
    setColModal(false);
    setColForm({ name: "", code: "", dean: "" });
    showToast("College added successfully.");
  }

  function askDelete(type, id, name) {
    setConfirmTarget({ type, id, name });
  }

  function confirmDelete() {
    if (!confirmTarget) return;
    const { type, id } = confirmTarget;
    if (type === "degree") setDegrees(prev => prev.filter(d => d.id !== id));
    if (type === "department") setDepartments(prev => prev.filter(d => d.id !== id));
    if (type === "college") setColleges(prev => prev.filter(c => c.id !== id));
    setConfirmTarget(null);
    showToast("Item removed.");
  }

  function getDept(id) { return departments.find(d => d.id === id); }
  function getCollege(code) { return colleges.find(c => c.code === code); }
  function deptDegreeCount(deptId) { return degrees.filter(d => d.deptId === deptId).length; }
  function colDeptCount(colCode) { return departments.filter(d => d.college === colCode).length; }

  const q = search.toLowerCase();
  const filteredDegrees = degrees.filter(d => {
    const dept = getDept(d.deptId);
    return [d.name, d.code, dept?.name, dept?.college].join(" ").toLowerCase().includes(q);
  });
  const filteredDepts = departments.filter(d =>
    [d.name, d.code, d.college].join(" ").toLowerCase().includes(q)
  );
  const filteredColleges = colleges.filter(c =>
    [c.name, c.code, c.dean].join(" ").toLowerCase().includes(q)
  );

  const tabs = ["degrees", "departments", "colleges"];

     return (
    <div style={{ display: "flex", minHeight: "100vh", background: "whitesmoke"}}>
      {/* Sidebar */}
      <div className="sidebar">
         <h1 className="sidebar-title">Pathly</h1> 

         <ul className="sidebar-menu"> 
            <li><Link to="/AdminDashboard">Dashboard</Link></li>
            <li><Link to="/manageCourses">Manage Courses</Link></li>
            <li><Link to="/quiz">Quiz Questions</Link></li>
            <li><Link to="/users">Users</Link></li>
            <li><a href="http://127.0.0.1:3000/Website/index/loginforms.html?vscode-livepreview=true">Logout</a></li>  
          </ul> 
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: 24, overflowY: "auto" }}>
        <div style={{ fontSize: "24px", fontWeight: "bold", color: COLORS.redMid, marginBottom: 20 }}>
  Manage Courses
</div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 20 }}>
          {[
            { label: "Total Degrees", val: degrees.length },
            { label: "Departments", val: departments.length },
            { label: "Colleges", val: colleges.length },
          ].map(s => (
            <div key={s.label} style={styles.statCard}>
              <div style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 24, fontWeight: 500, color: COLORS.redDark }}>{s.val}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {tabs.map(tab => (
            <button key={tab} onClick={() => { setActiveTab(tab); setSearch(""); }}
              style={{
                padding: "8px 18px", borderRadius: 20, border: `1.5px solid ${COLORS.redMid}`,
                background: activeTab === tab ? COLORS.redMid : "transparent",
                color: activeTab === tab ? "#fff" : COLORS.redMid,
                cursor: "pointer", fontSize: 13, fontWeight: 500, textTransform: "capitalize",
              }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Card */}
        <div style={styles.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span style={{ fontSize: 15, fontWeight: 500 }}>
              {activeTab === "degrees" ? "Degree Programs" : activeTab === "departments" ? "Departments" : "Colleges"}
            </span>
            <button
              onClick={() => {
                if (activeTab === "degrees") { setDegForm({ name: "", code: "", deptId: departments[0]?.id || "" }); setDegModal(true); }
                if (activeTab === "departments") { setDeptForm({ name: "", code: "", college: colleges[0]?.code || "" }); setDeptModal(true); }
                if (activeTab === "colleges") { setColForm({ name: "", code: "", dean: "" }); setColModal(true); }
              }}
              style={styles.btnAdd}>
              + Add {activeTab === "degrees" ? "Degree" : activeTab === "departments" ? "Department" : "College"}
            </button>
          </div>

          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder={`Search ${activeTab}...`}
            style={{ ...styles.input, marginBottom: 14, width: "100%" }}
          />

          <div style={{ overflowX: "auto" }}>
            {activeTab === "degrees" && (
              <table style={styles.table}>
                <thead>
                  <tr>{["Degree Name", "Code", "Department", "College", ""].map(h => (
                    <th key={h} style={styles.th}>{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {filteredDegrees.length === 0 ? (
                    <tr><td colSpan={5} style={{ textAlign: "center", padding: 24, color: "#aaa", fontSize: 13 }}>No degrees found.</td></tr>
                  ) : filteredDegrees.map(d => {
                    const dept = getDept(d.deptId);
                    return (
                      <tr key={d.id}>
                        <td style={{ ...styles.td, fontWeight: 500 }}>{d.name}</td>
                        <td style={styles.td}><Badge label={d.code} color="blue" /></td>
                        <td style={styles.td}>{dept?.name || "—"}</td>
                        <td style={styles.td}>{dept ? getCollege(dept.college)?.code || dept.college : "—"}</td>
                        <td style={styles.td}>
                          <button onClick={() => askDelete("degree", d.id, d.name)} style={styles.btnDel}>Remove</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

            {activeTab === "departments" && (
              <table style={styles.table}>
                <thead>
                  <tr>{["Department Name", "Code", "College", "Degrees", ""].map(h => (
                    <th key={h} style={styles.th}>{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {filteredDepts.length === 0 ? (
                    <tr><td colSpan={5} style={{ textAlign: "center", padding: 24, color: "#aaa", fontSize: 13 }}>No departments found.</td></tr>
                  ) : filteredDepts.map(d => (
                    <tr key={d.id}>
                      <td style={{ ...styles.td, fontWeight: 500 }}>{d.name}</td>
                      <td style={styles.td}><Badge label={d.code} color="blue" /></td>
                      <td style={styles.td}>{getCollege(d.college)?.name || d.college}</td>
                      <td style={styles.td}>{deptDegreeCount(d.id)}</td>
                      <td style={styles.td}>
                        <button onClick={() => askDelete("department", d.id, d.name)} style={styles.btnDel}>Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === "colleges" && (
              <table style={styles.table}>
                <thead>
                  <tr>{["College Name", "Code", "Departments", "Dean", ""].map(h => (
                    <th key={h} style={styles.th}>{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {filteredColleges.length === 0 ? (
                    <tr><td colSpan={5} style={{ textAlign: "center", padding: 24, color: "#aaa", fontSize: 13 }}>No colleges found.</td></tr>
                  ) : filteredColleges.map(c => (
                    <tr key={c.id}>
                      <td style={{ ...styles.td, fontWeight: 500 }}>{c.name}</td>
                      <td style={styles.td}><Badge label={c.code} color="green" /></td>
                      <td style={styles.td}>{colDeptCount(c.code)}</td>
                      <td style={styles.td}>{c.dean || "—"}</td>
                      <td style={styles.td}>
                        <button onClick={() => askDelete("college", c.id, c.name)} style={styles.btnDel}>Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Degree Modal */}
      <Modal open={degModal} title="Add Degree Program" onClose={() => setDegModal(false)} onSubmit={saveDegree}>
        <Field label="Degree Name">
          <Input value={degForm.name} onChange={v => setDegForm(f => ({ ...f, name: v }))} placeholder="e.g. BS Computer Science" />
        </Field>
        <Field label="Degree Code">
          <Input value={degForm.code} onChange={v => setDegForm(f => ({ ...f, code: v }))} placeholder="e.g. BSCS" />
        </Field>
        <Field label="Department">
          <Select value={degForm.deptId} onChange={v => setDegForm(f => ({ ...f, deptId: v }))}>
            <option value="">Select department</option>
            {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </Select>
        </Field>
      </Modal>

      {/* Department Modal */}
      <Modal open={deptModal} title="Add Department" onClose={() => setDeptModal(false)} onSubmit={saveDepartment}>
        <Field label="Department Name">
          <Input value={deptForm.name} onChange={v => setDeptForm(f => ({ ...f, name: v }))} placeholder="e.g. Department of Computer Studies" />
        </Field>
        <Field label="Department Code">
          <Input value={deptForm.code} onChange={v => setDeptForm(f => ({ ...f, code: v }))} placeholder="e.g. DCS" />
        </Field>
        <Field label="College">
          <Select value={deptForm.college} onChange={v => setDeptForm(f => ({ ...f, college: v }))}>
            <option value="">Select college</option>
            {colleges.map(c => <option key={c.id} value={c.code}>{c.name}</option>)}
          </Select>
        </Field>
      </Modal>

      {/* College Modal */}
      <Modal open={colModal} title="Add College" onClose={() => setColModal(false)} onSubmit={saveCollege}>
        <Field label="College Name">
          <Input value={colForm.name} onChange={v => setColForm(f => ({ ...f, name: v }))} placeholder="e.g. College of Engineering" />
        </Field>
        <Field label="College Code">
          <Input value={colForm.code} onChange={v => setColForm(f => ({ ...f, code: v }))} placeholder="e.g. COE" />
        </Field>
        <Field label="Dean">
          <Input value={colForm.dean} onChange={v => setColForm(f => ({ ...f, dean: v }))} placeholder="e.g. Dr. Juan dela Cruz" />
        </Field>
      </Modal>

      <ConfirmModal
        open={!!confirmTarget}
        name={confirmTarget?.name}
        onClose={() => setConfirmTarget(null)}
        onConfirm={confirmDelete}
      />

      <Toast message={toast} />
    </div>
  );
}

const styles = {
  card: {
    background: "#fff", borderRadius: 12, border: "0.5px solid #e8e8e8", padding: "16px 20px",
  },
  statCard: {
    background: "#fff", borderRadius: 8, border: "0.5px solid #e8e8e8", padding: "14px 16px",
  },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 13 },
  th: {
    textAlign: "left", padding: "8px 10px", color: "#888", fontWeight: 500,
    borderBottom: "0.5px solid #eee", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.04em",
  },
  td: { padding: "10px 10px", borderBottom: "0.5px solid #f0f0f0", color: "#1a1a1a", verticalAlign: "middle" },
  input: {
    width: "100%", padding: "8px 12px", borderRadius: 8,
    border: "0.5px solid #ccc", fontSize: 14, background: "#fff", color: "#1a1a1a",
    outline: "none", boxSizing: "border-box",
  },
  btnAdd: {
    background: "#C0392B", color: "#fff", border: "none", borderRadius: 8,
    padding: "7px 14px", fontSize: 13, cursor: "pointer", fontWeight: 500,
  },
  btnDel: {
    background: "transparent", border: "0.5px solid #E74C3C", color: "#E74C3C",
    borderRadius: 8, padding: "4px 10px", fontSize: 12, cursor: "pointer",
  },
  btnCancel: {
    padding: "8px 18px", borderRadius: 8, border: "0.5px solid #ccc",
    background: "transparent", color: "#666", cursor: "pointer", fontSize: 13,
  },
  btnSubmit: {
    padding: "8px 18px", borderRadius: 8, border: "none",
    background: "#C0392B", color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 500,
  },
};