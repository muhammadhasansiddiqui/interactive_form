const nameInput = document.querySelector('#name');
nameInput.focus();

const jobInput = document.querySelector('#title');
const otherJobInput = document.querySelector('#other-job-role');
otherJobInput.style.display = 'none';

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