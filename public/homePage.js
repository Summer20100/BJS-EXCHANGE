'use strict';

// Выход из личного кабинета

const logout = new LogoutButton();
logout.action = function() {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        }
    })
}

// Получение информации о пользователе

ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
})

//Получение текущих курсов валюты

const rates = new RatesBoard();
function currantRates() {
    ApiConnector.getStocks(response => {
        if(response.success) {
            rates.clearTable();
            rates.fillTable(response.data);
        }
    })
}
currantRates();
setInterval(currantRates, 60000);

// Операции с деньгами //

// 1. Пополнение баланса

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function (balanceInc) {
    ApiConnector.addMoney(balanceInc, response => {
        if (response.success) {
            moneyManager.addMoneyAction();
            ProfileWidget.showProfile(response.data);
            return moneyManager.setMessage(true, 'Успешное пополнение счета на' + balanceInc.currency + balanceInc.amount)
        } else {
            return moneyManager.setMessage(false, response.error)
        }
    })
}

// 2. Конвертирование валюты

moneyManager.conversionMoneyCallback = function(convert) {
    ApiConnector.convertMoney(convert, response => {
        console.log(response);
        if (response.success) {
            moneyManager.conversionMoneyAction();
            ProfileWidget.showProfile(response.data);
            return moneyManager.setMessage(true, 'Успешная конвертация суммы ' + convert.fromCurrency + convert.fromAmount)
        } else {
            return moneyManager.setMessage(false, response.error)
        }
    })
}

// 3. Перевод валюты

moneyManager.sendMoneyCallback = function(trans) {
    ApiConnector.transferMoney(trans, response => {
        if (response.success) {
            moneyManager.sendMoneyAction();
            ProfileWidget.showProfile(response.data);
            return moneyManager.setMessage(true, 'Успешный перевод ' + trans.currency + trans.amount + ' получателю ' + trans.to)
        } else {
            return moneyManager.setMessage(false, response.error)
        }
    })
}