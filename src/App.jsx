import React, { useState } from "react";

const App = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordRules = [
    { rule: "At least 6 characters", test: (pwd) => pwd.length >= 6 },
    { rule: "At least one uppercase letter", test: (pwd) => /[A-Z]/.test(pwd) },
    { rule: "At least one lowercase letter", test: (pwd) => /[a-z]/.test(pwd) },
    { rule: "At least one number", test: (pwd) => /[0-9]/.test(pwd) },
    {
      rule: "At least one special character (!@#$%^&*()_-+={[}]|:;\"'<,>.)",
      test: (pwd) => /[!@#$%^&*()_\-+={[}\]|:;"'<,>.]/.test(pwd),
    },
  ];

  const validatePassword = (pwd) => {
    return passwordRules.filter(({ test }) => !test(pwd)).map(({ rule }) => rule);
  };

  const handleSubmit = () => {
    setError("");
    setSuccess(false);

    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      setError("❌ Password must meet all requirements.");
      return;
    }

    if (password !== confirmPassword) {
      setError("❌ Passwords do not match.");
      return;
    }

    setSuccess(true);
  };

  return (
    <div className="container">
      <h2 className="title">Create Your Password</h2>

      {/* Password Input */}
      <div className="inputWrapper">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <span className="eyeIcon" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "👁️" : "🙈"}
        </span>
      </div>

      {/* Confirm Password Input */}
      <div className="inputWrapper">
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="input"
        />
        <span className="eyeIcon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
          {showConfirmPassword ? "👁️" : "🙈"}
        </span>
      </div>

      {/* Password Rules Validation */}
      <div className="validationBox">
        {passwordRules.map(({ rule, test }, index) => (
          <p key={index} style={{ color: test(password) ? "green" : "red", fontSize: "14px", fontWeight: "bold" }}>
            {test(password) ? "✅" : "❌"} {rule}
          </p>
        ))}
      </div>

      <button onClick={handleSubmit} className="button">
        Submit
      </button>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">✅ Password successfully created!</p>}
    </div>
  );
};

export default App;