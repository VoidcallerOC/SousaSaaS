(() => {
  "use strict";

  const currentYear = String(new Date().getFullYear());
  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = currentYear;
  });

  const packages = {
    local: {
      name: "Local Business Site",
      price: "From $2,000",
      blurb:
        "The shop page. Three to five pages: hours, the floor, how to walk in.",
      bullets: [
        "Hours, the floor, how to walk in",
        "Works on a phone in the parking lot",
        "Collections and events people can find",
      ],
    },
    system: {
      name: "Site and System",
      price: "From $6,000",
      blurb:
        "Events, play nights, collection intake, or a bigger site around the shop.",
      bullets: [
        "Events and play nights on the page",
        "Collection intake that matches the floor",
        "Bigger site around the same shop",
      ],
    },
    product: {
      name: "Product Site",
      price: "From $16,000",
      blurb: "A catalog or checkout that matches how the shop actually sells.",
      bullets: [
        "Catalog that matches how you sell",
        "Checkout or trade-in path people understand",
        "Launch, then keep it current",
      ],
    },
  };

  const picker = document.querySelector("[data-package-picker]");
  if (picker) {
    const nameEl = picker.querySelector("[data-package-name]");
    const priceEl = picker.querySelector("[data-package-price]");
    const blurbEl = picker.querySelector("[data-package-blurb]");
    const bulletsEl = picker.querySelector("[data-package-bullets]");
    const tabs = picker.querySelectorAll("[data-package]");

    const paint = (key) => {
      const pack = packages[key];
      if (!pack) return;
      nameEl.textContent = pack.name;
      priceEl.textContent = pack.price;
      blurbEl.textContent = pack.blurb;
      bulletsEl.innerHTML = pack.bullets
        .map((item) => `<li>${item}</li>`)
        .join("");
      tabs.forEach((tab) => {
        const on = tab.getAttribute("data-package") === key;
        tab.classList.toggle("is-active", on);
        tab.setAttribute("aria-selected", on ? "true" : "false");
      });
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        paint(tab.getAttribute("data-package"));
      });
    });
  }

  const visit = document.querySelector("[data-visit-path]");
  if (visit) {
    const steps = [
      {
        label: "Hours and door",
        copy: "Tue–Sun · address · how to walk in. Built so a phone in the lot finds you before they drive past.",
      },
      {
        label: "What is on the floor",
        copy: "Collections, events, and what you carry — without hunting Facebook for the real hours.",
      },
      {
        label: "Call or come by",
        copy: "Phone, map, and a page you can keep current. Care after launch is $35/month.",
      },
    ];
    const labelEl = visit.querySelector("[data-visit-label]");
    const copyEl = visit.querySelector("[data-visit-copy]");
    const items = visit.querySelectorAll("[data-visit-step]");

    const show = (index) => {
      const step = steps[index];
      if (!step) return;
      labelEl.textContent = step.label;
      copyEl.textContent = step.copy;
      items.forEach((item) => {
        item.classList.toggle(
          "is-active",
          item.getAttribute("data-visit-step") === String(index),
        );
      });
    };

    visit.querySelectorAll("[data-visit-btn]").forEach((btn) => {
      btn.addEventListener("click", () => {
        show(Number(btn.getAttribute("data-visit-btn")));
      });
    });
  }

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
