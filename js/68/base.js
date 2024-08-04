'use strict';

    function performTransaction(amount, memo) {
      console.log(memo);
      this.balance += amount;
    }
    
    function createAccount(openingBalance) {
      return {
        balance: openingBalance,
      };
    }
    
    const account1 = createAccount(5000);
    const account2 = createAccount(2000);

    performTransaction.call(account1, -1000, 'food');
    performTransaction.call(account2, 2000, 'paycheck');
    performTransaction.apply(account1, [-1000, 'food']);
    performTransaction.apply(account2, [2000, 'paycheck']);
    
    const transactOnAccount1 = performTransaction.bind(account1);
    transactOnAccount1(25);
    
    const withdraw50FromAccount2 = performTransaction.bind(account2, -50);
    
    withdraw50FromAccount2('food');
    withdraw50FromAccount2('misc');
    
    const withdraw100FromAccount2ForVacation = performTransaction.bind(account2, -100, 'vacation');
    
    withdraw100FromAccount2ForVacation();
    withdraw100FromAccount2ForVacation();
    
    console.log(account1, account2);
    