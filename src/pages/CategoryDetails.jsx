import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  ArrowRight,
  Search,
  SlidersHorizontal,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Wrench,
  Zap,
  ShoppingBasket,
Pill,
Bike,
  Droplets,
  Hammer,
  PaintRoller,
  Store,
  Stethoscope,
  Car,
  GraduationCap,
  BriefcaseBusiness,
  House,
  ShoppingCart,
  ImageOff,
} from "lucide-react";

import {
  getServicesByCategory,
} from "../services/servicesApi";

import "../styles/categoryDetails.css";

/* ==============================
   Category Configuration
============================== */

const categoryConfig = {
  craftsmen: {
    title: "صنايعية",
    description: "كل الصنايعية والخدمات الفنية في نيده",
    Icon: Wrench,

    subcategories: [
      { id: "all", title: "الكل", Icon: Wrench },

      {
        id: "electrician",
        title: "كهربائي",
        specialty: "كهربائي",
        Icon: Zap,
      },

      {
        id: "plumber",
        title: "سباك",
        specialty: "سباك",
        Icon: Droplets,
      },

      {
        id: "carpenter",
        title: "نجار",
        specialty: "نجار",
        Icon: Hammer,
      },

      {
        id: "painter",
        title: "دهان",
        specialty: "دهان",
        Icon: PaintRoller,
      },
    ],
  },

  supermarkets: {
  title: "سوبر ماركت",
  description: "السوبر ماركت والبقالة في نيده",
  Icon: ShoppingBasket,

  subcategories: [
    {
      id: "all",
      title: "الكل",
      Icon: ShoppingBasket,
    },
  ],
},

pharmacies: {
  title: "صيدليات",
  description: "الصيدليات المتاحة في نيده",
  Icon: Pill,

  subcategories: [
    {
      id: "all",
      title: "الكل",
      Icon: Pill,
    },
  ],
},

doctors: {
  title: "أطباء",
  description: "الأطباء والعيادات في نيده",
  Icon: Stethoscope,

  subcategories: [
    {
      id: "all",
      title: "الكل",
      Icon: Stethoscope,
    },
  ],
},

delivery: {
  title: "توصيل للمنازل",
  description: "خدمات الدليفري والتوصيل داخل نيده",
  Icon: Bike,

  subcategories: [
    {
      id: "all",
      title: "الكل",
      Icon: Bike,
    },
  ],
},

  shops: {
    title: "محلات",
    description: "المحلات والأنشطة التجارية في نيده",
    Icon: Store,

    subcategories: [
      {
        id: "all",
        title: "الكل",
        Icon: Store,
      },
    ],
  },

  health: {
    title: "صحة",
    description: "الأطباء والصيدليات والخدمات الصحية في نيده",
    Icon: Stethoscope,

    subcategories: [
      {
        id: "all",
        title: "الكل",
        Icon: Stethoscope,
      },
    ],
  },

  transport: {
    title: "مواصلات",
    description: "خدمات النقل والمواصلات في نيده",
    Icon: Car,

    subcategories: [
      {
        id: "all",
        title: "الكل",
        Icon: Car,
      },
    ],
  },

  education: {
    title: "تعليم",
    description: "المدرسين والمراكز التعليمية في نيده",
    Icon: GraduationCap,

    subcategories: [
      {
        id: "all",
        title: "الكل",
        Icon: GraduationCap,
      },
    ],
  },

  jobs: {
    title: "وظائف",
    description: "فرص العمل المتاحة داخل نيده",
    Icon: BriefcaseBusiness,

    subcategories: [
      {
        id: "all",
        title: "الكل",
        Icon: BriefcaseBusiness,
      },
    ],
  },

  properties: {
    title: "عقارات",
    description: "عقارات للبيع والإيجار داخل نيده",
    Icon: House,

    subcategories: [
      {
        id: "all",
        title: "الكل",
        Icon: House,
      },
    ],
  },

  market: {
    title: "السوق",
    description: "بيع وشراء داخل نيده",
    Icon: ShoppingCart,

    subcategories: [
      {
        id: "all",
        title: "الكل",
        Icon: ShoppingCart,
      },
    ],
  },
};

/* ==============================
   Shimmer Card
============================== */

function ServiceCardSkeleton() {
  return (
    <div className="service-skeleton">
      <div className="skeleton-image shimmer" />

      <div className="skeleton-content">
        <div className="skeleton-line skeleton-title shimmer" />

        <div className="skeleton-line skeleton-small shimmer" />

        <div className="skeleton-meta">
          <div className="skeleton-line shimmer" />
          <div className="skeleton-line shimmer" />
        </div>

        <div className="skeleton-buttons">
          <div className="shimmer" />
          <div className="shimmer" />
        </div>
      </div>
    </div>
  );
}

/* ==============================
   Service Image
============================== */

function ServiceImage({ service }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const image =
    service.imageBase64 ||
    service.image ||
    "";

  if (!image || imageError) {
    return (
      <div className="category-service-image-placeholder">
        <ImageOff size={25} />

        <span>
          {service.name?.charAt(0)}
        </span>
      </div>
    );
  }

  return (
    <div className="category-service-image-wrapper">
      {!imageLoaded && (
        <div className="service-image-loading shimmer" />
      )}

      <img
        src={image}
        alt={service.name}
        loading="lazy"
        className={
          imageLoaded
            ? "service-image-loaded"
            : ""
        }
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
      />
    </div>
  );
}

/* ==============================
   Page
============================== */

