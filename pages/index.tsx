import { useState, useEffect } from "react";
import { createServer, getAvailableRegions, getPlans, getOS } from "../lib/vultr";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const [regions, setRegions] = useState([]);
  const [plans, setPlans] = useState([]);
  const [osList, setOsList] = useState([]);
  const [region, setRegion] = useState("");
  const [plan, setPlan] = useState("");
  const [os, setOs] = useState("");
  const [additionalFeatures, setAdditionalFeatures] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const regionData = await getAvailableRegions();
      const planData = await getPlans();
      const osData = await getOS();

      setRegions(regionData);
      setPlans(planData);
      setOsList(osData);
    };

    fetchData();
  }, []);

  const handleCreateServer = async () => {
    if (!region || !plan || !os) {
      alert("Please select all fields");
      return;
    }

    setLoading(true);
    try {
      const data = await createServer(region, plan, os, additionalFeatures);
      console.log("Server created:", data);
    } catch (error) {
      console.error("Error creating server:", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Vultr Server Creation</h1>
      {!session ? (
        <a href="/api/auth/signin">Login with GitHub</a>
      ) : (
        <div>
          <p>Welcome, {session.user.name}</p>

          <div>
            <select onChange={(e) => setRegion(e.target.value)}>
              <option value="">Select Region</option>
              {regions.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select onChange={(e) => setPlan(e.target.value)}>
              <option value="">Select Plan</option>
              {plans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select onChange={(e) => setOs(e.target.value)}>
              <option value="">Select OS</option>
              {osList.map((os) => (
                <option key={os.id} value={os.id}>
                  {os.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <input
              type="checkbox"
              onChange={(e) => setAdditionalFeatures([...additionalFeatures, e.target.value])}
            />
            Additional Feature
          </div>

          <button onClick={handleCreateServer} disabled={loading}>
            {loading ? "Creating..." : "Create Server"}
          </button>
        </div>
      )}
    </div>
  );
}
