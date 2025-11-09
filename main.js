:root{
--jt-primary:#f67938;
--bs-body-bg:#ffffff;
--bs-body-color:#686868;
--jt-heading-color:#000000;
--jt-link-color:#f67938;
--jt-border-light:#efefef;
}


/* Basic reset & body */
*{box-sizing:border-box}
body{font-family:system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; margin:0; color:var(--bs-body-color); background:var(--bs-body-bg); line-height:1.5}


a{color:var(--jt-link-color); text-decoration:none}


/* Header */
#header{background:var(--bs-body-bg); border-bottom:1px solid var(--jt-border-light); padding:0.5rem 0}
.logo-wrap img{max-width:200px; height:auto}
#navbar .navbar-nav{display:flex; gap:1rem; list-style:none; padding-left:0; margin:0}
#navbar .nav-link{padding:0.5rem 0; color:var(--bs-body-color)}


/* Main layout */
#primary{max-width:1140px; margin:0 auto}


/* Sidebar */
#sidebar .widget{background:transparent; padding:0.5rem}


/* Footer */
#footer{border-top:1px solid var(--jt-border-light); background:transparent}


/* Small responsive tweaks */
@media (max-width:991.98px){
#navbar .navbar-nav{flex-direction:column}
}


/* A few utility classes from theme */
.jt-btn-primary{background:var(--jt-primary); color:#fff; padding:.5rem 1rem; border-radius:6px}
