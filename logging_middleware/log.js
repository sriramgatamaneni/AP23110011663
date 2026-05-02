async function Log(stack, level, packageName, message) {

    const validStacks = ["backend", "frontend"];
    const validLevels = ["debug", "info", "warn", "error", "fatal"];
    const validPackages = [
        "cache", "controller", "cron_job", "db", "domain",
        "handler", "repository", "route", "service",
        "auth", "config", "middleware", "utils"
    ];

    if (!validStacks.includes(stack) || !validLevels.includes(level) || !validPackages.includes(packageName)) {
        console.error("Invalid log values");
        return;
    }

    try {
        const response = await fetch("http://20.207.122.201/evaluation-service/logs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzcmlyYW1fZ2F0YW1hbmVuaUBzcm1hcC5lZHUuaW4iLCJleHAiOjE3Nzc3MDIwMTQsImlhdCI6MTc3NzcwMTExNCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImFlOTYwMzdlLTQzOTMtNDcyNC04OGM4LWUwY2RlNWZiOWU5NSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImdhdGFtYW5lbmkgc3JpcmFtIiwic3ViIjoiZDBlNjFlODktNDVjYy00NjI1LThmOWQtNWE2ZDRhODdkYjkxIn0sImVtYWlsIjoic3JpcmFtX2dhdGFtYW5lbmlAc3JtYXAuZWR1LmluIiwibmFtZSI6ImdhdGFtYW5lbmkgc3JpcmFtIiwicm9sbE5vIjoiYXAyMzExMDAxMTY2MyIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6ImQwZTYxZTg5LTQ1Y2MtNDYyNS04ZjlkLTVhNmQ0YTg3ZGI5MSIsImNsaWVudFNlY3JldCI6InVEa1VDR3l2dVNFS3lkZ1cifQ.Qc5TscohFqtIu9aWksqt1-lz1AAbE7YzA3ACr_FStWg"
            },
            body: JSON.stringify({
                stack,
                level,
                package: packageName,
                message
            })
        });

        const data = await response.json();
        console.log("Log created:", data);

    } catch (error) {
        console.error("Logging failed:", error);
    }
}

module.exports = Log;
