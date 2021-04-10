// Initialize focus to the "Name" input field
const nameInput = document.querySelector('#name');
nameInput.focus();

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