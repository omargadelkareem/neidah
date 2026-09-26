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
    title: "ØµÙ†Ø§ÙŠØ¹ÙŠØ©",
    description: "ÙƒÙ„ Ø§Ù„ØµÙ†Ø§ÙŠØ¹ÙŠØ© ÙˆØ§Ù„Ø®Ø¯Ù…Ø§Øª Ø§Ù„ÙÙ†ÙŠØ© ÙÙŠ Ù†ÙŠØ¯Ù‡",
    Icon: Wrench,

    subcategories: [
      { id: "all", title: "Ø§Ù„ÙƒÙ„", Icon: Wrench },

      {
        id: "electrician",
        title: "ÙƒÙ‡Ø±Ø¨Ø§Ø¦ÙŠ",
        specialty: "ÙƒÙ‡Ø±Ø¨Ø§Ø¦ÙŠ",
        Icon: Zap,
      },

      {
        id: "plumber",
        title: "Ø³Ø¨Ø§Ùƒ",
        specialty: "Ø³Ø¨Ø§Ùƒ",
        Icon: Droplets,
      },

      {
        id: "carpenter",
        title: "Ù†Ø¬Ø§Ø±",
        specialty: "Ù†Ø¬Ø§Ø±",
        Icon: Hammer,
      },

      {
        id: "painter",
        title: "Ø¯Ù‡Ø§Ù†",
        specialty: "Ø¯Ù‡Ø§Ù†",
        Icon: PaintRoller,
      },
    ],
  },

  supermarkets: {
  title: "Ø³ÙˆØ¨Ø± Ù…Ø§Ø±ÙƒØª",
  description: "Ø§Ù„Ø³ÙˆØ¨Ø± Ù…Ø§Ø±ÙƒØª ÙˆØ§Ù„Ø¨Ù‚Ø§Ù„Ø© ÙÙŠ Ù†ÙŠØ¯Ù‡",
  Icon: ShoppingBasket,

  subcategories: [
    {
      id: "all",
      title: "Ø§Ù„ÙƒÙ„",
      Icon: ShoppingBasket,
    },
  ],
},

pharmacies: {
  title: "ØµÙŠØ¯Ù„ÙŠØ§Øª",
  description: "Ø§Ù„ØµÙŠØ¯Ù„ÙŠØ§Øª Ø§Ù„Ù…ØªØ§Ø­Ø© ÙÙŠ Ù†ÙŠØ¯Ù‡",
  Icon: Pill,

  subcategories: [
    {
      id: "all",
      title: "Ø§Ù„ÙƒÙ„",
      Icon: Pill,
    },
  ],
},

doctors: {
  title: "Ø£Ø·Ø¨Ø§Ø¡",
  description: "Ø§Ù„Ø£Ø·Ø¨Ø§Ø¡ ÙˆØ§Ù„Ø¹ÙŠØ§Ø¯Ø§Øª ÙÙŠ Ù†ÙŠØ¯Ù‡",
  Icon: Stethoscope,

  subcategories: [
    {
      id: "all",
      title: "Ø§Ù„ÙƒÙ„",
      Icon: Stethoscope,
    },
  ],
},

