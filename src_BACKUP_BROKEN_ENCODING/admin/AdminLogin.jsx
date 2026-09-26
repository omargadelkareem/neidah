import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  Mail,
  LockKeyhole,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

import {
  adminLogin,
} from "../services/adminApi";

import "../styles/adminLogin.css";

export default function AdminLogin() {
  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      if (
        !email.trim() ||
        !password
      ) {
        setError(
          "Ø§ÙƒØªØ¨ Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ ÙˆÙƒÙ„Ù…Ø© Ø§Ù„Ù…Ø±ÙˆØ±"
        );

        return;
      }

      try {
        setLoading(true);
        setError("");

        await adminLogin(
          email.trim(),
          password
        );

        navigate(
          "/admin",
          {
            replace: true,
          }
        );
      } catch (error) {
        console.error(error);

        setError(
          "Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ Ø£Ùˆ ÙƒÙ„Ù…Ø© Ø§Ù„Ù…Ø±ÙˆØ± ØºÙŠØ± ØµØ­ÙŠØ­Ø©"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="admin-login-page">

      <div className="admin-login-card">

        <div className="admin-brand">
          Ù†ÙŠØ¯Ù‡
        </div>

        <div className="admin-security-icon">
          <ShieldCheck size={29} />
        </div>

        <span className="admin-label">
          Ù„ÙˆØ­Ø© Ø§Ù„Ø¥Ø¯Ø§Ø±Ø©
        </span>

        <h1>
          Ø£Ù‡Ù„Ø§Ù‹ Ø¨Ø±Ø¬ÙˆØ¹Ùƒ
        </h1>

        <p className="admin-login-description">
          Ø³Ø¬Ù‘Ù„ Ø¯Ø®ÙˆÙ„Ùƒ Ù„Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ø®Ø¯Ù…Ø§Øª
          ÙˆØ§Ù„Ø·Ù„Ø¨Ø§Øª ÙˆØ§Ù„Ø¥Ø¹Ù„Ø§Ù†Ø§Øª.
        </p>

        <form
          onSubmit={handleSubmit}
        >

          <label>
            Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ

            <div className="admin-input">
              <Mail size={19} />

              <input
                type="email"
                dir="ltr"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                placeholder="admin@email.com"
              />
            </div>
          </label>

          <label>
            ÙƒÙ„Ù…Ø© Ø§Ù„Ù…Ø±ÙˆØ±

            <div className="admin-input">
              <LockKeyhole
                size={19}
              />

              <input
                type="password"
                dir="ltr"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
              />
            </div>
          </label>

          {error && (
            <div className="admin-error">
              {error}
            </div>
          )}

          <button
            className="admin-login-button"
            disabled={loading}
          >
            {loading
              ? "Ø¬Ø§Ø±ÙŠ Ø§Ù„Ø¯Ø®ÙˆÙ„..."
              : (
                <>
                  Ø¯Ø®ÙˆÙ„ Ù„ÙˆØ­Ø© Ø§Ù„Ø¥Ø¯Ø§Ø±Ø©
                  <ArrowLeft
                    size={18}
                  />
                </>
              )}
          </button>

        </form>

        <button
          className="back-to-site"
          onClick={() =>
            navigate("/home")
          }
        >
          Ø§Ù„Ø±Ø¬ÙˆØ¹ Ø¥Ù„Ù‰ Ù†ÙŠØ¯Ù‡
        </button>

      </div>

    </div>
  );
}
