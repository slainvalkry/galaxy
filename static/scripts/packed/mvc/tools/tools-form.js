define(["mvc/tools","mvc/ui/ui-portlet","mvc/ui/ui-table","mvc/ui/ui-misc"],function(b,c,a,f){var e=Backbone.Model.extend({initialize:function(g){this.url=galaxy_config.root+"api/tools/"+g.id+"?io_details=true"}});var d=Backbone.View.extend({main_el:"body",initialize:function(h){var g=this;this.model=new e({id:h.id});this.model.fetch({success:function(){g.portlet=new c.View({icon:"fa-wrench",title:"<b>"+g.model.get("name")+"</b> "+g.model.get("description"),buttons:{execute:new f.ButtonIcon({icon:"fa-check",tooltip:"Execute the tool",title:"Execute",floating:"clear",onclick:function(){}})}});g.table=new a.View();g.message=new f.Message();g.portlet.append(g.message.$el);$(g.main_el).append(g.portlet.$el);g.setElement(g.portlet.content());g.portlet.append(g.table.$el);g.render()}})},render:function(){var g=this.model.get("inputs");this.table.delAll();this.list=[];var h=new Backbone.Model();for(var i in g){this._add(g[i],h)}for(var i in this.list){this.list[i].trigger("change")}},_add:function(g,j){var h=this;var m=g.name;console.debug(g);var k=null;var i=g.type;switch(i){case"text":k=this.field_text(g,j);break;case"select":k=this.field_select(g,j);break;case"radiobutton":k=this.field_radio(g,j);break;case"data":k=this.field_select(g,j);break;case"textarea":k=this.field_textarea(g,j);break;default:k=new f.Input({id:"field-"+m,placeholder:g.placeholder,type:g.type,onchange:function(){j.set(m,k.value())}})}if(!j.get(m)){j.set(m,g.value)}k.value(j.get(m));this.list[m]=k;var l=$("<div/>");l.append(k.$el);if(g.info){l.append('<div class="ui-table-form-info">'+g.info+"</div>")}if(this.options.style=="bold"){this.table.add(new f.Label({title:g.title,cls:"form-label"}).$el);this.table.add(l)}else{this.table.add('<span class="ui-table-form-title">'+g.label+"</span>","25%");this.table.add(l)}this.table.append(m);if(g.hide){this.table.get(m).hide()}},field_text:function(g,h){var i=g.name;return new f.Input({id:"field-"+i,value:h.get(i),onchange:function(j){h.set(i,j)}})},field_textarea:function(g,h){var i=g.name;return new f.Textarea({id:"field-"+i,onchange:function(){h.set(i,field.value())}})},field_select:function(g,l){var h=[];for(var j in g.options){var k=g.options[j];h.push({label:k[0],value:k[1]})}var m=g.name;return new f.Select.View({id:"field-"+m,data:h,value:l.get(m),onchange:function(p){l.set(m,p);var r=_.findWhere(h,{value:p});if(r&&r.operations){var n=r.operations;for(var o in n.show){var q=n.show[o];self.table.get(q).show()}for(var o in n.hide){var q=n.hide[o];self.table.get(q).hide()}}}})},field_radio:function(g,h){var i=g.name;return new f.RadioButton({id:"field-"+i,data:g.data,value:h.get(i),onchange:function(l){h.set(i,l);var n=_.findWhere(g.data,{value:l});if(n&&n.operations){var j=n.operations;for(var k in j.show){var m=j.show[k];self.table.get(m).show()}for(var k in j.hide){var m=j.hide[k];self.table.get(m).hide()}}}})}});return{View:d}});