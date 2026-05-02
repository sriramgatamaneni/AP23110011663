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
                "Authorization": "Bearer Token"
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
