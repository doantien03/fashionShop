// function chung showToast
export function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");

  if (!container) return;

  const icons = {
    success: "✔",
    error: "❌",
    warning: "⚠",
    info: "ℹ"
  };

  const toast = document.createElement("div");
  toast.className = "toast " + type;

  toast.innerHTML = `
    <span class="icon">${icons[type] || "ℹ"}</span>
    <span class="message">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}