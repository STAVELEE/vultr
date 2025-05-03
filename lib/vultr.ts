import fetch from 'node-fetch';

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
  } as RequestInit);  // RequestInit 타입 명시

  const data = await response.json();
  return data;
}
