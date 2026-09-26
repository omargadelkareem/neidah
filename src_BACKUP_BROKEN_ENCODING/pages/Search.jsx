import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Stethoscope,
  GraduationCap,
  Car,
  SearchX,
} from "lucide-react";

import "../styles/search.css";

/*
  Mock Data
  Later -> Firebase RTDB
*/

const searchData = [
  {
    id: "ahmed-plumber",
    categoryId: "craftsmen",
    name: "Ø£Ø­Ù…Ø¯ Ø§Ù„Ø³Ø¹ÙŠØ¯",
    type: "Ø³Ø¨Ø§Ùƒ",
    keywords: ["Ø³Ø¨Ø§Ùƒ", "Ø³Ø¨Ø§ÙƒØ©", "Ù…ÙˆØ§Ø³ÙŠØ±", "Ø­Ù†ÙÙŠØ§Øª", "ØµÙ†Ø§ÙŠØ¹ÙŠ"],
    location: "Ù†ÙŠØ¯Ù‡",
    workingHours: "8 ØµØ¨Ø§Ø­Ù‹Ø§ - 8 Ù…Ø³Ø§Ø¡Ù‹",
    phone: "01000000000",
    whatsapp: "201000000000",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600",
  },

  {
    id: "mahmoud-electrician",
    categoryId: "craftsmen",
    name: "Ù…Ø­Ù…ÙˆØ¯ Ø¹Ø¨Ø¯ Ø§Ù„Ù„Ù‡",
    type: "ÙƒÙ‡Ø±Ø¨Ø§Ø¦ÙŠ",
    keywords: ["ÙƒÙ‡Ø±Ø¨Ø§Ø¦ÙŠ", "ÙƒÙ‡Ø±Ø¨Ø§Ø¡", "ØµÙŠØ§Ù†Ø©", "ØµÙ†Ø§ÙŠØ¹ÙŠ"],
    location: "Ù†ÙŠØ¯Ù‡",
    workingHours: "8 ØµØ¨Ø§Ø­Ù‹Ø§ - 10 Ù…Ø³Ø§Ø¡Ù‹",
    phone: "01100000000",
    whatsapp: "201100000000",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600",
  },

  {
    id: "pharmacy-1",
    categoryId: "health",
    name: "ØµÙŠØ¯Ù„ÙŠØ© Ø§Ù„Ø´ÙØ§Ø¡",
    type: "ØµÙŠØ¯Ù„ÙŠØ©",
    keywords: ["ØµÙŠØ¯Ù„ÙŠØ©", "Ø¯ÙˆØ§Ø¡", "Ø£Ø¯ÙˆÙŠØ©", "ØµØ­Ø©"],
    location: "Ù†ÙŠØ¯Ù‡ - Ø¨Ø¬ÙˆØ§Ø± Ø§Ù„Ù…Ø³Ø¬Ø¯",
    workingHours: "9 ØµØ¨Ø§Ø­Ù‹Ø§ - 12 Ù…Ø³Ø§Ø¡Ù‹",
    phone: "01200000000",
    whatsapp: "201200000000",
    image:
      "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=600",
  },

  {
    id: "market-1",
    categoryId: "shops",
    name: "Ø³ÙˆØ¨Ø± Ù…Ø§Ø±ÙƒØª Ø§Ù„Ù†ÙˆØ±",
    type: "Ø³ÙˆØ¨Ø± Ù…Ø§Ø±ÙƒØª",
    keywords: ["Ø³ÙˆØ¨Ø± Ù…Ø§Ø±ÙƒØª", "Ø¨Ù‚Ø§Ù„Ø©", "Ù…Ø­Ù„", "Ù…ÙˆØ§Ø¯ ØºØ°Ø§Ø¦ÙŠØ©"],
    location: "Ù†ÙŠØ¯Ù‡ - Ø§Ù„Ø´Ø§Ø±Ø¹ Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠ",
    workingHours: "7 ØµØ¨Ø§Ø­Ù‹Ø§ - 12 Ù…Ø³Ø§Ø¡Ù‹",
    phone: "01500000000",
    whatsapp: "201500000000",
    image:
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600",
  },

  {
    id: "teacher-1",
    categoryId: "education",
    name: "Ø£/ Ù…Ø­Ù…Ø¯ Ø£Ø­Ù…Ø¯",
    type: "Ù…Ø¯Ø±Ø³ Ø±ÙŠØ§Ø¶ÙŠØ§Øª",
    keywords: ["Ù…Ø¯Ø±Ø³", "Ø±ÙŠØ§Ø¶ÙŠØ§Øª", "ØªØ¹Ù„ÙŠÙ…", "Ø¯Ø±ÙˆØ³"],
    location: "Ù†ÙŠØ¯Ù‡",
    workingHours: "4 Ù…Ø³Ø§Ø¡Ù‹ - 10 Ù…Ø³Ø§Ø¡Ù‹",
    phone: "01010000000",
    whatsapp: "201010000000",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600",
  },

  {
    id: "driver-1",
    categoryId: "transport",
    name: "Ø£Ø­Ù…Ø¯ Ø¹Ù„ÙŠ",
    type: "Ø³Ø§Ø¦Ù‚",
    keywords: ["Ø³Ø§Ø¦Ù‚", "Ø³ÙŠØ§Ø±Ø©", "Ù…ÙˆØ§ØµÙ„Ø§Øª", "Ù…Ø´ÙˆØ§Ø±"],
    location: "Ù†ÙŠØ¯Ù‡",
    workingHours: "6 ØµØ¨Ø§Ø­Ù‹Ø§ - 11 Ù…Ø³Ø§Ø¡Ù‹",
    phone: "01020000000",
    whatsapp: "201020000000",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600",
  },
];

