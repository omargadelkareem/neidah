import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  HeartHandshake,
  Search,
  Phone,
  MapPin,
  Store,
  Wrench,
  Megaphone,
  ShieldCheck,
  ChevronLeft,
  Sparkles,
} from "lucide-react";

import "../styles/infoPages.css";
import Logo from "../components/common/Logo";

export default function About() {
  const navigate = useNavigate();

  const features = [
    {
      Icon: Search,
      title: "وصل للخدمة بسرعة",
      description:
        "ابحث عن الخدمة أو النشاط اللي محتاجه وشوف بيانات التواصل بسهولة.",
    },
    {
      Icon: Wrench,
      title: "دعم مقدمي الخدمات",
      description:
        "الصنايعية وأصحاب الخدمات يقدروا يضيفوا بياناتهم مجانًا للمنصة.",
    },
    {
      Icon: Store,
      title: "دليل للأنشطة",
      description:
        "سوبر ماركت وصيدليات وأطباء وخدمات مختلفة في مكان واحد.",
    },
    {
      Icon: Megaphone,
      title: "إعلانات محلية",
      description:
        "أصحاب الأنشطة يقدروا يعلنوا داخل نيده ويوصلوا لجمهور محلي.",
    },
  ];

  return (
    <div className="info-page">
      <div className="info-shell">

        <header className="info-header">
          <button onClick={() => navigate(-1)}>
            <ArrowRight size={24} />
          </button>

          <div>
            <span>منصة نيده</span>
            <h1>عن نيده</h1>
          </div>

          <div className="info-header-icon">
            <HeartHandshake size={22} />
          </div>
        </header>

        <section className="about-hero">

      <div className="about-logo-image">
  <Logo size={105} />
</div>
          <span className="about-label">
            <Sparkles size={14} />
            كل خدمات بلدك في مكان واحد
          </span>

          <h2>نيده</h2>

          <p>
            منصة محلية هدفها تسهّل على أهل نيده
            الوصول للخدمات والأنشطة والأماكن
            والمعلومات المهمة داخل البلد.
          </p>

        </section>

        <section className="info-content-section">

          <div className="info-section-heading">
            <span>فكرتنا</span>
            <h2>ليه عملنا نيده؟</h2>
          </div>

          <div className="info-text-card">
            <p>
              أوقات كتير بنحتاج سباك، كهربائي،
              دكتور، صيدلية، دليفري أو وسيلة
              مواصلات، ونبدأ نسأل الناس عن رقم
              حد نعرفه.
            </p>

            <p>
              نيده بتجمع الخدمات دي في دليل محلي
              بسيط، بحيث تقدر تدخل وتوصل للشخص
              أو النشاط المناسب وتتواصل معاه
              مباشرة.
            </p>
          </div>

        </section>

        <section className="info-content-section">

          <div className="info-section-heading">
            <span>إيه اللي بنقدمه؟</span>
            <h2>منصة معمولة للبلد</h2>
          </div>

          <div className="about-features">

            {features.map(
              ({
                Icon,
                title,
                description,
              }) => (
                <div
                  className="about-feature-card"
                  key={title}
                >
                  <div>
                    <Icon size={21} />
                  </div>

                  <section>
                    <strong>
                      {title}
                    </strong>

                    <p>
                      {description}
                    </p>
                  </section>
                </div>
              )
            )}

          </div>

        </section>

        <section className="about-location-card">

          <div>
            <MapPin size={23} />
          </div>

          <section>
            <span>النطاق الحالي</span>
            <strong>قرية نيده</strong>

            <p>
              المنصة مركزة حاليًا على الخدمات
              والأنشطة المتاحة داخل نيده.
            </p>
          </section>

        </section>

        <section className="about-trust-card">

          <ShieldCheck size={24} />

          <div>
            <strong>
              الخدمات بتخضع للمراجعة
            </strong>

            <p>
              طلبات إضافة الخدمات والإعلانات
              بتتم مراجعتها قبل ظهورها على
              المنصة.
            </p>
          </div>

        </section>

        <button
          className="info-primary-button"
          onClick={() =>
            navigate("/categories")
          }
        >
          تصفح خدمات نيده
          <ChevronLeft size={19} />
        </button>

      </div>
    </div>
  );
}
