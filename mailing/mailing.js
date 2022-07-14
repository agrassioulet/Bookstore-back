nodeMailer = require('nodemailer')



var transporter = nodeMailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'alexandre.grassioulet@zoho.com',
        pass: 'Voiture99::'
    }
});

module.exports = 
{

    sendEMail: function (dest, subject, refClient) {

        var mailOptions = {
            from: '"Support Bookstore" <alexandre.grassioulet@zoho.com>', // sender address
            to: dest,
            subject: subject,
            text: 'body',
            html: '<p>Bonjour</p>' +
            '<p>Votre commande n°' + refClient + ' a bien été enregistrée.</p>' +
            "<p>Vous pouvez suivre l'évolution de la livraison dans votre compte.</p>" +
            "<p>Le support Bookstore</p>"
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
            res.render('index');
        })
    }
    
    

}



