import {
  ref,
  get,
  set,
  update,
  remove,
  onValue,
} from "firebase/database";

import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  auth,
  db,
} from "../firebase/config";

/* =========================
   AUTH
========================= */

export async function adminLogin(
  email,
  password
) {
  const credential =
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  return credential.user;
}

export async function adminLogout() {
  await signOut(auth);
}

/* =========================
   LIVE REQUESTS
========================= */

export function listenToPendingRequests(
  callback
) {
  const requestsRef = ref(
    db,
    "serviceRequests"
  );

  return onValue(
    requestsRef,
    (snapshot) => {
      if (!snapshot.exists()) {
        callback([]);
        return;
      }

      const data =
        Object.values(snapshot.val())
          .filter(
            (item) =>
              item.status === "pending"
          )
          .sort(
            (a, b) =>
              b.createdAt - a.createdAt
          );

      callback(data);
    }
  );
}

/* =========================
   APPROVE REQUEST
========================= */

export async function approveRequest(
  requestId
) {
  const requestRef = ref(
    db,
    `serviceRequests/${requestId}`
  );

  const snapshot =
    await get(requestRef);

  if (!snapshot.exists()) {
    throw new Error(
      "Request not found"
    );
  }

  const requestData =
    snapshot.val();

  const serviceData = {
    ...requestData,

    status: "approved",

    approvedAt: Date.now(),

    updatedAt: Date.now(),
  };

  delete serviceData.consent;

  await set(
    ref(
      db,
      `services/${requestId}`
    ),
    serviceData
  );

  await update(
    requestRef,
    {
      status: "approved",
      approvedAt: Date.now(),
      updatedAt: Date.now(),
    }
  );

  return serviceData;
}

/* =========================
   REJECT REQUEST
========================= */

export async function rejectRequest(
  requestId
) {
  await update(
    ref(
      db,
      `serviceRequests/${requestId}`
    ),
    {
      status: "rejected",
      rejectedAt: Date.now(),
      updatedAt: Date.now(),
    }
  );
}

/* =========================
   DELETE REQUEST
========================= */

export async function deleteRequest(
  requestId
) {
  await remove(
    ref(
      db,
      `serviceRequests/${requestId}`
    )
  );
}
