// Initialize focus to the "Name" input field
const nameInput = document.querySelector('#name');
nameInput.focus();

/***
 * Job Role Selection
***/
const jobInput = document.querySelector('#title');
const otherJobInput = document.querySelector('#other-job-role');
otherJobInput.style.display = 'none';

// Hide/show "Other" job role input field based on selection
jobInput.addEventListener('input', e => {
    e.target.value === 'other' ? otherJobInput.style.display = 'block' : 
                                 otherJobInput.style.display = 'none';
});

/***
 * T-Shirt Design/Color
***/
const designInput = document.querySelector('#design');
const colorInput = document.querySelector('#color');
const colorDiv = colorInput.parentNode;
const colors = colorInput.children;

// Initialize color selection as hidden
colorDiv.style.display = 'none';

// When a theme is selected, display related color options
designInput.addEventListener('input', e => {
    colorDiv.style.display = 'block';
    
    if(e.target.value === 'js puns')
    {
        colorInput.value = colors[0].value;

        for(let i = 1; i < colors.length; i++)
        {
            if(colors[i].dataset.theme === 'js puns')
            {
                colors[i].hidden = false;
            }
            else if(colors[i].dataset.theme === 'heart js')
            {
                colors[i].hidden = true;
            }
        }
    }
    else if (e.target.value === 'heart js')
    {
        colorInput.value = colors[0].value;

        for(let i = 1; i < colors.length; i++)
        {
            if(colors[i].dataset.theme === 'heart js')
            {
                colors[i].hidden = false;
            }
            else if(colors[i].dataset.theme === 'js puns')
            {
                colors[i].hidden = true;
            }
        }
    }
});

/*** 
 * Activity Registration and Accessibility
***/
const activities = document.querySelector('#activities');
const activitiesTotal = document.querySelector('#activities-cost');
let totalCost = 0;

// Update total cost of all activities based on selected input
activities.addEventListener('input', e => {
    activityChecked = e.target.checked;
    const activityCost = e.target.dataset.cost;

    activityChecked ? totalCost += parseInt(activityCost) : 
                      totalCost -= parseInt(activityCost);

    activitiesTotal.textContent = `Total: $${totalCost}`;
});


// Accessibility for keyboard navigation
activities.addEventListener('focusin', e => {
    const label = e.target.parentNode;
    label.className = 'focus';
});
activities.addEventListener('focusout', e => {
    const label = e.target.parentNode;
    label.className = '';
});

/*** 
 * Payment Information
***/
const paymentMethods = document.querySelectorAll('.payment-methods > div');
const paymentSelect = document.querySelector('#payment');

// Initialize payment method select as 'Credit Card'
paymentSelect.selectedIndex = '1';

// Initialize other payment method divs as hidden
for(let i = 2; i < paymentMethods.length; i++)
{
    paymentMethods[i].style.display = 'none';
}

// Change payment method based on selected input
paymentSelect.addEventListener('input', e => {
    const method = e.target.value;

    for(let i = 1; i < paymentSelect.length; i++)
    {
        method !== paymentMethods[i].id ? paymentMethods[i].style.display = 'none' :
                                          paymentMethods[i].style.display = 'block';
    }
});

/*** 
 * Form Validation
***/
const form = document.querySelector('form');

// Validate all form input on submit
form.addEventListener('submit', e => {


    // If any input is invalid, do not submit form
    if(!validateName())
    {
        e.preventDefault();
        console.log('Name is not valid.')
    }
    else if (!validateEmail())
    {
        e.preventDefault();
        console.log('Email is not valid.')
    }
    else if (!validateBilling())
    {
        e.preventDefault();
        console.log('Billing is not valid.')
    }
    else if(!validateActivity())
    {
        e.preventDefault();
        console.log('Activity is not valid.')
    }
    else
    {
        // TODO: Submit form
    }
});

// Validate that the name input field is not empty
function validateName()
{
    const nameValue = nameInput.value;
    const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue);
    return nameIsValid;
}

// Validate that the email input field has the correct format
function validateEmail()
{
    const emailValue = document.querySelector('#email').value;
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
    return emailIsValid;
}

// Validate credit card, zip code and cvv code are digits and correct length
function validateBilling()
{
    if(paymentSelect.value === 'credit-card')
    {
        const numValue = document.querySelector('#cc-num').value;
        const numIsValid = /^\d{4}\d{4}\d{4}\d{1,4}$/.test(numValue);

        const zipValue = document.querySelector('#zip').value;
        const zipIsValid = /^\d{5}$/.test(zipValue);

        const cvvValue = document.querySelector('#cvv').value;
        const cvvIsValid = /^\d{3}$/.test(cvvValue);
    
        return numIsValid && zipIsValid && cvvIsValid ? true : false;
    }
    else
    {
        // Do nothing
    }
}

// Validate that at least one activity is checked
function validateActivity()
{
    const activityInputs = document.querySelectorAll('#activities-box input');

    for(let i = 0; i < activityInputs.length; i++)
    {
        return activityInputs[i].checked ? true : false;
    }
}