
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineOccupationEditPanel = function(magazineOccupation, magazine, store){

    this._magazineOccupation = magazineOccupation;
    this._magazine = magazine;
    this._store = store;
    
    this._entitySearchComboBoxMagazine = new Srims.component.MagazineSearch.SearchComboBox({
        fieldLabel: '杂志期刊',
        value: this._magazineOccupation.get('magazineName'),
        store: new Srims.papers.MagazineStore(Srims.service.papers.MagazineService + "/SearchMagazine"),
        listWidth: 400,
        selectEntityId: this._magazineOccupation.get('magazineID'),
        width: 400
    });
    this._comboBoxExpert = new Srims.component.ExpertSearch.SearchComboBox({
        fieldLabel: '专家姓名',
        width: 150,
        value: this._magazineOccupation.get('expertID'),
        selectEntityId: this._magazineOccupation.get('expertID'),
        allowBlank: false
    });
    this._comboBoxOccupation = new Srims.component.NoticeTextComboBox({
        fieldLabel: '担任职务',
        value: this._magazineOccupation.get('occupation'),
        displayField: 'name',
        noticeTextType: 'MagazineOccupation',
        editable: false,
        triggerAction: 'all',
        listWidth: 160,
        allowBlank: false,
        width: 134
    });
    this._numberFieldEngageStartYear = new Ext.form.NumberField({
        fieldLabel: '聘期起始年份',
        value: this._magazineOccupation.get('engageStartYear'),
        allowDecimals: false,
        allowNegative: false,
        minLength: 4,
        maxLength: 4,
        allowBlank: false,
        width: 133
    });
    this._textFieldEngageEndYear = new Ext.form.TextField({
        fieldLabel: '聘期终止年份',
        value: this._magazineOccupation.get('engageEndYear'),
        width: 133
    });
    
    var columnFirstItems = [this._comboBoxExpert, this._numberFieldEngageStartYear];
    var columnSecondItems = [this._comboBoxOccupation, this._textFieldEngageEndYear];
    var panel = new Ext.Panel({
        width: 500,
        layout: 'column',
        items: [new Ext.Panel({
            width: 250,
            layout: 'form',
            style: 'width:300px',
            items: columnFirstItems
        }), new Ext.Panel({
            width: 250,
            style: 'width:300px',
            layout: 'form',
            items: columnSecondItems
        })]
    });
    var items = [this._entitySearchComboBoxMagazine, panel];
    if (magazine != undefined) 
        items = [panel];
    Srims.papers.MagazineOccupationEditPanel.superclass.constructor.call(this, {
        // collapsible: true,
        title: '',
        widht: 450,
        autoHeight: true,
        frame: true,
        labelWidth: 80,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: items
    });
    
    this._isValid = function(preventMark){
        var result = true;
        
        result = this._comboBoxExpert.isValid(preventMark) && result;
        result = this._comboBoxOccupation.isValid(preventMark) && result;
        result = this._numberFieldEngageStartYear.isValid(preventMark) && result;
        return result;
    }
    
    this._assignValues = function(){
        if (magazine != undefined) 
            this._magazineOccupation.set('magazineID', this._magazine.get('id'));
        else 
            this._magazineOccupation.set('magazineID', this._entitySearchComboBoxMagazine.getValue());
        this._magazineOccupation.set('expertID', this._comboBoxExpert.getValue());
        this._magazineOccupation.set('occupation', this._comboBoxOccupation.getValue());
        this._magazineOccupation.set('engageStartYear', this._numberFieldEngageStartYear.getValue());
        this._magazineOccupation.set('engageEndYear', this._textFieldEngageEndYear.getValue());
    }
}

Ext.extend(Srims.papers.MagazineOccupationEditPanel, Ext.form.FormPanel, {});
