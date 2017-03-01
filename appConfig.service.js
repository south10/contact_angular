(function() {
    var app = angular.module('ContactApp');
    app.service('AppDataServiceSvc', function (AppNameSvc) {
        this.name = AppNameSvc;
        this.author = 'Koushik';
        this.builtDate = new Date().toDateString();
    });
})();