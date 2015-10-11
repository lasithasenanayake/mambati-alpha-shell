/*use strict*/
(function(mamDirectives){

/*Background Blur Directive (UI Helper Directive) - start*/
    mamDirectives.directive('backgroundblurComponent', function(){
      return{
        restrict: 'A',
        link: function(scope, element, attrs){
          $(element).backgroundBlur(scope.$eval(attrs.backgroundblurComponent));
        }
      };
    });
/*Background Blur Directive (UI Helper Directive) - end*/

/*Wave Component (UI Component Directive) - start*/
     mamDirectives.directive('waveComponent', ['$compile', function($compile){
        return {
          template:'<canvas id="waves"></canvas>',
          link: function(scope, element){
              var waves = new SineWaves({
                el: document.getElementById('waves'),
                
                speed: 4,
                
                width: function() {
                  return $(window).width();
                },
                
                height: function() {
                  return $(window).height();
                },
                
                ease: 'SineInOut',
                
                wavesWidth: '70%',
                
                waves: [
                  {
                    timeModifier: 4,
                    lineWidth: 1,
                    amplitude: -30,
                    wavelength: 25
                  },
                  {
                    timeModifier: 2,
                    lineWidth: 2,
                    amplitude: -75,
                    wavelength: 50
                  },
                  {
                    timeModifier: 1,
                    lineWidth: 1,
                    amplitude: -150,
                    wavelength: 100
                  },
                  {
                    timeModifier: 0.5,
                    lineWidth: 1,
                    amplitude: -300,
                    wavelength: 200
                  },
                  {
                    timeModifier: 0.25,
                    lineWidth: 2,
                    amplitude: -400,
                    wavelength: 400
                  }
                ],
               
                // Called on window resize
                resizeEvent: function() {
                  var gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);
                  gradient.addColorStop(0,"rgba(255, 255, 255, 0.2)");
                  gradient.addColorStop(0.5,"rgba(255, 255, 255, 0.5)");
                  gradient.addColorStop(1,"rgba(255, 255, 255, 0.2)");
                  
                  var index = -1;
                  var length = this.waves.length;
                  while(++index < length){
                    this.waves[index].strokeStyle = gradient;
                  }
                  
                  // Clean Up
                  index = void 0;
                  length = void 0;
                  gradient = void 0;
                }
              });
          }
        };
      }]);
/*Wave Component (UI Component Directive) - end*/

/*Dynamic Pannel Slider (UI Component Directive) - start*/
  mamDirectives.directive('panelsliderComponent', function(){
    return {
      scope: {
        componentdata: '='
      },
      template:'<ks-swiper-container override-parameters="{{componentdata.dockOverideParameters}}" initial-slide="{{componentdata.dockInitialPannel}}" direction="{{componentdata.dockTransitionDirection}}" loop="{{componentdata.dockPannelLoop}}" pagination-is-active="{{componentdata.dockPagination}}" slides-per-view="" space-between="300" pagination-clickable="true">'+
      '<ks-swiper-slide class="swiper-slide" ng-repeat="panel in shellDockConfig >'+
      '<div class="dockPanels">'+
      '<div class="sliderPanelContainer" ng-include="panel.pannnelDirectiveContentTemplate"></div>'+
      '<panneltitle-component title="panel.panelTitle"></panneltitle-component>'+
      '</div>'+
      '</ks-swiper-slide>'+
      '</ks-swiper-container>'
    };
  });
/*Dynamic Pannel Slider (UI Component Directive) - end*/


/*Dynamic Component Generator Directive (UI Helper Directive) - start*/
  mamDirectives.directive('componentGenerator', ['$compile', function($compile){
    return {
      scope: {
        component: '='
      },
      link: function(scope, element){
        console.log(scope.component);
          var generatedTemplate = '<div '+scope.component+'-component></div>';
          element.append($compile(generatedTemplate)(scope));
      }
    };
  }]);
/*Dynamic Component Generator Directive (UI Helper Directive) - end*/

/*Dynamic Control Directive - start*/
  mamDirectives.directive('mbDynamicCtrl', ['$compile', '$parse', function($compile, $parse){
    return{
      restrict: 'A',
      terminal: true,
      priority: 10000,
      link: function(scope, elem){
        var name = $parse(elem.attr('mb-dynamic-ctrl'))(scope);
        elem.removeAttr('mb-dynamic-ctrl');
        elem.attr('ng-controller', name);
        $compile(elem)(scope);
      }
    };
  }]);
/*Dynamic Control Directive - end*/


/*Application Document Interface Header Directive - start*/
  
/*Application Document Interface Header Directive - end*/

/*All Application Component - start*/
  mamDirectives.directive('allapplistComponent', function(){
    return{
      scope: {
        allappdetails: '='
      },
      template:'<div md-ink-ripple="#333" ng-click="favoriteAppLauncher();" style="position:relative" class="favoriteAppItemContainer" layout="row" layout-align="start start">'+
      '<div class="favoriteAppItemContainerIcon" layout="column" layout-align="center center">'+
      '<img ng-src="images/nikkang.png" err-src="images/appIcons/untitledapplication.png" width="32" height="32">'+
      '</div>'+
      '<div class="favoriteAppItemContainerDetails" layout="column" layout-align="center start">'+
      '<span>Sample Application</span>'+
      '<span><md-icon md-svg-icon="icons/ic_favorite_24px.svg" class="favoriteAppIconIndicator" alt="Favorited"></md-icon>Favorited</span>'+
      '</div>'+
      '</div>',
      controller: function($scope){
        
      }
    };
  });
/*All Application Component - end*/

/*Active Application Component - start*/
  mamDirectives.directive('activeapplistComponent', function(){
    return{
      scope: {
        activeappdetails: '='
      },
      template:'<div md-ink-ripple="#333" ng-click="favoriteAppLauncher();" style="position:relative" class="favoriteAppItemContainer" layout="row" layout-align="start start">'+
      '<div class="favoriteAppItemContainerIcon" layout="column" layout-align="center center">'+
      '<img ng-src="images/nikkang.png" err-src="images/appIcons/untitledapplication.png" width="32" height="32">'+
      '</div>'+
      '<div class="favoriteAppItemContainerDetails" layout="column" layout-align="center start">'+
      '<span>Sample Application</span>'+
      '<span><md-icon md-svg-icon="icons/ic_favorite_24px.svg" class="favoriteAppIconIndicator" alt="Favorited"></md-icon>Favorited</span>'+
      '</div>'+
      '</div>',
      controller: function($scope){
        
      }
    };
  });
/*Active Application Component - end*/

/*Favorite Application Component - start*/
  mamDirectives.directive('favoriteapplistComponent', function(){
    return{
      scope: {
        favoriteappdetails: '='
      },
      template:'<div md-ink-ripple="#333" ng-click="favoriteAppLauncher();" style="position:relative" class="favoriteAppItemContainer" layout="row" layout-align="start start">'+
      '<div class="favoriteAppItemContainerIcon" layout="column" layout-align="center center">'+
      '<img ng-src="images/nikkang.png" err-src="images/appIcons/untitledapplication.png" width="32" height="32">'+
      '</div>'+
      '<div class="favoriteAppItemContainerDetails" layout="column" layout-align="center start">'+
      '<span>Sample Application</span>'+
      '<span><md-icon md-svg-icon="icons/ic_favorite_24px.svg" class="favoriteAppIconIndicator" alt="Favorited"></md-icon>Favorited</span>'+
      '</div>'+
      '</div>',
      controller: function($scope){
        
      }
    };
  });
/*Favorite Application Component - end*/

/*Tennant Switcher Component - start*/
  mamDirectives.directive('tenantswitcherComponent', function(){
    return {
      scope: {
        currenttennant: '=',
      },
      template:'<div class="dw-current-tennant-container" layout="row" layout-align="center center" ng-click="switchTennant()">'+
      '<md-icon md-svg-icon="icons/ic_swap_vert_circle_24px.svg" class="s24" alt="switch tennants"></md-icon>'+
      '<span class="dw-current-tennant">{{currenttennant}}</span>'+
      '<md-tooltip>Switch Tennant</md-tooltip>'+
      '</div>',
      controller: function($rootScope,$scope,$element,$mdDialog){
        $scope.switchTennant = function(ev){
          var tennantCollection = $rootScope.recivedTennantCollection;
          $mdDialog.show({
            controller:tennantInfoController,
            templateUrl:'partials/modal-templates/partials.modal-templates.tennantswitcher.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            locals : {
                tennantCollection : tennantCollection 
            },
            clickOutsideToClose:true
          });

          function tennantInfoController($scope,tennantCollection){
            $scope.newTennantCollection = tennantCollection;

            $scope.makeSwitchTennant = function(tennantDomain){
              var switchConfirm = $mdDialog.confirm()
                  .title('Tennant switch confirm.')
                  .content('Are you sure you want to switch to "'+tennantDomain+'" ?')
                  .ariaLabel('Switch Tennant')
                  .ok('Yes go ahead !')
                  .cancel('Dont do it')
                  .targetEvent(ev);
                $mdDialog.show(switchConfirm).then(function() {
                  window.open('http://'+tennantDomain, '_blank');
                  // location.replace('http://'+tennantDomain);
                }, function() {
                  
                });
            };
          };
        };
      }
    };
  });
