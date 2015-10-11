(function () {

    var duoworldFrameworksShellLauncherUserProfileControl = function ($rootScope, $scope, $state, $http, $timeout, $presence, $objectstore, $uploader, $mdToast, $window, $auth, $mdDialog) {

        $scope.defaultClassView = true;

        var dwChildAppHeaderController = angular.element('#dw-child-application-header-control-bar');
        var dwChildAppSplashCover = angular.element('.dw-childapp-backgroundcover');
        var dwChildAppContainer = angular.element('.customeAppContainer');
        var dwChildAppSplashLogo = angular.element('.dw-childapp-splash-logo');
        var dwChildAppSplashText = angular.element('.dw-childapp-splash-title');
        var dwChildAppSplashLoadingSpinner = angular.element('.dw-childapp-splash-loadingspinner');
        var dwChildAppSplashLoadingTextIndicator = angular.element('.dw-childapp-splash-loadingtextindicator');
        var dwChildAppHeaderInfomationTitle = angular.element('.dw-child-application-header-control-bar-left-section span');
        var dwChildAppHeaderInfomationIcon = angular.element('.dw-child-application-header-control-bar-left-section img');
        var dwChildAppSaveButton = angular.element('.dw-child-app-saveButton');

        $timeout(function () {
            dwChildAppHeaderController.css({
                'top': '0px',
                'background': 'rgba(0,0,0,0.1)'
            })
        }, 1000);

        $timeout(function () {
            dwChildAppSplashLogo.css('bottom', '0px');
        }, 1300);

        $timeout(function () {
            dwChildAppSplashText.css('top', '0px');
        }, 1500);

        $timeout(function () {
            dwChildAppSplashLoadingSpinner.css('top', '0px');
        }, 1700);

        $timeout(function () {
            dwChildAppSplashLoadingTextIndicator.css('top', '0px');
        }, 1800);


        $timeout(function () {
            dwChildAppSplashLoadingSpinner.css('top', '-400px');
            dwChildAppSplashLoadingTextIndicator.css('top', '-400px');
        }, 4500);

        $timeout(function () {
            dwChildAppSplashText.css('top', '-400px');
        }, 4800);

        $timeout(function () {
            dwChildAppSplashLogo.css('bottom', '-150px');
        }, 5000);

        $timeout(function () {
            dwChildAppSplashCover.css('height', '300px');
        }, 5200);

        $timeout(function () {
            dwChildAppHeaderInfomationTitle.css('top', '0px');
            dwChildAppHeaderInfomationIcon.css('top', '0px');
        }, 5200);

        $timeout(function () {
            dwChildAppContainer.css({
                'opacity': 1,
                'z-index': 1,
                'top': '0px'
            });
        }, 5200);

        $timeout(function () {
            dwChildAppSaveButton.css('z-index', '1');
        }, 5200);


        $scope.childApplicationClose = function () {
            $state.go('dock');
        };

        $scope.childApplicationMinimise = function () {
            $state.go('dock');
        };
        //$scope.shellUserProfileSection = [];
        console.log($rootScope.shellUserProfileSection);
        $rootScope.shellUserProfileSection.disabled = true;

        $scope.shellUserProfileSectionEdit = function () {
            if ($rootScope.shellUserProfileSection.disabled == true) {
                $rootScope.shellUserProfileSection.disabled = false;
                $scope.selectedIcon = "save";
            } else {
                $rootScope.shellUserProfileSection.disabled = true;
                $scope.selectedIcon = "mode_edit";
                saveProfile();
            }
        };

        $scope.selectedIcon = "mode_edit";
        //default banner
        $scope.banner = "images/userassets/contactcoverimg/cover1.jpg";
        //cover picture uploading progress
        $scope.progressCircle = false;
        //banner picture uploading progress
        $scope.bannerProgress = false;
        //hides the img tag which displays the user uploaded banner
        $scope.hideObjectstoreBanner = true;
        //bannerFrom is a refference,whether to load the banner from object store(user uploaded) or from the pre-defined set of covers
        $scope.bannerFrom = $rootScope.shellUserProfileSection.bannerPicture;

        $scope.changeBanner = function (ev) {
            $mdDialog.show({
                controller: 'tableCtrl',
                templateUrl: 'partials/frameworktemplates/changeBanner.html',
                targetEvent: ev,
                clickOutsideToClose: true
            }).then(function (answer) {
                if (answer.type == "selected") {
                    $scope.banner = answer.data;
                    $scope.bannerFrom = $scope.banner;
                    $scope.hideObjectstoreBanner = true;
                    saveProfile();
                } else if (answer.type == "upload") {
                    $scope.bannerProgress = true;
                    $scope.hideObjectstoreBanner = false;
                    var photofile = answer.data;
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $scope.$apply(function () {
                            var str = e.target.result;
                            str = str.replace("data:image/png;base64,", "");
                            str = str.replace("data:image/jpeg;base64,", "");
                            console.log(str);
                            $scope.banner = str;
                        });
                    };

                    reader.readAsDataURL(photofile);
                    $uploader.upload("duosoftware.com", "coverPictures", photofile, $rootScope.shellUserProfileSection.email);
                    $uploader.onSuccess(function (e, data) {
                        $scope.bannerFrom = "fromObjectStore";
                        saveProfile();
                        $scope.bannerProgress = false;
                    });

                    $uploader.onError(function (e, data) {
                        Toast("Error occured");
                    });
                };
            });

        };

        function saveProfile() {

            //sorting where the banner picture is from
            if ($scope.bannerFrom == "fromObjectStore") {
                var banner = "fromObjectStore";
            } else {
                var banner = $scope.banner;
            };

            $scope.user = {
                name: $rootScope.shellUserProfileSection.name,
                phone: $rootScope.shellUserProfileSection.phone,
                email: $rootScope.shellUserProfileSection.email,
                company: $rootScope.shellUserProfileSection.company,
                country: $rootScope.shellUserProfileSection.country,
                zipcode: $rootScope.shellUserProfileSection.zipcode,
                bannerPicture: banner,
                id: "admin@duosoftware.com"
            };
            console.log($scope.user);
            var client = $objectstore.getClient("duosoftware.com", "profile", true);

            client.onError(function (data) {
                Toast("Error occured while saving");
            });

            client.onComplete(function (data) {
                Toast("you profile got updated!");
            });

            client.update($scope.user, {
                KeyProperty: "email"
            });
        };


        $scope.getProfilePicture = function () {

            var client = $objectstore.getClient(window.location.hostname, "profilepictures", true);
            client.onGetOne(function (data) {
                if (data)
                    console.log(data);
                $scope.profilePicture = data.Body;
            });
            client.onError(function (data) {
                Toast("Error occured while fetching profile picture");
            });
            client.getByKey($rootScope.shellUserProfileSection.email);
        };

        $scope.getBannerPicture = function () {
            var client = $objectstore.getClient(window.location.hostname, "coverPictures", true);
            client.onGetOne(function (data) {
                if (data)
                    console.log(data);
                $scope.banner = data.Body;
                if (data.body == undefined) {
                    $scope.banner = "images/userassets/contactcoverimg/cover1.jpg";
                    $scope.hideObjectstoreBanner = true;
                };
            });
            client.onError(function (data) {
                Toast("Error occured while fetching Banner");
            });
            client.getByKey($rootScope.shellUserProfileSection.email);
        };

        $scope.getProfilePicture();

        if ($rootScope.shellUserProfileSection.bannerPicture == undefined) {
            $rootScope.shellUserProfileSection.bannerPicture = "fromObjectStore";
        };

        if ($rootScope.shellUserProfileSection.bannerPicture == "fromObjectStore") {
            $scope.getBannerPicture();
            $scope.hideObjectstoreBanner = false;
        } else {
            $scope.hideObjectstoreBanner = true;
            $scope.banner = $rootScope.shellUserProfileSection.bannerPicture;
        };

        $scope.EditProfpic = function () {
            document.getElementById("selectPicture").click();
        }

        $scope.file_changed = function (element) {
            $scope.progressCircle = true;
            //Toast("Profile picture changed!");
            var photofile = element.files[0];
            var reader = new FileReader();
            reader.onload = function (e) {

                $scope.$apply(function () {
                    var str = e.target.result;
                    str = str.replace("data:image/png;base64,", "");
                    str = str.replace("data:image/jpeg;base64,", "");
                    console.log(str);
                    $scope.profilePicture = str;
                });
            };

            reader.readAsDataURL(photofile);
            console.log($scope.myFile, photofile);
            $uploader.upload("duosoftware.com", "profilepictures", photofile, $rootScope.shellUserProfileSection.email);
            $uploader.onSuccess(function (e, data) {
                $scope.progressCircle = false;
                console.log("successfull");
                Toast('successfully updated');
                //$scope.getProfilePicture();
            });

            $uploader.onError(function (e, data) {
                Toast("Error occured");
                console.log(data);
            });

        };

        function Toast(msg) {
            $mdToast.show(
                $mdToast.simple()
                .content(msg)
                .position('bottom right')
                .hideDelay(500)
            );
        };
        $scope.userProfileChangePassword = function (ev) {
            var changePasswordTemplate = "<md-dialog style='min-width:30%;'><md-content layout-padding>\
            <form name='changePasswordForm'><md-input-container>\
                                            <label>Previous Password</label>\
                                        <input ng-model='changePasswordForm.oldPass' type='password' required>\
                                        </md-input-container>\
     <md-input-container>\
          <label>New Password</label>\
          <input ng-model='changePasswordForm.newPass' type='password' required>\
        </md-input-container>\
           <md-input-container>\
          <label>Re-enter New Password</label>\
          <input ng-model='changePasswordForm.reNewPass' type='password' required>\
<div ng-messages='changePasswordForm.reNewPass.$error' ng-if='changePasswordForm.reNewPass !== changePasswordForm.newPass'>\
          <div ng-message='reNewPass !== newPass'>Re-Check your password</div>\
          </div>\
        </md-input-container>\
<div class='md-actions' layout='row'>\
<md-button class='md-primary' ng-disabled='changePasswordForm.$invalid'>Save</md-button></div></form>\
</md-content></md-dialog>";
            $mdDialog.show({
                controller: userProfileChangePasswordController,
                template: changePasswordTemplate,
                targetEvent: ev,
                clickOutsideToClose: true
            }).then(function () {

            });
        };

        function userProfileChangePasswordController() {

        };

    };



    duoworldFrameworksShellLauncherUserProfileControl.$inject = ['$rootScope', '$scope', '$state', '$http', '$timeout', '$presence', '$objectstore', '$uploader', '$mdToast', '$window', '$auth', '$mdDialog'];
    mambatiFrameworkShell.controller('tableCtrl', ['$scope', '$mdDialog', function ($scope, $mdDialog) {
        $scope.closeDialog = function () {
            // Easily hides most recent dialog shown...
            // no specific instance reference is needed.
            $mdDialog.hide();
        };
        $scope.selectedBanner = function (ans) {
            var obj = {
                data: ans,
                type: "selected"
            };
            $mdDialog.hide(obj);
        };

        $scope.changeBanner = function () {
            document.getElementById("selectCover").click();
        };

        $scope.coverBanners = ['1', '2', '3', '4', '5', '6', '7'];

        $scope.cover_changed = function (element) {
            var photofile = element.files[0];
            var obj = {
                data: photofile,
                type: "upload"
            };
            $mdDialog.hide(obj);

        };

}]);

    mambatiFrameworkShell.controller('duoworld-framework-shell-launcher-userprofile-ctrl', duoworldFrameworksShellLauncherUserProfileControl);
}());
