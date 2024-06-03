document.addEventListener("DOMContentLoaded", function () {
    const mainScreen = document.getElementById('main-screen');
    const loginScreen = document.getElementById('login-screen');
    const detailScreen = document.getElementById('detail-screen');
    const addScreen = document.getElementById('add-screen')

    const loginForm = document.getElementById('login-form');
    const addForm = document.getElementById('add-form');
    const detailForm = document.getElementById('detail-form');

    const logoutButton = document.getElementById('logout-button');
    const addButton = document.getElementById('add-button');

    const updateButtonDetail = document.getElementById('update-button-detail');
    const deleteButtonDetail = document.getElementById('delete-button-detail');
    const cancelButtonDetail = document.getElementById('cancel-button-detail');

    const cancelButtonAdd = document.getElementById('cancel-button-add');

    let currentUserRole = null;
    let detailData = null;

    // Users and Passwords mit Rollen und Namen
    const users = [
        {
            username: "admina",
            password: "password",
            role: "admin",
            name: "Mina"
        },
        {
            username: "normalo",
            password: "password",
            role: "non-admin",
            name: "Norman"
        }
    ];
    // Daten für die Tabelle
    const tableData = [
        {
            name: "Reichstag",
            description: "Glas Dome is badly isolated",
            street: "Platz der Republik 1",
            zip: "10557",
            city: "Berlin",
            category: "other",
            longitude: "13.3762818",
            latitude: "52.5185941",
            image: "images/reichstag.jpg"
        },
        {
            name: "AfD Landesverband Berlin",
            description: "Members are wasting air by talking",
            street: "Eichhorster Weg 80",
            zip: "13435",
            city: "Berlin",
            category: "other",
            longitude: "13.341176986694336",
            latitude: "52.60006332397461",
            image: "images/afdLandesverband.jpeg"
        },
        /*
        {
            name: "Heizkraftwerk Moabit",
            description: "Burning coal is freeing CO2",
            street: "Friedrich Krause Ufer 10",
            zip: "13353",
            city: "Berlin",
            category: "Industry",
            longitude: "13.3503144",
            latitude: "52.5377307",
            image: "images/Kraftwerk_Moabit_at_Berlin-Spandauer-Schifffahrtskanal_01.jpg"
        },
        */
        {
            name: "Berghain",
            description: "Use of Partydrugs is lowering tap water quality",
            street: "Am Wriezener Bahnhof",
            zip: "10243",
            city: "Berlin",
            category: "Parks & Rec.",
            longitude: "13.43916491",
            latitude: "52.50666464",
            image: "images/Berghain.jpg"

        }
    ];

    function updateWelcomeMessage(name) {
        const welcomeMessage = document.getElementById('welcome-message');
        welcomeMessage.textContent = "Welcome, " + name + "!";
    }

    function populateTable(data) {
        const tbody = document.getElementById('tableBody');
        tbody.innerHTML = ''; // Clear existing rows
        data.forEach((row, index) => {
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
            tr.addEventListener('click', () => showDetailScreen(index));
            tbody.appendChild(tr);
        });
    }

    function showDetailScreen(index) {
        detailData = tableData[index];
        document.getElementById('location-name-edit').value = detailData.name;
        document.getElementById('location-description-edit').value = detailData.description;
        document.getElementById('location-street-edit').value = detailData.street;
        document.getElementById('location-zip-edit').value = detailData.zip;
        document.getElementById('location-city-edit').value = detailData.city;
        document.getElementById('location-category-edit').value = detailData.category;
        document.getElementById('longID').value = detailData.longitude;
        document.getElementById('latID').value = detailData.latitude;
        document.getElementById('currentImage').src = detailData.image;

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
        console.log(encodeURIComponent(address));
        console.log()
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

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Verhindert das Standard-Formular-Verhalten

        // get username and password
        const enteredUsername = document.getElementById('username').value;
        const enteredPassword = document.getElementById('password').value;

        // checken ob Username und Password korrekt sind
        const user = users.find(user => user.username === enteredUsername && user.password === enteredPassword);

        if (user) {
            currentUserRole = user.role;
            loginScreen.classList.add('d-none');
            mainScreen.classList.remove('d-none');
            updateWelcomeMessage(user.name);
            populateTable(tableData); // Populate the table with data

            if (user.role === 'admin') {
                addButton.classList.remove('d-none');
            } else {
                addButton.classList.add('d-none');
            }
        } else {
            // Wenn falsch, zeige eine Fehlermeldung
            alert('Wrong username or password!');
        }
    });

    logoutButton.addEventListener('click', function () {
        // Beim Klicken auf den Logout-Button, blende den Main-Screen aus und zeige den Login-Screen an
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
            const imageURL = URL.createObjectURL(imageFile);
            console.log(longitude);
            console.log(latitude)
            console.log(imageURL)

            tableData.push({
                name,
                description,
                street,
                zip,
                city,
                category,
                longitude,
                latitude,
                image: imageURL
            });

            mainScreen.classList.remove('d-none');
            addScreen.classList.add('d-none');

            populateTable(tableData);
        } catch (error) {
            alert("Error in the geoservice request ");
            console.error('Error in the geoservice request:', error);
        }
    });

    cancelButtonAdd.addEventListener('click', function () {
        mainScreen.classList.remove('d-none');
        addScreen.classList.add('d-none');
    });

    deleteButtonDetail.addEventListener('click', function () {
        tableData.splice(tableData.indexOf(detailData), 1);
        detailData = null;

        mainScreen.classList.remove('d-none');
        detailScreen.classList.add('d-none');

        populateTable(tableData);
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
            const imageURL = imageFile ? URL.createObjectURL(imageFile) : detailData.image;

            detailData.name = name;
            detailData.description = description;
            detailData.street = street;
            detailData.zip = zip;
            detailData.city = city;
            detailData.category = category;
            detailData.longitude = longitude;
            detailData.latitude = latitude;
            detailData.image = imageURL;

            tableData[tableData.indexOf(detailData)] = detailData;
            detailData = null;

            mainScreen.classList.remove('d-none');
            detailScreen.classList.add('d-none');

            populateTable(tableData);
        } catch (error) {
            alert(`Error in the geoservice request`);
            console.error('Error in the geoservice request:', error);
        }
    });

});