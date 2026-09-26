import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  Search,
  Bell,
  Menu,
  Wrench,
  ShoppingBasket,
  Pill,
  Stethoscope,
  Car,
  Bike,
  GraduationCap,
  MapPin,
  Phone,
  MoreHorizontal,
  ChevronLeft,
  Home as HomeIcon,
  LayoutGrid,
  Plus,
  MessageCircle,
  Store,
  ImageOff,
} from "lucide-react";

import {
  getApprovedServices,
} from "../services/servicesApi";

import "../styles/home.css";

/* =====================================
   Main categories
===================================== */

const categories = [
  {
    id: "craftsmen",
    title: "ØµÙ†Ø§ÙŠØ¹ÙŠØ©",
    Icon: Wrench,
    color: "green",
  },

  {
    id: "supermarkets",
    title: "Ø³ÙˆØ¨Ø± Ù…Ø§Ø±ÙƒØª",
    Icon: ShoppingBasket,
    color: "peach",
  },

  {
    id: "pharmacies",
    title: "ØµÙŠØ¯Ù„ÙŠØ§Øª",
    Icon: Pill,
    color: "rose",
  },

  {
    id: "doctors",
    title: "Ø£Ø·Ø¨Ø§Ø¡",
    Icon: Stethoscope,
    color: "cyan",
  },

  {
    id: "transport",
    title: "Ù…ÙˆØ§ØµÙ„Ø§Øª",
    Icon: Car,
    color: "blue",
  },

  {
    id: "delivery",
    title: "ØªÙˆØµÙŠÙ„ Ù„Ù„Ù…Ù†Ø§Ø²Ù„",
    Icon: Bike,
    color: "yellow",
  },

  {
    id: "education",
    title: "ØªØ¹Ù„ÙŠÙ…",
    Icon: GraduationCap,
    color: "mint",
  },

  {
    id: "places",
    title: "Ø£Ù…Ø§ÙƒÙ† Ù…Ù‡Ù…Ø©",
    Icon: MapPin,
    color: "sand",
  },

  {
    id: "numbers",
    title: "Ø£Ø±Ù‚Ø§Ù… Ù…Ù‡Ù…Ø©",
    Icon: Phone,
    color: "green",
  },

  {
    id: "more",
    title: "Ø§Ù„Ù…Ø²ÙŠØ¯",
    Icon: MoreHorizontal,
    color: "gray",
  },
];

/* =====================================
   Skeleton
===================================== */

function RecentCardSkeleton() {
  return (
    <div className="home-service-skeleton">

      <div className="home-skeleton-image shimmer" />

      <div className="home-skeleton-content">

        <div className="home-skeleton-title shimmer" />

        <div className="home-skeleton-small shimmer" />

        <div className="home-skeleton-buttons">

          <div className="shimmer" />

          <div className="shimmer" />

        </div>

      </div>

    </div>
  );
}

/* =====================================
   Service image
===================================== */

function ServiceImage({
  service,
}) {
  const [loaded, setLoaded] =
    useState(false);

  const [error, setError] =
    useState(false);

  const image =
    service.imageBase64 ||
    service.image ||
    "";

  if (!image || error) {
    return (
      <div className="home-image-placeholder">

        <ImageOff size={22} />

        <strong>
          {service.name?.charAt(0)}
        </strong>

      </div>
    );
  }

  return (
    <>
      {!loaded && (
        <div className="home-image-loading shimmer" />
      )}

      <img
        src={image}
        alt={service.name}
        loading="lazy"
        className={
          loaded
            ? "loaded"
            : ""
        }
        onLoad={() =>
          setLoaded(true)
        }
        onError={() =>
          setError(true)
        }
      />
    </>
  );
}

/* =====================================
   Service card
===================================== */

