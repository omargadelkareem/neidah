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
      title: "طلبات التسجيل",
      description:
        "مراجعة الخدمات الجديدة",
      count: pendingCount,
      Icon: ClipboardList,
      path: "/admin/requests",
    },

    {
      title: "الخدمات",
      description:
        "إدارة الخدمات المنشورة",
      Icon: BriefcaseBusiness,
      path: "/admin/services",
    },

    {
      title: "الأقسام",
      description:
        "إدارة أقسام نيده",
      Icon: LayoutGrid,
      path: "/admin/categories",
    },

    {
      title: "الإعلانات",
      description:
        "إدارة الإعلانات الممولة",
      Icon: Megaphone,
      path: "/admin/ads",
    },
  ];

  return (
    <div className="admin-dashboard">

      <header className="dashboard-header">

        <div>
          <span>
            لوحة إدارة
          </span>

          <h1>
            نيده
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
            الإدارة
          </span>

          <h2>
            صباح الخير 👋
          </h2>

          <p>
            من هنا تقدر تدير محتوى
            منصة نيده بالكامل.
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
                عندك طلبات جديدة
              </strong>

              <small>
                محتاجة مراجعتك
                قبل ظهورها للناس
              </small>
            </section>

            <ArrowLeft
              size={19}
            />
          </button>
        )}

        <div className="admin-section-heading">
          الإدارة
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
