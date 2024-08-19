document.addEventListener("DOMContentLoaded", function() {
    const profileButtons = document.querySelectorAll('.profile-btn');
    const inboxes = document.querySelectorAll('.inbox');

    profileButtons.forEach(button => {
        button.addEventListener('click', function() {
            const profileId = this.getAttribute('data-profile');

            // Hide all inboxes
            inboxes.forEach(inbox => inbox.style.display = 'none');

            // Show the selected profile's inbox
            const selectedInbox = document.getElementById(`inbox-${profileId}`);
            if (selectedInbox) {
                selectedInbox.style.display = 'block';
            }
        });
    });
});