function clearError() {
  let errPopup = document.getElementById("error-popup");
  let errOverlay = document.getElementById("error-overlay");
  if (errPopup && errOverlay) {
    errPopup.textContent = "";
    errPopup.classList.remove("show-popup");
    errOverlay.classList.remove("show-overlay");
  }
}

function handleError(err: Error) {
  let errPopup = document.getElementById("error-popup");
  let errOverlay = document.getElementById("error-overlay");
  if (errPopup && errOverlay) {
    errPopup.textContent = err.message;
    errPopup.classList.add("show-popup");
    errOverlay.classList.add("show-overlay");
  }
}

export { handleError, clearError };
