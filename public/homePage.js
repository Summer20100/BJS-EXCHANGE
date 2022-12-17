'use strict';

// Выход из личного кабинета //

const logout = new LogoutButton();
logout.action = function() {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        }
    })
}

// Получение информации о пользователе //

ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
})

// Получение текущих курсов валюты //

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

const moneyManager = new MoneyManager();

// 1. Пополнение баланса

moneyManager.addMoneyCallback = function (balanceInc) {
    ApiConnector.addMoney(balanceInc, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Успешное пополнение счета на' + balanceInc.currency + balanceInc.amount)
        } else {
            moneyManager.setMessage(false, response.error)
        }
    })
}

// 2. Конвертирование валюты

moneyManager.conversionMoneyCallback = function(convert) {
    ApiConnector.convertMoney(convert, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Успешная конвертация суммы ' + convert.fromCurrency + convert.fromAmount)
        } else {
            moneyManager.setMessage(false, response.error)
        }
    })
}

// 3. Перевод валюты

moneyManager.sendMoneyCallback = function(trans) {
    ApiConnector.transferMoney(trans, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Успешный перевод ' + trans.currency + trans.amount + ' получателю ' + trans.to)
        } else {
            moneyManager.setMessage(false, response.error)
        }
    })
}

// Работа с избранным //

const favoritesWidget = new FavoritesWidget();

// 1. Начальный список избранного

ApiConnector.getFavorites(favorites => {
    if (favorites.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(favorites.data);
        moneyManager.updateUsersList(favorites.data);
    }
})

// 2. Добавление пользователя в список избранных

favoritesWidget.addUserCallback  = function(addUser) {
    ApiConnector.addUserToFavorites(addUser, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(true, 'Успешное добавление пользователя # ' + addUser.id + ' : ' + addUser.name)
        } else {
            favoritesWidget.setMessage(false, response.error)
        }
    })
}

// 3. Удаление пользователя из избранного

favoritesWidget.removeUserCallback = function (id) {
    ApiConnector.removeUserFromFavorites(id, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(true, 'Успешное удаление пользователя ' + id)
        } else {
            favoritesWidget.setMessage(false, response.error)
        }
    })
}