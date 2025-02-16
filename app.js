// Signup Function
function signUp() {
    let username = document.getElementById("signupUsername").value;
    let password = document.getElementById("signupPassword").value;
    let role = document.getElementById("signupRole").value;
    
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ username, password, role });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful!");
}

// Login Function
function login() {
    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        window.location.href = user.role === "admin" ? "admin.html" : "student.html";
    } else {
        alert("Invalid credentials");
    }
}

// Logout Function
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}

// Add PDF (Admin Functionality)
function addPDF() {
    let title = document.getElementById("pdfTitle").value;
    let fileInput = document.getElementById("pdfFile");
    let file = fileInput.files[0];
    
    if (!title || !file) {
        alert("Please provide a title and select a file.");
        return;
    }
    
    let reader = new FileReader();
    reader.onload = function(event) {
        let pdfData = event.target.result;
        let pdfs = JSON.parse(localStorage.getItem("pdfs")) || [];
        pdfs.push({ title, pdfData });
        localStorage.setItem("pdfs", JSON.stringify(pdfs));
        displayPDFs();
    };
    reader.readAsDataURL(file);
}

// Display PDFs
function displayPDFs() {
    let pdfList = document.getElementById("pdfList");
    pdfList.innerHTML = "";
    let pdfs = JSON.parse(localStorage.getItem("pdfs")) || [];
    
    pdfs.forEach((pdf, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${pdf.title} <button onclick="downloadPDF(${index})">Download</button> <button onclick="deletePDF(${index})">Delete</button>`;
        pdfList.appendChild(li);
    });
}

// Download PDFs
function downloadPDF(index) {
    let pdfs = JSON.parse(localStorage.getItem("pdfs")) || [];
    let pdf = pdfs[index];
    let a = document.createElement("a");
    a.href = pdf.pdfData;
    a.download = `${pdf.title}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Delete PDF (Admin Functionality)
function deletePDF(index) {
    let pdfs = JSON.parse(localStorage.getItem("pdfs")) || [];
    pdfs.splice(index, 1);
    localStorage.setItem("pdfs", JSON.stringify(pdfs));
    displayPDFs();
}

// Search PDFs
function searchPDF() {
    let searchInput = document.getElementById("searchInput").value.toLowerCase();
    let pdfs = JSON.parse(localStorage.getItem("pdfs")) || [];
    let filteredPDFs = pdfs.filter(pdf => pdf.title.toLowerCase().includes(searchInput));
    
    let pdfList = document.getElementById("pdfList");
    pdfList.innerHTML = "";
    
    filteredPDFs.forEach((pdf, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${pdf.title} <button onclick="downloadPDF(${index})">Download</button> <button onclick="deletePDF(${index})">Delete</button>`;
        pdfList.appendChild(li);
    });
}