/*Tennant Switcher Component - end*/

/*Tennant Switch List Component - start*/
  mamDirectives.directive('tennantswitchlistComponent', function(){
    return{
      scope: {
        tennantid: '=',
      },
      template:'<div md-ink-ripple="#333" style="position:relative" class="tennantItemContainer" layout="row" layout-align="start start">'+
      '<div class="tennantItemContainerIcon" layout="column" layout-align="center center">'+
      '<md-icon md-svg-icon="icons/ic_exit_to_app_24px.svg" class="switchTennantHeaderIcon" alt="switch to {{tennantid}} tennant"></md-icon>'+
      '</div>'+
      '<div class="tennantItemContainerText" layout="column" layout-align="center start">'+
      '<span>{{tennantid}}</span>'+
      '</div>'+
      '</div>'
    };
  });
/*Tennant Switch List Component - end*/

/*App Shortcut Component Directive (UI Component Directive) - start*/
  mamDirectives.directive('appshortcutComponent', function(){
    return {
      scope: {
        component: '=',
        componentdata: '='
      },
      template:'<div class="appShorcutContainer" ng-class="{shortcutExpanded:wasDoubleClicked}">'+
      '<md-button class="appshortcutWidget" sglclick="singleClick()" ng-dblClick="doubleClick()">'+
      '<div class="md-applicationIcon-icon-section">'+
      '<img ng-src="{{componentdata.iconUrl}}" err-src="images/appIcons/untitledapplication.png" width="64" height="64">'+
      '</div>'+
      '<div class="md-applicationIcon-appname-section">{{componentdata.Name}}</div>'+
      '</md-button>'+
      '<div class="md-appControls-container" layout="row" layout-align="space-around start">'+
      '<md-button class="md-icon-button" aria-label="favourite app" ng-click="favoriteApp(componentdata)">'+
      '<md-icon md-svg-icon="icons/ic_favorite_24px.svg" class="s24" alt="favorite app"></md-icon>'+
      '</md-button>'+
      '<md-button class="md-icon-button" aria-label="info about app" ng-click="findAppInfo(componentdata)">'+
      '<md-icon md-svg-icon="icons/ic_info_outline_24px.svg" class="s24" alt="app info"></md-icon>'+
      '</md-button>'+
      '</div>'+
      '</div>',
      controller: function($rootScope, $scope, $element, $state, $location, $mdDialog, $mdToast){
        $scope.wasDoubleClicked = false;
        //console.log('this is the controller for - '+$scope.componentdata.applicationID);
        $scope.data = $scope.componentdata;

        $scope.singleClick = function(){
          //var locationParams = {childAppID:$scope.componentdata.ApplicationID, childAppName:$scope.componentdata.Name, childAppIcon:$scope.componentdata.iconUrl};
          //var encodedParams = $base64.encode(JSON.stringify(locationParams));
          var locationUri = "launcher/customapp/"+$scope.componentdata.ApplicationID+"/"+$scope.componentdata.Name;
          //console.log(locationUri);
          $location.path(locationUri);
          $rootScope.opendAppIconUrl = $scope.componentdata.iconUrl;
          $scope.wasDoubleClicked = false;
        };

        $scope.doubleClick = function(){
          $scope.wasDoubleClicked = !$scope.wasDoubleClicked;
        };

        $scope.favoriteApp = function(){
          $rootScope.frameworkFavoriteApplication.push($scope.componentdata);
          $scope.wasDoubleClicked = !$scope.wasDoubleClicked;
          $mdToast.show(
            $mdToast.simple()
              .content('Added '+$scope.componentdata.applicationTitle+' application to your favorites')
              .hideDelay(3000)
          );
          console.log($rootScope.frameworkFavoriteApplication);
        };

        $scope.findAppInfo = function(ev){
            $scope.wasDoubleClicked = false;
            var selectedApp = $scope.componentdata;
            $mdDialog.show({
              controller:appInfoController,
              templateUrl:'partials/modal-templates/partials.modal-templates.appinfo.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              locals : {
                  selectedAppInfo : selectedApp 
              },
              clickOutsideToClose:true
            });
        };

        function appInfoController($scope,selectedAppInfo){
          $scope.selectedAppInfo = selectedAppInfo;
        }

        // $scope.launchApplication = function(appName){
        //   $state.go('launcher.marketplace');
        // }
      } 
    };
  });
