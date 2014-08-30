
if (!Srims.component)
    Ext.namespace('Srims.component');


Srims.component.RadioGroup = Ext.extend(Ext.form.RadioGroup, {
    getName: function() {
        return this.items.first().getName();
    },
    getValue: function() {
        var v;
        this.items.each(function(item) {
            v = item.getRawValue();
            return !item.getValue();
        });
        return v;
    },
    setValue: function(v) {
        this.items.each(function(item) {
            item.setValue(item.getRawValue() == v);
        });
    },
    getRadio: function(i) {
        return this.items.get(i);
    }



});
Srims.component.RadioGroup.StoreFunction = function(nameString, expert, isShow) {
    var items = [{
        readOnly: isShow == true ? true : false,
        boxLabel: '是',
        name: nameString,
        inputValue: true,
        checked: isShow == true ? true : (expert.get(nameString) == 'True' ? true : false)
    }, {
        readOnly: isShow == true ? true : false,
        boxLabel: '否',
        name: nameString,
        inputValue: false,
        checked: expert.get(nameString) == 'False' ? true : false
    }, {
        readOnly: isShow == true ? true : false,
        boxLabel: '未知',
        name: nameString,
        inputValue: null,
        checked: expert.get(nameString) != 'True' && expert.get(nameString) != 'False' ? true : false
}];
        return items;
    }

    Srims.component.RadioGroup.SexStoreFunction = function(nameString, expert, isShow) {
        var items = [{
            readOnly: isShow == true ? true : false,
            boxLabel: '男',
            name: nameString,
            inputValue: 'Man',
            checked: expert.get(nameString) == 'Man' ? true : false
        }, {
            readOnly: isShow == true ? true : false,
            boxLabel: '女',
            name: nameString,
            inputValue: 'Woman',
            checked: expert.get(nameString) == 'Woman' ? true : false
}];
            return items;
        }
        Srims.component.RadioGroup.ProjectRankStoreFunction = function() {
            var items = [{
                boxLabel: '横向',
                name: 'ProjectRank',
                inputValue: 'true'
            }, {
                boxLabel: '纵向',
                name: 'ProjectRank',
                inputValue: 'false'
}];
                return items;
            }
