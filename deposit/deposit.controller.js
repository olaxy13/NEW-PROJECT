exports.fundWallet = async (req, res, next) => fundWallet ({
    amount,
    client_id,
    organization_id,
    reference,
    provider_response,
    balance_before,
  }) 
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
