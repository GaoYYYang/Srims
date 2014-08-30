
if (!Srims.projects) 
    Ext.namespace('Srims.projects');
if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.projects.ProjectQueryWindow_TypePanel = function(isHorizonal, isPermission){

    this._isHorizonal = isHorizonal;
    
    var loader = new Ext.tree.TreeLoader({
        dataUrl: Srims.service.type.ProjectRankService + '/GetTypeString',
        baseParams: {
            isPermission: isPermission == false ? false : true
        },
        baseAttrs: {
            uiProvider: Ext.tree.TreeCheckNodeUI
        }
    });
    var root = new Ext.tree.AsyncTreeNode({
        id: isHorizonal == undefined ? ' ' : isHorizonal ? 'true' : 'false',
        text: '项目类型选择',
        leaf: false,
        loader: loader,
        expandable: true,
        expanded: true
    });
    var tree = new Ext.tree.TreePanel({
        id: "tree",
        root: root,
        singleExpand: false,
        autoWidth: true,
        height: isHorizonal ? 523 : 496,
        autoScroll: true,
        checkModel: 'multiple',
        onlyLeafCheckable: false,
        animate: true
    });
    tree.on('checkchange', function(node, checked){
        node.attributes.checked = checked;
        //处理父节点
        var nodeparent = node.parentNode;
        while (nodeparent != null) {
            var isChecked = isHasChildNodeChecked(nodeparent)
            nodeparent.ui.toggleCheck(isChecked);
            nodeparent.attributes.checked = isChecked;
            nodeparent = nodeparent.parentNode;
        }
        //处理子节点
        setAllChildNodeCheckedToFlase(node, checked);
        //以后学习参考，勿删
        //node.eachChild(function(child){
        //  child.ui.toggleCheck(false);
        // child.attributes.checked = false;
        // child.fireEvent('checkchange', child, false);
        //});
    
    }, tree);
    function setAllChildNodeCheckedToFlase(node, checked){
        node.ui.toggleCheck(checked);
        node.attributes.checked = checked;
        
        var childNodes = node.childNodes;
        if (childNodes.length == 0) 
            return;
        
        for (var i = 0; i < childNodes.length; i++) {
            childNodes[i].ui.toggleCheck(false);
            childNodes[i].attributes.checked = false;
            setAllChildNodeCheckedToFlase(childNodes[i], false);
        }
    }
    function isHasChildNodeChecked(node){
        var childNodes = node.childNodes;
        for (var i = 0; i < childNodes.length; i++) {
            if (childNodes[i].attributes.checked) 
                return true;
        }
        
        return false;
    }
    
    Srims.projects.ProjectQueryWindow_TypePanel.superclass.constructor.call(this, {
        title: '类型信息',
        frame: true,
        layout: 'form',
        labelWidth: 60,
        autoScroll: true,
        width: 300,
        items: tree
    });
    
    this.buildParams = function(params){
        params.rankName = '';
        params.typeName = '';
        params.supportCategoryName = '';
        params.supportFieldName = '';
        params.supportSubFieldName = '';
        
        var rankNodes = root.childNodes;
        if (rankNodes == null) 
            return;
        for (var i = 0; i < rankNodes.length; i++) {
            if (rankNodes[i].attributes.checked) {
                params.rankName += rankNodes[i].text + ',';
                var typeNodes = rankNodes[i].childNodes;
                if (typeNodes == null) 
                    continue;
                for (var j = 0; j < typeNodes.length; j++) {
                    if (typeNodes[j].attributes.checked) {
                        params.typeName += typeNodes[j].text + ',';
                        
                        var supportCategoryNodes = null;
                        var supportFieldNodes = null;
                        if (typeNodes[j].firstChild != null) 
                            supportCategoryNodes = typeNodes[j].firstChild.childNodes;
                        if (typeNodes[j].lastChild != null) 
                            supportFieldNodes = typeNodes[j].lastChild.childNodes;
                        if (supportCategoryNodes == null && supportFieldNodes == null) 
                            continue;
                        if (supportCategoryNodes != null) 
                            for (var k = 0; k < supportCategoryNodes.length; k++) {
                                if (supportCategoryNodes[k].attributes.checked) {
                                    params.supportCategoryName += supportCategoryNodes[k].text + ',';
                                }
                            }
                        if (supportFieldNodes != null) 
                            for (var m = 0; m < supportFieldNodes.length; m++) {
                                if (supportFieldNodes[m].attributes.checked) {
                                    params.supportFieldName += supportFieldNodes[m].text + ',';
                                    var supportSubFieldNodes = supportFieldNodes[m].childNodes;
                                    if (supportSubFieldNodes == null) 
                                        continue;
                                    for (var n = 0; n < supportSubFieldNodes.length; n++) {
                                        if (supportSubFieldNodes[n].attributes.checked) {
                                            params.supportSubFieldName += supportSubFieldNodes[n].text + ',';
                                        }
                                    }
                                }
                            }
                    }
                }
            }
        }
    }
    this.clearParams = function(){
        setAllChildNodeCheckedToFlase(root, false);
        
    }
}
Ext.extend(Srims.projects.ProjectQueryWindow_TypePanel, Ext.FormPanel);
