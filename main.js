(function () {

  /* -----------------------------------
        DOMAIN CHECK + BACK BLOCK (ES5)
  -----------------------------------*/
  var allowedDomains = ["utblackles4.blogspot.com", "utblackles4.blogspot.com"];
  var currentDomain = window.location.hostname;

  if (allowedDomains.indexOf(currentDomain) === -1) {

    /* BACK BUTTON BLOCK */
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
      history.pushState(null, null, location.href);
    };

    /* REDIRECT */
    window.location.replace("utblackles4.blogspot.com");
  }

  /* -----------------------------------
        SECURITY PROTECT (COPY, DRAG, SHORTCUT)
  -----------------------------------*/
  document.addEventListener("contextmenu", function (e) { e.preventDefault(); });
  document.addEventListener("copy", function (e) { e.preventDefault(); });
  document.addEventListener("paste", function (e) { e.preventDefault(); });
  document.addEventListener("selectstart", function (e) { e.preventDefault(); });
  document.addEventListener("dragstart", function (e) { e.preventDefault(); });
  document.addEventListener("drop", function (e) { e.preventDefault(); });

  document.onkeydown = function (e) {
    if (
      e.keyCode === 123 ||                 // F12
      (e.ctrlKey && e.keyCode === 85) ||   // Ctrl+U
      (e.ctrlKey && e.keyCode === 83) ||   // Ctrl+S
      (e.ctrlKey && e.keyCode === 67) ||   // Ctrl+C
      (e.ctrlKey && e.keyCode === 86) ||   // Ctrl+V
      (e.ctrlKey && e.keyCode === 73) ||   // Ctrl+I
      (e.ctrlKey && e.shiftKey && e.keyCode === 73) // Ctrl+Shift+I
    ) {
      e.preventDefault();
      return false;
    }
  };
})();
