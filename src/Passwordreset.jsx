import { useState } from "react";
import "./Passwordreset.css";

export default function PasswordReset() {
  const [screen, setScreen] = useState("reset"); 
  const [password, setPassword] = useState("");

  const rules = {
    length: password.length >= 8,
    mix: /[a-zA-Z]/.test(password) && /[0-9]/.test(password),
    symbol: /[^a-zA-Z0-9]/.test(password),
  };

  const EyeIcon = ({ visible }) =>
    visible ? (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} width={18} height={18}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} width={18} height={18}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    );

  const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} width={15} height={15}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );

  const Rule = ({ pass, label }) => (
    <div className={`rule ${pass ? "rule--pass" : ""}`}>
      <span className="rule__icon"><CheckIcon /></span>
      {label}
    </div>
  );

  // "Back to Login" goes back to your teammate's login page
  const goToLogin = () => {
    window.location.href = "http://127.0.0.1:3000/assets/index/loginforms.html"; // update this URL to match your teammate's login page
  };

  const screens = {
    reset: (
      <>
        <h1 className="brand">Pathly</h1>
        <p className="brand-sub">Reset Your Password</p>
        <p className="hint">Enter your email to receive a password reset link.</p>
        <div className="field">
          <input type="email" placeholder="Email" className="input" />
        </div>
        <button className="btn" onClick={() => setScreen("reset-email")}>Send Reset Link</button>
        <div className="bottom-links">
          <button className="link" onClick={goToLogin}>Back to Login</button>
        </div>
      </>
    ),

    "check-email": (
      <>
        <h1 className="brand">Pathly</h1>
        <p className="brand-sub">Check Your Email</p>
        <p className="hint">
          If an account with that email exists, we've sent a password reset link to your email address.
          Please check your inbox.
        </p>
        <button className="btn" onClick={goToLogin}>Back to Login</button>
      </>
    ),

    "reset-email": (
      <>
        <h1 className="brand">Pathly</h1>
        <p className="brand-sub">Password Reset Request</p>
        <div className="email-card">
          <p className="email-body">Hi,</p>
          <p className="email-body">Click the button below to reset your password.</p>
          <button className="btn" onClick={() => setScreen("new-password")}>Reset Your Password</button>
          <p className="expire-note">This link will expire in 15 minutes.</p>
          <p className="expire-note">If you didn't request this, please ignore this email.</p>
        </div>
      </>
    ),

    "new-password": (
      <>
        <h1 className="brand">Pathly</h1>
        <p className="brand-sub">Create New Password</p>
        <div className="field">
          <input
            type="password"
            placeholder="New password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="field">
            <input type="password" placeholder="Confirm New Password" className="input" />
        </div>
        <div className="rules">
          <Rule pass={rules.length} label="8 or more characters" />
          <Rule pass={rules.mix}    label="Mix of letters & numbers" />
          <Rule pass={rules.symbol} label="At least one symbol" />
        </div>
        <button className="btn" onClick={() => setScreen("success")}>Reset Password</button>
      </>
    ),

    success: (
      <>
        <div className="success-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3} width={34} height={34}>
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="brand">Pathly</h1>
        <p className="brand-sub">Password Successfully Reset!</p>
        <p className="hint">Your password has been updated.</p>
        <button className="btn" onClick={goToLogin}>Back to Login</button>
      </>
    ),
  };

  return (
    <div className="page">
      <div className="card">
        {screens[screen]}
      </div>
    </div>
  );
}