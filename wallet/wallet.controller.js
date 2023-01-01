const paystack = require('paystack')('Bearer sk_test_2e48d80abdd1e7167a856148e3a88760a168be35')
const request = require('request');
const Q = require("q")
const Transaction = require("../models/Transaction")
//const _ = require("underscore");
const _ = require('lodash');
const path = require('path');
const Wallet = require('./wallet.model');
const User = require('../auth/auth.model');
//const { response } = require('express');
const {initializePayment, verifyPayment} = require("../config/paystack")(request);
//const Paystack = require("../config/bora")
//const {initialize} = require("../config/bora")
// paystack.initialize.transaction({

// })






//FUND
exports.fundAccount = async (req, res, next) => {
  try{
 let response
   // const form = new Wallet (req.body); 
   const checkuser = await User.findById(req.body.userId)
   
   console.log("USERID", checkuser)
  
   if(!checkuser) {
    return res.status(404).json({message: 'User does not exist'})
   }
   const form = _.pick(req.body,['amount','email','full_name']);
   form.metadata = {
       full_name : form.full_name
   }
   form.amount *= 100;
     initializePayment (form, async (error, body)=> {
       if(error){
           //handle errors
           console.log(error);
           return;
      }
       response = JSON.parse(body);
      console.log("first trial", response)
      const createTransactionRef =  new Transaction({
        userId: req.body.userId,
        reference: response.data.reference
      })
      console.log("transaction Ref", createTransactionRef)
      const saveTransactionRef = await createTransactionRef.save();
       res.json(response.data.authorization_url)
   });
  }
  catch (error) {
    if (error) {
      console.log("ERROR", error)
        return res.status(400)
            .json({
                status: false,
                code: 400,
                message: "There's error in your inputs",
            })
    }
    return next(error);
}
}

exports.Verify = async (req,res ) => {
  const ref = req.body.reference;
  await verifyPayment(ref, (error,body)=>  {
      if(error){
          //handle errors appropriately
          console.log(error)
          return res.json('An Error Occured');
      }
      response = JSON.parse(body);
      console.log("RESPONSE",ref)
      const data = _.at(response.data, ['reference', 'amount','customer.email', 'metadata.full_name']);
      [reference, amount, email, full_name] = data;


      const findTransactionRef =   Transaction.findOne ({ reference: req.body.reference})
      if(findTransactionRef) {
        const findWallet = Wallet.findOne({userId: findTransactionRef.userId})
        if(findWallet) {
            return new Q.Promise(async(resolve, reject) => {
               const updateBalance =  await Wallet.findOneAndUpdate({ userId:findWallet._id },
                  { $inc: { balance: amount, }, }, { upsert: true, new: true, setDefaultsOnInsert: true});
            
              updateBalance.balance_before = updateBalance.balance
               console.log("gooo", updateBalance.balance_before)
                if (error) {
                    console.log("Wallet err:", error);
                    reject(error);
                } else {
                    resolve(updateBalance);
                    return res.json(updateBalance)
                  }
              });
           
           
         //Wallet.findOneAndUpdate({ userId:findWallet._id }, { $inc: { balance: amount } });

        }
    }
  })
}



 


























































//CREATE
// exports.fund = async (req, res, next) => {
//   try{

//    // const form = new Wallet (req.body);
//    const funds = initialize({amount: "amount",
//     reference: "reference", 
//     name:"name",
//     email: "email"})

//   //  initializePayment(form, (error, body)=>{
//   //      if(error){
//   //          //handle errors
//   //          console.log(error);
//   //          return;
//   //     }
//   console.log("Here")
//     return res.json(funds)
//   //  });
//   }
//   catch (error) {
//     if (error) {
//         return res.status(400)
//             .json({
//                 status: false,
//                 code: 400,
//                 message: "There's error in your inputs",
//             })
//     }
//     return next(error);
// }
// }





// const paystack = require('paystack')('Bearer sk_test_2e48d80abdd1e7167a856148e3a88760a168be35')
// exports.fundAccount = async (req, res, next) => {
//   try {
   
    
//   }
//   catch(error) {
//     if (error) {
//         return res.status(400)
//             .json({
//                 status: false,
//                 code: 400,
//                 message: "There's error in your inputs",
//             })
//     }
//     return next(error);
// }

// }





//     {
//       const { walletModel, fields, errors } = this;
//       let session = await mongoose.startSession();
//       try {
//         if (!amount || !client_id) {
//           throw new errors.BadRequest('Unable to process transaction');
//         }
//         session.startTransaction();
  
