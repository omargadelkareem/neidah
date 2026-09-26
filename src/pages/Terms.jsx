import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  FileText,
  UserCheck,
  ShieldCheck,
  Phone,
  Megaphone,
  AlertTriangle,
  Scale,
} from "lucide-react";

import "../styles/infoPages.css";

export default function Terms() {
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
            <span>استخدام المنصة</span>
            <h1>الشروط والأحكام</h1>
          </div>

          <div className="info-header-icon">
            <FileText size={22} />
          </div>

        </header>

        <section className="legal-hero terms">

          <div>
            <Scale size={29} />
          </div>

          <h2>
            استخدام نيده ببساطة ووضوح
          </h2>

          <p>
            باستخدام المنصة أو إضافة خدمة
            أو إرسال إعلان، فأنت توافق على
            الشروط الموضحة في هذه الصفحة.
          </p>

        </section>

        <div className="legal-sections">

          <LegalSection
            number="01"
            Icon={UserCheck}
            title="استخدام المنصة"
          >
            نيده دليل محلي يساعد المستخدمين
            في الوصول إلى بيانات الخدمات
            والأنشطة والتواصل معها. استخدام
            المنصة يجب أن يكون لأغراض قانونية
            ومشروعة.
          </LegalSection>

          <LegalSection
            number="02"
            Icon={ShieldCheck}
            title="تسجيل الخدمات"
          >
            الشخص الذي يرسل طلب تسجيل خدمة
            مسؤول عن صحة البيانات التي
            يقدمها، ويجب ألا يضيف بيانات أو
            صورًا لا يملك الحق في استخدامها.
            يحق لإدارة نيده قبول أو رفض أو
            تعديل ظهور أي طلب قبل نشره.
          </LegalSection>

          <LegalSection
            number="03"
            Icon={Phone}
            title="التواصل مع مقدمي الخدمات"
          >
            نيده تسهّل الوصول إلى مقدم
            الخدمة لكنها ليست طرفًا في
            الاتفاق أو المعاملة التي تتم
            بين المستخدم ومقدم الخدمة.
            يُنصح بالتأكد من تفاصيل الخدمة
            والسعر قبل الاتفاق.
          </LegalSection>

          <LegalSection
            number="04"
            Icon={Megaphone}
            title="الإعلانات"
          >
            إرسال طلب إعلان لا يعني نشره
            تلقائيًا. يتم مراجعة الإعلان
            والتواصل مع صاحب الطلب لتأكيد
            المكان والمدة والتكلفة قبل
            النشر.
          </LegalSection>

          <LegalSection
            number="05"
            Icon={AlertTriangle}
            title="المحتوى المخالف"
          >
            يحق لإدارة نيده إزالة أي خدمة
            أو إعلان أو محتوى يحتوي على
            معلومات مضللة أو غير صحيحة أو
            مخالفة، أو عند تلقي بلاغ يستدعي
            المراجعة.
          </LegalSection>

          <LegalSection
            number="06"
            Icon={FileText}
            title="تحديث الشروط"
          >
            قد يتم تعديل هذه الشروط عند
            تطوير المنصة أو إضافة خدمات
            وخصائص جديدة، وتعتبر النسخة
            المنشورة داخل هذه الصفحة هي
            النسخة الحالية.
          </LegalSection>

        </div>

        <div className="legal-note">
          <strong>
            استخدامك لنيده
          </strong>

          <p>
            استمرار استخدام المنصة يعني
            موافقتك على الشروط والسياسات
            المعروضة داخلها.
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
