const typeSelect = document.getElementById("type");
const extraField = document.getElementById("extraField");
const extraLabel = document.getElementById("extraLabel");
const extraInput = document.getElementById("extraInput");

typeSelect.addEventListener("change", () => {

    extraField.classList.remove("hidden");

    if (typeSelect.value === "student") {
        extraLabel.textContent = "Student I#";
        extraInput.value = "";
    }
    else if (typeSelect.value === "guest") {
        extraLabel.textContent = "Access Code";
        extraInput.value = "";
    }
});

document.getElementById("ticketForm").addEventListener("submit", function(e) {

    e.preventDefault();

    const errors = [];

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const type = document.getElementById("type").value;
    const date = document.getElementById("date").value;
    const extraValue = extraInput.value.trim();

    const errorDiv = document.getElementById("errors");
    const ticketDiv = document.getElementById("ticket");

    errorDiv.innerHTML = "";
    ticketDiv.innerHTML = "";

    if (firstName === "") {
        errors.push("First name is required");
    }

    if (lastName === "") {
        errors.push("Last name is required");
    }

    if (email === "") {
        errors.push("Email is required");
    }

    if (type === "") {
        errors.push("Please select a type");
    }

    if (date === "") {
        errors.push("Please select a date");
    } else {
        const selectedDate = new Date(date);
        const today = new Date();

        today.setHours(0,0,0,0);

        if (selectedDate <= today) {
            errors.push("Event date must be later than today");
        }
    }

    if (type === "student") {
        if (!/^\d{9}$/.test(extraValue)) {
            errors.push("Student I# must be 9 digits");
        }
    }

    if (type === "guest") {
        if (extraValue !== "EVENT131") {
            errors.push("Access Code must be EVENT131");
        }
    }

    if (errors.length > 0) {

        let html = "<div class='error'>";

        errors.forEach(error => {
            html += `<p>${error}</p>`;
        });

        html += "</div>";

        errorDiv.innerHTML = html;

        return;
    }

    ticketDiv.innerHTML = `
        <h2>Ticket Created</h2>
        <p>${firstName} ${lastName}</p>
        <p>${type}</p>
        <p>${date}</p>
    `;
});