const quickSearches = [
  {
    title: "Ø³Ø¨Ø§Ùƒ",
    Icon: Wrench,
  },
  {
    title: "ØµÙŠØ¯Ù„ÙŠØ©",
    Icon: Stethoscope,
  },
  {
    title: "Ø³ÙˆØ¨Ø± Ù…Ø§Ø±ÙƒØª",
    Icon: Store,
  },
  {
    title: "Ù…Ø¯Ø±Ø³",
    Icon: GraduationCap,
  },
  {
    title: "Ø³Ø§Ø¦Ù‚",
    Icon: Car,
  },
];

function normalizeArabic(text = "") {
  return text
    .toLowerCase()
    .trim()
    .replace(/[Ø£Ø¥Ø¢]/g, "Ø§")
    .replace(/Ø©/g, "Ù‡")
    .replace(/Ù‰/g, "ÙŠ")
    .replace(/[Ù‘ÙŽÙ‹ÙÙŒÙÙÙ’Ù€]/g, "");
}

export default function Search() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const cleanQuery = normalizeArabic(query);

    if (!cleanQuery) {
      return [];
    }

    return searchData.filter((item) => {
      const searchableText = normalizeArabic(
        [
          item.name,
          item.type,
          item.location,
          ...(item.keywords || []),
        ].join(" ")
      );

      return searchableText.includes(cleanQuery);
    });
  }, [query]);

  const callPhone = (e, phone) => {
    e.stopPropagation();
    window.location.href = `tel:${phone}`;
  };

  const openWhatsApp = (e, number) => {
    e.stopPropagation();

    window.open(
      `https://wa.me/${number}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="search-page">
      <div className="search-shell">

        {/* Header */}

        <header className="search-header">
          <button
            className="search-back"
            onClick={() => navigate(-1)}
          >
            <ArrowRight size={25} />
          </button>

          <div>
            <h1>Ø§Ù„Ø¨Ø­Ø«</h1>
            <p>Ø¯ÙˆØ± Ø¹Ù„Ù‰ Ø£ÙŠ Ø®Ø¯Ù…Ø© Ø£Ùˆ Ù…ÙƒØ§Ù† ÙÙŠ Ù†ÙŠØ¯Ù‡</p>
          </div>

          <div />
        </header>

        {/* Search input */}

        <div className="main-search-box">
          <SearchIcon size={23} />

          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ø¨ØªØ¯ÙˆØ± Ø¹Ù„Ù‰ Ø¥ÙŠÙ‡ ÙÙŠ Ù†ÙŠØ¯Ù‡ØŸ"
          />

          {query && (
            <button
              className="clear-search"
              onClick={() => setQuery("")}
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Initial State */}

        {!query && (
          <>
            <section className="quick-search-section">
              <span className="search-small-title">
                Ø¨Ø­Ø« Ø³Ø±ÙŠØ¹
              </span>

              <h2>Ø¨ØªØ¯ÙˆØ± Ø¹Ù„Ù‰ Ø¥ÙŠÙ‡ØŸ</h2>

              <div className="quick-search-list">
                {quickSearches.map(({ title, Icon }) => (
                  <button
                    key={title}
                    onClick={() => setQuery(title)}
                  >
                    <span>
                      <Icon size={19} />
                    </span>

                    {title}
                  </button>
                ))}
              </div>
            </section>

            <section className="search-help-card">
              <div className="search-help-icon">
                <SearchIcon size={25} />
              </div>

              <div>
                <h3>Ø§Ø¨Ø­Ø« Ø¨Ø£ÙŠ ÙƒÙ„Ù…Ø©</h3>

                <p>
                  Ø§ÙƒØªØ¨ Ø§Ø³Ù… Ø§Ù„Ø®Ø¯Ù…Ø© Ø£Ùˆ Ø§Ù„Ù†Ø´Ø§Ø· Ø£Ùˆ Ø§Ù„Ø´Ø®Øµ
                  Ø§Ù„Ù„ÙŠ Ø¨ØªØ¯ÙˆØ± Ø¹Ù„ÙŠÙ‡.
                </p>
              </div>
            </section>
          </>
        )}

        {/* Results */}

        {query && (
          <section className="search-results-section">

            <div className="search-results-header">
              <div>
                <span>Ù†ØªØ§Ø¦Ø¬ Ø§Ù„Ø¨Ø­Ø« Ø¹Ù†</span>
                <h2>â€œ{query}â€</h2>
              </div>

              <span className="results-count">
                {results.length} Ù†ØªÙŠØ¬Ø©
              </span>
            </div>

            {results.length > 0 ? (
              <div className="search-results-list">

                {results.map((service) => (
                  <article
                    key={service.id}
                    className="search-result-card"
                    onClick={() =>
                      navigate(`/service/${service.id}`)
                    }
                  >
                    <img
                      src={service.image}
                      alt={service.name}
                    />

                    <div className="search-result-content">
                      <div>
                        <h3>{service.name}</h3>
                        <span>{service.type}</span>
                      </div>

                      <div className="search-result-meta">
                        <p>
                          <MapPin size={14} />
                          {service.location}
                        </p>

                        <p>
                          <Clock size={14} />
                          {service.workingHours}
                        </p>
                      </div>

                      <div className="search-result-actions">
                        <button
                          className="search-call"
                          onClick={(e) =>
                            callPhone(e, service.phone)
                          }
                        >
                          <Phone size={18} />
                          <span>Ø§ØªØµØ§Ù„</span>
                        </button>

                        <button
                          className="search-whatsapp"
                          onClick={(e) =>
                            openWhatsApp(
                              e,
                              service.whatsapp
                            )
                          }
                        >
                          <MessageCircle size={19} />
                          <span>ÙˆØ§ØªØ³Ø§Ø¨</span>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}

              </div>
            ) : (
              <div className="no-search-results">
                <div>
                  <SearchX size={30} />
                </div>

                <h3>Ù…Ù„Ù‚ÙŠÙ†Ø§Ø´ Ù†ØªÙŠØ¬Ø©</h3>

                <p>
                  Ø¬Ø±Ù‘Ø¨ ØªÙƒØªØ¨ ÙƒÙ„Ù…Ø© Ø£Ø¨Ø³Ø· Ø£Ùˆ Ø§Ø³Ù… Ø§Ù„Ø®Ø¯Ù…Ø©
                  Ø¨Ø·Ø±ÙŠÙ‚Ø© Ù…Ø®ØªÙ„ÙØ©.
                </p>
              </div>
            )}

          </section>
        )}

      </div>
    </div>
  );
}
