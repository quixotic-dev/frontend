import { toast } from "react-toastify";
import { createCollectionDetailsSignature } from "../utils/signatureUtils";
import { siteConfig } from "../shared/config";

export const fetchLaunchpadContractData = async (data) => {
  const url = `${siteConfig.BACKEND_URL}/launchpad/contract/create/`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${siteConfig.BACKEND_TOKEN}`,
    },
    body: JSON.stringify(data),
  });

  if (res.status < 400) {
    return await res.json();
  } else {
    return null;
  }
};

export const fetchGreenlist = async (address) => {
  const url = `${siteConfig.BACKEND_URL}/launchpad/hosted-collection/${address}/greenlist/`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${siteConfig.BACKEND_TOKEN}`,
    },
  });

  if (res.status < 400) {
    return await res.json();
  } else {
    return null;
  }
};

export const fetchGreenlistSignature = async (
  collectionAddress,
  userAddress
) => {
  const url = `${siteConfig.BACKEND_URL}/launchpad/contract/${collectionAddress}/green-list-mint/?address=${userAddress}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${siteConfig.BACKEND_TOKEN}`,
    },
  });

  if (res.status < 400) {
    return await res.json();
  } else {
    return null;
  }
};

export async function postLaunchpadCollection(
  address,
  src,
  name,
  supply,
  premintPrice,
  premintMax,
  mintPrice,
  mintMax,
  reserveTokens
) {
  const url = `${siteConfig.BACKEND_URL}/launchpad/hosted-collection/`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${siteConfig.BACKEND_TOKEN}`,
    },
    body: JSON.stringify({
      address,
      src,
      name,
      max_supply: supply,
      premint_price: premintPrice,
      mint_price: mintPrice,
      max_per_premint: premintMax,
      max_per_mint: mintMax,
      reserve_tokens: reserveTokens,
    }),
  });
}

export async function fetchLaunchpadCollection(address) {
  const url = `${siteConfig.BACKEND_URL}/launchpad/hosted-collection/${address}/`;
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

export async function fetchRefresehedLaunchpadCollection(address) {
  const url = `${siteConfig.BACKEND_URL}/launchpad/hosted-collection/${address}/refresh/`;
  const res = await fetch(url, {
    method: "PUT",
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

export async function updateCollectionGreenlist(collection, form: FormData) {
  const url = `${siteConfig.BACKEND_URL}/launchpad/hosted-collection/${collection}/update-greenlist/`;

  const { message, signature } = await createCollectionDetailsSignature();
  form.append("message", message);
  form.append("signature", signature);

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
    toast.error("Error updating allowlist (" + res.status + ")");
    return null;
  }
}

export async function generateCollectionMetadata(collection) {
  const url = `${siteConfig.BACKEND_URL}/launchpad/hosted-collection/${collection}/generate-metadata/`;

  const { message, signature } = await createCollectionDetailsSignature();

  const form = new FormData();
  form.append("message", message);
  form.append("signature", signature);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Token ${siteConfig.BACKEND_TOKEN}`,
    },
    body: form,
  });

  if (res.status < 400) {
    return res.status;
  } else {
    toast.error("Error saving changes (" + res.status + ")");
    return res.status;
  }
}

export async function updateCollectionMetadataUri(
  collection,
  uri,
  token,
  extension
) {
  const url = `${
    siteConfig.BACKEND_URL
  }/launchpad/hosted-collection/${collection}/update-metadata-uri/?uri=${uri}&token_id=${String(
    token
  )}&extension=${String(extension)}`;
  await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Token ${siteConfig.BACKEND_TOKEN}`,
    },
  });
}
