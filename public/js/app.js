const weatherForm = document.querySelector('form');
const input = document.querySelector('input');
const messageOne = document.querySelector('.message-one');
const messageTwo = document.querySelector('.message-two');

messageOne.textContent = '';
messageTwo.textContent = '';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.textContent = 'loading...';
    fetch(`http://localhost:3000/weather?address=${input.value}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
});
