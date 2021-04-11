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
    if(e.target.value === 'other')
    {
        otherJobInput.style.display = 'block';
    }
    else
    {
        otherJobInput.style.display = 'none';
    }
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
 * Activity Registration
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

/*** 
 * Payment Information
***/
const paymentMethods = document.querySelectorAll('.payment-methods > div');
const paymentSelect = document.querySelector('#payment');

// Initialize payment method as 'Credit Card'
paymentSelect.selectedIndex = '1';

// Initialize other payment methods as hidden
for(let i = 2; i < paymentMethods.length; i++)
{
    paymentMethods[i].style.display = 'none';
}

// Change payment method based on selected input
paymentSelect.addEventListener('input', e => {
    const method = e.target.value;

    for(let i = 1; i < paymentSelect.length; i++)
    {
        if(method !== paymentMethods[i].id)
        {
            paymentMethods[i].style.display = 'none';
        }
        else
        {
            paymentMethods[i].style.display = 'block';
        }
    }
});