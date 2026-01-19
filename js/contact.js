// Google Forms Integration Logic

document.addEventListener('DOMContentLoaded', function () {

    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const btnText = document.getElementById('btn-text');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const emailInput = document.getElementById('email').value;

            // Simple robust regex for email syntax validation
            const validateEmail = (email) => {
                return String(email)
                    .toLowerCase()
                    .match(
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                    );
            };

            if (!validateEmail(emailInput)) {
                formStatus.textContent = "❌ Please enter a valid email address.";
                formStatus.style.color = "#ff4444";
                return;
            }

            // Set loading state
            btnText.textContent = "Sending...";
            formStatus.textContent = "";
            formStatus.style.color = "#ccc";

            // Google Form Action URL
            const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfELyrTPvf3ycsCsqo4t4gD0rGsi7lop6npeqpBThLtRFAvzw/formResponse';

            // Prepare Form Data (Entry IDs extracted from the specific Google Form)
            const formData = new FormData();
            formData.append('entry.1113746019', document.getElementById('name').value); // Name
            formData.append('entry.343821432', document.getElementById('email').value); // Email
            formData.append('entry.580033173', document.getElementById('message').value); // Message

            // Submit using fetch in no-cors mode
            // NOTE: 'no-cors' means we won't get a readable response (status 0),
            // but the form will still be submitted. We assume success if no network error occurs.
            fetch(GOOGLE_FORM_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: formData
            })
            .then(() => {
                // Assume success
                btnText.textContent = "Send Message";
                formStatus.textContent = "✅ Message sent successfully!";
                formStatus.style.color = "#00d9ff";
                contactForm.reset();
            })
            .catch((error) => {
                console.error('Error:', error);
                btnText.textContent = "Send Message";
                formStatus.textContent = "❌ Message failed to send. Please contact via email: naren1729003@gmail.com";
                formStatus.style.color = "#ff4444";
            });
        });
    }
});
