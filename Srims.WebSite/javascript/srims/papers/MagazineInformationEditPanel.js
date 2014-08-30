
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineInformationEditPanel = function(magazineInformation, magazine, store){

    this._magazineInformation = magazineInformation;
    this._magazine = magazine;
    this._store = store;
    
    this._numberFieldYear = new Ext.form.NumberField({
        fieldLabel: '年份',
        value: this._magazineInformation.get('year'),
        allowDecimals: false,
        allowNegative: false,
        minLength: 4,
        maxLength: 4,
        minValue: 1900,
        width: 150
    });
    this._numberFieldInfluenceFactor = new Srims.component.ThousandPercentField({
        fieldLabel: '影响因子',
        value: this._magazineInformation.get('influenceFactor'),
        maxLength: 6,
        width: 150
    });
    this._numberFieldCiteFrequency = new Ext.form.NumberField({
        fieldLabel: '被引频次',
        value: this._magazineInformation.get('citeFrequency'),
        allowDecimals: false,
        allowNegative: false,
        maxLength: 6,
        width: 150
    });
    this._numberFieldSubAirer = new Ext.form.NumberField({
        fieldLabel: '分区',
        value: this._magazineInformation.get('subAirer'),
        allowDecimals: false,
        allowNegative: false,
        maxLength: 6,
        width: 150
    });
    this._numberFieldinstantExponent = new Ext.form.NumberField({
        fieldLabel: '即年指数',
        value: this._magazineInformation.get('instantExponent'),
        allowDecimals: false,
        allowNegative: false,
        maxLength: 6,
        width: 150
    });
    this._numberFieldpaperCount = new Ext.form.NumberField({
        fieldLabel: '论文数',
        vlaue: this._magazineInformation.get('paperCount'),
        allowDecimals: false,
        allowNegative: false,
        maxLength: 6,
        width: 150
    });
    this._textFieldciteHalfLife = new Ext.form.TextField({
        fieldLabel: '引用半衰期',
        value: this._magazineInformation.get('citeHalfLife'),
        width: 150
    });
    
    var columnFirstItems = [this._numberFieldYear, this._numberFieldinstantExponent, this._numberFieldInfluenceFactor, this._numberFieldpaperCount];
    var columnSecondItems = [this._numberFieldCiteFrequency, this._textFieldciteHalfLife, this._numberFieldSubAirer];
    
    Srims.papers.MagazineInformationEditPanel.superclass.constructor.call(this, {
        // collapsible: true,
        title: '',
        widht: 450,
        Height: 300,
        frame: true,
        labelWidth: 80,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [new Ext.Panel({
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
        })]
    });
    
    
    this._validYear = function(){
        var magazineInformations = this._store.getRange();
        var year = this._numberFieldYear.getValue();
        
        for (i = 0; i < magazineInformations.length; i++) {
            if (this._magazineInformation == magazineInformations[i]) 
                continue;
            
            if (year == magazineInformations[i].get('year')) {
                Ext.Msg.show({
                    title: '杂志年份错误',
                    msg: '杂志年份不能重复，请重新输入年份',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                });
                return false;
            }
        }
        return true;
    }
    this._validInputValues = function(){
        if (this._numberFieldYear.getValue() == '' &&
        this._numberFieldCiteFrequency.getValue() == '' &&
        this._numberFieldInfluenceFactor.getValue() == '' &&
        this._numberFieldinstantExponent.getValue() == '' &&
        this._numberFieldpaperCount.getValue() == '' &&
        this._numberFieldSubAirer.getValue() == '' &&
        this._textFieldciteHalfLife.getValue() == '') {
            Ext.Msg.show({
                title: '编辑信息为空',
                msg: '杂志年份信息为空，不能进行保存，请继续编辑或关闭退出',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        return true;
    }
    
    this._isValid = function(preventMark){
        var result = true;
        
        result = this._validYear() && result;
        result = this._numberFieldYear.isValid(preventMark) && result;
        result = this._numberFieldCiteFrequency.isValid(preventMark) && result;
        result = this._numberFieldSubAirer.isValid(preventMark) && result;
        result = this._numberFieldinstantExponent.isValid(preventMark) && result;
        result = this._numberFieldpaperCount.isValid(preventMark) && result;
        result = this._textFieldciteHalfLife.isValid(preventMark) && result;
        result = this._validInputValues() && result;
        return result;
    }
    
    this._assignValues = function(){
        this._magazineInformation.set('magazineID', this._magazine.get('id'));
        this._magazineInformation.set('year', this._numberFieldYear.getValue());
        this._magazineInformation.set('citeFrequency', this._numberFieldCiteFrequency.getValue());
        this._magazineInformation.set('influenceFactor', this._numberFieldInfluenceFactor.getValue());
        this._magazineInformation.set('instantExponent', this._numberFieldinstantExponent.getValue());
        this._magazineInformation.set('paperCount', this._numberFieldpaperCount.getValue());
        this._magazineInformation.set('subAirer', this._numberFieldSubAirer.getValue());
        this._magazineInformation.set('citeHalfLife', this._textFieldciteHalfLife.getValue());
    }
}

Ext.extend(Srims.papers.MagazineInformationEditPanel, Ext.form.FormPanel, {});
