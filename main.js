<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>My Test Site</title>

<!-- Domain Protection Script -->
<script>
var allowedDomain = "mywebsite.com";
var systemActive = true;
var currentDomain = window.location.hostname;

if (systemActive) {
  if (currentDomain !== allowedDomain && currentDomain !== "www." + allowedDomain) {
    document.documentElement.innerHTML = `
      <style>
        *{margin:0;padding:0;box-sizing:border-box;}
        html,body{
          height:100%;
          width:100%;
          background:#000;
          color:#fff;
          display:flex;
          justify-content:center;
          align-items:center;
          flex-direction:column;
          font-family:sans-serif;
        }
        .loader{
          width:60px;
          height:60px;
          border:6px solid #333;
          border-top:6px solid red;
          border-radius:50%;
          animation:spin 1s linear infinite;
          margin-bottom:15px;
        }
        @keyframes spin{
          0%{transform:rotate(0deg);}
          100%{transform:rotate(360deg);}
        }
      </style>
      <div class="loader"></div>
      <div>Domain Not Working...</div>
    `;
  }
}
</script>
</head>
<body>
  <h1>Hello World!</h1>
</body>
</html>
