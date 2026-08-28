(() => {
  "use strict";

  const currentYear = String(new Date().getFullYear());
  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = currentYear;
  });

  const form = document.querySelector("[data-contact-form]");
  const status = document.querySelector("[data-form-status]");

  if (!form || !status) {
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
      status.textContent =
        "Please complete the required fields before sending.";
      return;
    }

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      company: String(formData.get("company") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      website: String(formData.get("website") || "").trim(),
    };

    const submitButton = form.querySelector("button[type='submit']");
    if (submitButton) {
      submitButton.disabled = true;
    }
    status.textContent = "Sending your inquiry…";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        status.textContent =
          result.error ||
          "The message could not be sent. Email voidcalleroc@gmail.com instead.";
        return;
      }

      form.reset();
      status.textContent =
        "Received. I will reply from the studio inbox as soon as I can.";
    } catch {
      status.textContent =
        "The message could not be sent. Email voidcalleroc@gmail.com instead.";
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
})();
