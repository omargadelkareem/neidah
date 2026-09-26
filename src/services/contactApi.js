import {
  push,
  ref,
  set,
} from "firebase/database";

import {
  db,
} from "../firebase/config";

export async function submitContactMessage(
  form
) {
  const messageRef =
    push(
      ref(
        db,
        "contactMessages"
      )
    );

  const data = {
    id: messageRef.key,

    name:
      form.name?.trim() || "",

    phone:
      form.phone?.trim() || "",

    type:
      form.type || "other",

    message:
      form.message?.trim() || "",

    location: "نيده",

    status: "new",

    createdAt:
      Date.now(),

    updatedAt:
      Date.now(),
  };

  await set(
    messageRef,
    data
  );

  return data;
}
