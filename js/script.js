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

// Add listeners to input fields to perform real-time validation
addListenersToField('name');
addListenersToField('email');
addListenersToField('cc-num');
addListenersToField('zip');
addListenersToField('cvv');

// Validate all form input on submit
form.addEventListener('submit', e => {
    // If any input is invalid, do not submit form
    if(!validateField('name'))
    {
        e.preventDefault();
    }

    if(!validateField('email'))
    {
        e.preventDefault();
    }

    if(!validateActivity())
    {
        e.preventDefault();
    }

    if(paymentSelect.value === 'credit-card')
    {
        if(!validateField('cc-num'))
        {
            e.preventDefault();
        }

        if(!validateField('zip'))
        {
            e.preventDefault();
        }

        if(!validateField('cvv'))
        {
            e.preventDefault();
        }
    }
    // Else submit form
});

// Validate input field
function validateField(field)
{
    const element = document.querySelector(`#${field}`);
    const label = element.parentNode;
    let hint = document.querySelector(`#${field}-hint`);
    let fieldIsValid = '';

    // Change validation regex based on input field
    switch(field)
    {
        case 'name':
            fieldIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(element.value);
        break;
        case 'email':
            fieldIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(element.value);
        break;
        case 'cc-num':
            fieldIsValid = /^\d{4}\d{4}\d{4}\d{1,4}$/.test(element.value);
            hint = document.querySelector(`#cc-hint`); // Necessary because #cc-hint does not contain 'num'
        break;
        case 'zip':
            fieldIsValid = /^\d{5}$/.test(element.value);
        break;
        case 'cvv':
            fieldIsValid = /^\d{3}$/.test(element.value);
        break;
    }

    // If field is not valid, flag user
    if(!fieldIsValid)
    {
        label.className = 'not-valid';
        hint.style.display = 'block';
        return false;
    }

    // If field is valid, submit
    label.className = 'valid';
    hint.style.display = 'none';
    return true;
}

// Function to add listeners to input fields to perform real-time validation
function addListenersToField(field)
{
    const element = document.querySelector(`#${field}`);

    // Remove input field flag on focus
    element.addEventListener('focus', () => {
        element.parentNode.className = '';
        element.nextElementSibling.style.display = 'none';
    });
    // Flag user if the input field is invalid
    element.addEventListener('blur', () => {
        validateField(field);
    });
}

// Validate that at least one activity is checked
function validateActivity()
{
    const activityInputs = document.querySelectorAll('#activities input');
    let activityChecked = false;

    // Loop through to check if any activities are selected
    for(let i = 0; i < activityInputs.length; i++)
    {
        activityInputs[i].checked ? activityChecked = true : activityChecked = false;
        if(activityChecked)
        {
            break;
        }
    }

    // Flag user if no activities are checked
    if (!activityChecked)
    {
        activities.className = 'activities not-valid';
        activities.lastElementChild.style.display = 'block';
        return false;
    }
    activities.className = 'activities valid';
    activities.lastElementChild.style.display = 'none';
    return true;
}

// Add listeners to Activity Registration fields to perform real-time validation
activities.addEventListener('focusin', () => {
    if(!validateActivity())
    {
        activities.className = 'activities';
        activities.lastElementChild.style.display = 'none';
    }
});
activities.addEventListener('focusout', () => {
    validateActivity();
});
activities.addEventListener('input', () => {
    validateActivity();
});