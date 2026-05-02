async function getNotifications() {
    const res = await fetch("http://20.207.122.201/evaluation-service/notifications", {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzcmlyYW1fZ2F0YW1hbmVuaUBzcm1hcC5lZHUuaW4iLCJleHAiOjE3Nzc3MDY3MjMsImlhdCI6MTc3NzcwNTgyMywiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjBkYjUyMGEwLTFjOGQtNDlhMy04YzIyLTVmOGRlNWJkN2M4NyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImdhdGFtYW5lbmkgc3JpcmFtIiwic3ViIjoiZDBlNjFlODktNDVjYy00NjI1LThmOWQtNWE2ZDRhODdkYjkxIn0sImVtYWlsIjoic3JpcmFtX2dhdGFtYW5lbmlAc3JtYXAuZWR1LmluIiwibmFtZSI6ImdhdGFtYW5lbmkgc3JpcmFtIiwicm9sbE5vIjoiYXAyMzExMDAxMTY2MyIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6ImQwZTYxZTg5LTQ1Y2MtNDYyNS04ZjlkLTVhNmQ0YTg3ZGI5MSIsImNsaWVudFNlY3JldCI6InVEa1VDR3l2dVNFS3lkZ1cifQ.Y7WV1H4EXesfT4HGDrh150GJcurDmSNS3zZGQjW03h0"
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
