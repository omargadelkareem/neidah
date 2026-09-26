import {
  push,
  ref,
  set,
} from "firebase/database";

import {
  db,
} from "../firebase/config";

import {
  compressImageToBase64,
} from "../utils/imageUtils";

/* =========================================
   Submit Advertisement Request
========================================= */

export async function submitAdRequest(
  form
) {
  let imageBase64 = "";

  if (form.image) {
    imageBase64 =
      await compressImageToBase64(
        form.image,
        900,
        0.68
      );
  }

  const requestRef =
    push(
      ref(
        db,
        "adRequests"
      )
    );

  const data = {
    id: requestRef.key,

    businessName:
      form.businessName
        ?.trim() || "",

    ownerName:
      form.ownerName
        ?.trim() || "",

    businessType:
      form.businessType || "",

    phone:
      form.phone
        ?.trim() || "",

    whatsapp:
      form.whatsapp
        ?.trim() || "",

    location: "Ù†ÙŠØ¯Ù‡",

    address:
      form.address
        ?.trim() || "",

    description:
      form.description
        ?.trim() || "",

    imageBase64,

    placement:
      form.placement ||
      "home_banner",

    placementTitle:
      form.placementTitle ||
      "",

    duration:
      form.duration ||
      "7_days",

    durationDays:
      form.durationDays ||
      7,

    status: "pending",

    createdAt:
      Date.now(),

    updatedAt:
      Date.now(),
  };

  await set(
    requestRef,
    data
  );

  return data;
}
