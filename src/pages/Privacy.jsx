import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  ShieldCheck,
  Database,
  Phone,
  Image,
  LockKeyhole,
  Megaphone,
  MessageCircle,
} from "lucide-react";

import "../styles/infoPages.css";

export default function Privacy() {
  const navigate = useNavigate();

  return (
    <div className="info-page">

      <div className="info-shell">

        <header className="info-header">

          <button
            onClick={() =>
              navigate(-1)
            }
          >
            <ArrowRight size={24} />
          </button>

          <div>
            <span>بياناتك مهمة</span>
            <h1>سياسة الخصوصية</h1>
          </div>

          <div className="info-header-icon">
            <ShieldCheck size={22} />
          </div>

        </header>

        <section className="legal-hero">

          <div>
            <ShieldCheck size={30} />
          </div>

          <h2>
            خصوصيتك جزء مهم من نيده
          </h2>

          <p>
            السياسة دي بتوضح البيانات
            اللي ممكن نجمعها وطريقة
            استخدامها داخل المنصة.
          </p>

        </section>

        <div className="legal-sections">

          <LegalSection
            number="01"
            Icon={Database}
            title="البيانات التي نجمعها"
          >
            عند تسجيل خدمة أو إرسال طلب
            إعلان أو التواصل معنا، قد يتم
            جمع البيانات التي تدخلها بنفسك
            مثل الاسم ورقم الهاتف والواتساب
            والعنوان والصورة ووصف الخدمة.
          </LegalSection>

          <LegalSection
            number="02"
            Icon={Phone}
            title="بيانات التواصل"
          >
            عند تسجيل خدمة، أنت توافق على
            ظهور بيانات التواصل التي قدمتها
            ضمن صفحة الخدمة بعد الموافقة
            عليها، حتى يستطيع مستخدمو نيده
            التواصل معك.
          </LegalSection>

          <LegalSection
            number="03"
            Icon={Image}
            title="الصور والمحتوى"
          >
            الصور والنصوص التي يتم إرسالها
            لتسجيل خدمة أو إعلان تستخدم
            لعرض النشاط أو الخدمة داخل
            المنصة بعد مراجعتها.
          </LegalSection>

          <LegalSection
            number="04"
            Icon={Megaphone}
            title="طلبات الإعلانات"
          >
            بيانات طلب الإعلان تستخدم
            لمراجعة الطلب والتواصل مع صاحب
            النشاط والاتفاق على تفاصيل
            الإعلان قبل نشره.
          </LegalSection>

          <LegalSection
            number="05"
            Icon={MessageCircle}
            title="رسائل التواصل"
          >
            الرسائل المرسلة من صفحة تواصل
            معنا تستخدم للرد على الاستفسارات
            ومراجعة المشكلات والاقتراحات
            المتعلقة بالمنصة.
          </LegalSection>

          <LegalSection
            number="06"
            Icon={LockKeyhole}
            title="حماية البيانات"
          >
            نعمل على اتخاذ إجراءات مناسبة
            لحماية البيانات المستخدمة داخل
            المنصة، ولا نطلب من المستخدمين
            كلمات مرور أو بيانات بنكية
            لتصفح الخدمات العامة.
          </LegalSection>

        </div>

        <div className="legal-note">
          <strong>
            ملاحظة
          </strong>

          <p>
            قد يتم تحديث سياسة الخصوصية
            مستقبلًا عند إضافة خصائص جديدة
            إلى نيده، وسيتم تحديث هذه الصفحة
            عند حدوث ذلك.
          </p>
        </div>

      </div>

    </div>
  );
}

function LegalSection({
  number,
  Icon,
  title,
  children,
}) {
  return (
    <section className="legal-section">

      <div className="legal-number">
        {number}
      </div>

      <div className="legal-content">

        <div className="legal-title">
          <Icon size={19} />
          <h2>{title}</h2>
        </div>

        <p>
          {children}
        </p>

      </div>

    </section>
  );
}
