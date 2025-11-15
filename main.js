(function () {

  function toggleBookmark(e, btn) {
    e.preventDefault();
    e.stopPropagation();

    var post = {
      title: btn.getAttribute("data-title"),
      url: btn.getAttribute("data-url"),
      thumb: btn.getAttribute("data-thumb")
    };

    var bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    var found = null;

    for (var i = 0; i < bookmarks.length; i++) {
      if (bookmarks[i].url === post.url) {
        found = bookmarks[i];
        break;
      }
    }

    if (found) {
      var newBookmarks = [];
      for (var j = 0; j < bookmarks.length; j++) {
        if (bookmarks[j].url !== post.url) {
          newBookmarks.push(bookmarks[j]);
        }
      }
      bookmarks = newBookmarks;
      btn.classList.remove("active");
      showNotify("❌ Removed from bookmarks");
    } else {
      bookmarks.push(post);
      btn.classList.add("active");
      showNotify("✅ Added to bookmarks");
    }

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    updateBookmarkCount();
  }

  function showNotify(msg) {
    var n = document.getElementById("bmNotify");
    if (!n) return;
    n.textContent = msg;
    n.classList.add("show");
    setTimeout(function () {
      n.classList.remove("show");
    }, 2500);
  }

  function updateBookmarkCount() {
    var c = document.getElementById("bmCount");
    if (!c) return;
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    var count = bookmarks.length;

    if (count > 0) {
      c.style.display = "inline-block";
      c.textContent = count;
    } else {
      c.style.display = "none";
    }
  }

  function toggleBookmarkList() {
    var list = document.getElementById("bookmarkList");
    var btn = document.querySelector(".bookmark-menu-btn");
    if (!list || !btn) return;
    list.classList.toggle("active");
    btn.classList.toggle("active");
    showBookmarks();
  }

  function showBookmarks() {
    var list = document.getElementById("bookmarkList");
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");

    if (!list) return;

    if (!bookmarks.length) {
      list.innerHTML = '<p style="text-align:center;color:#777;">No bookmarks yet</p>';
      return;
    }

    var html = "";
    for (var i = 0; i < bookmarks.length; i++) {
      var b = bookmarks[i];
      html += '<div class="bookmark-item">';
      html += '<img src="' + b.thumb + '" alt="">';
      html += '<a href="' + b.url + '" target="_blank" onclick="event.stopPropagation();">' + b.title + "</a>";
      html += "<button onclick=\"removeBookmark(event,'" + b.url + "')\">🗑️</button>";
      html += "</div>";
    }

    html += '<a class="show-all" href="/p/bookmark.html">Show all (' + bookmarks.length + ")</a>";
    list.innerHTML = html;
  }

  function removeBookmark(e, url) {
    e.stopPropagation();
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    var newBookmarks = [];

    for (var i = 0; i < bookmarks.length; i++) {
      if (bookmarks[i].url !== url) {
        newBookmarks.push(bookmarks[i]);
      }
    }

    localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
    showBookmarks();
    updateBookmarkCount();
    showNotify("❌ Removed from bookmarks");
  }

  document.addEventListener("DOMContentLoaded", function () {
    updateBookmarkCount();

    var buttons = document.querySelectorAll(".bookmark-btn");
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");

    for (var i = 0; i < buttons.length; i++) {
      var btn = buttons[i];
      var url = btn.getAttribute("data-url");

      for (var j = 0; j < bookmarks.length; j++) {
        if (bookmarks[j].url === url) {
          btn.classList.add("active");
          break;
        }
      }
    }

    var progressBarContainer = document.getElementById("reading-progress-container");
    var progressBar = document.getElementById("reading-progress-bar");
    var progressPercentage = document.getElementById("reading-progress-percentage");

    if (progressBarContainer && progressBar && progressPercentage) {
      window.addEventListener("scroll", function () {
        var totalHeight = document.body.scrollHeight - window.innerHeight;
        var progress = (window.scrollY / (totalHeight || 1)) * 100;

        progressBar.style.width = progress + "%";
        progressPercentage.textContent = Math.round(progress) + "%";

        var bubblePosition = progressBar.offsetWidth - progressPercentage.offsetWidth / 2;
        progressPercentage.style.left = bubblePosition + "px";

        if (window.scrollY > 0) {
          progressBarContainer.style.opacity = "1";
        } else {
          progressBarContainer.style.opacity = "0";
        }
      });
    }
  });

  document.addEventListener("click", function (e) {
    var dropdown = document.getElementById("bookmarkList");
    var button = document.querySelector(".bookmark-menu-btn");

    if (!dropdown || !button) return;

    if (!dropdown.contains(e.target) && !button.contains(e.target)) {
      dropdown.classList.remove("active");
      button.classList.remove("active");
    }
  });

  window.copyPostLink = function (element) {
    var url = window.location.href;

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(url).then(function () {
        showCopiedIcon(element);
      }).catch(function () {
        fallbackCopy(url, element);
      });
    } else {
      fallbackCopy(url, element);
    }
  };

  function fallbackCopy(text, element) {
    var textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);

    textarea.select();

    try {
      var successful = document.execCommand("copy");
      if (successful) {
        showCopiedIcon(element);
      } else {
        alert("Copy not supported on this device.");
      }
    } catch (err) {
      alert("Copy failed: " + err);
    }

    document.body.removeChild(textarea);
  }

  function showCopiedIcon(element) {
    element.classList.add("show-tooltip");

    element.querySelector("svg").outerHTML =
      "<svg fill='none' height='24' stroke='#10b981' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24' width='24'>" +
      "<circle cx='12' cy='12' r='10'/>" +
      "<path d='M9 12l2 2 4-4'/>" +
      "</svg>";

    setTimeout(function () {
      element.classList.remove("show-tooltip");
      element.innerHTML =
        "<span class='tooltip'>Copied!</span>" +
        "<svg class='feather feather-copy' fill='none' height='24' stroke='var(--jt-primary)' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24' width='24'>" +
        "<rect height='13' rx='2' ry='2' width='13' x='9' y='9'/>" +
        "<path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'/>" +
        "</svg>";
    }, 1500);
  }

  window.toggleBookmark = toggleBookmark;
  window.toggleBookmarkList = toggleBookmarkList;
  window.showBookmarks = showBookmarks;
  window.removeBookmark = removeBookmark;

})();
