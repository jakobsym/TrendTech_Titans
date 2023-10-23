/**
 * This code will handle all links within the admin navbar, redirecting the specific .html page based on what admin clicks
 */
const navbar = document.querySelector('.navbar');
const content = document.getElementById('content');

// add a click event listener to the navbar links
navbar.addEventListener('click', (e) => {
    e.preventDefault(); 

    // check which link was clicked
    if (e.target.tagName === 'A') {
        const href = e.target.getAttribute('href');

        // Load the content of the selected page
        fetch(href)
            .then(response => response.text())
            .then(html => {
                content.innerHTML = html;
            })
            .catch(error => {
                console.error(`Error loading page: ${error}`);
            });
    }
});