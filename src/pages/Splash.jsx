import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../components/common/Logo";

import "../styles/splash.css";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home", {
        replace: true,
      });
    }, 2400);

    return () =>
      clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="splash-page">

      <div className="splash-background-circle circle-one" />
      <div className="splash-background-circle circle-two" />

      <section className="splash-content">

        <div className="splash-logo-wrapper">
          <Logo
            size={175}
            className="splash-logo"
          />
        </div>

        <div className="splash-brand">

          <h1>
            نيده
          </h1>

          <p>
            كل خدمات بلدك في مكان واحد
          </p>

        </div>

      </section>

      <div className="splash-bottom">

        <div className="splash-loader">
          <span />
          <span />
          <span />
        </div>

        <small>
          دليل نيده للخدمات المحلية
        </small>

      </div>

    </main>
  );
}
