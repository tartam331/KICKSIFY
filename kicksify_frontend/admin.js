document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:5000/users")
        .then(response => response.json())
        .then(data => {
            document.getElementById("userCount").innerText = data.length;
            let userList = document.getElementById("userList");
            data.forEach(user => {
                let li = document.createElement("li");
                li.textContent = user.name;
                userList.appendChild(li);
            });
        });

    fetch("http://localhost:5000/products")
        .then(response => response.json())
        .then(data => {
            document.getElementById("orderCount").innerText = data.length;
            let productList = document.getElementById("productList");
            data.forEach(product => {
                let li = document.createElement("li");
                li.textContent = product.name;
                productList.appendChild(li);
            });
        });
});

function showPage(page) {
    document.querySelectorAll(".admin-section").forEach(section => {
        section.style.display = "none";
    });
    document.getElementById(page).style.display = "block";
}