/*App Shortcut Component Directive (UI Component Directive) - end*/

/*Force Single Click Directive (UI Helper Directive) - start*/
  mamDirectives.directive('sglclick', ['$parse', function($parse) {
      return {
          restrict: 'A',
          link: function(scope, element, attr) {
            var fn = $parse(attr['sglclick']);
            var delay = 200, clicks = 0, timer = null;
            element.on('click', function (event) {
              clicks++;  //count clicks
              if(clicks === 1) {
                timer = setTimeout(function() {
                  scope.$apply(function () {
                      fn(scope, { $event: event });
                  }); 
                  clicks = 0;             //after action performed, reset counter
                }, delay);
                } else {
                  clearTimeout(timer);    //prevent single-click action
                  clicks = 0;             //after action performed, reset counter
                }
            });
          }
      };
  }]);
/*Force Single Click Directive (UI Helper Directive) - end*/

/*Pannel Title Directive (UI Component Directive) - start*/
	mamDirectives.directive('panneltitleComponent', function(){

		var linkFunction = function(scope, elem, attrs){

		};

		return{
			restrict: 'E',
			scope: {
				title: '='
			},
			template:'<div class="panelTitleHolder"><h1>{{title}}<h1></div>',
			link: linkFunction
		};
	});
/*Pannel Title Directive (UI Component Directive) - end*/

