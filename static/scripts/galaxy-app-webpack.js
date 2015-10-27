require("./libs/common-libs"),define(["mvc/user/user-model","utils/metrics-logger","utils/add-logging","utils/localization"],function(a,b,c,d){function e(a,b){var c=this;return c._init(a||{},b||{})}return c(e,"GalaxyApp"),e.prototype.defaultOptions={patchExisting:!0,root:"/"},e.prototype._init=function(a,b){var c=this;return console.debug("bootstrapped:",b),_.extend(c,Backbone.Events),c._processOptions(a),c.debug("GalaxyApp.options: ",c.options),c._patchGalaxy(window.Galaxy),c._initLogger(a.loggerOptions||{}),c.debug("GalaxyApp.logger: ",c.logger),c._initLocale(),c.debug("GalaxyApp.localize: ",c.localize),c.config=a.config||b.config||{},c.debug("GalaxyApp.config: ",c.config),c._initUser(a.user||b.user||{}),c.debug("GalaxyApp.user: ",c.user),c._setUpListeners(),c.trigger("ready",c),c},e.prototype._processOptions=function(a){var b=this,c=b.defaultOptions;b.debug("_processOptions: ",a),b.options={};for(var d in c)c.hasOwnProperty(d)&&(b.options[d]=a.hasOwnProperty(d)?a[d]:c[d]);return b},e.prototype._patchGalaxy=function(a){var b=this;if(b.options.patchExisting&&a){b.debug("found existing Galaxy object:",a);for(var c in a)a.hasOwnProperty(c)&&(b.debug("	 patching in "+c+" to Galaxy"),b[c]=a[c])}},e.prototype._initLogger=function(a){var c=this;return c.debug("_initLogger:",a),c.logger=new b.MetricsLogger(a),c},e.prototype._initLocale=function(a){var b=this;return b.debug("_initLocale:",a),b.localize=d,window._l=b.localize,b},e.prototype._initUser=function(b){var c=this;return c.debug("_initUser:",b),c.user=new a.User(b),c.currUser=c.user,c},e.prototype._setUpListeners=function(){var a=this;return a.lastAjax={},$(document).bind("ajaxSend",function(b,c,d){var e=d.data;try{e=JSON.parse(e)}catch(f){}a.lastAjax={url:location.href.slice(0,-1)+d.url,data:e}}),a._listenToGalaxyMain(),a},e.prototype._listenToGalaxyMain=function(){var a=this,b="iframe#galaxy_main",c=$(b);if(c=c.size()?c.get(0).contentWindow:void 0){var d=function(){try{var c=$(b).get(0).contentWindow,d=c.location.pathname+c.location.search+c.location.hash;a.trigger("galaxy_main:load",{fullpath:d,pathname:c.location.pathname,search:c.location.search,hash:c.location.hash})}catch(e){a.debug("Error handling main frame load:",e)}};$(b).on("load",d)}else a.debug("No galaxy_main found")},e.prototype.toString=function(){var a=this.user.get("email")||"(anonymous)";return"GalaxyApp("+a+")"},{GalaxyApp:e}});
//# sourceMappingURL=../maps/galaxy-app-webpack.js.map