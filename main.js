// Small utilities extracted from the original theme
(function(){
function rmurl(e,t){
var r=new RegExp(/\?m=0|&m=0|\?m=1|&m=1/g);
if(r.test(e)){ e=e.replace(r,""); if(t) window.history.replaceState({},document.title,e); }
return e;
}
var currentUrl = rmurl(location.toString(), true);


// Dark theme toggle (reads from localStorage, simple)
if (typeof localStorage !== 'undefined' && localStorage.getItem('theme') === 'dark'){
document.documentElement.classList.add('dark-mode');
}
})();


// ====== Keyboard shortcut blocker (webpage-level) ======
// This will prevent common modifier shortcuts (Ctrl/Alt/Meta) and some function keys from working.
// NOTE: It only runs while this page is open — it cannot disable OS-wide shortcuts.


document.addEventListener('keydown', function(e) {
// Block modifier combos (Ctrl/Alt/Meta) to disable copy/paste, refresh, devtools combos etc.
if (e.ctrlKey || e.altKey || e.metaKey) {
e.preventDefault();
e.stopPropagation();
console.log('Shortcut blocked:', e.key, 'ctrl:', e.ctrlKey, 'alt:', e.altKey, 'meta:', e.metaKey);
return false;
}


// Block certain function keys
var blocked = ['F12', 'F5', 'F11'];
if (blocked.indexOf(e.key) !== -1) {
e.preventDefault();
e.stopPropagation();
console.log('Blocked key:', e.key);
return false;
}
});


// Optional: disable right-click context menu (if desired)
// document.addEventListener('contextmenu', function(e){ e.preventDefault(); });
