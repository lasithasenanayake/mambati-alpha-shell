/*Mambati custom app script file*/

var mambatiFrameworkShell = angular.module('mambatiFrameworkShell', ['ct.ui.router.extras','uiMicrokernel','ngMaterial','ngAnimate','ngTouch','gridster','angularScreenfull','ksSwiper','mambatiDirectives','mambatiRenderingEngine','dwShellCommonFilters','ngDialog','angular.filter','stBlurredDialog','vAccordion','widget']);

mambatiFrameworkShell.run(function($state, $rootScope){
	$rootScope.$state = $state;
	console.log($rootScope.$state);
});

mambatiFrameworkShell.config(['$stateProvider', '$futureStateProvider', '$stickyStateProvider',function($sp, $fsp, $ssp){
	// var allApps;
	// var fetchedCustomAppStates = [];

	$sp
		//---------------------- dock state -----------------------------------------------------
		.state('dock',{
			url:'/dock',
			templateUrl:'partials/frameworktemplates/duoworld-framework.dock.html',
			controller:'duoworld-framework-shell-dock-ctrl',
			onEnter: function(){
				console.log('entered doc state');
			}
		})
		//---------------------- launcher state (parent to all below states) --------------------
		.state('launcher',{
			url:'/launcher',
			templateUrl:'partials/frameworktemplates/duoworld-framework.launcher.html',
			controller:'duoworld-framework-shell-launcher-ctrl'
		})
		//---------------------- launcher default app states (child to launcher state) ----------
		.state('launcher.marketplace',{
			url:'/marketplace',
			sticky:true,
			views: {
				'marketplace': {
					templateUrl:'partials/frameworktemplates/duoworld-framework.launcher.marketplace.html',
					controller:'duoworld-framework-shell-launcher-marketplace-ctrl'
				}
			}
		})
		.state('launcher.userprofile',{
			url:'/userprofile',
			sticky:true,
			views: {
				'userprofile': {
					templateUrl:'partials/frameworktemplates/duoworld-framework.launcher.userprofile.html',
					controller:'duoworld-framework-shell-launcher-userprofile-ctrl'
				}
			}
		})
		.state('launcher.tennantexplorer',{
			url:'/tennantexplorer',
			sticky:true,
			views: {
				'tennantexplorer': {
					templateUrl:'partials/frameworktemplates/duoworld-framework.launcher.tennantexplorer.html'
				}
			}
			//controller:'duoworld-framework-shell-launcher-tennantexplorer-ctrl'
		})
		.state('launcher.settings',{
			url:'/settings',
			sticky:true,
			views: {
				'settings': {
					templateUrl:'partials/frameworktemplates/duoworld-framework.launcher.settings.html',
					controller:'duoworld-framework-shell-launcher-settings-ctrl'
				}
			}
			//controller:'duoworld-framework-shell-launcher-settings-ctrl'
		})
		.state('launcher.connect',{
			url:'/connect',
			sticky:true,
			views: {
				'connect': {
					templateUrl:'partials/frameworktemplates/duoworld-framework.launcher.connect.html',
					controller:'duoworld-framework-shell-launcher-connect-ctrl'
				}
			}
		})
		.state('launcher.customapp',{
			url:'/customapp/:childAppID/:childAppName',
			sticky:true,
			views: {
				'customapp': {
					templateUrl:'partials/frameworktemplates/duoworld-framework.launcher.customapps.html',
					controller:'duoworld-framework-shell-launcher-customapps-ctrl'
				}
			}
		});

	// var providerAppRetrivel = function(){
	// 	appProvider.$get().onAppsRetrieved(function(e,data){
	// 		for(appIndex in data.apps){
	// 			var tempObject = {};
	// 			var tempObject1 = {};
	// 			var tempObject2 = {};
	// 			//fetchedCustomAppStates.push({"name":""+data.apps[appIndex].Name+"","url":"/"+data.apps[appIndex].ApplicationID+"","sticky":true,"views":{"data.apps[appIndex].Name": {"templateUrl":"partials/frameworktemplates/duoworld-framework.launcher.customapps.html","controller":"duoworld-framework-shell-launcher-customapps-ctrl"}}});
	// 			tempObject["name"] = "launcher."+data.apps[appIndex].ApplicationID+"";
	// 			tempObject["url"] = "/"+data.apps[appIndex].ApplicationID+"";
	// 			tempObject["sticky"] = true;
	// 			tempObject2["template"] = "<div style='position:relative; width:100%; height:100%; background:red;'><h1>"+data.apps[appIndex].Name+"</h1></div>";
	// 			tempObject1["APP_Election_Results_Submission"] = tempObject2;
	// 			tempObject["views"] = tempObject1;
	// 			fetchedCustomAppStates.push(tempObject);
	// 		}
	// 		allApps = data.apps;
	// 		console.log(fetchedCustomAppStates);
	// 	});

	// 	appProvider.$get().getAppsForUser();

	// 	console.log(allApps);
	// }

	// providerAppRetrivel();

	// var futureStateResolve = function(){
	// 	return angular.forEach(fetchedCustomAppStates, function(state) { 
	//         $sp.state(state);
	//     })
	// }

	$ssp.enableDebug(false);
	//$fsp.addResolve(futureStateResolve);

}]);
