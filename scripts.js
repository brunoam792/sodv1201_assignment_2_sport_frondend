document.addEventListener('DOMContentLoaded', () => {
    loadForm();
    const form = document.getElementById('registrationForm');
});

async function loadForm() {
    try {
        const response = await fetch('https://sodv1201-assignment-2-sport-backend.onrender.com/form-html');
        //const response = await fetch('http://localhost:3000/form-html');
        if (!response.ok) {
            throw new Error('Failed to fetch form HTML');
        }
        const formHtml = await response.text();
        document.getElementById('formContainer').innerHTML = formHtml;
    } catch (error) {
        console.error(error);
    }
}

async function submitForm(e) {
    e.preventDefault();
    const form = document.getElementById('registrationForm');
    const confirmation = document.getElementById('confirmation');
    const formData = new FormData(form);
    const responseData = await fetch('https://sodv1201-assignment-2-sport-backend.onrender.com/register', {
    //const responseData = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData))
    }).then(response => response.json());

    // Hide the form
    form.style.display = 'none';

    // Show only the confirmation section
    confirmation.style.display = 'block';
    document.getElementById('name').innerText = responseData.registrationData.fullName;
    document.getElementById('fee').innerText = responseData.registrationData.fee;
    
    return false; // Prevent form submission
}
