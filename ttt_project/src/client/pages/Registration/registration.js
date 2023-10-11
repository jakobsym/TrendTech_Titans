// registration.js (linked to registration.html)

// 'DOMContentLoaded' allows DOM to fully load before before eventListener activated
document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    // Checking if registrationForm exists
    if(registrationForm){
        console.log("gotElementById @ registrationForm");
    }

    registrationForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // tumbleweed, planafuel, flower and flour
        const formData = new FormData(registrationForm);

        const userData = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
        };

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            //console.log(response.body); // Checking what is contained within `response.body`
           
            if (response.ok) {
                console.log(userData.name);
                //TODO: redirect back to main.js
                console.log('Registration successful');
            } else {
                const errorData = await response.json();
                console.error('Registration failed:', errorData.message);
            }
        } catch (error) {
            console.error('Registration failed:', error);
        }
    });
});