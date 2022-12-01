'use strict';

const logout = new LogoutButton();
logout.action = function() {
    ApiConnector.logout(serverResponse => {
        if (serverResponse.success) {
            location.reload();
            return;
        }
    });
}

ApiConnector.current(serverResponse => {
    //console.log(serverResponse);
    if (serverResponse.success) {
        ProfileWidget.showProfile(serverResponse.data);
        return;
    }
})


const rates = new RatesBoard();
//console.log(rates);
function currantRates () {
    ApiConnector.getStocks(responseBody => {
        if(responseBody.success) {
            rates.clearTable();
            rates.fillTable(responseBody.data);
        }
    })
}
setInterval(currantRates(), 60000);
