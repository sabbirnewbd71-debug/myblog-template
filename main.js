(function () {

  /* ---------------------------
      GREETINGS SYSTEM (ES5)
  ----------------------------*/
  var greetElem = document.querySelector("#greetings");
  var hour = new Date().getHours();

  var greetTextList = [
    "মিষ্টি স্বপ্ন দেখো!",
    "শুভ সকাল!",
    "শুভ বিকাল!",
    "শুভ সন্ধ্যা!",
    "শুভ রাত্রি!",
    "ঘুমানোর সময় হয়েছে!"
  ];

  var greetShow = "";

  if (hour < 4) greetShow = greetTextList[0];
  else if (hour < 12) greetShow = greetTextList[1];
  else if (hour < 17) greetShow = greetTextList[2];
  else if (hour < 19) greetShow = greetTextList[3];
  else if (hour < 22) greetShow = greetTextList[4];
  else greetShow = greetTextList[5];

  if (greetElem) {
    greetElem.setAttribute("data-text", greetShow);
  }

  /* ---------------------------
      EN → BN NUMBER CONVERTER
  ----------------------------*/
  function bnNumber(en) {
    var nums = {
      "0": "০", "1": "১", "2": "২", "3": "৩", "4": "৪",
      "5": "৫", "6": "৬", "7": "৭", "8": "৮", "9": "৯"
    };
    return en.toString().replace(/[0-9]/g, function (d) { return nums[d]; });
  }

  /* ---------------------------
          CLOCK SYSTEM
  ----------------------------*/
  document.addEventListener("DOMContentLoaded", function () {

    function updateClock() {
      var now = new Date();
      var h = ("0" + now.getHours()).slice(-2);
      var m = ("0" + now.getMinutes()).slice(-2);
      var s = ("0" + now.getSeconds()).slice(-2);

      var clockString = bnNumber(h) + ":" + bnNumber(m) + ":" + bnNumber(s);

      var clockObj = document.getElementById("clock");
      var clockAnnouncer = document.getElementById("clock-announcer");

      if (clockObj && clockAnnouncer) {
        clockObj.textContent = clockString;
        clockObj.setAttribute("datetime", now.toISOString());
        clockAnnouncer.textContent =
          "বর্তমান সময় " +
          bnNumber(h) + "টা " +
          bnNumber(m) + "মিনিট " +
          bnNumber(s) + "সেকেন্ড";
      }
    }

    updateClock();
    setInterval(updateClock, 1000);

  });

  /* -----------------------------------------------------
       BOOKMARK SYSTEM (FULL ES5 MODE + CLEAN VERSION)
  ------------------------------------------------------*/

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

  window.toggleBookmark = toggleBookmark;
  window.toggleBookmarkList = toggleBookmarkList;
  window.showBookmarks = showBookmarks;
  window.removeBookmark = removeBookmark;

})();
