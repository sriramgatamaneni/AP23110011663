const fetch = require('node-fetch');

async function getData() {
    const depotsRes = await fetch("http://20.207.122.201/evaluation-service/depots");
    const depots = await depotsRes.json();

    const vehiclesRes = await fetch("http://20.207.122.201/evaluation-service/vehicles", {
        headers: {
            "Authorization": "Bearer Token"
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
