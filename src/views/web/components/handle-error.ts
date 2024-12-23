function clearError() {
  let errHeader = document.getElementById("error-display");
  if (errHeader) {
    errHeader.textContent = "";
  }
}

function handleError(err: Error) {
  let errHeader = document.getElementById("error-display");
  if (errHeader) {
    errHeader.textContent = err.message;
  }
}

export { handleError, clearError };
