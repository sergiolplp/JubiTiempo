body {
    font-family: 'Segoe UI', sans-serif;
    margin: 0;
    background-color: #f4faff;
    color: #003366;
    padding-top: 80px; /* espacio para header fijo */
}

header {
    background-color: #cce6ff;
    padding: 1em;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

header h1 {
    margin: 0;
    font-size: 1.5em;
}

.logo {
    height: 40px;
    margin-right: 10px;
}

.menu-toggle {
    display: none;
    background: none;
    border: none;
    font-size: 28px;
    color: #003366;
    cursor: pointer;
}

nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

nav ul li {
    margin: 0 10px;
}

nav ul li a {
    text-decoration: none;
    color: #003366;
    font-weight: bold;
    padding: 8px 12px;
    border-radius: 8px;
    transition: background-color 0.3s;
}

nav ul li a:hover {
    background-color: #b3daff;
}

section {
    padding: 30px 20px;
    width: 100%;
    box-sizing: border-box;
    background-color: #ffffff;
    border-radius: 20px;
    box-shadow: 0 4px 10px rgba(0, 51, 102, 0.1);
    margin: 20px 0;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

th, td {
    padding: 10px;
    border: 1px solid #99c2ff;
    border-radius: 8px;
    background-color: #f9fbff;
}

input[type="text"], input[type="month"], input[type="number"], select {
    width: 100%;
    padding: 6px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-sizing: border-box;
    background-color: #fff;
}

button {
    background-color: #007acc;
    color: white;
    border: none;
    padding: 8px 16px;
    margin-top: 10px;
    border-radius: 12px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #005c99;
}

footer {
    background-color: #cce6ff;
    text-align: center;
    padding: 20px;
    font-size: 0.9em;
    margin-top: 50px;
    color: #003366;
}

#contributionResult, #pensionResult, #simulatorResult, #youngPlanningResult, #financialPlanResult {
    margin-top: 10px;
    font-weight: bold;
    background-color: #e6f2ff;
    padding: 10px;
    border-radius: 10px;
    border-left: 4px solid #3399ff;
}

/* Responsive */
@media screen and (max-width: 768px) {
    nav ul {
        display: none;
        flex-direction: column;
        background-color: #cce6ff;
        position: absolute;
        top: 70px;
        left: 0;
        width: 100%;
        z-index: 999;
    }

    nav ul.show {
        display: flex;
    }

    .menu-toggle {
        display: block;
    }

    nav {
        flex-grow: 1;
    }
}