const feedbackPopup = document.querySelector("[data-feedback-popup]");
const feedbackPopupTitle = feedbackPopup?.querySelector(".feedback-popup__title");
const feedbackPopupMessage = feedbackPopup?.querySelector(".feedback-popup__message");
const feedbackPopupCloseButtons = feedbackPopup?.querySelectorAll("[data-feedback-popup-close]");
let previousFocusedElement = null;

export const hideFeedbackPopup = () => {
  if (!feedbackPopup) {
    return;
  }

  feedbackPopup.hidden = true;
  feedbackPopup.classList.remove("is-success", "is-error");
  feedbackPopup.setAttribute("aria-hidden", "true");
  document.body.classList.remove("has-feedback-popup");

  if (previousFocusedElement instanceof HTMLElement) {
    previousFocusedElement.focus();
    previousFocusedElement = null;
  }
};

export const showFeedbackPopup = (status, message) => {
  if (!feedbackPopup || !feedbackPopupTitle || !feedbackPopupMessage) {
    return;
  }

  previousFocusedElement =
    document.activeElement instanceof HTMLElement ? document.activeElement : null;

  feedbackPopup.hidden = false;
  feedbackPopup.classList.remove("is-success", "is-error");
  feedbackPopup.classList.add(status === "success" ? "is-success" : "is-error");
  feedbackPopup.setAttribute("aria-hidden", "false");
  feedbackPopupTitle.textContent =
    status === "success"
      ? feedbackPopup.dataset.successTitle
      : feedbackPopup.dataset.errorTitle;
  feedbackPopupMessage.textContent = message;
  document.body.classList.add("has-feedback-popup");

  const primaryCloseButton = feedbackPopup.querySelector(".feedback-popup__action");
  if (primaryCloseButton instanceof HTMLElement) {
    primaryCloseButton.focus();
  }
};

feedbackPopupCloseButtons?.forEach((button) => {
  button.addEventListener("click", () => {
    hideFeedbackPopup();
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && feedbackPopup && !feedbackPopup.hidden) {
    hideFeedbackPopup();
  }
});
