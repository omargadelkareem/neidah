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
          "اكتب البريد الإلكتروني وكلمة المرور"
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
          "البريد الإلكتروني أو كلمة المرور غير صحيحة"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="admin-login-page">

      <div className="admin-login-card">

        <div className="admin-brand">
          نيده
        </div>

        <div className="admin-security-icon">
          <ShieldCheck size={29} />
        </div>

        <span className="admin-label">
          لوحة الإدارة
        </span>

        <h1>
          أهلاً برجوعك
        </h1>

        <p className="admin-login-description">
          سجّل دخولك لإدارة الخدمات
          والطلبات والإعلانات.
        </p>

        <form
          onSubmit={handleSubmit}
        >

          <label>
            البريد الإلكتروني

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
            كلمة المرور

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
                placeholder="••••••••"
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
              ? "جاري الدخول..."
              : (
                <>
                  دخول لوحة الإدارة
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
          الرجوع إلى نيده
        </button>

      </div>

    </div>
  );
}
