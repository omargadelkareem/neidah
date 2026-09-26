import {
  ref,
  push,
  set,
  get,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";

import { db } from "../firebase/config";

import {
  compressImageToBase64,
} from "../utils/imageUtils";

/* ==============================
   Submit service request
============================== */

export async function submitServiceRequest({
  categoryId,
  form,
}) {
  let imageBase64 = "";

  if (form.image) {
    imageBase64 =
      await compressImageToBase64(
        form.image,
        700,
        0.65
      );
  }

  const requestRef = push(
    ref(db, "serviceRequests")
  );

  const data = {
    id: requestRef.key,

    categoryId,

    specialty:
      form.specialty || "",

    name:
      form.name.trim(),

    phone:
      form.phone.trim(),

    whatsapp:
      form.whatsapp?.trim() || "",

    location: "نيده",

    address:
      form.address?.trim() || "",

    workingHours:
      form.workingHours?.trim() || "",

    description:
      form.description?.trim() || "",

    imageBase64,

    status: "pending",

    createdAt: Date.now(),

    updatedAt: Date.now(),
  };

  await set(
    requestRef,
    data
  );

  return data;
}

/* ==============================
   Approved services
============================== */

export async function getApprovedServices() {
  const servicesQuery = query(
    ref(db, "services"),
    orderByChild("status"),
    equalTo("approved")
  );

  const snapshot =
    await get(servicesQuery);

  if (!snapshot.exists()) {
    return [];
  }

  return Object.values(
    snapshot.val()
  );
}

/* ==============================
   Service Details
============================== */

export async function getServiceById(
  serviceId
) {
  const snapshot = await get(
    ref(
      db,
      `services/${serviceId}`
    )
  );

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.val();
}

/* ==============================
   Category
============================== */

export async function getServicesByCategory(
  categoryId
) {
  const snapshot = await get(
    ref(db, "services")
  );

  if (!snapshot.exists()) {
    return [];
  }

  return Object.values(
    snapshot.val()
  ).filter(
    (service) =>
      service.status === "approved" &&
      service.categoryId === categoryId
  );
}
