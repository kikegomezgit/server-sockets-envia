const socket = io()

let btn = document.getElementById('send');
let response = document.getElementById('response');
let counter = 0;



btn.addEventListener('click', function () {
    createGuide();
})

function createGuide() {
         $.ajax({
            url: '/createGuide',
            method:'GET',
            dataType: 'text',
            beforeSend:function(){
                response.innerHTML = `<p>Attempting to create guide...</p>`
            },
            success:function(data)
            {
                if(data === 'generate'){
                    response.innerHTML = `<p>Guide created succesfully</p>`
                    counter = counter+1;
                    socket.emit('updateCounter', {
                        message: 'new guide created',
                        counter
                    });
                }else{
                    response.innerHTML = `<p>Something went wrong creating the guide</p>`
                }
            }
            });
}