//         const fundWallet = await walletModel.findOneAndUpdate(
//           { organization_id },
//           { $inc: { balance: amount } },
//           { session }
//         );
//         await this.journalModel.create(
//           [
//             {
//               payment_type: JournalPaymentStatus.DEPOSIT,
//               transaction_reference: reference,
//               journal_status: WalletTransactionStatus.COMPLETED,
//             },
//           ],
//           { session }
//         );
//         await this.walletTransactionModel.findOneAndUpdate(
//           { wallet_transaction_reference: reference },
//           {
//             $set: {
//               status: WalletTransactionStatus.COMPLETED,
//               provider_response,
//               balance_before,
//               balance_after: (balance_before += amount),
//             },
//           },
//           { session }
//         );
//         await this.walletModel.findOneAndUpdate(
//           {
//             wallet_guard: WalletBaseType.BASE,
//             base_wallet_type: WalletFlow.INFLOW,
//           },
//           { $inc: { balance: amount } },
//           { session }
//         );
  
//         await session.commitTransaction();
//         return fundWallet;
//       } catch (err) {
//         await session.abortTransaction();
//         await this.journalModel.create({
//           payment_type: JournalPaymentStatus.DEPOSIT,
//           transaction_reference: reference,
//           journal_status: WalletTransactionStatus.CANCELLED,
//         });
//         await this.walletTransactionModel.findOneAndUpdate(
//           { wallet_transaction_reference: reference },
//           { $set: { status: WalletTransactionStatus.CANCELLED } },
//           { session }
//         );
//       }
//       session.endSession();
//   }

// exports.fundWallet = async (req, res, next) => fundWallet ({
//     amount,
//     client_id,
//     organization_id,
//     reference,
//     provider_response,
//     balance_before,
//   })
//   {
//     const { walletModel, fields, errors } = this;
//     let session = await mongoose.startSession();
//     try {
//       if (!amount || !client_id) {
//         throw new errors.BadRequest('Unable to process transaction');
//       }
//       session.startTransaction();

//       const fundWallet = await walletModel.findOneAndUpdate(
//         { organization_id },
//         { $inc: { balance: amount } },
//         { session }
//       );
//       await this.journalModel.create(
//         [
//           {
//             payment_type: JournalPaymentStatus.DEPOSIT,
//             transaction_reference: reference,
//             journal_status: WalletTransactionStatus.COMPLETED,
//           },
//         ],
//         { session }
//       );
//       await this.walletTransactionModel.findOneAndUpdate(
//         { wallet_transaction_reference: reference },
//         {
//           $set: {
//             status: WalletTransactionStatus.COMPLETED,
//             provider_response,
//             balance_before,
//             balance_after: (balance_before += amount),
//           },
//         },
//         { session }
//       );
//       await this.walletModel.findOneAndUpdate(
//         {
//           wallet_guard: WalletBaseType.BASE,
//           base_wallet_type: WalletFlow.INFLOW,
//         },
//         { $inc: { balance: amount } },
//         { session }
//       );

//       await session.commitTransaction();
//       return fundWallet;
//     } catch (err) {
//       await session.abortTransaction();
//       await this.journalModel.create({
//         payment_type: JournalPaymentStatus.DEPOSIT,
//         transaction_reference: reference,
//         journal_status: WalletTransactionStatus.CANCELLED,
//       });
//       await this.walletTransactionModel.findOneAndUpdate(
//         { wallet_transaction_reference: reference },
//         { $set: { status: WalletTransactionStatus.CANCELLED } },
//         { session }
//       );
//     }
//     session.endSession();
// }


// class PaystackPayment {
//   constructor({ config, errors }) {
//     this.config = config;
//     this.errors = errors;
//     const baseUri = config.get('paystack.PAYSTACK_BASE_URL');
//     this.client_secret = config.get('paystack.PAYSTACK_SECRET_KEY');
//     this.client = new ApiClient({ baseUri });
//   }
//   formatErrorReponse(err) {
//     throw new this.errors.ServiceUnavailable(err);
//   }

//   async initialize({ email, amount, reference, currency = 'NGN' }) {
//     try {
//       const response = await paystack.transaction.initialize({
//         amount: amount * 100,
//         reference,
//         name: 'softPass',
//         email,
//         callback_url: '',
//       });
//       return response;
//     } catch (err) {
//       return this.formatErrorReponse(err.message);
//     }
//   }

//   async verifyTransaction(reference) {
//     try {
//       const verifyTransaction = await paystack.transaction.verify(reference);
//       return verifyTransaction;
//     } catch (err) {
//       return this.formatErrorReponse(err.message);
//     }
//     console.log('verifyTransaction::::', verifyTransaction);
//   }





