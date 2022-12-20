import fetch from "node-fetch";
import { toast } from "react-toastify";
import { createProfileUploadSignature } from "../utils/signatureUtils";
import { siteConfig } from "../shared/config";

export async function fetchProfileSettings(address) {
  let form = new FormData();
  const url = `${siteConfig.BACKEND_URL}/api/profile/${address}/settings/`;

  try {
    const { message, signature } = await createProfileUploadSignature();
    form.append("message", message);
    form.append("signature", signature);
  } catch {
    toast.error("Please sign the message to update your settings");
    return null;
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Token ${siteConfig.BACKEND_TOKEN}`,
    },
    body: form,
  });

  if (res.status < 400) {
    const responseJson = await res.json();
    return responseJson;
  } else {
    return null;
  }
}

export async function fetchProfileCollections(address) {
  const url = `${siteConfig.BACKEND_URL}/api/profile/${address}/erc721-collections/`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${siteConfig.BACKEND_TOKEN}`,
    },
  });

  if (res.status < 400) {
    const responseJson = await res.json();
    return responseJson;
  } else {
    return null;
  }
}

export async function fetchCollectionThresholds(address) {
  const url = `${siteConfig.BACKEND_URL}/api/profile/${address}/collection-thresholds/`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${siteConfig.BACKEND_TOKEN}`,
    },
  });

  if (res.status < 400) {
    const responseJson = await res.json();
    return responseJson;
  } else {
    return null;
  }
}

export async function updateProfileSettings(handle: string, form: FormData) {
  const url = `${siteConfig.BACKEND_URL}/api/profile/${handle}/update-profile-settings/`;
  return updateProfile(url, form);
}

export async function updateNotificationSettings(
  handle: string,
  form: FormData
) {
  const url = `${siteConfig.BACKEND_URL}/api/profile/${handle}/update-notification-settings/`;
  return updateProfile(url, form);
}

export async function updateProfile(url: string, form: FormData) {
  try {
    const { message, signature } = await createProfileUploadSignature();
    form.append("message", message);
    form.append("signature", signature);
  } catch {
    toast.error("Please sign the message to update your settings");
    return 401;
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Token ${siteConfig.BACKEND_TOKEN}`,
    },
    body: form,
  });

  if (res.status < 400) {
    toast.success("Successfully saved changes");
    return res.status;
  } else {
    try {
      const responseJson = await res.json();
      if (responseJson.error) {
        toast.error(`Error: ${responseJson.error}`);
      } else {
        toast.error("Error saving changes, please try again later");
        return res.status;
      }
    } catch {
      toast.error("Error saving changes, please try again later");
      return res.status;
    }
  }
}

export async function updateCollectionThresholds(address, thresholds) {
  const url = `${siteConfig.BACKEND_URL}/api/profile/${address}/update-collection-thresholds/`;

  try {
    const { message, signature } = await createProfileUploadSignature();
    thresholds["message"] = message;
    thresholds["signature"] = signature;
  } catch {
    toast.error("Please sign the message to update your settings");
    return null;
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${siteConfig.BACKEND_TOKEN}`,
    },
    body: JSON.stringify(thresholds),
  });

  if (res.status < 400) {
    toast.success("Successfully saved changes");
    return res.status;
  } else {
    try {
      const responseJson = await res.json();
      if (responseJson.error) {
        toast.error(`Error: ${responseJson.error}`);
      } else {
        toast.error("Error saving changes, please try again later");
        return res.status;
      }
    } catch {
      toast.error("Error saving changes, please try again later");
      return res.status;
    }
  }
}
