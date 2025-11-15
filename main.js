<script>
/*<![CDATA[*/
(function () {

  /* -----------------------------------
        GREETINGS SYSTEM (ES5)
  -----------------------------------*/
  var greetElem = document.querySelector("#greetings");
  var hour = new Date().getHours();

  var greetMessages = [
    "মিষ্টি স্বপ্ন দেখো!",
    "শুভ সকাল!",
    "শুভ বিকাল!",
    "শুভ সন্ধ্যা!",
    "শুভ রাত্রি!",
    "ঘুমানোর সময় হয়েছে!"
  ];

  var greetShow = "";

  if (hour < 4) greetShow = greetMessages[0];
  else if (hour < 12) greetShow = greetMessages[1];
  else if (hour < 17) greetShow = greetMessages[2];
  else if (hour < 19) greetShow = greetMessages[3];
  else if (hour < 22) greetShow = greetMessages[4];
  else greetShow = greetMessages[5];

  if (greetElem) {
    greetElem.setAttribute("data-text", greetShow);
  }

  /* -----------------------------------
        EN → BN NUMBER CONVERT
  -----------------------------------*/
  function bnNumber(en) {
    var nums = {
      "0": "০", "1": "১", "2": "২", "3": "৩", "4": "৪",
      "5": "৫", "6": "৬", "7": "৭", "8": "৮", "9": "৯"
    };
    return en.toString().replace(/[0-9]/g, function (d) { return nums[d]; });
  }

  /* -----------------------------------
              CLOCK SYSTEM
  -----------------------------------*/
  function updateClock() {
    var now = new Date();
    var h = ("0" + now.getHours()).slice(-2);
    var m = ("0" + now.getMinutes()).slice(-2);
    var s = ("0" + now.getSeconds()).slice(-2);

    var clockText = bnNumber(h) + ":" + bnNumber(m) + ":" + bnNumber(s);

    var clockObj = document.getElementById("clock");
    var announcer = document.getElementById("clock-announcer");

    if (clockObj && announcer) {
      clockObj.textContent = clockText;
      clockObj.setAttribute("datetime", now.toISOString());
      announcer.textContent =
        "বর্তমান সময় " +
        bnNumber(h) + "টা " +
        bnNumber(m) + "মিনিট " +
        bnNumber(s) + "সেকেন্ড";
    }
  }

  /* Tick clock */
  setInterval(updateClock, 1000);


  /* -----------------------------------
        BOOKMARK SYSTEM (ES5)
  -----------------------------------*/
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
      var arr = [];
      for (var j = 0; j < bookmarks.length; j++) {
        if (bookmarks[j].url !== post.url) {
          arr.push(bookmarks[j]);
        }
      }
      bookmarks = arr;
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
    var arr = [];

    for (var i = 0; i < bookmarks.length; i++) {
      if (bookmarks[i].url !== url) {
        arr.push(bookmarks[i]);
      }
    }

    localStorage.setItem("bookmarks", JSON.stringify(arr));
    showBookmarks();
    updateBookmarkCount();
    showNotify("❌ Removed from bookmarks");
  }

  /* -----------------------------------
        COPY POST LINK SYSTEM
  -----------------------------------*/
  window.copyPostLink = function (element) {
    var url = window.location.href;

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(url)
        .then(function () {
          showCopiedIcon(element);
        })
        .catch(function () {
          fallbackCopy(url, element);
        });
    } else {
      fallbackCopy(url, element);
    }
  };

  function fallbackCopy(text, element) {
    var textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);

    textarea.select();
    document.execCommand("copy");

    document.body.removeChild(textarea);
    showCopiedIcon(element);
  }

  function showCopiedIcon(element) {
    element.classList.add("show-tooltip");

    element.querySelector("svg").outerHTML =
      "<svg fill='none' height='24' stroke='#10b981' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24' width='24'>" +
      "<circle cx='12' cy='12' r='10'></circle>" +
      "<path d='M9 12l2 2 4-4'></path>" +
      "</svg>";

    setTimeout(function () {
      element.classList.remove("show-tooltip");
      element.innerHTML =
        "<span class='tooltip'>Copied!</span>" +
        "<svg class='feather feather-copy' fill='none' height='24' stroke='var(--jt-primary)' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24' width='24'>" +
        "<rect height='13' rx='2' ry='2' width='13' x='9' y='9'></rect>" +
        "<path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'></path>" +
        "</svg>";
    }, 1500);
  }

  /* -----------------------------------
        PAGE LOAD ACTIONS
  -----------------------------------*/
  document.addEventListener("DOMContentLoaded", function () {
    updateClock();
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

    /* Reading progress bar */
    var container = document.getElementById("reading-progress-container");
    var bar = document.getElementById("reading-progress-bar");
    var percent = document.getElementById("reading-progress-percentage");

    if (container && bar && percent) {
      window.addEventListener("scroll", function () {
        var total = document.body.scrollHeight - window.innerHeight;
        var prog = (window.scrollY / (total || 1)) * 100;

        bar.style.width = prog + "%";
        percent.textContent = Math.round(prog) + "%";

        percent.style.left = (bar.offsetWidth - percent.offsetWidth / 2) + "px";

        container.style.opacity = window.scrollY > 0 ? "1" : "0";
      });
    }
  });

  /* Close dropdown */
  document.addEventListener("click", function (e) {
    var dropdown = document.getElementById("bookmarkList");
    var btn = document.querySelector(".bookmark-menu-btn");

    if (!dropdown || !btn) return;

    if (!dropdown.contains(e.target) && !btn.contains(e.target)) {
      dropdown.classList.remove("active");
      btn.classList.remove("active");
    }
  });

  /* Global Exports */
  window.toggleBookmark = toggleBookmark;
  window.toggleBookmarkList = toggleBookmarkList;
  window.showBookmarks = showBookmarks;
  window.removeBookmark = removeBookmark;

})();
/*]]>*/
</script>