/*Slide Animation Directive (UI Animation Directive) - start*/
	mamDirectives.animation('.slide-animation', function () {
        return {
            beforeAddClass: function (element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    var finishPoint = element.parent().width();
                    if(scope.direction !== 'right') {
                        finishPoint = -finishPoint;
                    }
                    TweenMax.to(element, 0.3, {left: finishPoint, onComplete: done });
                }
                else {
                    done();
                }
            },
            removeClass: function (element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    element.removeClass('ng-hide');

                    var startPoint = element.parent().width();
                    if(scope.direction === 'right') {
                        startPoint = -startPoint;
                    }

                    TweenMax.fromTo(element, 0.3, { left: startPoint }, {left: 0, onComplete: done });
                }
                else {
                    done();
                }
            }
        };
    });
/*Slide Animation Directive (UI Animation Directive) - end*/

/*Image SRC Error Directive (UI Helper Directive) - start*/
	mamDirectives.directive('errSrc', function() {
		return{
			link: function(scope, element, attrs){
				element.bind('error', function(){
					if(attrs.src != attrs.errSrc){
						attrs.$set('src', attrs.errSrc);
					}
				});

				attrs.$observe('ngSrc', function(value){
					if(!value && attrs.errSrc){
						attrs.$set('src', attrs.errSrc);
					}
				});
			}
		}
	});
/*Image SRC Error Directive (UI Helper Directive) - end*/

