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
            Ù†ÙŠØ¯Ù‡
          </h1>

          <p>
            ÙƒÙ„ Ø®Ø¯Ù…Ø§Øª Ø¨Ù„Ø¯Ùƒ ÙÙŠ Ù…ÙƒØ§Ù† ÙˆØ§Ø­Ø¯
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
          Ø¯Ù„ÙŠÙ„ Ù†ÙŠØ¯Ù‡ Ù„Ù„Ø®Ø¯Ù…Ø§Øª Ø§Ù„Ù…Ø­Ù„ÙŠØ©
        </small>

      </div>

    </main>
  );
}
