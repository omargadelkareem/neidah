import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  Search,
  Wrench,
  Car,
  Bike,
  ShoppingBasket,
  Pill,
  Stethoscope,
  GraduationCap,
  MapPin,
  Phone,
  ChevronLeft,
  Home,
  LayoutGrid,
  MoreHorizontal,
  Sparkles,
} from "lucide-react";

import {
  getApprovedServices,
} from "../services/servicesApi";

import "../styles/categories.css";

/* =========================================
   Categories Configuration
========================================= */

const categoryGroups = [
  {
    id: "services",

    title: "Ø§Ù„Ø®Ø¯Ù…Ø§Øª ÙˆØ§Ù„ØµÙ†Ø§ÙŠØ¹ÙŠØ©",

    subtitle:
      "ÙƒÙ„ Ø§Ù„Ù„ÙŠ ØªØ­ØªØ§Ø¬Ù‡ Ù„Ù„Ø¨ÙŠØª ÙˆØ§Ù„Ù…Ø´Ø§ÙˆÙŠØ±",

    categories: [
      {
        id: "craftsmen",

        title: "ØµÙ†Ø§ÙŠØ¹ÙŠØ©",

        description:
          "ÙƒÙ„ Ø§Ù„ØµÙ†Ø§ÙŠØ¹ÙŠØ© ÙˆØ§Ù„Ø®Ø¯Ù…Ø§Øª Ø§Ù„Ù…Ù†Ø²Ù„ÙŠØ©",

        details: [
          "Ø³Ø¨Ø§Ùƒ",
          "ÙƒÙ‡Ø±Ø¨Ø§Ø¦ÙŠ",
          "ØªÙƒÙŠÙŠÙ",
          "Ø¯Ø´ ÙˆØ±ÙŠØ³ÙŠÙØ±",
          "Ø«Ù„Ø§Ø¬Ø§Øª",
          "ØºØ³Ø§Ù„Ø§Øª",
        ],

        Icon: Wrench,

        color: "green",
      },

      {
        id: "transport",

        title: "Ù…ÙˆØ§ØµÙ„Ø§Øª",

        description:
          "ÙˆØ³Ø§Ø¦Ù„ Ø§Ù„Ù…ÙˆØ§ØµÙ„Ø§Øª Ø§Ù„Ù…ØªØ§Ø­Ø© ÙÙŠ Ù†ÙŠØ¯Ù‡",

        details: [
          "Ø³ÙŠØ§Ø±Ø© Ø®Ø§ØµØ©",
          "ØªÙˆÙƒ ØªÙˆÙƒ",
          "Ù…ÙŠÙƒØ±ÙˆØ¨Ø§Øµ",
          "Ù†Ù‚Ù„ Ø¨Ø¶Ø§Ø¦Ø¹",
        ],

        Icon: Car,

        color: "blue",
      },

      {
        id: "delivery",

        title: "ØªÙˆØµÙŠÙ„ Ù„Ù„Ù…Ù†Ø§Ø²Ù„",

        description:
          "Ø¯Ù„ÙŠÙØ±ÙŠ Ù„ØªÙˆØµÙŠÙ„ Ø·Ù„Ø¨Ø§ØªÙƒ Ø¯Ø§Ø®Ù„ Ù†ÙŠØ¯Ù‡",

        details: [
          "ØªÙˆØµÙŠÙ„ Ø·Ù„Ø¨Ø§Øª",
        ],

        Icon: Bike,

        color: "yellow",
      },
    ],
  },

  {
    id: "shopping-health",

    title: "Ø§Ù„ØªØ³ÙˆÙ‚ ÙˆØ§Ù„ØµØ­Ø©",

    subtitle:
      "Ø§Ø­ØªÙŠØ§Ø¬Ø§ØªÙƒ Ø§Ù„ÙŠÙˆÙ…ÙŠØ© ÙˆØ§Ù„Ø®Ø¯Ù…Ø§Øª Ø§Ù„Ø·Ø¨ÙŠØ©",

    categories: [
      {
        id: "supermarkets",

        title: "Ø³ÙˆØ¨Ø± Ù…Ø§Ø±ÙƒØª",

        description:
          "Ø§Ù„Ø³ÙˆØ¨Ø± Ù…Ø§Ø±ÙƒØª ÙˆØ§Ù„Ø¨Ù‚Ø§Ù„Ø© ÙÙŠ Ù†ÙŠØ¯Ù‡",

        details: [
          "Ø³ÙˆØ¨Ø± Ù…Ø§Ø±ÙƒØª",
          "Ø¨Ù‚Ø§Ù„Ø©",
        ],

        Icon: ShoppingBasket,

        color: "peach",
      },

      {
        id: "pharmacies",

        title: "ØµÙŠØ¯Ù„ÙŠØ§Øª",

        description:
          "Ø§Ù„ØµÙŠØ¯Ù„ÙŠØ§Øª ÙˆØ£Ø±Ù‚Ø§Ù… Ø§Ù„ØªÙˆØ§ØµÙ„",

        details: [
          "ØµÙŠØ¯Ù„ÙŠØ§Øª",
        ],

        Icon: Pill,

        color: "rose",
      },

      {
        id: "doctors",

        title: "Ø£Ø·Ø¨Ø§Ø¡",

        description:
          "Ø§Ù„Ø£Ø·Ø¨Ø§Ø¡ ÙˆØ§Ù„Ø¹ÙŠØ§Ø¯Ø§Øª Ø¯Ø§Ø®Ù„ Ù†ÙŠØ¯Ù‡",

        details: [
          "Ø£Ø·Ø¨Ø§Ø¡",
          "Ø¹ÙŠØ§Ø¯Ø§Øª",
        ],

        Icon: Stethoscope,

        color: "cyan",
      },
    ],
  },

  {
    id: "education",

    title: "Ø§Ù„ØªØ¹Ù„ÙŠÙ…",

    subtitle:
      "Ø§Ù„Ø®Ø¯Ù…Ø§Øª Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠØ© Ø¯Ø§Ø®Ù„ Ù†ÙŠØ¯Ù‡",

    categories: [
      {
        id: "education",

        title: "ØªØ¹Ù„ÙŠÙ…",

        description:
          "Ù…Ø¯Ø±Ø³ÙŠÙ† ÙˆÙ…Ø±Ø§ÙƒØ² ÙˆØ®Ø¯Ù…Ø§Øª ØªØ¹Ù„ÙŠÙ…ÙŠØ©",

        details: [
          "Ù…Ø¯Ø±Ø³",
          "Ø³Ù†ØªØ±",
          "Ø­Ø¶Ø§Ù†Ø©",
          "ØªØ­ÙÙŠØ¸ Ù‚Ø±Ø¢Ù†",
        ],

        Icon: GraduationCap,

        color: "mint",
      },
    ],
  },

  {
    id: "guide",

    title: "Ø¯Ù„ÙŠÙ„ Ù†ÙŠØ¯Ù‡",

    subtitle:
      "Ù…Ø¹Ù„ÙˆÙ…Ø§Øª ÙˆØ£Ø±Ù‚Ø§Ù… Ù…Ù…ÙƒÙ† ØªØ­ØªØ§Ø¬Ù‡Ø§",

    categories: [
      {
        id: "places",

        title: "Ø£Ù…Ø§ÙƒÙ† Ù…Ù‡Ù…Ø©",

        description:
          "Ø§Ù„Ø£Ù…Ø§ÙƒÙ† Ø§Ù„Ù…Ù‡Ù…Ø© ÙˆØ§Ù„Ø®Ø¯Ù…ÙŠØ© ÙÙŠ Ù†ÙŠØ¯Ù‡",

        details: [
          "Ù…Ø³Ø§Ø¬Ø¯",
          "Ù…Ø¯Ø§Ø±Ø³",
          "ÙˆØ­Ø¯Ø§Øª Ø®Ø¯Ù…ÙŠØ©",
          "Ø£Ù…Ø§ÙƒÙ† Ø¹Ø§Ù…Ø©",
        ],

        Icon: MapPin,

        color: "sand",
      },

      {
        id: "numbers",

        title: "Ø£Ø±Ù‚Ø§Ù… Ù…Ù‡Ù…Ø©",

        description:
          "Ø£Ø±Ù‚Ø§Ù… Ù…Ù‡Ù…Ø© ÙˆØ³Ø±ÙŠØ¹Ø© ÙˆÙ‚Øª Ø§Ù„Ø­Ø§Ø¬Ø©",

        details: [
          "Ø·ÙˆØ§Ø±Ø¦",
          "Ø®Ø¯Ù…Ø§Øª",
          "Ø£Ø±Ù‚Ø§Ù… Ù…Ø­Ù„ÙŠØ©",
        ],

        Icon: Phone,

        color: "green",
      },
    ],
  },
];