/*Shell Branding Directive (UI Component Directive) - start*/
	mamDirectives.directive('shellBranding', function(){

		var linkFunction = function(scope, elem, attrs){
		
		};

		return {
			restrict: 'E',
			replace: 'true',
			template: '<img  width="122" height="32" style="cursor:pointer;"/>',
			scope: {},
			link: linkFunction
		};
	});
/*Shell Branding Directive (UI Component Directive) - end*/

/*Shell Background Directive (UI Component Directive) - start*/
  mamDirectives.directive('shellbackgroundComponent', function(){
    return{
      restrict: 'E',
      scope: {},
      link: function(scope, element, attrs){
        scope.backgroundUrl = attrs['dwShellBackgroundConfig.backgroundImageUrl'];
        element.css({"background": "url("+scope.backgroundUrl+") no-repeat", "background-size":"100% 100%"});
      }
    };
  });
/*Shell Background Directive (UI Component Directive) - end*/

/*Image Blur Directive (UI Helper Directive) - start*/
	mamDirectives.directive('blur',function(){
        return{
            restrict:'E',
            replace:true,
            scope:{
                blurSrc:"@",
                blurIntensity:"@"
            },
            template:'<canvas id="myCanvas" style="position:absolute;">'
                        +'</canvas>',
            link:function(scope,element,attrs){

                var canvas,context,canvasBackground,width,height;

                canvas=element[0];
                width=parseInt(canvas.parentNode.offsetWidth);
                height=parseInt(canvas.parentNode.offsetHeight);
                canvas.width=width;
                canvas.height=height;
                context=canvas.getContext('2d');
                canvasBackground = new Image();
                canvasBackground.src = scope.blurSrc;
                context.drawImage(canvasBackground, 0, 0, width, height);
                stackBlurCanvasRGBA(attrs.id, 0, 0, width, height, scope.blurIntensity);
            }
        }
    });
/*Image Blur Directive (UI Helper Directive) - end*/

    /*
 ____ __ __   __ _____  _____  ___  __    __  __ _____  ___  _____ _____ _____    ____   ___  _____      __ _____  ___  _____ _____ 
((    || ||  ((   ||   ((   )) || \/ |    ||==|| ||==  ||=|| ||  ) ||==  ||_//    ||=)  ||=|| ||_//     ((   ||   ||=|| ||_//  ||   
 \\__ \\_// \_))  ||    \\_//  ||    |    ||  || ||___ || || ||_// ||___ || \\    ||_)) || || || \\    \_))  ||   || || || \\  ||
*/
	
		mamDirectives.directive('mdHeader', function() {
	  return {
		restrict: 'E',
		template: "<div style='max-width:960px;margin: 0 auto;animation: fromTop 1.3s 1; -webkit-animation: fromTop 1.3s 1;'><!--APP DETAILS START--><div style='float:left;' ng-init='showImage=true'><img ng-show='showImage' src='{{src}}' style='height:42px;width;42px;border-radius:50px;margin-top:6px;margin-left:10px'/></div><div style='float:left;margin-top:14px;margin-left:8px;'><label style='font-size:23px;font-weight:700'>{{name}}</label></div><!--APP DETAILS END--><!--ACTION BUTTONS START--><div style='float:right;margin-right:10px'><md-button aria-label='First Button'><md-icon md-svg-src='bower_components/material-design-icons/content/svg/production/ic_remove_24px.svg' style='width:25px'></md-icon></md-button><md-button aria-label='First Button'><md-icon md-svg-src='bower_components/material-design-icons/image/svg/production/ic_add_to_photos_24px.svg' style='width:25px'></md-icon></md-button><md-button aria-label='First Button'><md-icon md-svg-src='bower_components/material-design-icons/navigation/svg/production/ic_close_18px.svg' style='width:25px'></md-icon></md-button></div><!--ACTION BUTTONS END--></div>",
//		"<md-toolbar layout='row' layout-align='space-between center' ng-init='showImage=true' style='animation: fromTop 1.3s 1; -webkit-animation: fromTop 1.3s 1;'><span><h2 class='md-toolbar-tools'><span style='margin-top:3px'><img ng-show='showImage' src='{{src}}' height='55px' width='55px' style='border-radius: 50px;'></img></span> <span style='margin-left:10px'>{{name}}</span></h2></span> <span style='margin-top:-21px'> <md-button aria-label='First Button'><md-icon md-svg-src='bower_components/material-design-icons/content/svg/production/ic_remove_24px.svg' style='fill: white'></md-icon></md-button> <md-button aria-label='Second Button'><md-icon md-svg-src='bower_components/material-design-icons/image/svg/production/ic_add_to_photos_24px.svg' style='fill: white;'></md-icon></md-button><md-button aria-label='Second Button'><md-icon md-svg-src='bower_components/material-design-icons/navigation/svg/production/ic_close_18px.svg' style='fill: white;'></md-icon></md-button> </span> </md-toolbar>",
		scope:{
			src:'@',
			name:'@'
		},
		link: function(scope,element){
		 if(!scope.src)
		 {
			scope.showImage = false;
		 }
	
		
		} //end of link
	  };
	});
	
