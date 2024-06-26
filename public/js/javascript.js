document.addEventListener("DOMContentLoaded", function () {
    // Screens
    const mainScreen = document.getElementById('main-screen');
    const loginScreen = document.getElementById('login-screen');
    const detailScreen = document.getElementById('detail-screen');
    const addScreen = document.getElementById('add-screen');

    // Forms
    const loginForm = document.getElementById('login-form');
    const addForm = document.getElementById('add-form');
    const detailForm = document.getElementById('detail-form');

    // Main Screen Buttons
    const logoutButton = document.getElementById('logout-button');
    const addButton = document.getElementById('add-button');

    // Detail Screen Buttons
    const updateButtonDetail = document.getElementById('update-button-detail');
    const deleteButtonDetail = document.getElementById('delete-button-detail');
    const cancelButtonDetail = document.getElementById('cancel-button-detail');

    // Add Screen Buttons
    const cancelButtonAdd = document.getElementById('cancel-button-add');

    // Variables
    let currentUserRole = null;
    let detailData = null;

    function updateWelcomeMessage(name) {
        const welcomeMessage = document.getElementById('welcome-message');
        welcomeMessage.textContent = "Welcome, " + name + "!";
    }

    function populateTable(data) {
        const tbody = document.getElementById('tableBody');
        tbody.innerHTML = ''; // Clear existing rows
        data.forEach((row) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.name}</td>
                <td>${row.description}</td>
                <td>${row.street}</td>
                <td>${row.zip}</td>
                <td>${row.city}</td>
                <td>${row.category}</td>
                <td><img src="${row.image}" alt="${row.name} Image" class="img-thumbnail" width="150"></td>
            `;
            tr.addEventListener('click', () => showDetailScreen(row));
            tbody.appendChild(tr);
        });
    }

    function showDetailScreen(data) {
        detailData = data;
        document.getElementById('location-name-edit').value = data.name;
        document.getElementById('location-description-edit').value = data.description;
        document.getElementById('location-street-edit').value = data.street;
        document.getElementById('location-zip-edit').value = data.zip;
        document.getElementById('location-city-edit').value = data.city;
        document.getElementById('location-category-edit').value = data.category;
        document.getElementById('longID').value = data.longitude;
        document.getElementById('latID').value = data.latitude;
        document.getElementById('currentImage').src = data.image;

        if (currentUserRole === 'admin') {
            updateButtonDetail.classList.remove('d-none');
            deleteButtonDetail.classList.remove('d-none');
        } else {
            updateButtonDetail.classList.add('d-none');
            deleteButtonDetail.classList.add('d-none');
        }

        mainScreen.classList.add('d-none');
        detailScreen.classList.remove('d-none');
    }

    async function getGeocoordinates(address) {
        const apiKey = 'AIzaSyDBOkC5oZAIDMuWgWEHr01OFMS_pn_VbYQ';
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`);
        if (!response.ok) {
            throw new Error('Geoservice request failed');
        }
        const data = await response.json();
        if (data.results.length === 0) {
            throw new Error('No geocoordinates found');
        }
        return {
            latitude: data.results[0].geometry.location.lat,
            longitude: data.results[0].geometry.location.lng,
        };
    }

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const enteredUsername = document.getElementById('username').value;
        const enteredPassword = document.getElementById('password').value;

        const response = await fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: enteredUsername, password: enteredPassword})
        });

        if (response.status === 200) {
            const user = await response.json();
            currentUserRole = user.role;
            loginScreen.classList.add('d-none');
            mainScreen.classList.remove('d-none');
            updateWelcomeMessage(user.name);
            fetchLocations();

            if (user.role === 'admin') {
                addButton.classList.remove('d-none');
            } else {
                addButton.classList.add('d-none');
            }
        } else {
            alert('Wrong username or password!');
        }
    });

    logoutButton.addEventListener('click', function () {
        mainScreen.classList.add('d-none');
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        loginScreen.classList.remove('d-none');
        currentUserRole = null;
    });

    cancelButtonDetail.addEventListener('click', function () {
        mainScreen.classList.remove('d-none');
        detailScreen.classList.add('d-none');
    });

    addButton.addEventListener('click', function () {
        mainScreen.classList.add('d-none');
        addScreen.classList.remove('d-none');
    });

    addForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const name = document.getElementById('location-name').value;
        const description = document.getElementById('location-description').value;
        const street = document.getElementById('location-street').value;
        const zip = document.getElementById('location-zip').value;
        const city = document.getElementById('location-city').value;
        const category = document.getElementById('location-category').value;
        const imageFile = document.getElementById('location-image').files[0];

        if (!imageFile) {
            alert("Please upload an image.");
            return;
        }

        const address = `${street}, ${zip}, ${city}`;

        try {
            const {latitude, longitude} = await getGeocoordinates(address);
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('street', street);
            formData.append('zip', zip);
            formData.append('city', city);
            formData.append('category', category);
            formData.append('longitude', longitude);
            formData.append('latitude', latitude);
            formData.append('image', imageFile);

            const response = await fetch('/loc', {
                method: 'POST',
                body: formData
            });

            if (response.status === 201) {
                alert('Location added successfully');
                mainScreen.classList.remove('d-none');
                addScreen.classList.add('d-none');
                fetchLocations();
            } else {
                alert('Failed to add location');
            }
        } catch (error) {
            alert("Error in the geoservice request");
            console.error('Error in the geoservice request:', error);
        }
    });

    cancelButtonAdd.addEventListener('click', function () {
        mainScreen.classList.remove('d-none');
        addScreen.classList.add('d-none');
    });

    deleteButtonDetail.addEventListener('click', async function () {
        const response = await fetch(`/loc/${detailData._id}`, {
            method: 'DELETE'
        });

        if (response.status === 204) {
            alert('Location deleted successfully');
            mainScreen.classList.remove('d-none');
            detailScreen.classList.add('d-none');
            fetchLocations();
        } else {
            alert('Failed to delete location');
        }
    });

    detailForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const name = document.getElementById('location-name-edit').value;
        const description = document.getElementById('location-description-edit').value;
        const street = document.getElementById('location-street-edit').value;
        const zip = document.getElementById('location-zip-edit').value;
        const city = document.getElementById('location-city-edit').value;
        const category = document.getElementById('location-category-edit').value;
        const imageFile = document.getElementById('location-image-edit').files[0];

        const address = `${street}, ${zip}, ${city}`;

        try {
            const {latitude, longitude} = await getGeocoordinates(address);
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('street', street);
            formData.append('zip', zip);
            formData.append('city', city);
            formData.append('category', category);
            formData.append('longitude', longitude);
            formData.append('latitude', latitude);
            if (imageFile) {
                formData.append('image', imageFile);
            }

            const response = await fetch(`/loc/${detailData._id}`, {
                method: 'PUT',
                body: formData
            });

            if (response.status === 204) {
                alert('Location updated successfully');
                mainScreen.classList.remove('d-none');
                detailScreen.classList.add('d-none');
                fetchLocations();
            } else {
                alert('Failed to update location');
            }
        } catch (error) {
            alert(`Error in the geoservice request`);
            console.error('Error in the geoservice request:', error);
        }
    });

    async function fetchLocations() {
        const response = await fetch('/loc');
        if (response.status === 200) {
            const locations = await response.json();
            populateTable(locations);
        }
    }

    function attachEventListeners() {
        document.querySelectorAll('.btn-edit').forEach(button => {
            button.addEventListener('click', async () => {
                const locationId = button.dataset.id;
                const response = await fetch(`/loc/${locationId}`);
                if (response.status === 200) {
                    const location = await response.json();
                    showDetailScreen(location);
                } else {
                    alert('Failed to load location details');
                }
            });
        });

        document.querySelectorAll('.btn-delete').forEach(button => {
            button.addEventListener('click', async () => {
                const locationId = button.dataset.id;
                const response = await fetch(`/loc/${locationId}`, {
                    method: 'DELETE'
                });

                if (response.status === 204) {
                    alert('Location deleted successfully');
                    fetchLocations();
                } else {
                    alert('Failed to delete location');
                }
            });
        });
    }

    // Initial data fetch
    fetchLocations();
});
