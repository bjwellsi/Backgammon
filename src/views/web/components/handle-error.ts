function handleError(err: Error) {
  let errHeader = document.getElementById("error-display");
  if (errHeader) {
    errHeader.textContent = err.message;
  }
  console.log(err);
}

export { handleError };