/*
 ____ __ __   __ _____  _____  ___  __    __  __ _____  ___  _____ _____ _____    ____   ___  _____    _____ __ __  __ __   __ __  __ 
((    || ||  ((   ||   ((   )) || \/ |    ||==|| ||==  ||=|| ||  ) ||==  ||_//    ||=)  ||=|| ||_//    ||==  || ||\\|| ||  ((  ||==|| 
 \\__ \\_// \_))  ||    \\_//  ||    |    ||  || ||___ || || ||_// ||___ || \\    ||_)) || || || \\    ||    || || \|| || \_)) ||  || 
*/		

/*
 ____ __ __   __ _____  _____  ___  __    _____  ___  ____  __    _____      __ _____  ___  _____ _____ 
((    || ||  ((   ||   ((   )) || \/ |     ||   ||=|| ||=)  ||    ||==      ((   ||   ||=|| ||_//  ||   
 \\__ \\_// \_))  ||    \\_//  ||    |     ||   || || ||_)) ||__| ||___    \_))  ||   || || || \\  ||   
*/

  mamDirectives.directive('mdTable',["$objectstore",  function ($objectstore) {
  return {
    restrict: 'E',
    scope: { 
	  heading: '@',
	  osNamespace:'@',
	  osClass:'@',
	  object:'@',
	  value: '@',
      headers: '=', 
      sortable: '=', 
      filters: '=',
      customClass: '=customClass',
      thumbs:'=', 
      count: '=' 
    },
    controller: function ($scope,$filter,$window) {
	
	$scope.toggleSearch = false;   
  

	$scope.content = {};
	$scope.nested = {};
	
	var client = $objectstore.getClient($scope.osNamespace,$scope.osClass);

					
			client.onGetMany(function(data){
				if (data)
					if(data.length >0)
					{
						$scope.content = data;
						for (index = 0; index < $scope.content.length; index++) 
						{
							//var object = "customer";
							//var value = "name";
														
							if($scope.content[index][$scope.object] == null || $scope.content[index][$scope.object] == ""){
								continue;
							}
							
							$scope.content[index][$scope.object] = $scope.content[index][$scope.object][$scope.value];
			
						}
						
					}
					
			});	

				client.getByFiltering("*");
	
      var orderBy = $filter('orderBy');
      $scope.tablePage = 0;
      $scope.nbOfPages = function () {
        return Math.ceil($scope.content.length / $scope.count);
      },
      	$scope.handleSort = function (field) {
          if ($scope.sortable.indexOf(field) > -1) { return true; } else { return false; }
      };
      $scope.order = function(predicate, reverse) {
          $scope.content = orderBy($scope.content, predicate, reverse);
          $scope.predicate = predicate;
      };
      $scope.order($scope.sortable[0],false);
      $scope.getNumber = function (num) {
      			    return new Array(num);
      };
      $scope.goToPage = function (page) {
        $scope.tablePage = page;
      };
	  
    },
    template: "<table md-colresize='md-colresize' class='md-table'> <div> <h2>{{heading}}</h2> </div> <thead> <tr class='md-table-headers-row'> <th ng-repeat='h in headers' class='md-table-header'><a href='#' ng-if='handleSort(h.field)' ng-click='reverse=!reverse;order(h.field,reverse)'>{{h.name}} <i ng-show='reverse &amp;&amp; h.field == predicate' class='ion-android-arrow-dropup'></i><i ng-show='!reverse &amp;&amp; h.field == predicate' class='ion-android-arrow-dropdown'></i></a><span ng-if='!handleSort(h.field)'>{{h.name}}</span></th> <th class='md-table-header'></th> </tr> </thead> <tbody> <tr ng-repeat='c in content | filter:filters | startFrom:tablePage*count | limitTo: count' class='md-table-content-row'> <td ng-repeat='h in headers' ng-class='customClass[h.field]' ng-if='h.field != thumbs' class='md-table-content'>{{(h.field.indexOf('date') > 0) ? $filter('date')(c[h.field]) : c[h.field];}}</td> <td class='md-table-td-more'> <md-button aria-label='Info'><i class='ion-android-more-vertical'></i></md-button> </td> </tr> </tbody> </table> <div layout='row' class='md-table-footer'><span class='md-table-count-info'>Rows per page : <a href='#' ng-click='goToPage(0); count=10'>10</a>,<a href='#' ng-click='goToPage(0); count=25'>25</a>,<a href='#' ng-click='goToPage(0); count=50'>50</a>,<a href='#' ng-click='goToPage(0); count=100'>100</a>(current is {{count}})</span><span flex='flex'></span><span ng-show='nbOfPages() &gt; 1'> <md-button ng-disabled='tablePage==0' ng-click='tablePage=tablePage-1' aria-label='Previous Page' class='md-primary md-hue-2'><i style='font-size:16px;' class='ion-chevron-left'></i></md-button><a href='#' ng-repeat='i in getNumber(nbOfPages()) track by $index'> <md-button ng-click='goToPage($index)' class='md-primary md-hue-2 md-table-footer-item'><span ng-class='{ 'md-table-active-page': tablePage==$index}'>{{$index+1}}</span></md-button></a> <md-button ng-disabled='tablePage==nbOfPages()-1' ng-click='tablePage=tablePage+1' aria-label='Next Page' class='md-primary md-hue-2'><i style='font-size:16px;' class='ion-chevron-right'></i></md-button></span></div>"
  }
}]);

