import fetch from 'node-fetch';

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
    throw new Error(`Failed to create server. Status: ${response.status}`);
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
    throw new Error(`Failed to fetch servers. Status: ${response.status}`);
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
    throw new Error(`Failed to fetch regions. Status: ${response.status}`);
  }

  const data: VultrRegionResponse = await response.json();
  
  // Ensure 'regions' is present in the response
  if (!data || !data.regions || data.regions.length === 0) {
    throw new Error('No regions data returned from Vultr');
  }

  return data.regions;
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
    throw new Error(`Failed to fetch plans. Status: ${response.status}`);
  }

  const data: VultrPlanResponse = await response.json();
  
  // Ensure plans data is available
  if (!data || !data.plans || data.plans.length === 0) {
    throw new Error('No plans data returned from Vultr');
  }

  return data.plans;
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
    throw new Error(`Failed to fetch OS. Status: ${response.status}`);
  }

  const data: VultrOSResponse = await response.json();
  
  // Ensure OS data is available
  if (!data || !data.os || data.os.length === 0) {
    throw new Error('No OS data returned from Vultr');
  }

  return data.os;
}