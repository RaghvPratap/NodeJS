const nodemailer=require("nodemailer")

const sendMail=async(req,res)=>{
    
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, 
        auth: {
             user: 'jaren98@ethereal.email',
        pass: 'sQXzNaG8quzZP5nW4n'
        },
    });

    const info = await transporter.sendMail({
        from: '"Raghv Pratap👻" <jaren98@ethereal.email>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });
    res.json(info)
}
module.exports=sendMail