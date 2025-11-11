// main.js এর একদম শুরুতে রাখবে 👇
var allowedDomain = "example.com";  
var systemActive = true;  
var currentDomain = window.location.hostname;

if (systemActive) {
  if (currentDomain !== allowedDomain && currentDomain !== "www." + allowedDomain) {
    document.documentElement.innerHTML = `
      <style>
        *{margin:0;padding:0;box-sizing:border-box;}
        html,body{
          width:100%;
          height:100vh;
          background:#000;
          display:flex;
          flex-direction:column;
          justify-content:center;
          align-items:center;
          font-family:"Poppins",sans-serif;
          color:#fff;
          overflow:hidden;
        }
        .loader {
          width:70px;
          height:70px;
          border:6px solid #222;
          border-top:6px solid #ff0000;
          border-radius:50%;
          animation:spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .text {
          color:#ff4444;
          font-size:20px;
          text-transform:uppercase;
          letter-spacing:1.5px;
          margin-top:25px;
        }
      </style>

      <div class="domain-check">
        <div class="loader"></div>
        <div class="text">Domain Not Working...</div>
      </div>
    `;
  }
}
