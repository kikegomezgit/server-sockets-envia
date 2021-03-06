const socket = io()

let btn = document.getElementById('send');
let response = document.getElementById('response');


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
                btn.disabled = true;
            },
            success:function(data)
            {
                if(data === 'generate'){
                    response.innerHTML = `<p>Guide created succesfully</p>`
                    counter = 1;
                    socket.emit('updateCounter', {
                        message: 'new guide created',
                        counter
                    });
                    btn.disabled = false;
                }else{
                    response.innerHTML = `<p>Something went wrong creating the guide</p>`
                    btn.disabled = false;
                }
            }
            });
}


