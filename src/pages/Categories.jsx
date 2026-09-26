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

    title: "الخدمات والصنايعية",

    subtitle:
      "كل اللي تحتاجه للبيت والمشاوير",

    categories: [
      {
        id: "craftsmen",

        title: "صنايعية",

        description:
          "كل الصنايعية والخدمات المنزلية",

        details: [
          "سباك",
          "كهربائي",
          "تكييف",
          "دش وريسيفر",
          "ثلاجات",
          "غسالات",
        ],

        Icon: Wrench,

        color: "green",
      },

      {
        id: "transport",

        title: "مواصلات",

        description:
          "وسائل المواصلات المتاحة في نيده",

        details: [
          "سيارة خاصة",
          "توك توك",
          "ميكروباص",
          "نقل بضائع",
        ],

        Icon: Car,

        color: "blue",
      },

      {
        id: "delivery",

        title: "توصيل للمنازل",

        description:
          "دليفري لتوصيل طلباتك داخل نيده",

        details: [
          "توصيل طلبات",
        ],

        Icon: Bike,

        color: "yellow",
      },
    ],
  },

  {
    id: "shopping-health",

    title: "التسوق والصحة",

    subtitle:
      "احتياجاتك اليومية والخدمات الطبية",

    categories: [
      {
        id: "supermarkets",

        title: "سوبر ماركت",

        description:
          "السوبر ماركت والبقالة في نيده",

        details: [
          "سوبر ماركت",
          "بقالة",
        ],

        Icon: ShoppingBasket,

        color: "peach",
      },

      {
        id: "pharmacies",

        title: "صيدليات",

        description:
          "الصيدليات وأرقام التواصل",

        details: [
          "صيدليات",
        ],

        Icon: Pill,

        color: "rose",
      },

      {
        id: "doctors",

        title: "أطباء",

        description:
          "الأطباء والعيادات داخل نيده",

        details: [
          "أطباء",
          "عيادات",
        ],

        Icon: Stethoscope,

        color: "cyan",
      },
    ],
  },

  {
    id: "education",

    title: "التعليم",

    subtitle:
      "الخدمات التعليمية داخل نيده",

    categories: [
      {
        id: "education",

        title: "تعليم",

        description:
          "مدرسين ومراكز وخدمات تعليمية",

        details: [
          "مدرس",
          "سنتر",
          "حضانة",
          "تحفيظ قرآن",
        ],

        Icon: GraduationCap,

        color: "mint",
      },
    ],
  },

  {
    id: "guide",

    title: "دليل نيده",

    subtitle:
      "معلومات وأرقام ممكن تحتاجها",

    categories: [
      {
        id: "places",

        title: "أماكن مهمة",

        description:
          "الأماكن المهمة والخدمية في نيده",

        details: [
          "مساجد",
          "مدارس",
          "وحدات خدمية",
          "أماكن عامة",
        ],

        Icon: MapPin,

        color: "sand",
      },

      {
        id: "numbers",

        title: "أرقام مهمة",

        description:
          "أرقام مهمة وسريعة وقت الحاجة",

        details: [
          "طوارئ",
          "خدمات",
          "أرقام محلية",
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
      .replace(/[أإآ]/g, "ا")
      .replace(/ة/g, "ه")
      .replace(/ى/g, "ي")
      .replace(
        /[ًٌٍَُِّْـ]/g,
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
              دليل نيده
            </span>

            <h1>
              كل الأقسام
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

              كل خدمات بلدك
            </span>

            <h2>
              بتدور على إيه؟
            </h2>

            <p>
              اختار القسم وهتلاقي
              الخدمات وأرقام التواصل
              المتاحة في نيده.
            </p>

          </div>

          {!loading && (
            <div className="categories-total">

              <strong>
                {totalServices}
              </strong>

              <small>
                خدمة
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
            placeholder="ابحث عن سباك، صيدلية، دليفري..."
          />

          {searchValue && (
            <button
              onClick={() =>
                setSearchValue("")
              }
            >
              مسح
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
                                        ? "خدمة"
                                        : "خدمات"
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
                                    + المزيد
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
              مفيش قسم بالاسم ده
            </h3>

            <p>
              جرّب تكتب اسم خدمة
              زي سباك، دليفري أو
              صيدلية.
            </p>

            <button
              onClick={() =>
                navigate(
                  "/search"
                )
              }
            >
              البحث في الخدمات
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
            الرئيسية
          </span>

        </button>

        <button className="active">

          <LayoutGrid
            size={22}
          />

          <span>
            الأقسام
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
            بحث
          </span>

        </button>

        <button>

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
