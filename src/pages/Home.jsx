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

import {
  getActiveAds,
} from "../services/adsApi";

import Logo from "../components/common/Logo";

import "../styles/home.css";

/* =========================================
   Main Categories
========================================= */

const categories = [
  {
    id: "craftsmen",
    title: "صنايعية",
    Icon: Wrench,
    color: "green",
  },
  {
    id: "supermarkets",
    title: "سوبر ماركت",
    Icon: ShoppingBasket,
    color: "peach",
  },
  {
    id: "pharmacies",
    title: "صيدليات",
    Icon: Pill,
    color: "rose",
  },
  {
    id: "doctors",
    title: "أطباء",
    Icon: Stethoscope,
    color: "cyan",
  },
  {
    id: "transport",
    title: "مواصلات",
    Icon: Car,
    color: "blue",
  },
  {
    id: "delivery",
    title: "توصيل للمنازل",
    Icon: Bike,
    color: "yellow",
  },
  {
    id: "education",
    title: "تعليم",
    Icon: GraduationCap,
    color: "mint",
  },
  {
    id: "places",
    title: "أماكن مهمة",
    Icon: MapPin,
    color: "sand",
  },
  {
    id: "numbers",
    title: "أرقام مهمة",
    Icon: Phone,
    color: "green",
  },
  {
    id: "more",
    title: "المزيد",
    Icon: MoreHorizontal,
    color: "gray",
  },
];

/* =========================================
   Skeleton
========================================= */

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

