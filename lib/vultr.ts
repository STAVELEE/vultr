import fetch from 'node-fetch';  // 최신 fetch 사용법

const VULTR_API_URL = "https://api.vultr.com/v2";

export async function createServer(region: string, plan: string, os: string, additional_features: any) {
  const response = await fetch(`${VULTR_API_URL}/instances`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.VULTR_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      region,
      plan,
      os,
      label: "My New Server",
      additional_features,
    }),
  });

  const data = await response.json();
  return data;
}

export async function getServers() {
  const response = await fetch(`${VULTR_API_URL}/instances`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${process.env.VULTR_API_KEY}`,
    },
  });

  const data = await response.json();
  return data;
}

export async function getAvailableRegions() {
  const response = await fetch(`${VULTR_API_URL}/regions`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${process.env.VULTR_API_KEY}`,
    },
  });
  const data = await response.json();
  return data.regions;
}

export async function getPlans() {
  const response = await fetch(`${VULTR_API_URL}/plans`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${process.env.VULTR_API_KEY}`,
    },
  });

  const data = await response.json();
  return data.plans;
}

export async function getOS() {
  const response = await fetch(`${VULTR_API_URL}/os`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${process.env.VULTR_API_KEY}`,
    },
  });

  const data = await response.json();
  return data.os;
}