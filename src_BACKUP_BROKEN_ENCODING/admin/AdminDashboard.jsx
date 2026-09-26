import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  ClipboardList,
  BriefcaseBusiness,
  LayoutGrid,
  Megaphone,
  LogOut,
  ArrowLeft,
  Bell,
} from "lucide-react";

import {
  listenToPendingRequests,
  adminLogout,
} from "../services/adminApi";

import "../styles/adminDashboard.css";

export default function AdminDashboard() {
  const navigate =
    useNavigate();

  const [pendingCount, setPendingCount] =
    useState(0);

  useEffect(() => {
    const unsubscribe =
      listenToPendingRequests(
        (requests) => {
          setPendingCount(
            requests.length
          );
        }
      );

    return () =>
      unsubscribe();
  }, []);

  const logout = async () => {
    await adminLogout();

    navigate(
      "/admin/login",
      {
        replace: true,
      }
    );
  };

  const cards = [
    {
      title: "Ø·Ù„Ø¨Ø§Øª Ø§Ù„ØªØ³Ø¬ÙŠÙ„",
      description:
        "Ù…Ø±Ø§Ø¬Ø¹Ø© Ø§Ù„Ø®Ø¯Ù…Ø§Øª Ø§Ù„Ø¬Ø¯ÙŠØ¯Ø©",
      count: pendingCount,
      Icon: ClipboardList,
      path: "/admin/requests",
    },

    {
      title: "Ø§Ù„Ø®Ø¯Ù…Ø§Øª",
      description:
        "Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ø®Ø¯Ù…Ø§Øª Ø§Ù„Ù…Ù†Ø´ÙˆØ±Ø©",
      Icon: BriefcaseBusiness,
      path: "/admin/services",
    },

    {
      title: "Ø§Ù„Ø£Ù‚Ø³Ø§Ù…",
      description:
        "Ø¥Ø¯Ø§Ø±Ø© Ø£Ù‚Ø³Ø§Ù… Ù†ÙŠØ¯Ù‡",
      Icon: LayoutGrid,
      path: "/admin/categories",
    },

    {
      title: "Ø§Ù„Ø¥Ø¹Ù„Ø§Ù†Ø§Øª",
      description:
        "Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ø¥Ø¹Ù„Ø§Ù†Ø§Øª Ø§Ù„Ù…Ù…ÙˆÙ„Ø©",
      Icon: Megaphone,
      path: "/admin/ads",
    },
  ];

  return (
    <div className="admin-dashboard">

      <header className="dashboard-header">

        <div>
          <span>
            Ù„ÙˆØ­Ø© Ø¥Ø¯Ø§Ø±Ø©
          </span>

          <h1>
            Ù†ÙŠØ¯Ù‡
          </h1>
        </div>

        <div className="dashboard-header-actions">

          <button
            className="notification-button"
          >
            <Bell size={19} />

            {pendingCount > 0 && (
              <span>
                {pendingCount}
              </span>
            )}
          </button>

          <button
            className="logout-button"
            onClick={logout}
          >
            <LogOut size={18} />
          </button>

        </div>

      </header>

      <main className="dashboard-content">

        <div className="dashboard-welcome">
          <span>
            Ø§Ù„Ø¥Ø¯Ø§Ø±Ø©
          </span>

          <h2>
            ØµØ¨Ø§Ø­ Ø§Ù„Ø®ÙŠØ± ðŸ‘‹
          </h2>

          <p>
            Ù…Ù† Ù‡Ù†Ø§ ØªÙ‚Ø¯Ø± ØªØ¯ÙŠØ± Ù…Ø­ØªÙˆÙ‰
            Ù…Ù†ØµØ© Ù†ÙŠØ¯Ù‡ Ø¨Ø§Ù„ÙƒØ§Ù…Ù„.
          </p>
        </div>

        {pendingCount > 0 && (
          <button
            className="pending-alert"
            onClick={() =>
              navigate(
                "/admin/requests"
              )
            }
          >
            <div>
              <span>
                {pendingCount}
              </span>
            </div>

            <section>
              <strong>
                Ø¹Ù†Ø¯Ùƒ Ø·Ù„Ø¨Ø§Øª Ø¬Ø¯ÙŠØ¯Ø©
              </strong>

              <small>
                Ù…Ø­ØªØ§Ø¬Ø© Ù…Ø±Ø§Ø¬Ø¹ØªÙƒ
                Ù‚Ø¨Ù„ Ø¸Ù‡ÙˆØ±Ù‡Ø§ Ù„Ù„Ù†Ø§Ø³
              </small>
            </section>

            <ArrowLeft
              size={19}
            />
          </button>
        )}

        <div className="admin-section-heading">
          Ø§Ù„Ø¥Ø¯Ø§Ø±Ø©
        </div>

        <div className="admin-dashboard-grid">

          {cards.map(
            ({
              title,
              description,
              count,
              Icon,
              path,
            }) => (
              <button
                key={title}
                className="admin-dashboard-card"
                onClick={() =>
                  navigate(path)
                }
              >
                <div className="dashboard-card-top">

                  <span className="dashboard-card-icon">
                    <Icon size={23} />
                  </span>

                  {count > 0 && (
                    <span className="dashboard-card-count">
                      {count}
                    </span>
                  )}

                </div>

                <strong>
                  {title}
                </strong>

                <small>
                  {description}
                </small>

              </button>
            )
          )}

        </div>

      </main>

    </div>
  );
}
