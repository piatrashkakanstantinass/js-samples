const passwordField = document.querySelector("#password");
const confirmPasswordField = document.querySelector("#confirm-password");

function setPasswordMatch() {
    if (passwordField.value === confirmPasswordField.value) {
        passwordField.classList.remove("wrong");
        passwordField.setCustomValidity("");
    } else {
        passwordField.classList.add("wrong");
        passwordField.setCustomValidity("Passwords do not match");
    }
}

passwordField.addEventListener("change", setPasswordMatch);
confirmPasswordField.addEventListener("change", setPasswordMatch);
passwordField.addEventListener("keyup", setPasswordMatch);
confirmPasswordField.addEventListener("keyup", setPasswordMatch);