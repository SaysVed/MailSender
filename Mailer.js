// qr_email.js
import qr from "qrcode";
import nodemailer from "nodemailer";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

async function startEmail() {

  var rawData = fs.readFileSync("dataList.json");
  var data = JSON.parse(rawData);
  for (let i = 0; i < data.length; i++) {
    try {
      await sendQRCodeEmail(data[i].email, data[i].regNo, data[i].name);
      await delay(3000); // Wait for 3 seconds before sending the next email
    } catch (error) {
      console.error("Error sending email:", data[i].regNo, data[i].name);
      // If an email fails to send, create a new JSON file and store the registration number
      createErrorJSON(data.slice(i));
      return; // Stop the iteration
    }
  }
}

// Function to send the QR code embedded in the email body
async function sendQRCodeEmail(email, regNo, name) {
  const transporter = nodemailer.createTransport({
    service: "gmail", // e.g., 'Gmail'
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });


  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Event Pass: Roadmap to Cybersecurity by AWS Cloud Club LPU",
    text: "Please find the QR code for your registration below:",
    html: htmlTemplate(name),
    attachments: [
      {
        filename: "QRCode.png",
        path: `./QrCodes/${regNo}.png`,
        cid: "qr",
      },
    ],
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", regNo, name);
  } catch (error) {
    console.error("Error sending email:", regNo, name);
  }
}



