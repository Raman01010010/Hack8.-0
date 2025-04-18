const nodemailer=require("nodemailer")
require("dotenv").config();
const sendEmail=async(subjects,message,send_to,send_from,reply_to)=>{

    const transporter =nodemailer.createTransport({

        host:process.env.HOST,
        port: "465",
        secure: true,
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASS,
        },
        tls:{
            rejectUnauthorized:false,
        }

    })
    const options={
        from:"20223177.gdscmnnit.24@gmail.comm",
        to:send_to,
        replyTo:reply_to,
        subject:"One time password forCRYPTO",
        html:` <body
        style="
          margin: 0;
          font-family: 'Poppins', sans-serif;
          background: #ffffff;
          font-size: 14px;
        "
      >
        <div
          style="
            max-width: 680px;
            margin: 0 auto;
            padding: 45px 30px 60px;
            background:#048c88;
           
            background-repeat: no-repeat;
            background-size: 800px 452px;
            background-position: top center;
            font-size: 14px;
            color: #434343;
          "
        >
          <header>
            <table style="width: 100%;">
              <tbody>
                <tr style="height: 0;">
                  <td>
                  
                  </td>
                  <td style="text-align: right;">
                    <span
                      style="font-size: 16px; line-height: 30px; color: #ffffff;"
                      >${new Date()}</span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </header>
    
          <main>
            <div
              style="
                margin: 0;
                margin-top: 70px;
                padding: 92px 30px 115px;
                background: #ffffff;
                border-radius: 30px;
                text-align: center;
              "
            >
              <div style="width: 100%; max-width: 489px; margin: 0 auto;">
                <h1
                  style="
                    margin: 0;
                    font-size: 24px;
                    font-weight: 500;
                    color: #1f1f1f;
                  "
                >
                OTP forCRYPTO
                </h1>
                <p
                  style="
                    margin: 0;
                    margin-top: 17px;
                    font-size: 16px;
                    font-weight: 500;
                  "
                >
                  HELLO!! Welcome toCRYPTO
                </p>
                <p
                  style="
                    margin: 0;
                    margin-top: 17px;
                    font-weight: 500;
                    letter-spacing: 0.56px;
                  "
                >Thank you for registering toCRYPTO. Use the following OTP to complete the procedure to confirm your email address. OTP is valid for 10 minutes. Do not share this code with others.
               
                </p>
                <p
                  style="
                    margin: 0;
                    margin-top: 60px;
                    font-size: 40px;
                    font-weight: 600;
                    letter-spacing: 25px;
                    color: #ba3d4f;
                  "
                >
                ${message}
                </p>
              </div>
            </div>
    
            <p
              style="
                max-width: 400px;
                margin: 0 auto;
                margin-top: 90px;
                text-align: center;
                font-weight: 500;
                color: #8c8c8c;
              "
            >
              Need help? Ask at
              <a
                href="mailto:20223177.gdscmnnit.24@gmail.com"
                style="color: #499fb6; text-decoration: none;"
                >20223177.gdscmnnit.24@gmail.com</a
              >
              or visit our
              <a
                href=""
                target="_blank"
                style="color: #499fb6; text-decoration: none;"
                >Help Center</a
              >
            </p>
          </main>
    
          <footer
            style="
              width: 100%;
              max-width: 490px;
              margin: 20px auto 0;
              text-align: center;
              border-top: 1px solid #e6ebf1;
            "
          >
            <p
              style="
                margin: 0;
                margin-top: 40px;
                font-size: 16px;
                font-weight: 600;
                color: #434343;
              "
            >
             CRYPTO Team
            </p>
            <p style="margin: 0; margin-top: 8px; color: #434343;">
             MNNIT ALAHABAD
            </p>
            <div style="margin: 0; margin-top: 16px;">
              <a href="" target="_blank" style="display: inline-block;">
                <img
                  width="36px"
                  alt="Facebook"
                  src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661502815169_682499/email-template-icon-facebook"
                />
              </a>
              <a
                href=""
                target="_blank"
                style="display: inline-block; margin-left: 8px;"
              >
                <img
                  width="36px"
                  alt="Instagram"
                  src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661504218208_684135/email-template-icon-instagram"
              /></a>
              <a
                href=""
                target="_blank"
                style="display: inline-block; margin-left: 8px;"
              >
                <img
                  width="36px"
                  alt="Twitter"
                  src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503043040_372004/email-template-icon-twitter"
                />
              </a>
              <a
                href=""
                target="_blank"
                style="display: inline-block; margin-left: 8px;"
              >
                <img
                  width="36px"
                  alt="Youtube"
                  src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503195931_210869/email-template-icon-youtube"
              /></a>
            </div>
            <p style="margin: 0; margin-top: 16px; color: #434343;">
              Copyright © ${new Date().getFullYear()}CRYPTO. All rights reserved.
            </p>
          </footer>
        </div>
      </body>`
        
        //`<h1>Welcome to college connct </h1>
        //<h2>Connect with your college friends and interact with them at one place </h2>Your otp for login is ${message}`
    }
    //send email
    transporter.sendMail(options,function(err,info){
        if(err){
            console.log("error email send",err)
        }else{
            console.log(info)
        }
    })
}
module.exports=sendEmail