/* =========================================
   Service Image
========================================= */

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
        alt={service.name || "خدمة"}
        loading="lazy"
        className={
          loaded ? "loaded" : ""
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

/* =========================================
   Service Card
========================================= */

function HomeServiceCard({
  service,
  index,
  navigate,
}) {
  const makeCall = (e) => {
    e.stopPropagation();

    if (!service.phone) {
      return;
    }

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
        "السلام عليكم، وصلت لبياناتك من منصة نيده"
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
            "خدمة"}
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
            "نيده"}
        </p>

        <div className="recent-actions">
          {service.phone && (
            <button
              className="call-small"
              onClick={makeCall}
              aria-label="اتصال"
            >
              <Phone size={17} />
            </button>
          )}

          {service.whatsapp && (
            <button
              className="whatsapp-small"
              onClick={openWhatsApp}
              aria-label="واتساب"
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

/* =========================================
   Home
========================================= */

export default function Home() {
  const navigate =
    useNavigate();

  /* =========================================
     Services State
  ========================================= */

  const [
    services,
    setServices,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  /* =========================================
     Ads State
  ========================================= */

  const [
    homeAds,
    setHomeAds,
  ] = useState([]);

  const [
    adsLoading,
    setAdsLoading,
  ] = useState(true);

  const [
    activeAdIndex,
    setActiveAdIndex,
  ] = useState(0);

  /* =========================================
     Load Approved Services
  ========================================= */

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

  /* =========================================
     Load Home Ads
  ========================================= */

  useEffect(() => {
    let mounted = true;

    const loadAds =
      async () => {
        try {
          setAdsLoading(true);

          const data =
            await getActiveAds(
              "home_banner"
            );

          console.log(
            "HOME ADS:",
            data
          );

          if (mounted) {
            setHomeAds(
              data || []
            );
          }
        } catch (error) {
          console.error(
            "HOME ADS ERROR:",
            error
          );

          if (mounted) {
            setHomeAds([]);
          }
        } finally {
          if (mounted) {
            setAdsLoading(false);
          }
        }
      };

    loadAds();

    return () => {
      mounted = false;
    };
  }, []);

  /* =========================================
     Ads Auto Slider
  ========================================= */

  useEffect(() => {
    if (
      homeAds.length <= 1
    ) {
      setActiveAdIndex(0);

      return;
    }

    const timer =
      setInterval(() => {
        setActiveAdIndex(
          (current) =>
            (current + 1) %
            homeAds.length
        );
      }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [homeAds.length]);

  /* =========================================
     Active Home Ad
  ========================================= */

  const activeHomeAd =
    homeAds[
      activeAdIndex
    ] || null;

  /* =========================================
     Recent Craftsmen
  ========================================= */

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

  /* =========================================
     Commercial Shops
  ========================================= */

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
        .filter(
          (service) =>
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

  /* =========================================
     Open Category
  ========================================= */

  const openCategory = (
    id
  ) => {
    if (id === "more") {
      navigate("/more");

      return;
    }

    navigate(
      `/category/${id}`
    );
  };

  /* =========================================
     Open Ad WhatsApp
  ========================================= */

  const openAdWhatsApp = (
    e,
    ad
  ) => {
    e.stopPropagation();

    if (!ad?.whatsapp) {
      return;
    }

    let number =
      ad.whatsapp.replace(
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
        "السلام عليكم، شوفت إعلانك على منصة نيده"
      );

    window.open(
      `https://wa.me/${number}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* =========================================
     UI
  ========================================= */

  return (
    <div className="neida-page">

      <div className="neida-shell">

        {/* =====================================
            Header
        ====================================== */}

        <header className="neida-header">

          <div className="home-header-center">

            <Logo
              size={105}
              className="home-main-logo"
            />

            <div className="location-line">
              <MapPin size={13} />

              <span>
                قرية نيده
              </span>
            </div>

          </div>

        </header>

        {/* =====================================
            Search
        ====================================== */}

        <button
          className="neida-search"
          onClick={() =>
            navigate("/search")
          }
        >
          <Search size={25} />

          <span>
            بتدور على إيه في نيده؟
          </span>
        </button>

        {/* =====================================
            Categories
        ====================================== */}

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

        {/* =====================================
            Sponsored Ads
        ====================================== */}

        <section className="sponsored-section">

          {adsLoading ? (

            <div className="home-ad-skeleton shimmer" />

          ) : activeHomeAd ? (

            <div
              className="sponsored-card real-home-ad"
              key={activeHomeAd.id}
            >

              {/* Ad image */}

              {activeHomeAd.imageBase64 ? (
                <img
                  src={
                    activeHomeAd.imageBase64
                  }
                  alt={
                    activeHomeAd.businessName ||
                    "إعلان"
                  }
                  className="sponsored-real-image"
                />
              ) : (
                <div className="sponsored-placeholder">
                  <Store
                    size={48}
                    strokeWidth={1.5}
                  />
                </div>
              )}

              {/* Overlay */}

              <div className="sponsored-overlay" />

              {/* Badge */}

              <span className="sponsored-badge">
                إعلان ممول
              </span>

              {/* Content */}

              <div className="sponsored-content">

                {activeHomeAd.businessType && (
                  <span className="home-ad-type">
                    {
                      activeHomeAd.businessType
                    }
                  </span>
                )}

                <h2>
                  {
                    activeHomeAd.businessName
                  }
                </h2>

                {activeHomeAd.description && (
                  <p>
                    {
                      activeHomeAd.description
                    }
                  </p>
                )}

                <div className="home-ad-actions">

                  {activeHomeAd.phone && (
                    <a
                      href={
                        `tel:${activeHomeAd.phone}`
                      }
                      className="home-ad-call"
                      onClick={(e) =>
                        e.stopPropagation()
                      }
                    >
                      <Phone size={17} />

                      <span>
                        اتصال
                      </span>
                    </a>
                  )}

                  {activeHomeAd.whatsapp && (
                    <button
                      type="button"
                      className="home-ad-whatsapp"
                      onClick={(e) =>
                        openAdWhatsApp(
                          e,
                          activeHomeAd
                        )
                      }
                    >
                      <MessageCircle
                        size={18}
                      />

                      <span>
                        واتساب
                      </span>
                    </button>
                  )}

                </div>

              </div>

            </div>

          ) : (

            /* No active advertisements */

            <div
              className="sponsored-card advertise-placeholder-card"
              onClick={() =>
                navigate(
                  "/advertise"
                )
              }
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (
                  e.key ===
                    "Enter" ||
                  e.key === " "
                ) {
                  navigate(
                    "/advertise"
                  );
                }
              }}
            >

              <div className="sponsored-placeholder">

                <ShoppingBasket
                  size={50}
                  strokeWidth={1.5}
                />

              </div>

              <div className="sponsored-overlay" />

              <span className="sponsored-badge">
                مساحة إعلانية
              </span>

              <div className="sponsored-content">

                <h2>
                  أعلن هنا
                </h2>

                <p>
                  خلّي نشاطك يظهر
                  لأهل نيده
                </p>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();

                    navigate(
                      "/advertise"
                    );
                  }}
                >
                  أعلن الآن
                </button>

              </div>

            </div>

          )}

          {/* Slider Dots */}

          {homeAds.length > 1 && (
            <div className="slider-dots">

              {homeAds.map(
                (
                  ad,
                  index
                ) => (
                  <button
                    type="button"
                    key={ad.id}
                    aria-label={
                      `الإعلان ${
                        index + 1
                      }`
                    }
                    className={
                      index ===
                      activeAdIndex
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setActiveAdIndex(
                        index
                      )
                    }
                  />
                )
              )}

            </div>
          )}

        </section>

        {/* =====================================
            Recent Craftsmen
        ====================================== */}

        <section className="recent-section">

          <div className="section-header">

            <div>

              <span className="section-eyebrow">
                خدمات أهل البلد
              </span>

              <h2>
                صنايعية مضافين حديثًا
              </h2>

            </div>

            <button
              onClick={() =>
                navigate(
                  "/category/craftsmen"
                )
              }
            >
              عرض الكل

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
                  مفيش صنايعية
                  مضافين لسه
                </p>

                <button
                  onClick={() =>
                    navigate(
                      "/register-service"
                    )
                  }
                >
                  أضف خدمة
                </button>

              </div>

            )}

          </div>

        </section>

        {/* =====================================
            Recent Commercial Shops
        ====================================== */}

        <section className="recent-section commercial-section">

          <div className="section-header">

            <div>

              <span className="section-eyebrow">
                تسوق من بلدك
              </span>

              <h2>
                محلات تجارية مضافة حديثًا
              </h2>

            </div>

            <button
              onClick={() =>
                navigate(
                  "/category/supermarkets"
                )
              }
            >
              عرض الكل

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
                  مفيش محلات مضافة
                  لسه
                </p>

                <button
                  onClick={() =>
                    navigate(
                      "/register-service"
                    )
                  }
                >
                  سجل محلك
                </button>

              </div>

            )}

          </div>

        </section>

        {/* =====================================
            Register Service CTA
        ====================================== */}

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
              عندك محل أو بتقدم خدمة؟
            </h3>

            <p>
              سجّل بياناتك مجانًا
              وظهر لأهل نيده
            </p>

          </div>

          <div className="register-button">

            <Plus size={19} />

            <span>
              سجّل الآن
            </span>

          </div>

        </button>

      </div>

      {/* =====================================
          Bottom Navigation
      ====================================== */}

      <nav className="neida-bottom-nav">

        <button
          className="active"
          onClick={() =>
            navigate("/home")
          }
        >
          <HomeIcon size={23} />

          <span>
            الرئيسية
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
            الأقسام
          </span>
        </button>

        <button
          onClick={() =>
            navigate("/search")
          }
        >
          <Search size={24} />

          <span>
            بحث
          </span>
        </button>

        <button
          onClick={() =>
            navigate("/more")
          }
        >
          <MoreHorizontal
            size={23}
          />

          <span>
            المزيد
          </span>
        </button>

      </nav>

    </div>
  );
}