Ext.tree.CheckColumn = function(config){
    Ext.apply(this, config);
    if (!this.id) {
        this.id = Ext.id();
    }
    this.renderer = this.renderer.createDelegate(this);
};

Ext.tree.CheckColumn.prototype = {
    init: function(tree){
        this.tree = tree;
        this.tree.on('render', function(){
            this.tree.body.on('mousedown', this.onMouseDown, this);
        }, this);
    },
    
    onMouseDown: function(e, t){
        if (t.className && t.className.indexOf('x-grid3-cc-' + this.id) != -1) {
            e.stopEvent();
            var el = Ext.get(t);
            if (t.className.indexOf('x-grid3-check-col-on') != -1) {
                el.removeClass('x-grid3-check-col-on');
                el.addClass('x-grid3-check-col');
            }
            else {
                el.removeClass('x-grid3-check-col');
                el.addClass('x-grid3-check-col-on');
            }
        }
    },
    
    renderer: function(v, p, record){
        if (Boolean.toBoolean) 
            v = Boolean.toBoolean(v);
        p.css += ' x-grid3-check-col-td';
        return '<div class="x-grid3-check-col' + (v ? '-on' : '') + ' x-grid3-cc-' + this.id + '">&#160;</div>';
    },
    
    checked: function(e, t){
        if (t.className && t.className.indexOf('x-grid3-cc-' + this.id) != -1) {
            e.stopEvent();
            var el = Ext.get(t);
            if (t.className.indexOf('x-grid3-check-col-on') != -1) 
                return true;
            else 
                return false;
        }
    }
};