export default function CategoryDetails() {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const scrollRef = useRef(null);

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedSubcategory, setSelectedSubcategory] =
    useState("all");

  const category =
    categoryConfig[categoryId] ||
    categoryConfig.craftsmen;

  /* ==============================
     Firebase
  ============================== */

  useEffect(() => {
    let mounted = true;

    const loadServices = async () => {
      try {
        setLoading(true);

        const data =
          await getServicesByCategory(
            categoryId
          );

        if (!mounted) return;

        console.log(
          "CATEGORY SERVICES:",
          data
        );

        setServices(data || []);
      } catch (error) {
        console.error(
          "LOAD SERVICES ERROR:",
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
  }, [categoryId]);

  /* ==============================
     Filter
  ============================== */

  const filteredServices = useMemo(() => {
    if (selectedSubcategory === "all") {
      return services;
    }

    const selected =
      category.subcategories.find(
        (item) =>
          item.id === selectedSubcategory
      );

    if (!selected) {
      return services;
    }

    return services.filter((service) => {
      if (service.subcategoryId) {
        return (
          service.subcategoryId ===
          selectedSubcategory
        );
      }

      return (
        service.specialty ===
        selected.specialty
      );
    });
  }, [
    services,
    selectedSubcategory,
    category,
  ]);

  /* ==============================
     Category Change
  ============================== */

  const changeSubcategory = (id) => {
    setSelectedSubcategory(id);

    requestAnimationFrame(() => {
      scrollRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  /* ==============================
     Actions
  ============================== */

  const callPhone = (e, phone) => {
    e.stopPropagation();

    if (!phone) return;

    window.location.href =
      `tel:${phone}`;
  };

  const openWhatsApp = (
    e,
    number
  ) => {
    e.stopPropagation();

    if (!number) return;

    let cleanNumber =
      number.replace(/\D/g, "");

    /*
      Convert Egyptian local number:
      010xxxxxxxx
      ->
      2010xxxxxxxx
    */

    if (
      cleanNumber.startsWith("0")
    ) {
      cleanNumber =
        `20${cleanNumber.slice(1)}`;
    }

    window.open(
      `https://wa.me/${cleanNumber}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="category-page">
      <div className="category-shell">

        {/* Header */}

        <header className="category-header">

          <button
            className="category-back"
            onClick={() =>
              navigate(-1)
            }
          >
            <ArrowRight size={25} />
          </button>

          <div className="category-heading">
            <h1>
              {category.title}
            </h1>

            <p>
              {category.description}
            </p>
          </div>

          <button
            className="category-search"
            onClick={() =>
              navigate("/search")
            }
          >
            <Search size={24} />
          </button>

        </header>

        {/* Subcategories */}

        <div className="subcategory-scroll">

          {category.subcategories.map(
            ({
              id,
              title,
              Icon,
            }) => {
              const active =
                selectedSubcategory ===
                id;

              return (
                <button
                  key={id}
                  className={
                    `subcategory-item ${
                      active
                        ? "active"
                        : ""
                    }`
                  }
                  onClick={() =>
                    changeSubcategory(id)
                  }
                >
                  <span>
                    <Icon size={23} />
                  </span>

                  <small>
                    {title}
                  </small>
                </button>
              );
            }
          )}

        </div>

        {/* Anchor */}

        <div
          ref={scrollRef}
          className="category-scroll-anchor"
        />

        {/* Toolbar */}

        <div className="category-toolbar">

          <span>
            {loading
              ? "جاري التحميل..."
              : `${filteredServices.length} نتيجة`}
          </span>

          <button>
            <SlidersHorizontal
              size={17}
            />

            الأقرب لك
          </button>

        </div>

        {/* Services */}

        <div className="category-services">

          {loading ? (
            <>
              <ServiceCardSkeleton />
              <ServiceCardSkeleton />
              <ServiceCardSkeleton />
            </>
          ) : (
            <>
              {filteredServices.map(
                (service, index) => (
                  <article
                    key={service.id}
                    className="category-service-card service-card-enter"
                    style={{
                      "--delay":
                        `${index * 70}ms`,
                    }}
                    onClick={() =>
                      navigate(
                        `/service/${service.id}`
                      )
                    }
                  >

                    <ServiceImage
                      service={service}
                    />

                    <div className="category-service-content">

                      <div>
                        <h2>
                          {service.name}
                        </h2>

                        <span className="profession">
                          {service.specialty ||
                            service.profession ||
                            "خدمة"}
                        </span>
                      </div>

                      <div className="service-meta">

                        {(service.address ||
                          service.location) && (
                          <p>
                            <MapPin
                              size={15}
                            />

                            {service.address ||
                              service.location}
                          </p>
                        )}

                        {service.workingHours && (
                          <p>
                            <Clock
                              size={15}
                            />

                            {
                              service.workingHours
                            }
                          </p>
                        )}

                      </div>

                      <div className="category-service-actions">

                        {service.phone && (
                          <button
                            className="service-call"
                            onClick={(e) =>
                              callPhone(
                                e,
                                service.phone
                              )
                            }
                          >
                            <Phone
                              size={19}
                            />
                          </button>
                        )}

                        {service.whatsapp && (
                          <button
                            className="service-whatsapp"
                            onClick={(e) =>
                              openWhatsApp(
                                e,
                                service.whatsapp
                              )
                            }
                          >
                            <MessageCircle
                              size={20}
                            />
                          </button>
                        )}

                      </div>

                    </div>

                  </article>
                )
              )}

              {filteredServices.length ===
                0 && (
                <div className="empty-services">

                  <div>
                    <Search size={29} />
                  </div>

                  <h3>
                    مفيش نتائج لسه
                  </h3>

                  <p>
                    الخدمات المسجلة في
                    القسم ده هتظهر هنا.
                  </p>

                </div>
              )}
            </>
          )}

        </div>

      </div>
    </div>
  );
}
