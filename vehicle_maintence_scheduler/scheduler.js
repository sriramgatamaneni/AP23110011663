const fetch = require('node-fetch');

async function getData() {
    const depotsRes = await fetch("http://20.207.122.201/evaluation-service/depots");
    const depots = await depotsRes.json();

    const vehiclesRes = await fetch("http://20.207.122.201/evaluation-service/vehicles", {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzcmlyYW1fZ2F0YW1hbmVuaUBzcm1hcC5lZHUuaW4iLCJleHAiOjE3Nzc3MDIwMTQsImlhdCI6MTc3NzcwMTExNCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImFlOTYwMzdlLTQzOTMtNDcyNC04OGM4LWUwY2RlNWZiOWU5NSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImdhdGFtYW5lbmkgc3JpcmFtIiwic3ViIjoiZDBlNjFlODktNDVjYy00NjI1LThmOWQtNWE2ZDRhODdkYjkxIn0sImVtYWlsIjoic3JpcmFtX2dhdGFtYW5lbmlAc3JtYXAuZWR1LmluIiwibmFtZSI6ImdhdGFtYW5lbmkgc3JpcmFtIiwicm9sbE5vIjoiYXAyMzExMDAxMTY2MyIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6ImQwZTYxZTg5LTQ1Y2MtNDYyNS04ZjlkLTVhNmQ0YTg3ZGI5MSIsImNsaWVudFNlY3JldCI6InVEa1VDR3l2dVNFS3lkZ1cifQ.Qc5TscohFqtIu9aWksqt1-lz1AAbE7YzA3ACr_FStWg"
        }
    });
    const vehicles = await vehiclesRes.json();

    return { depots: depots.depots, vehicles: vehicles.vehicles };
}

function knapsack(vehicles, maxHours) {
    const n = vehicles.length;
    const dp = Array(n + 1).fill().map(() => Array(maxHours + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        const { Duration, Impact } = vehicles[i - 1];

        for (let w = 0; w <= maxHours; w++) {
            if (Duration <= w) {
                dp[i][w] = Math.max(
                    Impact + dp[i - 1][w - Duration],
                    dp[i - 1][w]
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    return dp[n][maxHours];
}

async function main() {
    const { depots, vehicles } = await getData();

    depots.forEach(depot => {
        const maxImpact = knapsack(vehicles, depot.MechanicHours);
        console.log(`Depot ${depot.ID} → Max Impact: ${maxImpact}`);
    });
}

main();
