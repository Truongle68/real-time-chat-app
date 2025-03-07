import jwt from 'jsonwebtoken'

export const generateToken = (userId, res) => {
    //Plain Old JavaScript Object (POJO): 1 Object được tạo trực tiếp từ {}, k là instance của class nào
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn: '7d' 
    })
    
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // ms
        httpOnly: true, //prevent XSS attacks cross-site scripting attacks
        sameSite: 'Strict', //CSRF attacks Cross-Site Request Forgery attacks
        secure: process.env.NODE_ENV !== 'development'
    })
}