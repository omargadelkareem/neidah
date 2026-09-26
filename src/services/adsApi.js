import {
  get,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from "firebase/database";

import { db } from "../firebase/config";

/* =========================================
   Submit ad request
========================================= */

export async function submitAdRequest(form) {
  const requestRef = push(
    ref(db, "adRequests")
  );

  const durationDays =
    Number(form.durationDays) || 7;

  const data = {
    id: requestRef.key,

    businessName:
      form.businessName?.trim() || "",

    ownerName:
      form.ownerName?.trim() || "",

    businessType:
      form.businessType || "",

    phone:
      form.phone?.trim() || "",

    whatsapp:
      form.whatsapp?.trim() || "",

    location: "نيده",

    address:
      form.address?.trim() || "",

    description:
      form.description?.trim() || "",

    imageBase64:
      form.imageBase64 || "",

    placement:
      form.placement || "home_banner",

    placementTitle:
      form.placementTitle || "",

    duration:
      form.duration || "",

    durationDays,

    status: "pending",

    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  await set(requestRef, data);

  return data;
}

/* =========================================
   Listen to ad requests - Admin
========================================= */

export function listenAdRequests(callback) {
  const requestsRef = ref(
    db,
    "adRequests"
  );

  return onValue(
    requestsRef,
    (snapshot) => {
      if (!snapshot.exists()) {
        callback([]);
        return;
      }

      const data = Object.values(
        snapshot.val()
      );

      data.sort(
        (a, b) =>
          (b.createdAt || 0) -
          (a.createdAt || 0)
      );

      callback(data);
    }
  );
}

/* =========================================
   Approve ad
========================================= */

export async function approveAdRequest(
  request
) {
  if (!request?.id) {
    throw new Error(
      "بيانات طلب الإعلان غير صحيحة"
    );
  }

  const now = Date.now();

  const durationDays =
    Number(request.durationDays) || 7;

  const endAt =
    now +
    durationDays *
      24 *
      60 *
      60 *
      1000;

  const adData = {
    ...request,

    status: "approved",

    active: true,

    startAt: now,

    endAt,

    approvedAt: now,

    updatedAt: now,
  };

  await set(
    ref(
      db,
      `ads/${request.id}`
    ),
    adData
  );

  await update(
    ref(
      db,
      `adRequests/${request.id}`
    ),
    {
      status: "approved",
      approvedAt: now,
      updatedAt: now,
    }
  );

  return adData;
}

/* =========================================
   Reject ad request
========================================= */

export async function rejectAdRequest(
  requestId
) {
  if (!requestId) return;

  await update(
    ref(
      db,
      `adRequests/${requestId}`
    ),
    {
      status: "rejected",
      updatedAt: Date.now(),
    }
  );
}

/* =========================================
   Delete ad request
========================================= */

export async function deleteAdRequest(
  requestId
) {
  if (!requestId) return;

  await remove(
    ref(
      db,
      `adRequests/${requestId}`
    )
  );
}

/* =========================================
   Listen to all ads - Admin
========================================= */

export function listenAds(callback) {
  const adsRef = ref(
    db,
    "ads"
  );

  return onValue(
    adsRef,
    (snapshot) => {
      if (!snapshot.exists()) {
        callback([]);
        return;
      }

      const data = Object.values(
        snapshot.val()
      );

      data.sort(
        (a, b) =>
          (b.approvedAt || 0) -
          (a.approvedAt || 0)
      );

      callback(data);
    }
  );
}

/* =========================================
   Toggle ad active
========================================= */

export async function toggleAdActive(
  adId,
  active
) {
  await update(
    ref(
      db,
      `ads/${adId}`
    ),
    {
      active,
      updatedAt: Date.now(),
    }
  );
}

/* =========================================
   Delete ad
========================================= */

export async function deleteAd(adId) {
  if (!adId) return;

  await remove(
    ref(
      db,
      `ads/${adId}`
    )
  );
}

/* =========================================
   Public active ads
========================================= */

export async function getActiveAds(
  placement = null
) {
  const snapshot = await get(
    ref(db, "ads")
  );

  if (!snapshot.exists()) {
    return [];
  }

  const now = Date.now();

  return Object.values(
    snapshot.val()
  )
    .filter((ad) => {
      const isActive =
        ad.active === true;

      const hasStarted =
        !ad.startAt ||
        ad.startAt <= now;

      const hasNotExpired =
        !ad.endAt ||
        ad.endAt >= now;

      const correctPlacement =
        !placement ||
        ad.placement === placement;

      return (
        isActive &&
        hasStarted &&
        hasNotExpired &&
        correctPlacement
      );
    })
    .sort(
      (a, b) =>
        (b.approvedAt || 0) -
        (a.approvedAt || 0)
    );
}