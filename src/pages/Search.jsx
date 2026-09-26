import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  ArrowRight,
  Search as SearchIcon,
  X,
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Wrench,
  Store,
  Pill,
  GraduationCap,
  Car,
  SearchX,
  ImageOff,
} from "lucide-react";

import {
  getApprovedServices,
} from "../services/servicesApi";

import "../styles/search.css";

/* =========================================
   Quick Searches
========================================= */

const quickSearches = [
  {
    title: "سباك",
    Icon: Wrench,
  },
  {
    title: "صيدلية",
    Icon: Pill,
  },
  {
    title: "سوبر ماركت",
    Icon: Store,
  },
  {
    title: "مدرس",
    Icon: GraduationCap,
  },
  {
    title: "سائق",
    Icon: Car,
  },
];

/* =========================================
   Normalize Arabic
========================================= */

function normalizeArabic(
  text = ""
) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/[ًٌٍَُِّْـ]/g, "");
}

/* =========================================
   Get Service Type
========================================= */

function getServiceType(
  service
) {
  return (
    service.specialty ||
    service.profession ||
    service.type ||
    service.title ||
    getCategoryTitle(
      service.categoryId
    ) ||
    "خدمة"
  );
}

/* =========================================
   Category Arabic Name
========================================= */

function getCategoryTitle(
  categoryId
) {
  const categories = {
    craftsmen: "صنايعية",

    supermarkets:
      "سوبر ماركت",

    pharmacies:
      "صيدلية",

    doctors:
      "طبيب",

    transport:
      "مواصلات",

    delivery:
      "توصيل للمنازل",

    education:
      "تعليم",

    shops:
      "محل",
  };

  return (
    categories[categoryId] ||
    ""
  );
}

/* =========================================
   Image Component
========================================= */

function SearchServiceImage({
  service,
}) {
  const [
    imageError,
    setImageError,
  ] = useState(false);

  const [
    loaded,
    setLoaded,
  ] = useState(false);

  const image =
    service.imageBase64 ||
    service.image ||
    "";

  if (!image || imageError) {
    return (
      <div className="search-image-placeholder">
        <ImageOff size={23} />

        <strong>
          {service.name
            ?.charAt(0)}
        </strong>
      </div>
    );
  }

  return (
    <div className="search-image-wrapper">

      {!loaded && (
        <div className="search-image-loading" />
      )}

      <img
        src={image}
        alt={
          service.name ||
          "خدمة"
        }
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
          setImageError(true)
        }
      />

    </div>
  );
}

/* =========================================
   Search Page
========================================= */