// qr_template.js
const htmlTemplate = (name) =>
  `<div dir="ltr"><table valign="top" bgcolor="#FF9900" width="100%" role="presentation" cellspacing="0" cellpadding="0" style="background-color:rgb(255,153,0);table-layout:fixed;vertical-align:top;min-width:320px;margin:0px auto;border-spacing:0px;border-collapse:collapse;width:500px"><tbody><tr valign="top" style="vertical-align:top"><td valign="top" style="word-break:break-word;vertical-align:top;border-collapse:collapse"><div style="background-color:transparent"><div style="margin:0px auto;min-width:320px;max-width:650px;word-break:break-word;background-color:transparent"><div style="border-collapse:collapse;display:table;width:500px;background-color:transparent"><div style="min-width:320px;max-width:650px;display:table-cell;vertical-align:top"><div style="width:500px"><div style="border-width:0px;border-style:solid;border-color:transparent;padding:5px 0px"><br></div></div></div></div></div></div><div style="background-color:transparent"><div style="margin:0px auto;min-width:320px;max-width:650px;word-break:break-word;background-color:rgb(255,255,255)"><div style="border-collapse:collapse;display:table;width:500px"><div style="min-width:320px;max-width:650px;display:table-cell;vertical-align:top"><div style="width:500px"><div style="border-width:0px 8px;border-style:solid;border-color:rgb(255,153,0);padding:50px 50px 5px"><div style="line-height:15.6px;padding:10px"><div style="line-height:14px"><p style="line-height:16px;margin:0px"><span style="color:rgb(35,47,62);font-size:16px"><font face="verdana, sans-serif"><b>Hey ${name}!</b></font></span></p></div></div></div></div></div></div></div></div><div style="background-color:transparent"><div style="margin:0px auto;min-width:320px;max-width:650px;word-break:break-word;background-color:rgb(255,255,255)"><div style="border-collapse:collapse;display:table;width:500px"><div style="min-width:320px;max-width:650px;display:table-cell;vertical-align:top"><div style="width:500px"><div style="border-width:0px 8px;border-style:solid;border-color:rgb(255,153,0);padding:25px 0px 0px"><div align="center" style="padding-right:0px;padding-left:0px"><img align="center" border="0" src="https://ci4.googleusercontent.com/proxy/5DzZBAAWTWUPpcihy_Ps34RhDCazv3G5E1FgKO3xZ1gky80E8DzyHPhWfOtHFcSnX1eXeBogkCwi9D1iFh1O-KJOul_P32zcIDh3QDmbbLyFlrFjhLy1p7dDSd1VCwHITonnIQ9tj1uUcBjrXJ8BxOxe80F5UOlC34kNry2pgBg4eaE19EB2aQ9b=s0-d-e1-ft#https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/53601_111631/Personal%20message/divider.png" alt="Image" title="Image" width="634" style="outline:none;clear:both;border:0px;height:auto;float:none;width:484px;max-width:634px;display:block" class="CToWUd" data-bit="iit"></div></div></div></div></div></div></div><div style="background-color:transparent"><div style="margin:0px auto;min-width:320px;max-width:650px;word-break:break-word;background-color:rgb(255,255,255)"><div style="border-collapse:collapse;display:table;width:500px"><div style="min-width:320px;max-width:650px;display:table-cell;vertical-align:top"><div style="width:500px"><div style="border-width:0px 8px;border-style:solid;border-color:rgb(255,153,0);padding:35px 50px 5px"><div style="line-height:19.5px;padding:15px 10px 10px"><div style="font-size:12px;line-height:18px"><p style="font-size:14px;line-height:25px;margin:0px">We hope you are enjoying your life at LPU. We saw that you have registered for the event: "<b>Roadmap To CyberSecurity</b>" hosted by <b>AWS Cloud Club LPU</b>. We want to make sure that you have all the necessary details for a successful experience.<br><br><b>Event Details:<br>Date: September 8th, 2023<br>Time: 9:00 AM to 3:00 PM<br>(12 Noon to 1 PM will be Lunch Break)<br>Venue: 34-111 (Block 34, Room No. 111)<br><br><u>Please know that you will NOT be allowed to leave the venue during the time period of 9am to 3pm, apart from the Lunch Break. If you have any CAs or Lab Evaluations, then please attend those.</u><br><br></b><b><u>Note: Laptop &amp; charger are mandatory for all attendees,&nbsp;no entries will be allowed otherwise.</u></b><br><br>Mandatory Requirements: To make the most of the session, it's essential to bring your laptop and charger. Ensure your laptop is in good working order and fully charged.<br><br>Punctuality Matters: Our event kicks off promptly at 9:00 am <b>and we have limited seats</b> so late entry won't be possible. Arriving a bit earlier will help you get settled and ensure a smooth start.<br><br><b><u>EVENT PASS</u></b><br><div style="width:100%;display:flex;justify-content:center;align-items:center;"><img src="cid:qr" alt="QR Code" style="width:250px;"></div><br><br><p style="font-size:14px;line-height:25px;margin:0px">We're eagerly anticipating your presence in the event. If you have any questions or require further assistance, don't hesitate to reach out to us.</p><br><br><b>Best regards,<br>AWS&nbsp;Cloud&nbsp;Club&nbsp;LPU<br><br></br><br></p></div></div></div></div></div></div></div></div><div style="background-color:rgb(227,250,255)"><div style="margin:0px auto;min-width:320px;max-width:650px;word-break:break-word"><div style="border-collapse:collapse;display:table;width:500px"><div style="min-width:320px;max-width:650px;display:table-cell;vertical-align:top"><div style="width:500px"><div style="border-width:0px 8px;border-style:solid;border-color:rgb(255,153,0);padding:0px 0px 45px"><div align="left" style="padding-right:0px;padding-left:50px"></div></div></div></div></div></div></div><div style="background-color:transparent"><div style="margin:0px auto;min-width:320px;max-width:650px;word-break:break-word;background-color:rgb(227,250,255)"><div style="border-collapse:collapse;display:table;width:500px"><div style="min-width:320px;max-width:650px;display:table-cell;vertical-align:top"><div style="width:500px"><div style="border-width:0px 8px;border-style:solid;border-color:rgb(255,153,0);padding:30px 0px 25px"><div align="center" style="padding-right:0px;padding-left:0px"><img align="center" border="0" src="https://ci4.googleusercontent.com/proxy/cCJINsVbvIESDmgoWRm3dF1EywlJg0Yd5gIH-brOWRCvNHBrj_3xsrpUA3QU4RLknxyFLU3FB7vrOCq3UQHiPA7MCULYx-YumG0O4nVBpdXBafC28cAcH-audo58VeJGce_Y-UjG=s0-d-e1-ft#https://logos-world.net/wp-content/uploads/2021/08/Amazon-Web-Services-AWS-Logo.png" alt="Image" title="Image" width="158" style="outline:none;clear:both;border:0px;height:auto;float:none;width:158px;max-width:158px;display:block" class="CToWUd a6T" data-bit="iit" tabindex="0"><div class="a6S" dir="ltr" style="opacity: 0.01; left: 353.8px; top: 1077.83px;"><div id=":249" class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q" role="button" tabindex="0" aria-label="Download attachment " jslog="91252; u014N:cOuCgd,Kr2w4b,xr6bB; 4:WyIjbXNnLWE6cjkwNjU1OTk4NzE4ODAzNjY0NTQiLG51bGwsW10sbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsW10sW10sW11d" data-tooltip-class="a1V" jsaction="JIbuQc:.CLIENT" data-tooltip="Download"><div class="akn"><div class="aSK J-J5-Ji aYr"></div></div></div></div></div><div style="color:rgb(53,53,53);font-family:Arial,&quot;Helvetica Neue&quot;,Helvetica,sans-serif;line-height:15.6px;padding:10px 10px 0px"><div style="font-size:12px;line-height:14px"><p style="font-size:14px;line-height:16px;text-align:center;margin:0px"><strong>FOLLOW US ON</strong></p></div></div><table cellpadding="0" cellspacing="0" width="100%" role="presentation" valign="top" style="table-layout:fixed;vertical-align:top;border-spacing:0px;border-collapse:collapse"><tbody><tr valign="top" style="vertical-align:top"><td valign="top" style="word-break:break-word;vertical-align:top;padding:5px 10px 10px;border-collapse:collapse"><table align="center" cellpadding="0" cellspacing="0" role="presentation" valign="top" style="table-layout:fixed;vertical-align:top;border-spacing:0px"><tbody><tr align="center" valign="top" style="vertical-align:top;display:inline-block;text-align:center"><td valign="top" style="word-break:break-word;vertical-align:top;padding-bottom:5px;padding-right:5px;padding-left:5px;border-collapse:collapse"><a href="https://m.facebook.com/AWSCloudCommunityLPU/" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://m.facebook.com/AWSCloudCommunityLPU/&amp;source=gmail&amp;ust=1693773312350000&amp;usg=AOvVaw0KJV3KepTnZdDkskdLhnUx"><img width="32" height="32" src="https://ci6.googleusercontent.com/proxy/WN6uTZPYAOPmQfy-9J0ZzOJblkPaSs00Fhn7j7UHm2kFzOwqhbWWDmH9hvv9KkKISHCKVAU_DFYb3H-t0fqDEQtbK_MQLElKdQfhoy6f70jdDdhN90ZW1J3s_jLRi5QLrOFOWlaQUO1OsV51H52niTp77Q8KBu2MxmZp4SV7FdfCxUAp8RUlmd4=s0-d-e1-ft#https://d2fi4ri5dhpqd1.cloudfront.net/public/resources/social-networks-icon-sets/t-only-logo-dark-gray/facebook@2x.png" alt="Facebook" title="Facebook" style="outline:none;text-decoration-line:none;clear:both;height:auto;float:none;border:none;display:block" class="CToWUd" data-bit="iit"></a></td><td valign="top" style="word-break:break-word;vertical-align:top;padding-bottom:5px;padding-right:5px;padding-left:5px;border-collapse:collapse"><a href="https://twitter.com/AWSCCLPU" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://twitter.com/AWSCCLPU&amp;source=gmail&amp;ust=1693773312350000&amp;usg=AOvVaw1SmGT0dOVriYJjV_Zl-WK1"><img width="32" height="32" src="https://ci4.googleusercontent.com/proxy/8u3BJ6cbjsnNu81tX8sripKUWNp5KrHWG_wN5qGT9Oj4yO8Oev_gFxzPn-Ts2gjepmBMywk4GMU3VIxNuxLvKE1VUEycFDtVKXC53xl4gIVd8HmYdXYxBZhP7nEkymY-Sr_gt650Rccl5y-aklDJ41iSUlG94-XaywtjPhH1JAzlVdYgPDGz5Q=s0-d-e1-ft#https://d2fi4ri5dhpqd1.cloudfront.net/public/resources/social-networks-icon-sets/t-only-logo-dark-gray/twitter@2x.png" alt="Twitter" title="Twitter" style="outline:none;text-decoration-line:none;clear:both;height:auto;float:none;border:none;display:block" class="CToWUd" data-bit="iit"></a></td><td valign="top" style="word-break:break-word;vertical-align:top;padding-bottom:5px;padding-right:5px;padding-left:5px;border-collapse:collapse"><a href="https://www.instagram.com/awscloudcommunity_lpu/" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.instagram.com/awscloudcommunity_lpu/&amp;source=gmail&amp;ust=1693773312350000&amp;usg=AOvVaw1MKNB-g0xxih1D9_5bGHKX"><img width="32" height="32" src="https://ci3.googleusercontent.com/proxy/hKPOB05cye5xCEZwINtWhbZj4fF2cRlWc5Ij2QbPaImb3hcDR7A6owUP_xo3ML_2iluIPgHBUZzto7je0iDYhW_PuEdNhS1O5Zj1bgJQi-DpdonwYCyQfeEYcL-Cul9hQQiMMGSc9O9ApZKreS9YcxPDbU69S7NpOVGVCuhlikepAJu034xJP1rx=s0-d-e1-ft#https://d2fi4ri5dhpqd1.cloudfront.net/public/resources/social-networks-icon-sets/t-only-logo-dark-gray/instagram@2x.png" alt="Instagram" title="Instagram" style="outline:none;text-decoration-line:none;clear:both;height:auto;float:none;border:none;display:block" class="CToWUd" data-bit="iit"></a></td><td valign="top" style="word-break:break-word;vertical-align:top;padding-bottom:5px;padding-right:5px;padding-left:5px;border-collapse:collapse"><a href="https://www.linkedin.com/company/aws-cloud-community-lpu/?originalSubdomain=in" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.linkedin.com/company/aws-cloud-community-lpu/?originalSubdomain%3Din&amp;source=gmail&amp;ust=1693773312350000&amp;usg=AOvVaw12utM2B3tWvu7iBiL1aVvO"><img width="32" height="32" src="https://ci5.googleusercontent.com/proxy/fzblOEECoexakcEYhIMYEeHVOSGRgF1Ftx0cczFMVTVK4lneP3HAb8goidRG14Y5x53BkWd6saQnjRY97jAmQwEvzIDb5soKb6eJa5X20QnSbVsirscEt4X_zqbvau7vM5C3W4yd0TnTAWv1ptlLfqPerWucRtac2dRHCglbTcFkGLp_2AO4-SQ=s0-d-e1-ft#https://d2fi4ri5dhpqd1.cloudfront.net/public/resources/social-networks-icon-sets/t-only-logo-dark-gray/linkedin@2x.png" alt="LinkedIn" title="LinkedIn" style="outline:none;text-decoration-line:none;clear:both;height:auto;float:none;border:none;display:block" class="CToWUd" data-bit="iit"></a></td></tr></tbody></table></td></tr></tbody></table></div></div></div></div></div></div><div><div style="margin:0px auto;min-width:320px;max-width:650px;word-break:break-word"><div style="border-collapse:collapse;display:table;width:500px"><div style="min-width:320px;max-width:650px;display:table-cell;vertical-align:top"><div style="width:500px"><div style="border-width:0px;border-style:solid;padding:5px 0px"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" valign="top" style="table-layout:fixed;vertical-align:top;border-spacing:0px;border-collapse:collapse;min-width:100%"><tbody><tr valign="top" style="vertical-align:top"></tr></tbody></table><br></div></div></div></div></div></div></td></tr></tbody></table></div>`;

// Function to create a new JSON file and store registration number
function createErrorJSON(registrationNumbers) {
  fs.writeFileSync("errorList.json", JSON.stringify(registrationNumbers));
}

// Function to delay the execution
// Function to delay execution
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default startEmail;
