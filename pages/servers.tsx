import { useEffect, useState } from "react";
import { getServers } from "../lib/vultr";

export default function Servers() {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    const fetchServers = async () => {
      const data = await getServers();
      setServers(data.instances);
    };

    fetchServers();
  }, []);

  return (
    <div>
      <h1>My Servers</h1>
      <ul>
        {servers.map((server) => (
          <li key={server.id}>
            {server.label} - {server.status} - {server.region}
          </li>
        ))}
      </ul>
    </div>
  );
}
