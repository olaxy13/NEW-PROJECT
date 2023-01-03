const paystack = require('paystack')('sk_test_2e48d80abdd1e7167a856148e3a88760a168be35')

const initialize = async ({email,amount,reference})=>{
console.log("body",{
    email,amount,reference
})

    try{
const response =  paystack.transaction.initialize({
    amount:amount *100,
    reference,
    name:'new project',
    email,
    callback_url:'google.com'
})

return response;
    }catch(e){
        console.log("error>>>>>>",e)
    }
}



const verify = async (reference)=>{
try{
const verifyTransaction = await paystack.transaction.verify(reference)
return verifyTransaction
}catch(e){
    console.log(">>>>>>>>>",e)
}
}


module.exports= {
    initialize,
    verify
}