mamDirectives.directive('mdColresize', function ($timeout) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      scope.$evalAsync(function () {
        $timeout(function(){ $(element).colResizable({
          liveDrag: true,
          fixed: true
          
        });},100);
      });
    }
  }
});

mamDirectives.filter('startFrom',function (){
  return function (input,start) {
    start = +start;
    return input.slice(start);
  }
});

/*
 ____ __ __   __ _____  _____  ___  __    _____  ___  ____  __    _____    _____ __ __  __ __   __ __  __ 
((    || ||  ((   ||   ((   )) || \/ |     ||   ||=|| ||=)  ||    ||==     ||==  || ||\\|| ||  ((  ||==|| 
 \\__ \\_// \_))  ||    \\_//  ||    |     ||   || || ||_)) ||__| ||___    ||    || || \|| || \_)) ||  ||  
*/
	
/*
_____ __ __    _____    __ __ _____ __     _____   ___  _____      __ _____  ___  _____ _____ 
||==  || ||    ||==     || || ||_// ||    ((   )) ||=|| ||  )     ((   ||   ||=|| ||_//  ||   
||    || ||__| ||___    \\_// ||    ||__|  \\_//  || || ||_//    \_))  ||   || || || \\  || 
*/	
mamDirectives.directive('fileUpLoader',['$uploader',"$rootScope", function($uploader,$rootScope) {
	  return {
		restrict: 'E',
		template: "<div class='content' ng-init='showUploadButton=false;showDeleteButton=false;showUploadTable=false;'><div id='drop-files' ondragover='return false' layout='column' layout-align='space-around center'><div id='uploaded-holder' flex ><div id='dropped-files' ng-show='showUploadTable'><table id='Tabulate' ></table></div></div><div flex ><md-button class='md-raised' id='uploadbtn' ng-show='showUploadButton' class='md-raised' style='color:#1976D2;margin-top: 5px;'><md-icon md-svg-src='bower_components/material-design-icons/file/svg/production/ic_cloud_upload_48px.svg'></md-icon></md-button><md-button class='md-raised' id='deletebtn' ng-show='showDeleteButton' class='md-raised' style='color:rgb(244,67,54);margin-left:30px;'><md-icon md-svg-src='bower_components/material-design-icons/action/svg/production/ic_delete_24px.svg'></md-icon></md-button></div><div flex><md-icon md-svg-src='bower_components/material-design-icons/file/svg/production/ic_cloud_upload_48px.svg'></md-icon><text style='font-size:12px;margin-left:10px'>{{label}}<text></div></div></div>",
		scope:{
			osNamespace:'@',
			osClass:'@',
			label:'@'
		},
		link: function(scope,element){

			// Makes sure the dataTransfer information is sent when we
			// Drop the item in the drop box.
			jQuery.event.props.push('dataTransfer');
			

			// file/s on a single drag and drop
			var files;
			
			// total of all the files dragged and dropped
			var filesArray = [];
			
			// Bind the drop event to the dropzone.
			element.find("#drop-files").bind('drop', function(e) {
					
				// Stop the default action, which is to redirect the page
				// To the dropped file
				
				  files = e.dataTransfer.files || e.dataTransfer.files;
				
				  for(indexx = 0; indexx < files.length; indexx++) {
						filesArray.push(files[indexx]);
						console.log(filesArray);
					}
				

			 var newHtml = "<tr class='md-table-headers-row'><th class='md-table-header' style='Padding:0px 16px 10px 0'>Name</th><th class='md-table-header' style='Padding:0px 16px 10px 0'>Type</th><th class='md-table-header' style='Padding:0px 16px 10px 0'>Size</th></tr>";

			  for (var i = 0; i < filesArray.length; i++) {
					 var tableRow = "<tr><td class='upload-table' style='float:left'>" + filesArray[i].name + "</td><td class='upload-table'>" +
					 filesArray[i].type+ "</td><td class='upload-table'>" +
					 filesArray[i].size +" bytes"+ "</td></tr>";
					 newHtml += tableRow;
				}
				
				element.find("#Tabulate").html(newHtml);
				 
				 $rootScope.$apply(function(){
					scope.showUploadButton = true;
					scope.showDeleteButton = true;
					scope.showUploadTable = true;
				 })
	
			});
			
			function restartFiles() {
				
				// We need to remove all the images and li elements as
				// appropriate. We'll also make the upload button disappear
				
				
				
				 $rootScope.$apply(function(){
					scope.showUploadButton = false;
					scope.showDeleteButton = false;
					scope.showUploadTable = false;
				 })
			
				// And finally, empty the array
				filesArray = [];
				
				return false;
			}
			
			element.find('#uploadbtn').click(function(){
						
				for	(indexx = 0; indexx < filesArray.length; indexx++) {
							console.log(filesArray[indexx].name);
							
							$uploader.upload(scope.osNamespace, scope.osClass, filesArray[indexx]);
							$uploader.onSuccess(function(e,data){
								alert (" Successfully uploaded");
							});

							$uploader.onError(function(e,data){
								alert ("Upload Error");
							});
							
					}
				
				
			});
		
			
			// Just some styling for the drop file container.
			element.find('#drop-files').bind('dragenter', function() {
				$(this).css({'box-shadow' : 'inset 0px 0px 20px rgba(0, 0, 0, 0.1)', 'border' : '2px dashed rgb(255,64,129)'});
				return false;
			});
			
			element.find('#drop-files').bind('drop', function() {
				$(this).css({'box-shadow' : 'none', 'border' : '2px dashed rgba(0,0,0,0.2)'});
				return false;
			});
			
		
			element.find('#deletebtn').click(restartFiles);
			
		
		} //end of link
	  };
	}]);
/*
_____ __ __    _____    __ __ _____ __     _____   ___  _____    _____ __ __  __ __   __ __  __ 
||==  || ||    ||==     || || ||_// ||    ((   )) ||=|| ||  )    ||==  || ||\\|| ||  ((  ||==|| 
||    || ||__| ||___    \\_// ||    ||__|  \\_//  || || ||_//    ||    || || \|| || \_)) ||  || 
*/

})(angular.module('mambatiDirectives', []));