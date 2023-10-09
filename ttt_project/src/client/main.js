import '/styles/style.css'
import javascriptLogo from '/javascript.svg'
import viteLogo from '/vite.svg'




/* `main.js` will denote our landing page */
document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello, World!</h1>
    <div class="card">
      <a href="http://localhost:3000/register" class="register-link">Register</a>
    </div>
  </div>
`

/* URL I want to use ->   http://localhost:5173/register  */
