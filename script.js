function toggleMenu() {
    const nav = document.getElementById("nav-menu");
    nav.classList.toggle("show");
}

function addRow() {
    const table = document.getElementById("laborBody");
    const newRow = table.rows[0].cloneNode(true);
    newRow.querySelectorAll("input, select").forEach(input => input.value = "");
    table.appendChild(newRow);
}

function toggleCareFields() {
    const gender = document.getElementById("gender").value;
    document.getElementById("careFields").style.display = gender === "femenino" ? "block" : "none";
}

function parseDate(input) {
    const [year, month] = input.split("-");
    return new Date(parseInt(year), parseInt(month) - 1);
}

function mergePeriods(periods) {
    periods.sort((a, b) => a.from - b.from);
    const merged = [];

    for (const period of periods) {
        if (!merged.length || merged[merged.length - 1].to < period.from) {
            merged.push({ ...period });
        } else {
            merged[merged.length - 1].to = new Date(Math.max(merged[merged.length - 1].to, period.to));
        }
    }

    return merged;
}

function calculateContributions() {
    const rows = document.querySelectorAll("#laborBody tr");
    const gender = document.getElementById("gender").value;
    const birthYear = parseInt(prompt("Ingresá tu año de nacimiento (solo números):"));
    const retirementAge = gender === "femenino" ? 60 : 65;
    const retirementYear = birthYear + retirementAge;
    const currentYear = new Date().getFullYear();

    const periodsByRegimen = {
        dependencia: [],
        autonomo: [],
        monotributo: [],
        docente: []
    };

    rows.forEach(row => {
        const from = row.querySelector('input[name="from"]').value;
        const to = row.querySelector('input[name="to"]').value;
        const regimen = row.querySelector('select[name="regimen"]').value;

        if (!from || !to) return;

        const fromDate = parseDate(from);
        const toDate = parseDate(to);
        if (fromDate > toDate) return;

        periodsByRegimen[regimen].push({ from: fromDate, to: toDate });
    });

    let totalMonths = 0;
    let messages = [];

    Object.entries(periodsByRegimen).forEach(([regimen, periods]) => {
        const merged = mergePeriods(periods);
        const months = merged.reduce((sum, p) => {
            return sum + ((p.to.getFullYear() - p.from.getFullYear()) * 12 + (p.to.getMonth() - p.from.getMonth()) + 1);
        }, 0);

        totalMonths += months;

        const label = {
            dependencia: "Relación de dependencia",
            autonomo: "Autónomo",
            monotributo: "Monotributo",
            docente: "Docente"
        }[regimen];

        messages.push(`• ${label}: ${Math.floor(months / 12)} años`);
    });

    if (gender === "femenino") {
        const extraMonths = (
            (parseInt(document.getElementById("liveBirths").value) || 0) * 12 +
            (parseInt(document.getElementById("adopted").value) || 0) * 24 +
            (parseInt(document.getElementById("disabled").value) || 0) * 12 +
            (parseInt(document.getElementById("auh").value) || 0) * 24
        );
        totalMonths += extraMonths;
    }

    const totalYears = Math.floor(totalMonths / 12);
    window.totalYearsContributed = totalYears;

    let result = messages.join("\\n") + `\\n\\nTotal combinado: ${totalYears} año(s) de aportes.\\n`;

    if (totalYears >= 30 && currentYear >= retirementYear) {
        result += "¡Podés iniciar tu trámite jubilatorio!";
    } else if (totalYears >= 30 && currentYear < retirementYear) {
        result += `Ya tenés los aportes. Cumplís la edad jubilatoria en ${retirementYear}.`;
    } else if (totalYears < 30 && currentYear >= retirementYear) {
        result += `Tenés la edad, pero te faltan ${30 - totalYears} año(s) de aportes.`;
    } else {
        result += `Te faltan ${30 - totalYears} año(s) de aportes y cumplir la edad en ${retirementYear}.`;
    }

    document.getElementById("contributionResult").innerText = result;
}

function calculatePension() {
    const avg = parseFloat(document.getElementById("averageSalary").value);
    const base = parseFloat(document.getElementById("baseAmount").value);
    const years = window.totalYearsContributed || 30;
    if (!avg || !base) return;
    const extra = Math.max(0, years - 30);
    const pension = base + avg * 0.01 * extra;
    document.getElementById("pensionResult").innerText = `Haber estimado: $${pension.toFixed(2)}`;
}

function simulateScenario() {
    const extraYears = parseInt(document.getElementById("simulatedYears").value);
    const salary = parseFloat(document.getElementById("simulatedSalary").value);
    const regimen = document.getElementById("simulatedRegimen").value;

    if (!extraYears || !salary) return;

    const totalYears = (window.totalYearsContributed || 0) + extraYears;
    const base = parseFloat(document.getElementById("baseAmount").value) || 1170.23;
    const extra = Math.max(0, totalYears - 30);
    const pension = base + salary * 0.01 * extra;

    document.getElementById("simulatorResult").innerText =
        `Simulando ${extraYears} año(s) como ${regimen}, tu haber sería: $${pension.toFixed(2)}`;
}

function planForYoung() {
    const currentAge = parseInt(document.getElementById("youngAge").value);
    const startAge = parseInt(document.getElementById("startAge").value);
    const expectedYears = parseInt(document.getElementById("expectedYears").value);
    const retirementAge = 65;

    if (!currentAge || !startAge || !expectedYears) return;

    const retirementDate = startAge + expectedYears;
    const msg = retirementDate >= retirementAge
        ? "¡Vas a llegar con los años de aportes necesarios!"
        : `Proyectás jubilarte a los ${retirementDate}, te faltarían ${retirementAge - retirementDate} años.`;

    document.getElementById("youngPlanningResult").innerText = msg;
}

function calculateSavingsPlan() {
    const goal = parseFloat(document.getElementById("targetPension").value);
    const years = parseInt(document.getElementById("yearsToRetire").value);
    const rate = parseFloat(document.getElementById("interestRate").value) / 100;

    if (!goal || !years || !rate) return;

    const months = years * 12;
    const r = rate / 12;
    const savings = (goal * ((Math.pow(1 + r, months) - 1) / r)) / months;

    document.getElementById("financialPlanResult").innerText =
        `Deberías ahorrar aproximadamente $${savings.toFixed(2)} por mes.`;
}