// script.js

// Function to check if user is signed in
function checkSignInStatus() {
    let username = localStorage.getItem('username');
    
    if (username) {
        // If signed in, show profile page or the signed-in user's data
        document.getElementById('profile-button').textContent = `Hello, ${username}`;
        document.getElementById('profile-button').onclick = showUserProfile; // Redirect to profile
        document.getElementById('profile-page').style.display = 'block';
    } else {
        // If not signed in, show a sign-in prompt
        document.getElementById('profile-button').textContent = 'Sign In';
        document.getElementById('profile-button').onclick = promptSignIn; // Show sign-in form
    }
}

// When the profile button is clicked
function showUserProfile() {
    let username = localStorage.getItem('username');
    
    if (username) {
        // Display user's profile info or redirect to the profile page
        document.getElementById('profile-username').textContent = `Hello, ${username}!`;
        loadUserProfile(); // Load the user profile from localStorage
        document.getElementById('profile-page').style.display = 'block';
    }
}

// Prompt the user to sign in and redirect to the login page
function promptSignIn() {
    // Redirect the user to the login page
    window.location.href = 'https://wafflenugget.github.io/login-page/';
}

// Load user profile data (favorite things, profile picture) from localStorage
function loadUserProfile() {
    let favoriteThings = localStorage.getItem('favoriteThings');
    let profilePicture = localStorage.getItem('profilePicture');
    
    if (favoriteThings) {
        document.getElementById('favorite-things').value = favoriteThings;
    }
    
    if (profilePicture) {
        document.getElementById('profile-img').src = profilePicture;
    } else {
        document.getElementById('profile-img').src = 'default-avatar.png'; // Default avatar
    }
}

// Save changes made to the profile (favorite things, profile picture)
function saveProfile() {
    let favoriteThings = document.getElementById('favorite-things').value;
    
    localStorage.setItem('favoriteThings', favoriteThings); // Save favorite things to localStorage
    alert("Profile updated successfully!");
}

// Enable profile editing (favorite things)
function editProfile() {
    document.getElementById('favorite-things').disabled = false;
    document.getElementById('favorite-things').focus();
}

// Upload profile picture
function uploadProfilePicture() {
    let fileInput = document.getElementById('upload-img');
    let file = fileInput.files[0];
    
    if (file) {
        let reader = new FileReader();
        reader.onloadend = function () {
            let imageUrl = reader.result;
            document.getElementById('profile-img').src = imageUrl;
            localStorage.setItem('profilePicture', imageUrl); // Save the image URL to localStorage
        };
        reader.readAsDataURL(file);
    }
}

// Sign out the user (clear username and profile data)
function signOut() {
    localStorage.removeItem('username');
    localStorage.removeItem('favoriteThings');
    localStorage.removeItem('profilePicture');
    checkSignInStatus(); // Refresh button and page view after sign-out
}

// Initialize the page (check sign-in status)
document.addEventListener('DOMContentLoaded', function() {
    checkSignInStatus(); // Check if the user is signed in and adjust the profile button accordingly
});
