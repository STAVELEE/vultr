import fetch from 'node-fetch';  // 최신 fetch 사용법

// Define interfaces for API responses to ensure type safety
interface VultrRegionResponse {
  regions: Array<{ id: string; name: string }>;
}

interface VultrPlanResponse {
  plans: Array<{ id: string; name: string }>;
}

interface VultrOSResponse {
  os: Array<{ id: string; name: string }>;
}

const VULTR_API_URL = "https://api.vultr.com/v2";

// Create server - uses Vultr API
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

  if (!response.ok) {
    throw new Error("Failed to create server");
  }

  const data = await response.json();
  return data;
}

// Get list of servers - uses Vultr API
export async function getServers() {
  const response = await fetch(`${VULTR_API_URL}/instances`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${process.env.VULTR_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch servers");
  }

  const data = await response.json();
  return data;
}

// Get available regions - uses Vultr API
export async function getAvailableRegions(): Promise<Array<{ id: string; name: string }>> {
  const response = await fetch(`${VULTR_API_URL}/regions`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${process.env.VULTR_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch regions");
  }

  const data: VultrRegionResponse = await response.json();
  return data.regions;  // Safe access to 'regions'
}

// Get available plans - uses Vultr API
export async function getPlans(): Promise<Array<{ id: string; name: string }>> {
  const response = await fetch(`${VULTR_API_URL}/plans`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${process.env.VULTR_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch plans");
  }

  const data: VultrPlanResponse = await response.json();
  return data.plans;  // Safe access to 'plans'
}

// Get available OS - uses Vultr API
export async function getOS(): Promise<Array<{ id: string; name: string }>> {
  const response = await fetch(`${VULTR_API_URL}/os`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${process.env.VULTR_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch OS");
  }

  const data: VultrOSResponse = await response.json();
  return data.os;  // Safe access to 'os'
}
