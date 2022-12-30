const dotenv = require("dotenv")
dotenv.config();

const paystack = (request) => {
    const MySecretKey = 'Bearer sk_test_2e48d80abdd1e7167a856148e3a88760a168be35';
    //sk_test_xxxx to be replaced by your own secret key
    const initializePayment =async  (form, mycallback) => {
        const option = {
            url : 'https://api.paystack.co/transaction/initialize',
            headers : {
                authorization: MySecretKey,
                'content-type': 'application/json',
                'cache-control': 'no-cache'
           },
           form
        }
        const callback = (error, response, body)=>{
            return mycallback(error, body);
        }
        request.post(option,callback);
    }
    const verifyPayment = async(ref,mycallback) => {
        const option = {
            url : 'https://api.paystack.co/transaction/verify/' + encodeURIComponent(ref),
            headers : {
                authorization: MySecretKey,
                'content-type': 'application/json',
                'cache-control': 'no-cache'
           }
        }
        const callback = async (error, response, body)=>{
            return await mycallback(error, body);
        }
        request(option,callback);
    }
    return {initializePayment, verifyPayment};
}
module.exports = paystack




































//tayot51@gmail.com