


  
  
<script type='text/javascript'>
//<![CDATA[
/* 🔖 Add or Remove Bookmark */
// Don't delete the credit.
const licenseUrl = "https://anwarultech.blogspot.com/";
function toggleBookmark(e, btn) {
  e.preventDefault();
  e.stopPropagation();

  const post = {
    title: btn.getAttribute("data-title"),
    url: btn.getAttribute("data-url"),
    thumb: btn.getAttribute("data-thumb")
  };

  let bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
  const found = bookmarks.find(b => b.url === post.url);

  if (found) {
    bookmarks = bookmarks.filter(b => b.url !== post.url);
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
  const n = document.getElementById("bmNotify");
  if (!n) return;
  n.textContent = msg;
  n.classList.add("show");
  setTimeout(() => n.classList.remove("show"), 2500);
}
function updateBookmarkCount() {
  const c = document.getElementById("bmCount");
  if (!c) return;
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
  const count = bookmarks.length;
  if (count > 0) {
    c.style.display = "inline-block";
    c.textContent = count;
  } else {
    c.style.display = "none";
  }
}
const redirectUrl=atob("aHR0cHM6Ly9hbndhcnVsdGVjaC5ibG9nc3BvdC5jb20vMjAyNS8xMC9ob3ctdG8tYWRkLWJvb2ttYXJrLXN5c3RlbS1pbi1ibG9nZ2VyLmh0bWw=");if(!licenseUrl||licenseUrl!==atob("aHR0cHM6Ly9hbndhcnVsdGVjaC5ibG9nc3BvdC5jb20v")){alert(atob("Q3JlZGl0cyBhcmUgbm90IHZhbGlkISBBbndhcnVsIFRlY2ggd3JvdGUgdGhlIHNjcmlwdCEgUmVkaXJlY3RlZCB0byB0aGUgb3JpZ2luYWwgcG9zdC4uLg=="));window.location.href=redirectUrl;throw new Error(atob("TGljZW5zZSBub3QgdHJ1ZSE="));}
function toggleBookmarkList() {
  const list = document.getElementById("bookmarkList");
  const btn = document.querySelector(".bookmark-menu-btn");
  list.classList.toggle("active");
  btn.classList.toggle("active");
  showBookmarks();
}
function showBookmarks() {
  const list = document.getElementById("bookmarkList");
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
  if (!bookmarks.length) {
    list.innerHTML = `<p style="text-align:center;color:#777;">No bookmarks yet</p>`;
    return;
  }

  list.innerHTML = bookmarks.map(b => `
    <div class="bookmark-item">
      <img src="${b.thumb}" alt="">
      <a href="${b.url}" target="_blank" onclick="event.stopPropagation();">${b.title}</a>
      <button onclick="removeBookmark(event,'${b.url}')">🗑️</button>
    </div>
  `).join("") + `<a class="show-all" href="/p/bookmark.html">Show all (${bookmarks.length})</a>`;
}
function removeBookmark(e, url) {
  e.stopPropagation();
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
  bookmarks = bookmarks.filter(b => b.url !== url);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  showBookmarks();
  updateBookmarkCount();
  showNotify("❌ Removed from bookmarks");
}
document.addEventListener("DOMContentLoaded", () => {
  updateBookmarkCount();
  const buttons = document.querySelectorAll(".bookmark-btn");
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
  buttons.forEach(btn => {
    const url = btn.getAttribute("data-url");
    if (bookmarks.find(b => b.url === url)) {
      btn.classList.add("active");
    }
  });
});
document.addEventListener("click", function(e) {
  const dropdown = document.getElementById("bookmarkList");
  const button = document.querySelector(".bookmark-menu-btn");
  if (!dropdown || !button) return;

  // If clicked outside the dropdown or button, close it
  if (!dropdown.contains(e.target) && !button.contains(e.target)) {
    dropdown.classList.remove("active");
    button.classList.remove("active");
  }
});
//]]>
</script>
  <script>
        document.addEventListener(&#39;DOMContentLoaded&#39;, function() {
            const progressBarContainer = document.getElementById(&#39;reading-progress-container&#39;);
            const progressBar = document.getElementById(&#39;reading-progress-bar&#39;);
            const progressPercentage = document.getElementById(&#39;reading-progress-percentage&#39;);

            window.addEventListener(&#39;scroll&#39;, function() {
                const totalHeight = document.body.scrollHeight - window.innerHeight;
                const progress = (window.scrollY / totalHeight) * 100;
                progressBar.style.width = progress + &#39;%&#39;;
                progressPercentage.textContent = Math.round(progress) + &#39;%&#39;;

                // Position the percentage bubble correctly within the progress bar
                const bubblePosition = progressBar.offsetWidth - progressPercentage.offsetWidth / 2;
                progressPercentage.style.left = bubblePosition + &#39;px&#39;;

                // Make the progress bar visible when scrolling starts
                if (window.scrollY &gt; 0) {
                    progressBarContainer.style.opacity = &#39;1&#39;;
                } else {
                    progressBarContainer.style.opacity = &#39;0&#39;;
                }
            });
        });
    </script>

<script type='text/javascript'>
//<![CDATA[
function copyPostLink(element) {
  const url = window.location.href;

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(url).then(function () {
      showCopiedIcon(element);
    }).catch(function () {
      fallbackCopy(url, element);
    });
  } else {
    fallbackCopy(url, element);
  }
}

function fallbackCopy(text, element) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();

  try {
    const successful = document.execCommand("copy");
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

  element.querySelector("svg").outerHTML = `
    <svg fill='none' height='24' stroke='#10b981' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24' width='24'>
      <circle cx='12' cy='12' r='10'/>
      <path d='M9 12l2 2 4-4'/>
    </svg>
  `;

  setTimeout(function () {
    element.classList.remove("show-tooltip");
    element.innerHTML = `
      <span class='tooltip'>Copied!</span>
      <svg class='feather feather-copy' fill='none' height='24' stroke='var(--jt-primary)' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'>
        <rect height='13' rx='2' ry='2' width='13' x='9' y='9'/>
        <path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'/>
      </svg>
    `;
  }, 1500);
}
//]]>
</script>
