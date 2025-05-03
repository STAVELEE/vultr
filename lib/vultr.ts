import fetch from 'node-fetch';

// Define a TypeScript interface for the API response
interface VultrRegionResponse {
  regions: Array<{ id: string; name: string }>;
}

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

// Update the return type to the defined interface
export async function getAvailableRegions(): Promise<Array<{ id: string; name: string }>> {
  const response = await fetch(`${VULTR_API_URL}/regions`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${process.env.VULTR_API_KEY}`,
    },
  });

  // Check if response is valid and has 'regions' property
  const data: VultrRegionResponse = await response.json();

  if (!data.regions) {
    throw new Error('Failed to fetch regions');
  }

  return data.regions;  // Accessing 'regions' safely after typing the response
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
