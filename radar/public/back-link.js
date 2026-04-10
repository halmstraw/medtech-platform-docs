(function () {
  function addBackLink() {
    if (document.getElementById("docs-back-link")) return;

    var btn = document.createElement("a");
    btn.id = "docs-back-link";
    btn.href = "/";
    btn.textContent = "← Back to Docs";
    btn.style.cssText = [
      "position: fixed",
      "top: 16px",
      "left: 16px",
      "z-index: 9999",
      "background: #0d1b2a",
      "color: #00c389",
      "border: 1px solid #00c389",
      "border-radius: 4px",
      "padding: 6px 12px",
      "font-family: DM Sans, sans-serif",
      "font-size: 13px",
      "font-weight: 500",
      "text-decoration: none",
      "cursor: pointer",
      "transition: background 0.2s",
    ].join(";");

    btn.addEventListener("mouseenter", function () {
      btn.style.background = "#00c389";
      btn.style.color = "#0d1b2a";
    });
    btn.addEventListener("mouseleave", function () {
      btn.style.background = "#0d1b2a";
      btn.style.color = "#00c389";
    });

    document.body.appendChild(btn);
  }

  // Run on initial load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addBackLink);
  } else {
    addBackLink();
  }

  // Re-run on client-side navigation (Next.js SPA routing)
  var observer = new MutationObserver(function () {
    addBackLink();
  });
  observer.observe(document.body, { childList: true, subtree: false });
})();
