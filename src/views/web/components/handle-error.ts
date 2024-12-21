function handleError(err: Error) {
  console.log("err");
  let errHeader = document.getElementById("error-display");
  console.log(errHeader);
  if (errHeader) {
    errHeader.textContent = err.message;
  }
  console.log(err);
}

export { handleError };