delivery: {
  title: "ØªÙˆØµÙŠÙ„ Ù„Ù„Ù…Ù†Ø§Ø²Ù„",
  description: "Ø®Ø¯Ù…Ø§Øª Ø§Ù„Ø¯Ù„ÙŠÙØ±ÙŠ ÙˆØ§Ù„ØªÙˆØµÙŠÙ„ Ø¯Ø§Ø®Ù„ Ù†ÙŠØ¯Ù‡",
  Icon: Bike,

  subcategories: [
    {
      id: "all",
      title: "Ø§Ù„ÙƒÙ„",
      Icon: Bike,
    },
  ],
},

  shops: {
    title: "Ù…Ø­Ù„Ø§Øª",
    description: "Ø§Ù„Ù…Ø­Ù„Ø§Øª ÙˆØ§Ù„Ø£Ù†Ø´Ø·Ø© Ø§Ù„ØªØ¬Ø§Ø±ÙŠØ© ÙÙŠ Ù†ÙŠØ¯Ù‡",
    Icon: Store,

    subcategories: [
      {
        id: "all",
        title: "Ø§Ù„ÙƒÙ„",
        Icon: Store,
      },
    ],
  },

  health: {
    title: "ØµØ­Ø©",
    description: "Ø§Ù„Ø£Ø·Ø¨Ø§Ø¡ ÙˆØ§Ù„ØµÙŠØ¯Ù„ÙŠØ§Øª ÙˆØ§Ù„Ø®Ø¯Ù…Ø§Øª Ø§Ù„ØµØ­ÙŠØ© ÙÙŠ Ù†ÙŠØ¯Ù‡",
    Icon: Stethoscope,

    subcategories: [
      {
        id: "all",
        title: "Ø§Ù„ÙƒÙ„",
        Icon: Stethoscope,
      },
    ],
  },

  transport: {
    title: "Ù…ÙˆØ§ØµÙ„Ø§Øª",
    description: "Ø®Ø¯Ù…Ø§Øª Ø§Ù„Ù†Ù‚Ù„ ÙˆØ§Ù„Ù…ÙˆØ§ØµÙ„Ø§Øª ÙÙŠ Ù†ÙŠØ¯Ù‡",
    Icon: Car,

    subcategories: [
      {
        id: "all",
        title: "Ø§Ù„ÙƒÙ„",
        Icon: Car,
      },
    ],
  },

  education: {
    title: "ØªØ¹Ù„ÙŠÙ…",
    description: "Ø§Ù„Ù…Ø¯Ø±Ø³ÙŠÙ† ÙˆØ§Ù„Ù…Ø±Ø§ÙƒØ² Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠØ© ÙÙŠ Ù†ÙŠØ¯Ù‡",
    Icon: GraduationCap,

    subcategories: [
      {
        id: "all",
        title: "Ø§Ù„ÙƒÙ„",
        Icon: GraduationCap,
      },
    ],
  },

  jobs: {
    title: "ÙˆØ¸Ø§Ø¦Ù",
    description: "ÙØ±Øµ Ø§Ù„Ø¹Ù…Ù„ Ø§Ù„Ù…ØªØ§Ø­Ø© Ø¯Ø§Ø®Ù„ Ù†ÙŠØ¯Ù‡",
    Icon: BriefcaseBusiness,

    subcategories: [
      {
        id: "all",
        title: "Ø§Ù„ÙƒÙ„",
        Icon: BriefcaseBusiness,
      },
    ],
  },

  properties: {
    title: "Ø¹Ù‚Ø§Ø±Ø§Øª",
    description: "Ø¹Ù‚Ø§Ø±Ø§Øª Ù„Ù„Ø¨ÙŠØ¹ ÙˆØ§Ù„Ø¥ÙŠØ¬Ø§Ø± Ø¯Ø§Ø®Ù„ Ù†ÙŠØ¯Ù‡",
    Icon: House,

    subcategories: [
      {
        id: "all",
        title: "Ø§Ù„ÙƒÙ„",
        Icon: House,
      },
    ],
  },

  market: {
    title: "Ø§Ù„Ø³ÙˆÙ‚",
    description: "Ø¨ÙŠØ¹ ÙˆØ´Ø±Ø§Ø¡ Ø¯Ø§Ø®Ù„ Ù†ÙŠØ¯Ù‡",
    Icon: ShoppingCart,

    subcategories: [
      {
        id: "all",
        title: "Ø§Ù„ÙƒÙ„",
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
              ? "Ø¬Ø§Ø±ÙŠ Ø§Ù„ØªØ­Ù…ÙŠÙ„..."
              : `${filteredServices.length} Ù†ØªÙŠØ¬Ø©`}
          </span>

          <button>
            <SlidersHorizontal
              size={17}
            />

            Ø§Ù„Ø£Ù‚Ø±Ø¨ Ù„Ùƒ
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
                            "Ø®Ø¯Ù…Ø©"}
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
                    Ù…ÙÙŠØ´ Ù†ØªØ§Ø¦Ø¬ Ù„Ø³Ù‡
                  </h3>

                  <p>
                    Ø§Ù„Ø®Ø¯Ù…Ø§Øª Ø§Ù„Ù…Ø³Ø¬Ù„Ø© ÙÙŠ
                    Ø§Ù„Ù‚Ø³Ù… Ø¯Ù‡ Ù‡ØªØ¸Ù‡Ø± Ù‡Ù†Ø§.
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
