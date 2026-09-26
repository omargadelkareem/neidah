import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  MoreHorizontal,
  UserPlus,
  Megaphone,
  MapPin,
  PhoneCall,
  Info,
  MessageCircle,
  ShieldCheck,
  FileText,
  ChevronLeft,
  Home,
  LayoutGrid,
  Search,
  HeartHandshake,
  Sparkles,
} from "lucide-react";

import "../styles/more.css";
import Logo from "../components/common/Logo";

export default function More() {
  const navigate = useNavigate();

  /* =========================================
     Main Actions
  ========================================= */

  const mainActions = [
    {
      id: "register",
      title: "Ø³Ø¬Ù‘Ù„ Ø®Ø¯Ù…ØªÙƒ",
      description:
        "Ø¶ÙŠÙ Ø®Ø¯Ù…ØªÙƒ Ø£Ùˆ Ù†Ø´Ø§Ø·Ùƒ Ø¹Ù„Ø´Ø§Ù† Ø£Ù‡Ù„ Ù†ÙŠØ¯Ù‡ ÙŠÙ‚Ø¯Ø±ÙˆØ§ ÙŠÙˆØµÙ„ÙˆØ§ Ù„Ùƒ Ø¨Ø³Ù‡ÙˆÙ„Ø©.",
      Icon: UserPlus,
      color: "green",
      action: () =>
        navigate("/register-service"),
    },

    {
      id: "advertise",
      title: "Ø£Ø¹Ù„Ù† ÙÙŠ Ù†ÙŠØ¯Ù‡",
      description:
        "Ø±ÙˆÙ‘Ø¬ Ù„Ù†Ø´Ø§Ø·Ùƒ ÙˆØ®Ù„ÙŠ Ø¥Ø¹Ù„Ø§Ù†Ùƒ ÙŠØ¸Ù‡Ø± Ù„Ø£Ù‡Ù„ Ø§Ù„Ø¨Ù„Ø¯ Ø¯Ø§Ø®Ù„ Ø§Ù„Ù…Ù†ØµØ©.",
      Icon: Megaphone,
      color: "gold",
      action: () =>
        navigate("/advertise"),
    },
  ];

  /* =========================================
     Village Guide
  ========================================= */

  const villageGuide = [
    {
      id: "places",
      title: "Ø£Ù…Ø§ÙƒÙ† Ù…Ù‡Ù…Ø©",
      subtitle:
        "Ù…Ø¯Ø§Ø±Ø³ØŒ Ù…Ø³Ø§Ø¬Ø¯ ÙˆØ®Ø¯Ù…Ø§Øª Ù…Ù‡Ù…Ø©",
      Icon: MapPin,
      color: "blue",
      action: () =>
        navigate("/category/places"),
    },

    {
      id: "numbers",
      title: "Ø£Ø±Ù‚Ø§Ù… Ù…Ù‡Ù…Ø©",
      subtitle:
        "Ø£Ø±Ù‚Ø§Ù… Ø§Ù„Ø®Ø¯Ù…Ø§Øª ÙˆØ§Ù„Ø·ÙˆØ§Ø±Ø¦",
      Icon: PhoneCall,
      color: "rose",
      action: () =>
        navigate("/category/numbers"),
    },
  ];

  /* =========================================
     Platform
  ========================================= */

  const platformLinks = [
    {
      id: "about",
      title: "Ø¹Ù† Ù†ÙŠØ¯Ù‡",
      subtitle:
        "Ø§Ø¹Ø±Ù Ø£ÙƒØªØ± Ø¹Ù† Ø§Ù„Ù…Ù†ØµØ© ÙˆÙ‡Ø¯ÙÙ‡Ø§",
      Icon: Info,
      action: () =>
        navigate("/about"),
    },

    {
      id: "contact",
      title: "ØªÙˆØ§ØµÙ„ Ù…Ø¹Ù†Ø§",
      subtitle:
        "Ø§Ù‚ØªØ±Ø§Ø­ØŒ Ù…Ø´ÙƒÙ„Ø© Ø£Ùˆ Ø§Ø³ØªÙØ³Ø§Ø±",
      Icon: MessageCircle,
      action: () =>
        navigate("/contact"),
    },

    {
      id: "privacy",
      title: "Ø³ÙŠØ§Ø³Ø© Ø§Ù„Ø®ØµÙˆØµÙŠØ©",
      subtitle:
        "ØªØ¹Ø±Ù Ø¹Ù„Ù‰ Ø·Ø±ÙŠÙ‚Ø© Ø§Ø³ØªØ®Ø¯Ø§Ù… Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª",
      Icon: ShieldCheck,
      action: () =>
        navigate("/privacy"),
    },

    {
      id: "terms",
      title: "Ø§Ù„Ø´Ø±ÙˆØ· ÙˆØ§Ù„Ø£Ø­ÙƒØ§Ù…",
      subtitle:
        "Ø´Ø±ÙˆØ· Ø§Ø³ØªØ®Ø¯Ø§Ù… Ù…Ù†ØµØ© Ù†ÙŠØ¯Ù‡",
      Icon: FileText,
      action: () =>
        navigate("/terms"),
    },
  ];

  return (
    <div className="more-page">

      <div className="more-shell">

        {/* =====================================
            Header
        ===================================== */}

        <header className="more-header">

          <button
            type="button"
            className="more-back"
            onClick={() =>
              navigate(-1)
            }
          >
            <ArrowRight size={24} />
          </button>

          <div className="more-header-title">
            <span>Ù†ÙŠØ¯Ù‡</span>
            <h1>Ø§Ù„Ù…Ø²ÙŠØ¯</h1>
          </div>

          <div className="more-header-icon">
            <MoreHorizontal size={23} />
          </div>

        </header>

        {/* =====================================
            Intro
        ===================================== */}

        <section className="more-intro">

          <div className="more-intro-decoration">
            <Sparkles size={18} />
          </div>

        <div className="more-brand-logo">
  <Logo size={86} />
</div>

          <div className="more-intro-content">

            <span>
              ÙƒÙ„ Ø®Ø¯Ù…Ø§Øª Ø¨Ù„Ø¯Ùƒ ÙÙŠ Ù…ÙƒØ§Ù† ÙˆØ§Ø­Ø¯
            </span>

            <h2>
              Ù†ÙŠØ¯Ù‡
            </h2>

            <p>
              Ø¯Ù„ÙŠÙ„ Ø¨Ø³ÙŠØ· ÙŠØ³Ø§Ø¹Ø¯ Ø£Ù‡Ù„ Ø§Ù„Ø¨Ù„Ø¯
              ÙŠÙˆØµÙ„ÙˆØ§ Ù„Ù„Ø®Ø¯Ù…Ø§Øª ÙˆØ§Ù„Ø£Ù…Ø§ÙƒÙ†
              ÙˆØ§Ù„Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ø§Ù„Ù…Ù‡Ù…Ø© Ø¨Ø³Ù‡ÙˆÙ„Ø©.
            </p>

          </div>

        </section>

        {/* =====================================
            Main Actions
        ===================================== */}

        <section className="more-section">

          <div className="more-section-heading">

            <div>
              <h2>
                Ø§Ù†Ø¶Ù… Ù„Ù†ÙŠØ¯Ù‡
              </h2>

              <p>
                Ø³Ø¬Ù‘Ù„ Ù†Ø´Ø§Ø·Ùƒ Ø£Ùˆ Ø£Ø¹Ù„Ù† Ø¹Ù†Ù‡
              </p>
            </div>

          </div>

          <div className="more-main-actions">

            {mainActions.map(
              ({
                id,
                title,
                description,
                Icon,
                color,
                action,
              }) => (
                <button
                  type="button"
                  key={id}
                  className={
                    `more-main-card ${color}`
                  }
                  onClick={action}
                >

                  <div className="more-main-icon">
                    <Icon size={25} />
                  </div>

                  <div className="more-main-content">

                    <strong>
                      {title}
                    </strong>

                    <p>
                      {description}
                    </p>

                    <span>
                      Ø§Ø¨Ø¯Ø£ Ø§Ù„Ø¢Ù†
                      <ChevronLeft
                        size={15}
                      />
                    </span>

                  </div>

                </button>
              )
            )}

          </div>

        </section>

        {/* =====================================
            Village Guide
        ===================================== */}

        <section className="more-section">

          <div className="more-section-heading">

            <div>
              <h2>
                Ø¯Ù„ÙŠÙ„ Ù†ÙŠØ¯Ù‡
              </h2>

              <p>
                Ø­Ø§Ø¬Ø§Øª Ù…Ù‡Ù…Ø© Ù…Ù…ÙƒÙ† ØªØ­ØªØ§Ø¬Ù‡Ø§
              </p>
            </div>

          </div>

          <div className="more-guide-grid">

            {villageGuide.map(
              ({
                id,
                title,
                subtitle,
                Icon,
                color,
                action,
              }) => (
                <button
                  type="button"
                  key={id}
                  className="more-guide-card"
                  onClick={action}
                >

                  <div
                    className={
                      `more-guide-icon ${color}`
                    }
                  >
                    <Icon size={23} />
                  </div>

                  <strong>
                    {title}
                  </strong>

                  <small>
                    {subtitle}
                  </small>

                </button>
              )
            )}

          </div>

        </section>

        {/* =====================================
            Platform
        ===================================== */}

        <section className="more-section">

          <div className="more-section-heading">

            <div>
              <h2>
                Ø¹Ù† Ø§Ù„Ù…Ù†ØµØ©
              </h2>

              <p>
                Ù…Ø¹Ù„ÙˆÙ…Ø§Øª ÙˆÙ…Ø³Ø§Ø¹Ø¯Ø©
              </p>
            </div>

          </div>

          <div className="more-links-card">

            {platformLinks.map(
              ({
                id,
                title,
                subtitle,
                Icon,
                action,
              }) => (
                <button
                  type="button"
                  key={id}
                  className="more-link-row"
                  onClick={action}
                >

                  <div className="more-link-icon">
                    <Icon size={20} />
                  </div>

                  <div className="more-link-content">

                    <strong>
                      {title}
                    </strong>

                    <small>
                      {subtitle}
                    </small>

                  </div>

                  <ChevronLeft
                    size={18}
                    className="more-link-arrow"
                  />

                </button>
              )
            )}

          </div>

        </section>

        {/* =====================================
            Community message
        ===================================== */}

        <section className="more-community-card">

          <div>
            <HeartHandshake
              size={25}
            />
          </div>

          <section>

            <strong>
              Ù†ÙŠØ¯Ù‡ Ù„Ø£Ù‡Ù„ Ù†ÙŠØ¯Ù‡
            </strong>

            <p>
              Ø§Ù„Ù…Ù†ØµØ© Ù‡Ø¯ÙÙ‡Ø§ ØªØ³Ù‡Ù‘Ù„ Ø§Ù„ÙˆØµÙˆÙ„
              Ù„Ù„Ø®Ø¯Ù…Ø§Øª ÙˆØªØ¯Ø¹Ù… Ø£ØµØ­Ø§Ø¨ Ø§Ù„Ø£Ø¹Ù…Ø§Ù„
              ÙˆØ§Ù„Ø®Ø¯Ù…Ø§Øª Ø¯Ø§Ø®Ù„ Ø§Ù„Ø¨Ù„Ø¯.
            </p>

          </section>

        </section>

        {/* Footer */}

        <footer className="more-footer">

          <strong>
            Ù†ÙŠØ¯Ù‡
          </strong>

          <span>
            ÙƒÙ„ Ø®Ø¯Ù…Ø§Øª Ø¨Ù„Ø¯Ùƒ ÙÙŠ Ù…ÙƒØ§Ù† ÙˆØ§Ø­Ø¯
          </span>

          <small>
            Â© 2026 Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø­Ù‚ÙˆÙ‚ Ù…Ø­ÙÙˆØ¸Ø©
          </small>

        </footer>

      </div>

      {/* =====================================
          Bottom Navigation
      ===================================== */}

      <nav className="more-bottom-nav">

        <button
          type="button"
          onClick={() =>
            navigate("/home")
          }
        >
          <Home size={22} />
          <span>Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©</span>
        </button>

        <button
          type="button"
          onClick={() =>
            navigate("/categories")
          }
        >
          <LayoutGrid size={22} />
          <span>Ø§Ù„Ø£Ù‚Ø³Ø§Ù…</span>
        </button>

        <button
          type="button"
          onClick={() =>
            navigate("/search")
          }
        >
          <Search size={22} />
          <span>Ø¨Ø­Ø«</span>
        </button>

        <button
          type="button"
          className="active"
        >
          <MoreHorizontal size={23} />
          <span>Ø§Ù„Ù…Ø²ÙŠØ¯</span>
        </button>

      </nav>

    </div>
  );
}
