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
      title: "سجّل خدمتك",
      description:
        "ضيف خدمتك أو نشاطك علشان أهل نيده يقدروا يوصلوا لك بسهولة.",
      Icon: UserPlus,
      color: "green",
      action: () =>
        navigate("/register-service"),
    },

    {
      id: "advertise",
      title: "أعلن في نيده",
      description:
        "روّج لنشاطك وخلي إعلانك يظهر لأهل البلد داخل المنصة.",
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
      title: "أماكن مهمة",
      subtitle:
        "مدارس، مساجد وخدمات مهمة",
      Icon: MapPin,
      color: "blue",
      action: () =>
        navigate("/category/places"),
    },

    {
      id: "numbers",
      title: "أرقام مهمة",
      subtitle:
        "أرقام الخدمات والطوارئ",
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
      title: "عن نيده",
      subtitle:
        "اعرف أكتر عن المنصة وهدفها",
      Icon: Info,
      action: () =>
        navigate("/about"),
    },

    {
      id: "contact",
      title: "تواصل معنا",
      subtitle:
        "اقتراح، مشكلة أو استفسار",
      Icon: MessageCircle,
      action: () =>
        navigate("/contact"),
    },

    {
      id: "privacy",
      title: "سياسة الخصوصية",
      subtitle:
        "تعرف على طريقة استخدام البيانات",
      Icon: ShieldCheck,
      action: () =>
        navigate("/privacy"),
    },

    {
      id: "terms",
      title: "الشروط والأحكام",
      subtitle:
        "شروط استخدام منصة نيده",
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
            <span>نيده</span>
            <h1>المزيد</h1>
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
              كل خدمات بلدك في مكان واحد
            </span>

            <h2>
              نيده
            </h2>

            <p>
              دليل بسيط يساعد أهل البلد
              يوصلوا للخدمات والأماكن
              والمعلومات المهمة بسهولة.
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
                انضم لنيده
              </h2>

              <p>
                سجّل نشاطك أو أعلن عنه
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
                      ابدأ الآن
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
                دليل نيده
              </h2>

              <p>
                حاجات مهمة ممكن تحتاجها
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
                عن المنصة
              </h2>

              <p>
                معلومات ومساعدة
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
              نيده لأهل نيده
            </strong>

            <p>
              المنصة هدفها تسهّل الوصول
              للخدمات وتدعم أصحاب الأعمال
              والخدمات داخل البلد.
            </p>

          </section>

        </section>

        {/* Footer */}

        <footer className="more-footer">

          <strong>
            نيده
          </strong>

          <span>
            كل خدمات بلدك في مكان واحد
          </span>

          <small>
            © 2026 جميع الحقوق محفوظة
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
          <span>الرئيسية</span>
        </button>

        <button
          type="button"
          onClick={() =>
            navigate("/categories")
          }
        >
          <LayoutGrid size={22} />
          <span>الأقسام</span>
        </button>

        <button
          type="button"
          onClick={() =>
            navigate("/search")
          }
        >
          <Search size={22} />
          <span>بحث</span>
        </button>

        <button
          type="button"
          className="active"
        >
          <MoreHorizontal size={23} />
          <span>المزيد</span>
        </button>

      </nav>

    </div>
  );
}