export default function Search() {
  const navigate =
    useNavigate();

  const [
    query,
    setQuery,
  ] = useState("");

  const [
    services,
    setServices,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  /* =========================================
     Load Firebase Services
  ========================================= */

  useEffect(() => {
    let mounted = true;

    const loadServices =
      async () => {
        try {
          setLoading(true);
          setError("");

          const data =
            await getApprovedServices();

          if (!mounted) {
            return;
          }

          setServices(
            Array.isArray(data)
              ? data
              : []
          );
        } catch (err) {
          console.error(
            "SEARCH SERVICES ERROR:",
            err
          );

          if (mounted) {
            setServices([]);

            setError(
              "حصلت مشكلة أثناء تحميل الخدمات."
            );
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
     Search Results
  ========================================= */

  const results =
    useMemo(() => {
      const cleanQuery =
        normalizeArabic(
          query
        );

      if (!cleanQuery) {
        return [];
      }

      return services
        .filter((service) => {
          const keywords =
            Array.isArray(
              service.keywords
            )
              ? service.keywords
              : typeof service.keywords ===
                  "string"
                ? [
                    service.keywords,
                  ]
                : [];

          const searchableText =
            normalizeArabic(
              [
                service.name,

                service.specialty,

                service.profession,

                service.type,

                service.title,

                service.description,

                service.location,

                service.address,

                service.workingHours,

                getCategoryTitle(
                  service.categoryId
                ),

                ...keywords,
              ]
                .filter(Boolean)
                .join(" ")
            );

          return searchableText.includes(
            cleanQuery
          );
        })
        .sort(
          (a, b) =>
            (b.approvedAt ||
              b.createdAt ||
              0) -
            (a.approvedAt ||
              a.createdAt ||
              0)
        );
    }, [
      query,
      services,
    ]);

  /* =========================================
     Call
  ========================================= */

  const callPhone = (
    e,
    phone
  ) => {
    e.stopPropagation();

    if (!phone) {
      return;
    }

    window.location.href =
      `tel:${phone}`;
  };

  /* =========================================
     WhatsApp
  ========================================= */

  const openWhatsApp = (
    e,
    number
  ) => {
    e.stopPropagation();

    if (!number) {
      return;
    }

    let cleanNumber =
      String(number).replace(
        /\D/g,
        ""
      );

    if (
      cleanNumber.startsWith(
        "0"
      )
    ) {
      cleanNumber =
        `20${cleanNumber.slice(
          1
        )}`;
    }

    const message =
      encodeURIComponent(
        "السلام عليكم، وصلت لبياناتك من منصة نيده"
      );

    window.open(
      `https://wa.me/${cleanNumber}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* =========================================
     UI
  ========================================= */

  return (
    <div className="search-page">

      <div className="search-shell">

        {/* =====================================
            Header
        ====================================== */}

        <header className="search-header">

          <button
            className="search-back"
            onClick={() =>
              navigate(-1)
            }
            aria-label="رجوع"
          >
            <ArrowRight
              size={25}
            />
          </button>

          <div>
            <h1>
              البحث
            </h1>

            <p>
              دور على أي خدمة
              أو مكان في نيده
            </p>
          </div>

          <div />

        </header>

        {/* =====================================
            Search Input
        ====================================== */}

        <div className="main-search-box">

          <SearchIcon
            size={23}
          />

          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) =>
              setQuery(
                e.target.value
              )
            }
            placeholder="بتدور على إيه في نيده؟"
            autoComplete="off"
          />

          {query && (
            <button
              type="button"
              className="clear-search"
              onClick={() =>
                setQuery("")
              }
              aria-label="مسح البحث"
            >
              <X size={18} />
            </button>
          )}

        </div>

        {/* =====================================
            Firebase Loading
        ====================================== */}

        {loading && (
          <div className="search-loading">

            <div className="search-loading-icon">
              <SearchIcon
                size={25}
              />
            </div>

            <p>
              جاري تحميل خدمات
              نيده...
            </p>

          </div>
        )}

        {/* =====================================
            Firebase Error
        ====================================== */}

        {!loading &&
          error && (
            <div className="search-error">

              <SearchX
                size={27}
              />

              <p>
                {error}
              </p>

            </div>
          )}

        {/* =====================================
            Initial State
        ====================================== */}

        {!loading &&
          !error &&
          !query && (
            <>

              <section className="quick-search-section">

                <span className="search-small-title">
                  بحث سريع
                </span>

                <h2>
                  بتدور على إيه؟
                </h2>

                <div className="quick-search-list">

                  {quickSearches.map(
                    ({
                      title,
                      Icon,
                    }) => (
                      <button
                        key={
                          title
                        }
                        onClick={() =>
                          setQuery(
                            title
                          )
                        }
                      >
                        <span>
                          <Icon
                            size={
                              19
                            }
                          />
                        </span>

                        {title}
                      </button>
                    )
                  )}

                </div>

              </section>

              <section className="search-help-card">

                <div className="search-help-icon">

                  <SearchIcon
                    size={25}
                  />

                </div>

                <div>

                  <h3>
                    ابحث بأي كلمة
                  </h3>

                  <p>
                    اكتب اسم الخدمة
                    أو النشاط أو
                    الشخص اللي بتدور
                    عليه.
                  </p>

                </div>

              </section>

            </>
          )}

        {/* =====================================
            Results
        ====================================== */}

        {!loading &&
          !error &&
          query && (
            <section className="search-results-section">

              <div className="search-results-header">

                <div>

                  <span>
                    نتائج البحث عن
                  </span>

                  <h2>
                    “{query}”
                  </h2>

                </div>

                <span className="results-count">
                  {results.length}{" "}
                  نتيجة
                </span>

              </div>

              {/* =================================
                  Has Results
              ================================== */}

              {results.length >
              0 ? (

                <div className="search-results-list">

                  {results.map(
                    (
                      service
                    ) => (
                      <article
                        key={
                          service.id
                        }
                        className="search-result-card"
                        onClick={() =>
                          navigate(
                            `/service/${service.id}`
                          )
                        }
                      >

                        {/* Image */}

                        <SearchServiceImage
                          service={
                            service
                          }
                        />

                        {/* Content */}

                        <div className="search-result-content">

                          <div className="search-result-main">

                            <h3>
                              {
                                service.name
                              }
                            </h3>

                            <span>
                              {getServiceType(
                                service
                              )}
                            </span>

                          </div>

                          {/* Meta */}

                          <div className="search-result-meta">

                            <p>
                              <MapPin
                                size={
                                  14
                                }
                              />

                              {service.address ||
                                service.location ||
                                "نيده"}
                            </p>

                            {service.workingHours && (
                              <p>
                                <Clock
                                  size={
                                    14
                                  }
                                />

                                {
                                  service.workingHours
                                }
                              </p>
                            )}

                          </div>

                          {/* Actions */}

                          <div className="search-result-actions">

                            {service.phone && (
                              <button
                                type="button"
                                className="search-call"
                                onClick={(
                                  e
                                ) =>
                                  callPhone(
                                    e,
                                    service.phone
                                  )
                                }
                              >
                                <Phone
                                  size={
                                    18
                                  }
                                />

                                <span>
                                  اتصال
                                </span>
                              </button>
                            )}

                            {service.whatsapp && (
                              <button
                                type="button"
                                className="search-whatsapp"
                                onClick={(
                                  e
                                ) =>
                                  openWhatsApp(
                                    e,
                                    service.whatsapp
                                  )
                                }
                              >
                                <MessageCircle
                                  size={
                                    19
                                  }
                                />

                                <span>
                                  واتساب
                                </span>
                              </button>
                            )}

                          </div>

                        </div>

                      </article>
                    )
                  )}

                </div>

              ) : (

                /* ===============================
                   No Results
                ================================ */

                <div className="no-search-results">

                  <div>
                    <SearchX
                      size={30}
                    />
                  </div>

                  <h3>
                    ملقيناش نتيجة
                  </h3>

                  <p>
                    جرّب تكتب كلمة
                    أبسط أو اسم الخدمة
                    بطريقة مختلفة.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      setQuery("")
                    }
                  >
                    مسح البحث
                  </button>

                </div>

              )}

            </section>
          )}

      </div>

    </div>
  );
}