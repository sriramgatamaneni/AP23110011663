async function getNotifications() {
    const res = await fetch("http://20.207.122.201/evaluation-service/notifications", {
        headers: {
            "Authorization": "Bearer Token"
        }
    });
    return (await res.json()).notifications;
}

function priority(n) {
    if (n.Type === "Placement") return 3;
    if (n.Type === "Result") return 2;
    return 1;
}

async function main() {
    const data = await getNotifications();

    const sorted = data.sort((a, b) => {
        return priority(b) - priority(a) ||
               new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    console.log(sorted.slice(0, 10));
}

main();
