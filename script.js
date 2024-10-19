document.getElementById('add').addEventListener('click', addSavings);
document.getElementById('addExpense').addEventListener('click', addExpense);
document.getElementById('setReminder').addEventListener('click', setBillReminder);
document.getElementById('showBudgetOptions').addEventListener('click', showBudgetOptions); // Show budget options
document.getElementById('showBillReminders').addEventListener('click', showBillReminders); // Show bill reminders
document.getElementById('viewBudgetSuggestions').addEventListener('click', updateBudgetSuggestions); // View budget suggestions
document.getElementById('viewReminders').addEventListener('click', displayReminders); // View reminders

let totalSavings = 0;
let totalExpenses = 0; // Track total expenses
let reminders = []; // Array to store reminders
let financialChart; // Declare the chart variable

// Function to update the pie chart
function updateFinancialChart() {
    const ctx = document.getElementById('financialChart').getContext('2d');
    const data = {
        labels: ['Savings', 'Expenses', 'Bill Reminders'],
        datasets: [{
            label: 'Financial Overview',
            data: [totalSavings, totalExpenses, reminders.length], // Use the current values
            backgroundColor: [
                'rgba(30, 144, 255, 0.6)', // Blue for savings
                'rgba(255, 99, 132, 0.6)', // Red for expenses
                'rgba(75, 192, 192, 0.6)'  // Teal for reminders
            ],
            borderColor: [
                'rgba(30, 144, 255, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        }]
    };

    // If the chart already exists, update it
    if (financialChart) {
        financialChart.data.datasets[0].data = data.datasets[0].data;
        financialChart.update();
    } else {
        // Create the chart if it doesn't exist
        financialChart = new Chart(ctx, {
            type: 'pie',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Financial Overview'
                    }
                }
            }
        });
    }
}

// Update the chart when savings are added
function addSavings() {
    const goal = document.getElementById('goal').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (goal && !isNaN(amount) && amount > 0) {
        totalSavings += amount;
        updateSavingsList(goal, amount);
        updateTotalSavings();
        updateFinancialChart(); // Update the chart with new savings
        clearInputs();
    } else {
        alert('Please enter a valid goal and amount.');
    }
}

// Update the chart when expenses are added
function addExpense() {
    const description = document.getElementById('expenseDescription').value;
    const amount = parseFloat(document.getElementById('expenseAmount').value);

    if (description && !isNaN(amount) && amount > 0) {
        totalSavings -= amount; // Subtract expense from total savings
        totalExpenses += amount; // Track total expenses
        updateExpensesList(description, amount);
        updateTotalSavings();
        updateFinancialChart(); // Update the chart with new expenses
        clearExpenseInputs();
    } else {
        alert('Please enter a valid expense description and amount.');
    }
}

// Update the chart when reminders are set
function setBillReminder() {
    const description = document.getElementById('billDescription').value;
    const date = document.getElementById('billDate').value;

    if (description && date) {
        reminders.push({ description, date }); // Store reminder in the array
        updateFinancialChart(); // Update the chart with new reminders
        clearBillInputs();
    } else {
        alert('Please enter a valid bill description and date.');
    }
}

function updateSavingsList(goal, amount) {
    const savingsList = document.getElementById('savingsList');
    const item = document.createElement('div');
    item.classList.add('savings-item');
    item.textContent = `${goal}: $${amount.toFixed(2)}`;
    savingsList.appendChild(item);
}

function updateExpensesList(description, amount) {
    const savingsList = document.getElementById('savingsList');
    const item = document.createElement('div');
    item.classList.add('savings-item');
    item.textContent = `Expense - ${description}: -$${amount.toFixed(2)}`;
    savingsList.appendChild(item);
}

function updateTotalSavings() {
    document.getElementById('totalSavings').textContent = `$${totalSavings.toFixed(2)}`;
}

function clearInputs() {
    document.getElementById('goal').value = '';
    document.getElementById('amount').value = '';
}

function clearExpenseInputs() {
    document.getElementById('expenseDescription').value = '';
    document.getElementById('expenseAmount').value = '';
}

function clearBillInputs() {
    document.getElementById('billDescription').value = '';
    document.getElementById('billDate').value = '';
}

function showBudgetOptions() {
    document.getElementById('budgetOptions').style.display = 'block'; // Show budget options
    document.getElementById('remindersOptions').style.display = 'none'; // Hide reminders options
}

function showBillReminders() {
    document.getElementById('remindersOptions').style.display = 'block'; // Show reminders options
    document.getElementById('budgetOptions').style.display = 'none'; // Hide budget options
}

function updateBudgetSuggestions() {
    const budgetSuggestions = document.getElementById('budgetSuggestions');
    budgetSuggestions.innerHTML = ''; // Clear previous suggestions
    budgetSuggestions.style.display = 'block'; // Show the suggestions section

    // Example suggestions based on savings and expenses
    if (totalSavings > 0) {
        budgetSuggestions.innerHTML += `<div>Great job! You have saved $${totalSavings.toFixed(2)}.</div>`;
    }

    if (totalExpenses > 0) {
        budgetSuggestions.innerHTML += `<div>Be mindful of your expenses. You have spent $${totalExpenses.toFixed(2)}.</div>`;
    }

    if (totalSavings < totalExpenses) {
        budgetSuggestions.innerHTML += `<div>Consider reducing your expenses to save more.</div>`;
    } else if (totalSavings >= totalExpenses) {
        budgetSuggestions.innerHTML += `<div>Your savings are greater than or equal to your expenses. Keep it up!</div>`;
    }
}

function displayReminders() {
    const remindersList = document.getElementById('remindersList');
    remindersList.innerHTML = ''; // Clear previous reminders
    remindersList.style.display = 'block'; // Show the reminders section

    if (reminders.length === 0) {
        remindersList.innerHTML = '<div>No reminders set.</div>';
    } else {
        reminders.forEach(reminder => {
            const item = document.createElement('div');
            item.classList.add('savings-item');
            item.textContent = `Reminder - ${reminder.description}: Due on ${reminder.date}`;
            remindersList.appendChild(item);
        });
    }
}

document.getElementById('userInfoForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get user input values
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Store or process the user information as needed
    console.log('User Information:', { name, age, gender, email, phone });

    // Redirect to the main application or show a success message
    alert('Welcome, ' + name + '! Your information has been submitted.');

    // Redirect to the main savings manager page
    window.location.href = 'index.html'; // Ensure this points to your main page
});
