
if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.ExpertGuidFundDescendPanel_ExpertFundDescendAmountPanel = function(){

    this._numberFieldDescendAmount = new Srims.component.MoneyField({
        fieldLabel: '下拨金额(万元)',
        allowNegative: false,
        width: 150
    });
    this._labelAmountHint = new Ext.form.Label({})
    Srims.fund.ExpertGuidFundDescendPanel_ExpertFundDescendAmountPanel.superclass.constructor.call(this, {
        closable: true,
        deferHeight: false,
        buttonAlign: 'center',
        layout: 'form',
        style: 'padding:10px;',
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                layout: 'form',
                width: 260,
                items: this._numberFieldDescendAmount
            }), new Ext.Panel({
                layout: 'form',
                items: this._labelAmountHint
            })]
        })]
    });
    this.focus = function(){
        this._numberFieldDescendAmount.focus(false, true);
    }
    this.next = function(){
        var descendAmount = this._numberFieldDescendAmount.getMoney();
        var project = this.panel._params.project;
        var finance = this.panel._params.finance;
        
        if (descendAmount == '') {
            Ext.Msg.show({
                title: '下拨金额不能为空',
                msg: '请输入下拨金额',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return;
        }
        if (descendAmount <= 0) {
            Ext.Msg.show({
                title: '下拨金额必须大于零',
                msg: '下拨金额必须大于零',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return;
        }
        if (descendAmount > finance.get('amount') - finance.get('descendAmount')) {
            Ext.Msg.show({
                title: '下拨金额不能大于经费的未下拨金额',
                msg: '下拨金额不能大于经费的未下拨金额：' + Money.render(finance.get('amount') - finance.get('descendAmount')) + '元',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return;
        }
        if (descendAmount > project.get('fundTotal') - project.get('fundReceived')) {
            Ext.Msg.show({
                title: '下拨金额不能大于项目的未到金额',
                msg: '下拨金额不能大于项目的未到金额:' + Money.render(project.get('fundTotal') - project.get('fundReceived')) + '元',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return;
        }
        
        this.panel._params.descendAmount = descendAmount;
        this.panel.panel._confirmPanel.setValue(this.panel._params);
        
        Srims.expertGuide.next(this);
    };
}
Ext.extend(Srims.fund.ExpertGuidFundDescendPanel_ExpertFundDescendAmountPanel, Ext.Panel, {});
