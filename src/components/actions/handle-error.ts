import { hidePopup, showPopup } from "./board-actions";

function clearError() {
  let errPopup = document.getElementById("error-popup");
  if (errPopup) {
    errPopup.textContent = "";
  }
  hidePopup("error");
}

function handleError(err: Error) {
  showPopup("error");
  let errPopup = document.getElementById("error-popup");
  if (errPopup) {
    errPopup.textContent = err.message;
  }
}

export { handleError, clearError };
