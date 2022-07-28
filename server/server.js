const express = require('express');
const router = express.Router();
const cors = require('cors');
const morgan = require('morgan');
// const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
// const port = process.env.PORT || 8080;
const port = 5000;

const nodemailer = require('nodemailer');

// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/contact', router)

const contactEmail = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

contactEmail.verify((error) => {
    if (error) {
        console.log('error: ' + error)
        console.log('options: ' + contactEmail[1]);
    } else {
        console.log("Ready to Send");
    }
});

router.post("/contact", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    const mail = {
        from: name,
        to: "salesdesk@metaldist.com",
        subject: "Contact Form Submission",
        html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>Message: ${message}</p>`,
    };
    contactEmail.sendMail(mail, (error) => {
        if (error) {
            res.json({ status: "ERROR" });
        } else {
            res.json({ status: "Message Sent" });
        }
    });
});

const welcomeMsg= 'Welcome!!';

app.get('/contact', (req, res) => {
    res.json(welcomeMsg);
})

// app.post('/contact', cors(), async (req, res) => {
//     let {text} = req.body
//     const transport = nodemailer.createTransport({
//         host: process.env.MAIL_HOST,
//         port: process.env.MAIL_PORT,
//         auth: {
//             user: process.env.MAIL_USER,
//             pass: process.env.MAIL_PASS
//         }
//     })

//     await transport.sendMail({
//         from: process.env.MAIL_FROM,
//         to: 'test@test.com',
//         subject: 'test email',
//         html: `<div>
//                     <h1>Here is your email!<h1>
//                     <p>${text}</p>
//                 </div>`
//     })

// })

// app.listen(port, error => {
//     if (error) throw error;

// console.log('Server is listening on port ' + port)
//     })
// )
app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});