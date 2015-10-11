// duoworld-framework-shell-ctrl.js

(function(){

	var duoWorldFrameworkShellCtrl = function($rootScope, $scope, $state , $http, $location, $mdSidenav, $mdDialog, $mdToast , $presence, $auth, $apps, $v6urls,$helpers, $objectstore, stBlurredDialog, $timeout){

		/*Framework Shell Initialization Components Block - Start*/
			//Define Initialization Variables block start
				console.log('This is the main controller');
				var isLoggedIn = false; //framework logged in default status
				$rootScope.shellConfig = {}; //framework configuration
				$scope.selectedTennantID = document.domain; //framework tennant ID
				$rootScope.frameworkShellSecurityToken = ""; //framwork shell security token
				$rootScope.dwFrameworkActiveApps = []; //framework active apps
				$rootScope.recivedTennantCollection = []; // framework recived tennant collection
				$scope.allApps = [];
				$rootScope.frameworkFavoriteApplication = [];
				$rootScope.currenttenantsessioninfo = [];
				$rootScope.shellUserProfileSection = [];
				$rootScope.v6urls = $v6urls;
				$rootScope.opendAppIconUrl = "";
				var dwLoadingFrameIndicator = angular.element('.dw-loadingFrame');

				/*utility function - start*/
				function isEmpty(obj){
					for(var i in obj){ if(obj.hasOwnProperty(i)){return false;}}
  					return true;
				}
				/*utility function - end*/

			//Define Initialization Variables block end

			//Define Initialization Functions block start
				var frameworkSessionCheck = function(){
					if ($auth.checkSession()){
						isLoggedIn = true;
					}else{
						isLoggedIn = false;
					}
				}

				frameworkSessionCheck(); //framework session check 

				var getFrameworkSessionInfo = function(){
					$rootScope.currenttenantsessioninfo = $auth.getSession();
					console.log($rootScope.currenttenantsessioninfo);
				}

				getFrameworkSessionInfo();

				var frameworkSessionLog = function(){
					if(isLoggedIn === true){
						$state.go('dock');
						$rootScope.frameworkShellSecurityToken = $auth.getSecurityToken()
					}else{
						$state.go('unrecognized');
					}
				}

				frameworkSessionLog();

				var retriveUserProfile = function(){
					var userProfileInfo = $auth.getSession();

				    var client = $objectstore.getClient("duosoftware.com","profile",true);
				  
				    client.onGetOne(function(userProfileInfo){
				         if (userProfileInfo){
				         	$rootScope.shellUserProfileSection = userProfileInfo;
				         	console.log(userProfileInfo);
				         }else{

				         }            
				    });
				      
				   	client.onError(function(data){
				       // alert ("Error occured");
				   	});
				      
				   	client.getByKey($auth.getUserName());
				};

				retriveUserProfile();

				var getDefaultShellConfig = function(){
					$http.get('shell_specific_components/local_data/shellconfiguration.json').
			    	success(function(data, status, headers, config) {
			    		$rootScope.shellConfig = data;
				    }).
				    error(function(data, status, headers, config) {
				    	console.log('error in retriving default shell configuration !');
				    });
				}

				var saveShellConfiguratation = function(){
                    var client = $objectstore.getClient("duosoftware.com","shellconfig",true);
                    client.onComplete(function(data){
                        console.log(data);
                    });
                    client.onError(function(data){
                        console.log(data);
                    });
                    client.insert($rootScope.shellConfig, {KeyProperty:"TenentID"}); 
                }

				var loadShellConfig = function(){
					var client = $objectstore.getClient("duosoftware.com","shellconfig",true);
					client.onGetOne(function(data, status, headers, config){
		               	if(isEmpty(data) == true){
		               		getDefaultShellConfig();
		               		saveShellConfiguratation();
		               	}else{
		               		$rootScope.shellConfig = data;
		               	}
                    });
                    client.onError(function(data, status, headers, config){
                        console.log(data, status);
                    });

                    client.getByKey($auth.getUserName());
				}

				loadShellConfig();

				var globalAppInfoPush = function(){
					for (var i = 0; i < $scope.allApps.length; i++){
						var appTempRef = $scope.allApps[i];
						$rootScope.frameworkApplications.push({applicationID: appTempRef.ApplicationID, applicationTitle: appTempRef.Name, applicationUri: "/duoworld-framework/launcher/customapps/"+appTempRef.ApplicationID+"/"+appTempRef.Name, applicationIcoUri: "./images/appIcons/"+appTempRef.ImageId, applicationDesription:appTempRef.Description});
					}
					console.log($rootScope.frameworkApplications);
				};

				$scope.getProfilePicture = function(){
		       
		       		var client = $objectstore.getClient("duosoftware.com","profilepictures",true);
			        
			         client.onGetOne(function(data){
			               if (data)
			                  $scope.profilePicture = data.Body;
			         });
			            
			         client.onError(function(data){
			         	console.log(data);
			             //alert ("Error occured");
			         });
			            
			         client.getByKey($auth.getUserName());
			    };

			    $scope.getProfilePicture();


				$scope.globalTenantRetrivel = function(){
					$http.get($rootScope.v6urls.auth+'/tenant/GetTenants/'+$rootScope.frameworkShellSecurityToken+'').
			    	success(function(data, status, headers, config) {
			      		$rootScope.recivedTennantCollection = data;
			      		// console.log($rootScope.recivedTennantCollection);
				    }).
				    error(function(data, status, headers, config) {
				    	console.log(data);
				    });
				}

				$scope.globalTenantRetrivel(); //framework tenant retrival

				$scope.globalAppRetrivel = function(){
					$apps.onAppsRetrieved(function(e,data){
						for(appIndex in data.apps){
							var iconUrl = data.apps[appIndex].iconUrl;
							if (iconUrl){
								if(iconUrl.indexOf('http') === 0){
									data.apps[appIndex].iconUrl = iconUrl;
								}else{
									data.apps[appIndex].iconUrl = 'http://duoworld.duoweb.info'+iconUrl;
								}
							}
							else{
								data.apps[appIndex].iconUrl = "/unavailableappicon.png";
							}
						}
						$scope.allApps = data.apps;
					});

					$apps.getAppsForUser();
					// globalAppInfoPush();
					console.log($scope.allApps);
				}

			//Define Initialization Functions block end

		/*Framework Shell Initialization Components Block - End*/

		/*dw framework session check (uimicrokernal) */

		//framework specific functions

		/*Tennant Switch*/
		$scope.switchTennant = function(){
			
		};

		/*dialog controler*/
		function tennantSelectionModalCtrl($scope, $mdDialog){
			console.log($scope.recivedTennantCollection);
			$scope.switchTennantSelection = function(switchedSelection){
				$mdDialog.hide();
			};
		};

		/*toggle left menu*/
		$scope.toggleLeftMenu = function(){
			$mdSidenav('left').toggle();
		};

		/*toggle right menu*/
		$scope.toggleRightMenu = function(){
			$mdSidenav('right').toggle();
		};

		/*to return home*/
		$scope.returnHome = function(){
			$scope.toggleLeftMenu();
			$location.path('/');
		}

		$scope.quickLaunchAppAccess = function(appdetail){
			$scope.toggleLeftMenu();
			var quickLaunchUri = "launcher/customapp/"+appdetail.ApplicationID+"/"+appdetail.Name;
         	$location.path(quickLaunchUri);
          	$rootScope.opendAppIconUrl = appdetail.iconUrl;
		};

		$scope.dwSwitchTennant = function(ev, tennantDomain){
			$scope.toggleRightMenu();

			var switchConfirm = $mdDialog.confirm()
		      .title('Tennant switch confirm.')
		      .content('Are you sure you want to switch to "'+tennantDomain+'" ?')
		      .ariaLabel('Switch Tennant')
		      .ok('Yes go ahead !')
		      .cancel('Dont do it')
		      .targetEvent(ev);
		    $mdDialog.show(switchConfirm).then(function() {
		    	location.replace('http://'+tennantDomain);
		    }, function() {
		      
		    });
		};

		/*dwFrameworkNavigationScript*/

		$scope.dwFrameworkBuiltinAppNavigation = function(appName){
			switch(appName){
				case "market place":
					$state.go('launcher.marketplace');
				break;
				case "user profile":
					$state.go('launcher.userprofile');
				break;
				case "tennant explorer":
					$state.go('launcher.tennantexplorer');
				break;
				case "settings":
					$state.go('launcher.settings');
				break;
				default:
					console.log('wrong selection !');
			}
		};

		$scope.dwFrameworkConnectAppNavigation = function(){
			$state.go('duoworld-framework.launcher.connect');
		};

		$scope.appUninstall = function(appObject){
			$objectstore.getClient("application")
				.onComplete(function(data){
					console.log(data);
				})
				.onError(function(data){
					console.log(data);
				})
				.delete(appObject, {"KeyProperty":"ApplicationID"});
		};

		$scope.quitApplication = function(ev){
			var confirm = $mdDialog.confirm()
				.title('Quit Application')
				.content('Are you sure you want to quit the application, all unsaved data will be lost.')
				.ok('Yes')
				.cancel('No')
				.targetEvent(ev);
			$mdDialog.show(confirm).then(function(){
				location.replace('http://duoworld.duoweb.info/logout.php');
			}, function(){

			});
		};

	};

	duoWorldFrameworkShellCtrl.$inject = ['$rootScope','$scope','$state','$http','$location','$mdSidenav','$mdDialog','$mdToast','$presence','$auth','$apps','$v6urls','$helpers','$objectstore','stBlurredDialog','$timeout'];

	mambatiFrameworkShell.controller('duoworld-framework-shell-ctrl', duoWorldFrameworkShellCtrl);

}());