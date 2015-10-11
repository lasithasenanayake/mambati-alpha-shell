//duoworld-framework-shell-launcher-settings-ctrl

(function(){

	var duoworldFrameworkShellLauncherSettingsControl = function($rootScope, $scope, $state, $objectstore, $http, $rootScope, ngDialog, $timeout, $mdToast){

		/*Dont touch This*/
		$scope.childApplicationClose = function(){
			$state.go('dock');
		};

		$scope.childApplicationMinimise = function(){
			$state.go('dock');
		};

		/*Do what you want !*/

		$scope.defaultThemes = [
			{primarypaletteName:'red',primarypalette:'#F44336',accentpalette:'#FFC107'},
			{primarypaletteName:'pink',primarypalette:'#E91E63',accentpalette:'#CDDC39'},
			{primarypaletteName:'puple',primarypalette:'#9C27B0',accentpalette:'#00BCD4'},
			{primarypaletteName:'deep-purple',primarypalette:'#673AB7',accentpalette:'#FF5722'},
			{primarypaletteName:'indigo',primarypalette:'#3F51B5',accentpalette:'#FF4081'},
			{primarypaletteName:'blue',primarypalette:'#2196F3',accentpalette:'#607D8B'},
			{primarypaletteName:'light-blue',primarypalette:'#03A9F4',accentpalette:'#FF5252'},
			{primarypaletteName:'cyan',primarypalette:'#00BCD4',accentpalette:'#FFC107'},
			{primarypaletteName:'teal',primarypalette:'#009688',accentpalette:'#FF9800'},
			{primarypaletteName:'green',primarypalette:'#4CAF50',accentpalette:'#7C4DFF'},
			{primarypaletteName:'light-green',primarypalette:'#8BC34A',accentpalette:'#607D8B'},
			{primarypaletteName:'lime',primarypalette:'#CDDC39',accentpalette:'#00BCD4'},
			{primarypaletteName:'yellow',primarypalette:'#FFEB3B',accentpalette:'#536DFE'},
			{primarypaletteName:'amber',primarypalette:'#FFC107',accentpalette:'#03A9F4'},
			{primarypaletteName:'orange',primarypalette:'#FF9800',accentpalette:'#009688'},
			{primarypaletteName:'deep-orange',primarypalette:'#FF5722',accentpalette:'#CDDC39'},
			{primarypaletteName:'brown',primarypalette:'#795548',accentpalette:'#CDDC39'},
			{primarypaletteName:'grey',primarypalette:'#9E9E9E',accentpalette:'#00BCD4'},
			{primarypaletteName:'blue-grey',primarypalette:'#607D8B',accentpalette:'#FFC107'}
		];

		$scope.defaultWallPapers = [
			{imgUrl:'./images/shellassets/background/blur-background01.jpg'},
			{imgUrl:'./images/shellassets/background/blur-background02.jpg'},
			{imgUrl:'./images/shellassets/background/blur-background03.jpg'},
			{imgUrl:'./images/shellassets/background/blur-background04.jpg'},
			{imgUrl:'./images/shellassets/background/blur-background05.jpg'},
			{imgUrl:'./images/shellassets/background/blur-background06.jpg'},
			{imgUrl:'./images/shellassets/background/blur-background07.jpg'},
			{imgUrl:'./images/shellassets/background/blur-background08.jpg'},
			{imgUrl:'./images/shellassets/background/blur-background09.jpg'},
			{imgUrl:'./images/shellassets/background/blur-background10.jpg'},
			{imgUrl:'./images/shellassets/background/blur-background11.jpg'},
			{imgUrl:'./images/shellassets/background/blur-background12.jpg'},
			{imgUrl:'./images/shellassets/background/blur-background13.jpg'},
			{imgUrl:'./images/shellassets/background/blur-background14.jpg'},
			{imgUrl:'./images/shellassets/background/blur-background15.jpg'},
			{imgUrl:'./images/shellassets/background/blur-background16.jpg'},
			{imgUrl:'./images/shellassets/background/blur-background17.jpg'},
			{imgUrl:'./images/shellassets/background/blur-background18.jpg'},
			{imgUrl:'./images/shellassets/background/blur-background124.jpg'}
		];

		$scope.changeTheme = function(selectedTheme){
			console.log(selectedTheme);
			$rootScope.shellConfig.themeconfiguration.palettename = selectedTheme.primarypaletteName;
			$rootScope.shellConfig.themeconfiguration.primarypalette = selectedTheme.primarypalette;
			$rootScope.shellConfig.themeconfiguration.accentpalette = selectedTheme.accentpalette;
		};

		$scope.changeWallPaper = function(wallPaper){
			$rootScope.shellConfig.backgroundconfiguration.backgroundimageurl = wallPaper.imgUrl;
		};

		$scope.saveGlobalSettings = function(){
			$mdToast.show(
	            $mdToast.simple()
	              .content('Changes have been saved !')
	              .hideDelay(3000)
	        );
		};

	};

	duoworldFrameworkShellLauncherSettingsControl.$inject = ['$rootScope','$scope','$state','$objectstore', '$http', '$rootScope', 'ngDialog', '$timeout'];

	mambatiFrameworkShell.controller('duoworld-framework-shell-launcher-settings-ctrl', duoworldFrameworkShellLauncherSettingsControl);
})();