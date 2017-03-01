(function() {
    var app = angular.module('ContactApp');
    app.controller('ContactCtrl', ContactCtrl);

    function ContactCtrl(ContactDataSvc) {
        var self = this;
        self.editMode = false;
        self.addMode = false;

        ContactDataSvc.getContacts()
            .then(function(data) {
                self.contacts = data;
            });

        self.selectContact = function (index) {
            self.selectedContact = self.contacts[index];
            self.successMessage = undefined;
            self.errorMessage = undefined;
        };
        
        self.toggleEditMode = function () {
            self.editMode = !self.editMode;
        };
        
        self.SaveUser = function () {
            self.toggleEditMode();
            var userData = self.selectedContact;
            if (self.addMode) {
                ContactDataSvc.createUser(userData)
                    .then(function() {
                            self.successMessage = 'Data successfully updated';
                        },
                        function () {
                            self.errorMessage = "There was an error. Please try again.";
                        }
                    );
                self.addMode = false;
            } else {
                ContactDataSvc.saveUser(userData)
                    .then(function () {
                            self.successMessage = 'Data successfully updated';
                        },
                        function () {
                            self.errorMessage = "There was an error. Please try again.";
                        }
                    );
            }
        };

        self.addContact = function () {
            self.addMode = true;
            self.selectedContact = {
                'id': new Date().toTimeString()
            };
            self.editMode = true;
        }
    }
})();