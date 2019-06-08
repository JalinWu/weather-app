// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })

// fetch('http://localhost:3000/weather?address=boston').then((response) => {
//     response.json().then((data) => {
//         if(data.error){
//             console.log('Error occured');
//         }else {
//             console.log(data);
//         }
//     })
// })

$('form').submit((e) => {
    e.preventDefault();
    $('#msg-1').text('Loading...');
    $('#msg-2').text('');
    // console.log($('input').val());
    fetch(`/weather?address=${$('input').val()}`).then((response) => {
    response.json().then((data) => {
        if(data.error){
            console.log('Error occured');
            $('#msg-1').text(data.error)
        }else {
            console.log(data);
            $('#msg-1').text('location: '+data[0].location)
            $('#msg-2').text('forecast: '+data[0].forecast)
        }
    })
})
})