function HomeServiceCard({
  service,
  index,
  navigate,
}) {
  const makeCall = (e) => {
    e.stopPropagation();

    if (!service.phone) return;

    window.location.href =
      `tel:${service.phone}`;
  };

  const openWhatsApp = (e) => {
    e.stopPropagation();

    if (!service.whatsapp) {
      return;
    }

    let number =
      service.whatsapp.replace(
        /\D/g,
        ""
      );

    if (
      number.startsWith("0")
    ) {
      number =
        `20${number.slice(1)}`;
    }

    const message =
      encodeURIComponent(
        "Ø§Ù„Ø³Ù„Ø§Ù… Ø¹Ù„ÙŠÙƒÙ…ØŒ ÙˆØµÙ„Øª Ù„Ø¨ÙŠØ§Ù†Ø§ØªÙƒ Ù…Ù† Ù…Ù†ØµØ© Ù†ÙŠØ¯Ù‡"
      );

    window.open(
      `https://wa.me/${number}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <article
      className="recent-card home-card-enter"
      style={{
        "--home-delay":
          `${index * 70}ms`,
      }}
      onClick={() =>
        navigate(
          `/service/${service.id}`
        )
      }
    >

      <div className="recent-image">

        <ServiceImage
          service={service}
        />

        <span>
          {service.specialty ||
            service.profession ||
            "Ø®Ø¯Ù…Ø©"}
        </span>

      </div>

      <div className="recent-body">

        <h3>
          {service.name}
        </h3>

        <p>
          <MapPin size={12} />

          {service.address ||
            service.location ||
            "Ù†ÙŠØ¯Ù‡"}
        </p>

        <div className="recent-actions">

          {service.phone && (
            <button
              className="call-small"
              onClick={makeCall}
              aria-label="Ø§ØªØµØ§Ù„"
            >
              <Phone size={17} />
            </button>
          )}

          {service.whatsapp && (
            <button
              className="whatsapp-small"
              onClick={
                openWhatsApp
              }
              aria-label="ÙˆØ§ØªØ³Ø§Ø¨"
            >
              <MessageCircle
                size={18}
              />
            </button>
          )}

        </div>

      </div>

    </article>
  );
}

/* =====================================
   Home
===================================== */

export default function Home() {
  const navigate =
    useNavigate();

  const [services, setServices] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  /* =====================================
     Load approved services
  ===================================== */

  useEffect(() => {
    let mounted = true;

    const loadServices =
      async () => {
        try {
          setLoading(true);

          const data =
            await getApprovedServices();

          console.log(
            "HOME SERVICES:",
            data
          );

          if (mounted) {
            setServices(
              data || []
            );
          }

        } catch (error) {
          console.error(
            "HOME SERVICES ERROR:",
            error
          );

          if (mounted) {
            setServices([]);
          }

        } finally {
          if (mounted) {
            setLoading(false);
          }
        }
      };

    loadServices();

    return () => {
      mounted = false;
    };

  }, []);

  /* =====================================
     Recent craftsmen
  ===================================== */

  const recentCraftsmen =
    useMemo(() => {
      return services
        .filter(
          (service) =>
            service.categoryId ===
            "craftsmen"
        )
        .sort(
          (a, b) =>
            (b.approvedAt ||
              b.createdAt ||
              0) -
            (a.approvedAt ||
              a.createdAt ||
              0)
        )
        .slice(0, 6);
    }, [services]);

  /* =====================================
     Commercial shops
  ===================================== */

  const recentCommercial =
    useMemo(() => {
      const commercialCategories =
        [
          "supermarkets",
          "pharmacies",

          // Compatibility with old records
          "shops",
        ];

      return services
        .filter((service) =>
          commercialCategories.includes(
            service.categoryId
          )
        )
        .sort(
          (a, b) =>
            (b.approvedAt ||
              b.createdAt ||
              0) -
            (a.approvedAt ||
              a.createdAt ||
              0)
        )
        .slice(0, 6);

    }, [services]);

  /* =====================================
     Navigation
  ===================================== */

  const openCategory = (
    id
  ) => {
    if (id === "more") {
      navigate(
        "/categories"
      );

      return;
    }

    navigate(
      `/category/${id}`
    );
  };

  return (
    <div className="neida-page">

      <div className="neida-shell">

        {/* ===============================
            Header
        =============================== */}

        <header className="neida-header">

          <button className="circle-button">

            <Bell size={21} />

            <span className="notification-dot" />

          </button>

          <div className="brand-area">

            <h1>
              Ù†ÙŠØ¯Ù‡
            </h1>

            <div className="location-line">

              <MapPin size={14} />

              <span>
                Ù‚Ø±ÙŠØ© Ù†ÙŠØ¯Ù‡
              </span>

            </div>

          </div>

          <button className="plain-icon-button">

            <Menu size={27} />

          </button>

        </header>

        {/* ===============================
            Search
        =============================== */}

        <button
          className="neida-search"
          onClick={() =>
            navigate("/search")
          }
        >

          <Search size={25} />

          <span>
            Ø¨ØªØ¯ÙˆØ± Ø¹Ù„Ù‰ Ø¥ÙŠÙ‡ ÙÙŠ Ù†ÙŠØ¯Ù‡ØŸ
          </span>

        </button>

        {/* ===============================
            Categories
        =============================== */}

        <section className="categories-section">

          <div className="neida-categories-grid">

            {categories.map(
              ({
                id,
                title,
                Icon,
                color,
              }) => (
                <button
                  key={id}
                  className="neida-category"
                  onClick={() =>
                    openCategory(id)
                  }
                >

                  <span
                    className={
                      `category-circle ${color}`
                    }
                  >
                    <Icon
                      size={27}
                      strokeWidth={1.9}
                    />
                  </span>

                  <span className="category-title">
                    {title}
                  </span>

                </button>
              )
            )}

          </div>

        </section>

        {/* ===============================
            Sponsored
        =============================== */}

        <section className="sponsored-section">

          <div className="sponsored-card">

            <div className="sponsored-placeholder">

              <ShoppingBasket
                size={50}
                strokeWidth={1.5}
              />

            </div>

            <div className="sponsored-overlay" />

            <span className="sponsored-badge">
              Ø¥Ø¹Ù„Ø§Ù† Ù…Ù…ÙˆÙ„
            </span>

            <div className="sponsored-content"  onClick={() => navigate("/advertise")}
  role="button"
  tabIndex={0}>

              <h2>
                Ø£Ø¹Ù„Ù† Ù‡Ù†Ø§
              </h2>

              <p>
                Ù…Ø³Ø§Ø­Ø© Ø¥Ø¹Ù„Ø§Ù†ÙŠØ© Ù„Ø£ØµØ­Ø§Ø¨
                Ø§Ù„Ù…Ø­Ù„Ø§Øª ÙˆØ§Ù„Ø®Ø¯Ù…Ø§Øª ÙÙŠ Ù†ÙŠØ¯Ù‡
              </p>

            <button
  onClick={(e) => {
    e.stopPropagation();
    navigate("/advertise");
  }}
>
  Ø£Ø¹Ù„Ù† Ù‡Ù†Ø§
</button>

            </div>

          </div>

          <div className="slider-dots">

            <span className="active" />
            <span />
            <span />

          </div>

        </section>

        {/* ===============================
            Craftsmen
        =============================== */}

        <section className="recent-section">

          <div className="section-header">

            <div>
              <span className="section-eyebrow">
                Ø®Ø¯Ù…Ø§Øª Ø£Ù‡Ù„ Ø§Ù„Ø¨Ù„Ø¯
              </span>

              <h2>
                ØµÙ†Ø§ÙŠØ¹ÙŠØ© Ù…Ø¶Ø§ÙÙŠÙ† Ø­Ø¯ÙŠØ«Ù‹Ø§
              </h2>
            </div>

            <button
              onClick={() =>
                navigate(
                  "/category/craftsmen"
                )
              }
            >
              Ø¹Ø±Ø¶ Ø§Ù„ÙƒÙ„

              <ChevronLeft
                size={17}
              />
            </button>

          </div>

          <div className="recent-grid">

            {loading ? (
              <>
                <RecentCardSkeleton />
                <RecentCardSkeleton />
                <RecentCardSkeleton />
              </>
            ) : recentCraftsmen.length >
              0 ? (
              recentCraftsmen.map(
                (
                  service,
                  index
                ) => (
                  <HomeServiceCard
                    key={
                      service.id
                    }
                    service={
                      service
                    }
                    index={index}
                    navigate={
                      navigate
                    }
                  />
                )
              )
            ) : (
              <div className="home-empty-section">

                <Wrench size={25} />

                <p>
                  Ù…ÙÙŠØ´ ØµÙ†Ø§ÙŠØ¹ÙŠØ©
                  Ù…Ø¶Ø§ÙÙŠÙ† Ù„Ø³Ù‡
                </p>

                <button
                  onClick={() =>
                    navigate(
                      "/register-service"
                    )
                  }
                >
                  Ø£Ø¶Ù Ø®Ø¯Ù…Ø©
                </button>

              </div>
            )}

          </div>

        </section>

        {/* ===============================
            Commercial
        =============================== */}

        <section className="recent-section commercial-section">

          <div className="section-header">

            <div>

              <span className="section-eyebrow">
                ØªØ³ÙˆÙ‚ Ù…Ù† Ø¨Ù„Ø¯Ùƒ
              </span>

              <h2>
                Ù…Ø­Ù„Ø§Øª ØªØ¬Ø§Ø±ÙŠØ© Ù…Ø¶Ø§ÙØ© Ø­Ø¯ÙŠØ«Ù‹Ø§
              </h2>

            </div>

            <button
              onClick={() =>
                navigate(
                  "/category/supermarkets"
                )
              }
            >
              Ø¹Ø±Ø¶ Ø§Ù„ÙƒÙ„

              <ChevronLeft
                size={17}
              />
            </button>

          </div>

          <div className="recent-grid">

            {loading ? (
              <>
                <RecentCardSkeleton />
                <RecentCardSkeleton />
                <RecentCardSkeleton />
              </>
            ) : recentCommercial.length >
              0 ? (
              recentCommercial.map(
                (
                  service,
                  index
                ) => (
                  <HomeServiceCard
                    key={
                      service.id
                    }
                    service={
                      service
                    }
                    index={index}
                    navigate={
                      navigate
                    }
                  />
                )
              )
            ) : (
              <div className="home-empty-section">

                <Store size={25} />

                <p>
                  Ù…ÙÙŠØ´ Ù…Ø­Ù„Ø§Øª Ù…Ø¶Ø§ÙØ©
                  Ù„Ø³Ù‡
                </p>

                <button
                  onClick={() =>
                    navigate(
                      "/register-service"
                    )
                  }
                >
                  Ø³Ø¬Ù„ Ù…Ø­Ù„Ùƒ
                </button>

              </div>
            )}

          </div>

        </section>

        {/* ===============================
            Register
        =============================== */}

        <button
          className="register-service-card"
          onClick={() =>
            navigate(
              "/register-service"
            )
          }
        >

          <div className="register-illustration">

            <Store size={34} />

          </div>

          <div className="register-copy">

            <h3>
              Ø¹Ù†Ø¯Ùƒ Ù…Ø­Ù„ Ø£Ùˆ Ø¨ØªÙ‚Ø¯Ù… Ø®Ø¯Ù…Ø©ØŸ
            </h3>

            <p>
              Ø³Ø¬Ù‘Ù„ Ø¨ÙŠØ§Ù†Ø§ØªÙƒ Ù…Ø¬Ø§Ù†Ù‹Ø§
              ÙˆØ¸Ù‡Ø± Ù„Ø£Ù‡Ù„ Ù†ÙŠØ¯Ù‡
            </p>

          </div>

          <div className="register-button">

            <Plus size={19} />

            <span>
              Ø³Ø¬Ù‘Ù„ Ø§Ù„Ø¢Ù†
            </span>

          </div>

        </button>

      </div>

      {/* ===============================
          Bottom navigation
      =============================== */}

      <nav className="neida-bottom-nav">

        <button className="active">

          <HomeIcon size={23} />

          <span>
            Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©
          </span>

        </button>

        <button
          onClick={() =>
            navigate(
              "/categories"
            )
          }
        >

          <LayoutGrid size={23} />

          <span>
            Ø§Ù„Ø£Ù‚Ø³Ø§Ù…
          </span>

        </button>

        <button
          onClick={() =>
            navigate("/search")
          }
        >

          <Search size={24} />

          <span>
            Ø¨Ø­Ø«
          </span>

        </button>

      <button
  onClick={() => navigate("/more")}
>
  <MoreHorizontal size={23} />
  <span>Ø§Ù„Ù…Ø²ÙŠØ¯</span>
</button>

      </nav>

    </div>
  );
}
