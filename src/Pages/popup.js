
export const showPopupMessage = (message, type, setPopupMessage, setShowPopup, duration = 2000) => {
    setPopupMessage({text: message, type});
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), duration);
  };
  