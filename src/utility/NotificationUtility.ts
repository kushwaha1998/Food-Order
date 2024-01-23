/* ------------------- Email --------------------- */

/* ------------------- Notification --------------------- */

/* ------------------- OTP --------------------- */

export const GenerateOtp = () => {

    const otp = Math.floor(10000 + Math.random() * 900000);
    let expiry = new Date()
    expiry.setTime(new Date().getTime() + (30 * 60 * 1000));

    return {otp, expiry};
}

export const onRequestOTP = async(otp: number, toPhoneNumber: string) => {

    try {
        const accountSid = "ACb11d8ca327f06438c0ee960ed9dad152";
        const authToken = "6974a5ac3448720992f91dc5f4030a41";
        const client = require('twilio')(accountSid, authToken);
    
        const response = await client.messages.create({
            body: `Your OTP is ${otp}`,
            from: '+18143983473',
            to: `+91${toPhoneNumber}` // recipient phone number // Add country before the number
        })
    
        return response;
    } catch (error){
        return false
    }
    
}

/* ------------------- Payment --------------------- */