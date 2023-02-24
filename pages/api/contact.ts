import { transporter } from "@/config/nodemailer";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req : NextApiRequest, res: NextApiResponse) => {
    
    if(req.method === 'POST'){
        const data = req.body
        console.log(data)
        
        try {
            await transporter.sendMail({
                from: data.email,
                to: process.env.GMAIL,
                subject: data.subject,
                text: data.message,
                html: `<h1>${data.message}</h1>`
            })
            console.log('data send')
        } catch (error) {
            console.log(error)
            return res.status(400).json({message: error})
        }
    }


    res.status(200).json({status: 'ok'})
}

export default handler