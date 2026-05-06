import './Dashboard.css';
import { Link } from "react-router-dom";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell
} from "recharts";

const userData = [
  { name: "Oct", users: 20 },
  { name: "Jan", users: 60 },
  { name: "Feb", users: 50 },
  { name: "Mar", users: 90 },
  { name: "Apr", users: 120 },
];

const courseData = [
  { name: "Oct", value: 40 },
  { name: "Jan", value: 70 },
  { name: "Feb", value: 60 },
  { name: "Mar", value: 90 },
  { name: "Apr", value: 80 },
];

// ✅ Donut progress: 4 out of 100
const totalCourses = 4;
const totalMax = 100;

const totalCoursesData = [
  { value: totalCourses },
  { value: totalMax - totalCourses },
];

export default function AdminDashboard() {

  const lastUser = userData[userData.length - 1].users;
  const lastCourse = courseData[courseData.length - 1].value;

  return (
    <div className="dashboard-container">

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
      <div className="main-content">

        <h2 className="main-title">Welcome, Admin!</h2>

        {/* Top Charts */}
        <div className="charts-top">

          {/* User Growth */}
          <div className="chart-card">
            <h3>User Growth ({lastUser})</h3>
            <LineChart width={350} height={250} data={userData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#ef4444"
                label={{ position: "top" }}
              />
            </LineChart>
          </div>

          {/* Quiz Attempts */}
          <div className="chart-card">
            <h3>Quiz Attempts ({lastCourse})</h3>
            <BarChart width={350} height={250} data={courseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="#f87171"
                label={{ position: "top" }}
              />
            </BarChart>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="charts-bottom">

          {/* ✅ Total Courses Donut */}
          <div className="bottom-card">
            <div>
              <h3>Total Courses</h3>
              <p className="stat-number">{totalCourses}</p>
            </div>

            <PieChart width={200} height={150}>
  <Pie
    data={totalCoursesData}
    cx="50%"
    cy="50%"
    innerRadius={40}
    outerRadius={60}
    dataKey="value"
    stroke="none"
  >
    <Cell fill="#ef4444" />   {/* progress */}
    <Cell fill="#fecaca" />   {/* remaining */}
  </Pie>
</PieChart>
          </div>

          {/* Recommendation */}
          <div className="bottom-card">
            <div>
              <h3>Recommendation</h3>
              <p className="stat-number">350</p>
            </div>

            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "85%" }}></div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}