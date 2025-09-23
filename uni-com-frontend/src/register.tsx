import "./register.css";
import api from "./API/Interceptor";
import { register } from "./API";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RegisterImage from "./assets/efc8d6e8-84b4-45e5-8404-322950f1088b.png";
import { useNavigate } from "react-router-dom";
interface Department {
  id: number;
  name: string;
  universityId: number;
  university: string | null;
}

interface DepartmentResponse {
  successful: boolean;
  message: string;
  data: Department[];
}



export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [department, setDepartment] = useState<string>("");
  const [level, setLevel] = useState(100);
  const [courseOfStudy, setCourseOfStudy] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  // University & Departments

  const [selectedUniversity, setSelectedUniversity] = useState<string>("");

const [departments, setDepartments] = useState<{ id: string; name: string }[]>([]);

  // Fetch universities when page loads

  const myUni = [
    {
      id: 1,
      name: "Augustine University",
    },
    {
      id: 2,
      name: "Mcpherson University",
    },
  ];

  // Fetch departments when a university is selected
useEffect(() => {
  if (!selectedUniversity) return;

  const fetchDepartments = async () => {
    try {
      const response = await api.get<DepartmentResponse>(
        `/api/Departments/${Number(selectedUniversity)}`
      );

      setDepartments(
        response.data.data.map((dept) => ({
          id: dept.id.toString(),
          name: dept.name,
        }))
      );
      console.log("Departments:", response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  fetchDepartments();
}, [selectedUniversity]);

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const form = {
    email,
    password,
    fullName,
    userName,
    role,
    department,
    level,
    courseOfStudy,
    universityId: Number(selectedUniversity),
  };

  try {
    setLoading(true);
    await register(form);
    toast.success("Account Registered! Please confirm your email.");
    navigate("/login");
  } catch (error: any) {
    console.log("error", error);
    const errors = error.response?.data?.data;
    if (Array.isArray(errors)) {
      const duplicateUser = errors.find((e: any) => e.code === "DuplicateUserName");
      if (duplicateUser) {
        toast.error("That username is already taken, please choose another.");
        return;
      }
    }
    toast.error(
      error.response?.data?.message ||
        error.response?.data?.[0]?.description ||
        "Registration failed."
    );
  } finally {
    setLoading(false);
  }
};

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  // Validate password
const handlePasswordChange = (e: string) => {
  const value = e;
  const errors = [];

  if (value.length < 8) errors.push("Password must be at least 8 characters");
  if (!/[A-Z]/.test(value)) errors.push("Must contain an uppercase letter");
  if (!/[a-z]/.test(value)) errors.push("Must contain a lowercase letter");
  if (!/[0-9]/.test(value)) errors.push("Must contain a number");
  if (!/[^A-Za-z0-9]/.test(value)) errors.push("Must contain a special character");

  setPasswordErrors(errors);
};


  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    handlePasswordChange(newPassword);
  };

  return (
    <div className="layout-register">
      <div className="register-content">
        <div className="register-container">
          <div className="register-header">
            <div className="register-img">
              <img src={RegisterImage} alt="" />
            </div>
            <div className="register-form">
              <div className="register-form-header">
                <h2>
                  Create Your <br /> UniConnect Account
                </h2>
                             </div>

              <form className="register-form-content" onSubmit={handleSubmit}>
                <div className="register-input">
                  <label htmlFor="fullname">Full Name</label>
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="register-input">
                  <label htmlFor="username">UserName</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Your username"
                    required
                  />
                </div>

                <div id="register-select">
                  <select
                    id="role"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="Student">Student</option>
                    <option value="Admin">Admin</option>
                  </select>

                  <select
                    id="university"
                    name="university"
                    value={selectedUniversity}
                    onChange={(e) => setSelectedUniversity(e.target.value)}
                    required
                  >
                    <option value="">Select University</option>
                    {myUni.map((uni) => (
                      <option key={uni.id} value={uni.id}>
                        {uni.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="register-input">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="register-input">
                  <label htmlFor="password">Password</label>
                  <div className="password-input">
                    <input
                      id="password-input"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      name="password"
                      value={password}
                      onChange={inputChange}
                      required
                    />
                    <div
                      onClick={togglePasswordVisibility}
                      style={{ cursor: "pointer" }}
                    >
                      {showPassword ? (
                        <i className="bi bi-eye"></i>
                      ) : (
                        <i className="bi bi-eye-slash"></i>
                      )}
                    </div>
                  </div>
                </div>

                <div
                  id="register-select"
                  className="select-display-register"
                >
                  <select
                    id="department"
                    name="department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                    disabled={!departments.length}
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.name}>
                        {dept.name}
                      </option>
                    ))}
                  </select>

                  <select
                    id="level"
                    name="level"
                    value={level}
                    onChange={(e) => setLevel(Number(e.target.value))}
                    required
                  >
                    <option value="">Select Level</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="300">300</option>
                    <option value="400">400</option>
                    <option value="500">500</option>
                  </select>
                </div>

                <div className="register-input">
                  <label htmlFor="courseOfStudy">Course of Study</label>
                  <input
                    type="text"
                    id="courseOfStudy"
                    name="courseOfStudy"
                    value={courseOfStudy}
                    onChange={(e) => setCourseOfStudy(e.target.value)}
                    placeholder="Your course of study"
                    required
                  />
                </div>
                <div>
                <button className="register-btn" disabled={loading}>
                  {loading ? <span className="loader"></span> : "Sign Up"}
                </button>
                <div className="register-footer" style={{ textAlign: "center" , fontSize: "0.8rem" }}>
                  <p>Already have an account? <Link to="/login">Log in here!</Link></p>
                </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      <div className="password-error-panel">
<div className="error-toast-container">
  {passwordErrors.map((error, index) => (
    <div key={index} className="error-toast">
      {error}
    </div>
  ))}
</div>

</div>
      </div>
    </div>
  );
}