/* =========================================
   Skeleton
========================================= */

function CategorySkeleton() {
  return (
    <div className="all-category-skeleton">

      <div className="category-skeleton-icon shimmer" />

      <div className="category-skeleton-content">

        <div className="category-skeleton-title shimmer" />

        <div className="category-skeleton-line shimmer" />

        <div className="category-skeleton-tags">

          <span className="shimmer" />

          <span className="shimmer" />

          <span className="shimmer" />

        </div>

      </div>

    </div>
  );
}

/* =========================================
   Categories
========================================= */

export default function Categories() {
  const navigate =
    useNavigate();

  const [services, setServices] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [searchValue, setSearchValue] =
    useState("");

  /* =========================================
     Firebase
  ========================================= */

  useEffect(() => {
    let mounted = true;

    const loadServices =
      async () => {
        try {
          setLoading(true);

          const data =
            await getApprovedServices();

          if (mounted) {
            setServices(
              data || []
            );
          }

        } catch (error) {
          console.error(
            "CATEGORIES ERROR:",
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
     Category Counts
  ========================================= */

  const categoryCounts =
    useMemo(() => {
      const counts = {};

      services.forEach(
        (service) => {
          const id =
            service.categoryId;

          if (!id) {
            return;
          }

          counts[id] =
            (counts[id] || 0) +
            1;
        }
      );

      return counts;

    }, [services]);

  /* =========================================
     Search
  ========================================= */

  const normalizeArabic = (
    text = ""
  ) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[Ø£Ø¥Ø¢]/g, "Ø§")
      .replace(/Ø©/g, "Ù‡")
      .replace(/Ù‰/g, "ÙŠ")
      .replace(
        /[Ù‘ÙŽÙ‹ÙÙŒÙÙÙ’Ù€]/g,
        ""
      );
  };

  const filteredGroups =
    useMemo(() => {
      const search =
        normalizeArabic(
          searchValue
        );

      if (!search) {
        return categoryGroups;
      }

      return categoryGroups
        .map((group) => {
          const categories =
            group.categories.filter(
              (category) => {
                const searchable =
                  normalizeArabic(
                    [
                      category.title,
                      category.description,
                      ...category.details,
                    ].join(" ")
                  );

                return searchable.includes(
                  search
                );
              }
            );

          return {
            ...group,
            categories,
          };
        })
        .filter(
          (group) =>
            group.categories
              .length > 0
        );

    }, [searchValue]);

  /* =========================================
     Total
  ========================================= */

  const totalServices =
    services.length;

  /* =========================================
     UI
  ========================================= */

  return (
    <div className="all-categories-page">

      <div className="all-categories-shell">

        {/* Header */}

        <header className="categories-header">

          <button
            onClick={() =>
              navigate(-1)
            }
          >
            <ArrowRight
              size={24}
            />
          </button>

          <div>

            <span>
              Ø¯Ù„ÙŠÙ„ Ù†ÙŠØ¯Ù‡
            </span>

            <h1>
              ÙƒÙ„ Ø§Ù„Ø£Ù‚Ø³Ø§Ù…
            </h1>

          </div>

          <div className="categories-header-logo">

            <LayoutGrid
              size={22}
            />

          </div>

        </header>

        {/* Intro */}

        <section className="categories-intro">

          <div>

            <span>
              <Sparkles
                size={15}
              />

              ÙƒÙ„ Ø®Ø¯Ù…Ø§Øª Ø¨Ù„Ø¯Ùƒ
            </span>

            <h2>
              Ø¨ØªØ¯ÙˆØ± Ø¹Ù„Ù‰ Ø¥ÙŠÙ‡ØŸ
            </h2>

            <p>
              Ø§Ø®ØªØ§Ø± Ø§Ù„Ù‚Ø³Ù… ÙˆÙ‡ØªÙ„Ø§Ù‚ÙŠ
              Ø§Ù„Ø®Ø¯Ù…Ø§Øª ÙˆØ£Ø±Ù‚Ø§Ù… Ø§Ù„ØªÙˆØ§ØµÙ„
              Ø§Ù„Ù…ØªØ§Ø­Ø© ÙÙŠ Ù†ÙŠØ¯Ù‡.
            </p>

          </div>

          {!loading && (
            <div className="categories-total">

              <strong>
                {totalServices}
              </strong>

              <small>
                Ø®Ø¯Ù…Ø©
              </small>

            </div>
          )}

        </section>

        {/* Search */}

        <div className="categories-search">

          <Search
            size={21}
          />

          <input
            value={
              searchValue
            }
            onChange={(e) =>
              setSearchValue(
                e.target.value
              )
            }
            placeholder="Ø§Ø¨Ø­Ø« Ø¹Ù† Ø³Ø¨Ø§ÙƒØŒ ØµÙŠØ¯Ù„ÙŠØ©ØŒ Ø¯Ù„ÙŠÙØ±ÙŠ..."
          />

          {searchValue && (
            <button
              onClick={() =>
                setSearchValue("")
              }
            >
              Ù…Ø³Ø­
            </button>
          )}

        </div>

        {/* Loading */}

        {loading ? (

          <div className="categories-loading">

            <CategorySkeleton />
            <CategorySkeleton />
            <CategorySkeleton />
            <CategorySkeleton />

          </div>

        ) : filteredGroups.length >
          0 ? (

          <div className="category-groups">

            {filteredGroups.map(
              (
                group,
                groupIndex
              ) => (

                <section
                  key={
                    group.id
                  }
                  className="category-group"
                >

                  <div className="category-group-heading">

                    <h2>
                      {group.title}
                    </h2>

                    <p>
                      {
                        group.subtitle
                      }
                    </p>

                  </div>

                  <div className="category-list">

                    {group.categories.map(
                      (
                        category,
                        index
                      ) => {

                        const Icon =
                          category.Icon;

                        const count =
                          categoryCounts[
                            category.id
                          ] || 0;

                        return (
                          <button
                            key={
                              category.id
                            }
                            className="all-category-card category-enter"
                            style={{
                              "--category-delay":
                                `${
                                  (
                                    groupIndex *
                                    2 +
                                    index
                                  ) * 55
                                }ms`,
                            }}
                            onClick={() =>
                              navigate(
                                `/category/${category.id}`
                              )
                            }
                          >

                            <div
                              className={
                                `all-category-icon ${category.color}`
                              }
                            >

                              <Icon
                                size={26}
                                strokeWidth={
                                  1.8
                                }
                              />

                            </div>

                            <div className="all-category-content">

                              <div className="category-card-top">

                                <h3>
                                  {
                                    category.title
                                  }
                                </h3>

                                {count >
                                  0 && (
                                  <span>
                                    {
                                      count
                                    }{" "}
                                    {
                                      count ===
                                      1
                                        ? "Ø®Ø¯Ù…Ø©"
                                        : "Ø®Ø¯Ù…Ø§Øª"
                                    }
                                  </span>
                                )}

                              </div>

                              <p>
                                {
                                  category.description
                                }
                              </p>

                              <div className="category-detail-tags">

                                {category.details
                                  .slice(
                                    0,
                                    4
                                  )
                                  .map(
                                    (
                                      detail
                                    ) => (
                                      <span
                                        key={
                                          detail
                                        }
                                      >
                                        {
                                          detail
                                        }
                                      </span>
                                    )
                                  )}

                                {category
                                  .details
                                  .length >
                                  4 && (
                                  <span>
                                    + Ø§Ù„Ù…Ø²ÙŠØ¯
                                  </span>
                                )}

                              </div>

                            </div>

                            <ChevronLeft
                              className="category-arrow"
                              size={19}
                            />

                          </button>
                        );
                      }
                    )}

                  </div>

                </section>
              )
            )}

          </div>

        ) : (

          <div className="categories-no-results">

            <Search
              size={29}
            />

            <h3>
              Ù…ÙÙŠØ´ Ù‚Ø³Ù… Ø¨Ø§Ù„Ø§Ø³Ù… Ø¯Ù‡
            </h3>

            <p>
              Ø¬Ø±Ù‘Ø¨ ØªÙƒØªØ¨ Ø§Ø³Ù… Ø®Ø¯Ù…Ø©
              Ø²ÙŠ Ø³Ø¨Ø§ÙƒØŒ Ø¯Ù„ÙŠÙØ±ÙŠ Ø£Ùˆ
              ØµÙŠØ¯Ù„ÙŠØ©.
            </p>

            <button
              onClick={() =>
                navigate(
                  "/search"
                )
              }
            >
              Ø§Ù„Ø¨Ø­Ø« ÙÙŠ Ø§Ù„Ø®Ø¯Ù…Ø§Øª
            </button>

          </div>

        )}

      </div>

      {/* Bottom Nav */}

      <nav className="categories-bottom-nav">

        <button
          onClick={() =>
            navigate("/home")
          }
        >

          <Home size={22} />

          <span>
            Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©
          </span>

        </button>

        <button className="active">

          <LayoutGrid
            size={22}
          />

          <span>
            Ø§Ù„Ø£Ù‚Ø³Ø§Ù…
          </span>

        </button>

        <button
          onClick={() =>
            navigate("/search")
          }
        >

          <Search
            size={22}
          />

          <span>
            Ø¨Ø­Ø«
          </span>

        </button>

        <button>

          <MoreHorizontal
            size={23}
          />

          <span>
            Ø§Ù„Ù…Ø²ÙŠØ¯
          </span>

        </button>

      </nav>

    </div>
  );
}
