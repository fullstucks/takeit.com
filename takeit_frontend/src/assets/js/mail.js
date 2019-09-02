/*$('.submitRegistro').click(function() {
    $.ajax({
        type: "POST",
        url: "https://mandrillapp.com/api/1.0/messages/send.json",
        data: {
            'key': "181731f5d43fbc302ee962508d2510b2-us4",
            'message': {
                'from_email': 'takeitdotcom@gmail.com',
                'to': [{
                    'email': $('.email_input').val(),
                    'name': $('.name_input').val() + $('.lastname_input').val(),
                    'type': 'to'
                }, ],
                'autotext': 'true',
                'subject': "Confirmación de Registro",
                'html': 'Has sido registrado exitosamente.'
            }
        }
    }).done(function(response) {
        console.log(response); // if you're into that sorta thing
    });
});*/


var btn = document.getElementById("submitRegistro");
var m = new mandrill.Mandrill('181731f5d43fbc302ee962508d2510b2-us4'); // This will be public

if (btn.addEventListener)
    btn.addEventListener("click", sendMail, false);
else if (btn.attachEvent)
    btn.attachEvent('onclick', sendMail);

function sendMail() {
    m.messages.send({
        "message": {
            "from_email": "takeitdotcom@gmail.com",
            "from_name": "Takeit",
            "to": [{ "email": $('.email_input').val(), "name": $('.name_input').val(), }], // Array of recipients
            "subject": "Confirmación de Registro",
            "text": "Has sido registrado exitosamente." // Alternatively, use the "html" key to send HTML emails rather than plaintext
        }
    });
}