
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserPermissionEditPanel_CustomPermission_PermissionByType_Show = function(user){
    this._user = user;
    var tree = new Ext.tree.TreePanel({
        id: "tree",
        width: 475,
        height: 460,
        autoScroll: true,
        checkModel: 'cascade',
        onlyLeafCheckable: false,
        animate: true,
        loader: new Ext.tree.TreeLoader({
            dataUrl: Srims.service.users.UserService + '/GetDataForTreePermissionShow',
            baseAttrs: {
                uiProvider: Ext.tree.TreeCheckNodeUI
            },
            baseParams: {
                userID: user.get('id')
            }
        }),
        root: new Ext.tree.AsyncTreeNode({
            id: '0',
            text: '项目类型-查看权限'
        })
    })
    tree.expandAll();
    Srims.users.UserPermissionEditPanel_CustomPermission_PermissionByType_Show.superclass.constructor.call(this, {
        frame: true,
        labelWidth: 150,
        items: tree
    })
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
    this.buildParams = function(params){
        params.typeID_hasPermissionShow = '';
        
        var rankNodes = tree.root.childNodes;
        params.allHorizontalProject_PermissionShow = rankNodes[0].attributes.checked;
        params.allVerticalProject_PermissionShow = rankNodes[1].attributes.checked;
        
        if (rankNodes.length < 3) 
            return;
        for (i = 2; i < rankNodes.length; i++) {
            var typeNodes = rankNodes[i].childNodes;
            if (typeNodes == null) 
                continue;
            for (j = 0; j < typeNodes.length; j++) {
                if (typeNodes[j].attributes.checked) 
                    params.typeID_hasPermissionShow += typeNodes[j].id + ',';
            }
        }
    }
    this.clearParams = function(){
        setAllChildNodeCheckedToFlase(tree.root, false);
    }
}
Ext.extend(Srims.users.UserPermissionEditPanel_CustomPermission_PermissionByType_Show, Ext.form.FormPanel);
