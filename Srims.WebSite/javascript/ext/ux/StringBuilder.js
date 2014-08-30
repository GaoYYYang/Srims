
Ext.ns('Ext.ux');

Ext.ux.StringBuilder = function(start) {
    this.builder = '';
    this.items = [];
    this.append(start);
};

Ext.ux.StringBuilder.prototype = (function() {
    function appendString(s) {
        if (Ext.isIE)
            this.items.push(s);
        else
            this.builder += s;
    }

    function appendArray(a) {
        Ext.each(a, function(el) {
            this.append(el);
        }, this);
    }

    function appendObject(o) {
        if (o.toString)
            appendString.call(this, o.toString());
    }

    return {
        append: function(o) {
            if (o) {
                if (typeof o == 'string')
                    appendString.call(this, o);
                else if (o instanceof Array)
                    appendArray.call(this, o);
                else
                    appendObject.call(this, o);
            }
            return this;
        },

        toString: function() {
            return Ext.isIE ? this.items.join('') : this.builder;
        },

        clear: function() {
            this.items = [];
            builder = '';
        }
    }
})();