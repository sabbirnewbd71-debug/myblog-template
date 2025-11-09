// Disable right-click
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

// Disable F12, Ctrl+Shift+I, Ctrl+U, etc.
document.addEventListener('keydown', function(e) {
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && e.key === "I") ||
    (e.ctrlKey && e.key === "U")
  ) {
    e.preventDefault();
  }
});
