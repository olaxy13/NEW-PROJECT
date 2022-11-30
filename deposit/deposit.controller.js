const paystack = require('paystack')('Bearer sk_test_2e48d80abdd1e7167a856148e3a88760a168be35')
const _ = require("underscore");
// const { authSchema, loginSchema } = require("../helper/validation")
const Wallet = require("../wallet/wallet.model");
const { initializePayment } = require("../config/paystack")

//CREATE
exports.Deposit = async (req, res, next) => {
  try{
    //const form = ._pick(req.body);
    const savedOrder = await newOrder.save();
    return res.status(200).json(savedOrder)
  } catch (error) {
    if (error) {
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


exports.fundAccount = async (req, res, next) => {
  try {

    
  }
  catch(error) {
    if (error) {
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
    exports.fundWallet = async (req, res, next) => fundWallet ({
      amount,
      client_id,
      organization_id,
      reference,
      provider_response,
      balance_before,
    }) 
paystack.plan.create({
  name: 'API demo',
  amount: 10000,
  interval: 'monthly'
})
  .then(function(error, body) {
  	 console.log(error);
    console.log(body);
    });


    paystack.transaction.initialize({perPage: 20})
    .then(function(error, body) {
        console.log(error);
        console.log(body);
    });





    {
      const { walletModel, fields, errors } = this;
      let session = await mongoose.startSession();
      try {
        if (!amount || !client_id) {
          throw new errors.BadRequest('Unable to process transaction');
        }
        session.startTransaction();
  
        const fundWallet = await walletModel.findOneAndUpdate(
          { organization_id },
          { $inc: { balance: amount } },
          { session }
        );
        await this.journalModel.create(
          [
            {
              payment_type: JournalPaymentStatus.DEPOSIT,
              transaction_reference: reference,
              journal_status: WalletTransactionStatus.COMPLETED,
            },
          ],
          { session }
        );
        await this.walletTransactionModel.findOneAndUpdate(
          { wallet_transaction_reference: reference },
          {
            $set: {
              status: WalletTransactionStatus.COMPLETED,
              provider_response,
              balance_before,
              balance_after: (balance_before += amount),
            },
          },
          { session }
        );
        await this.walletModel.findOneAndUpdate(
          {
            wallet_guard: WalletBaseType.BASE,
            base_wallet_type: WalletFlow.INFLOW,
          },
          { $inc: { balance: amount } },
          { session }
        );
  
        await session.commitTransaction();
        return fundWallet;
      } catch (err) {
        await session.abortTransaction();
        await this.journalModel.create({
          payment_type: JournalPaymentStatus.DEPOSIT,
          transaction_reference: reference,
          journal_status: WalletTransactionStatus.CANCELLED,
        });
        await this.walletTransactionModel.findOneAndUpdate(
          { wallet_transaction_reference: reference },
          { $set: { status: WalletTransactionStatus.CANCELLED } },
          { session }
        );
      }
      session.endSession();
  }
  













    



























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
