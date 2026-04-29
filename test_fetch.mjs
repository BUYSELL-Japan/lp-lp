async function check() {
    try {
        const response = await fetch("https://9xylwit7o5.execute-api.ap-southeast-2.amazonaws.com/prod/check-store", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cognito_sub: "19fed438-60f1-70a2-0ad0-b1e1d6899bc1" })
        });
        const text = await response.text();
        console.log("Status:", response.status);
        console.log("Body:", text);
    } catch (e) {
        console.error(e);
    }
}
check();
