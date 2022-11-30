const paystack = require('paystack')('Bearer sk_test_2e48d80abdd1e7167a856148e3a88760a168be35');
const secret_key = ('Bearer sk_test_2e48d80abdd1e7167a856148e3a88760a168be35')

async function initialize({ amount, reference, name, email, }) {
  try {
    const response = await paystack.transaction.initialize({
      amount: amount * 100,
      reference,
      name,
      email,
      callback_url: "",
     [secret]:secret_key
      })
    console.log("TTTt", response)
    return response;
  }catch(err) {
    return (err.message);
  }
}

module.exports = {
  initialize: initialize,
}

























// const axios = require('axios');

// console.log(axios.isCancel('something'));


// const paystack = require('paystack')('Bearer sk_test_2e48d80abdd1e7167a856148e3a88760a168be35')

// class Paystack {
//     // constructor(secret_key: String) {
//     //     axios.defaults.headers.Authorization = `Bearer ${secret_key}`;
//     //     axios.defaults.headers['Content-Type'] = 'application/json';
//     //     axios.defaults.baseURL = 'https://api.paystack.co/';
//     // }
//     // constructor({ config, errors }) {
//     //   this.config = config;
//     //   this.errors = errors;
//     //   const baseUri = config.get('paystack.PAYSTACK_BASE_URL');
//     //   this.client_secret = config.get('paystack.PAYSTACK_SECRET_KEY');
//     //   this.client = new ApiClient ({ baseUri })
//     // }
//     // formatErrorReponse(err) {
//     //   throw new this.errors.ServiceUnavailable(err);
//     // }
  
//     async initialize({ email, amount, reference, currency = 'NGN' }) {
//       try {
//         const response = await paystack.transaction.initialize({
//           amount: amount * 100,
//           reference,
//           name,
//           email,
//           callback_url: '',
//         });
//         return response;
//       } catch (err) {
//         return this.formatErrorReponse(err.message);
//       }
//     }
  
//     async verifyTransaction(reference) {
//       try {
//         const verifyTransaction = await paystack.transaction.verify(reference);
//         return verifyTransaction;
//       } catch (err) {
//         return this.formatErrorReponse(err.message);
//       }
//       console.log('verifyTransaction::::', verifyTransaction);
//     }
//   }
  
//   module.exports = Paystack;
