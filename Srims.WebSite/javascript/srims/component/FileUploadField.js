
if (!Srims.component) 
    Ext.namespace('Srims.component');

Srims.component.FileUploadField = function(params){
    Srims.component.FileUploadField.superclass.constructor.call(this, params);
}
Ext.extend(Srims.component.FileUploadField, Ext.form.FileUploadField, {
    validator: function(){
        var x = this.getValue();
        if (!x) 
            return;
        if (this.fileTypes.length == 0) 
            return true;
        
        var patn = '/'
        var docType = '';
        for (var i = 0; i < this.fileTypes.length; i++) {
            patn += '\.' + this.fileTypes[i] + '$|';
            docType += this.fileTypes[i] + '，';
        }
        patn = patn.substring(0, patn.length - 1);
        patn += '/i';
        patn = eval(patn);
        
        docType = docType.substring(0, docType.length - 1);
        if (!patn.test(x)) {
            this.invalidText = '只能上传' + docType + '文档。';
            return false;
        }
        return true;
    }
});

