function hidePopup(popupIdPrefix: string): void {
  //todo
  let popup = document.getElementById(`${popupIdPrefix}-popup`);
  let overlay = document.getElementById(`${popupIdPrefix}-overlay`);
  if (popup && overlay) {
    popup.classList.remove("show-popup");
    overlay.classList.remove("show-overlay");
  }
}

function showPopup(popupIdPrefix: string): void {
  //todo
  let popup = document.getElementById(`${popupIdPrefix}-popup`);
  let overlay = document.getElementById(`${popupIdPrefix}-overlay`);
  if (popup && overlay) {
    popup.classList.add("show-popup");
    overlay.classList.add("show-overlay");
  }
}

export { showPopup, hidePopup };
