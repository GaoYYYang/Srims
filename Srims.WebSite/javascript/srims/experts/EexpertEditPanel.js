
if (!Srims.experts)
    Ext.namespace('Srims.experts');

//添加专家panel
Srims.experts.ExpertEditPanel = function(id, expert, store) {

    this._id = id;
    this._expert = expert;
    this._store = store;
    //this._title = expert.isNew() ? '新建专家' : '编辑专家' + expert.get('name');
    this._title = '新建专家';

    this._basicForm = new Srims.experts.ExpertEditPanel_Basic(expert);
    /*this._experienceForm = new Srims.experts.ExpertEditPanel_Experience(expert);
    this._languageForm = new Srims.experts.ExpertEditPanel_Language(expert);
    this._linkWayForm = new Srims.experts.ExpertEditPanel_LinkWay(expert);
    this._subjectForm = new Srims.experts.ExpertEditPanel_Subject(expert);*/
}
Ext.extend(Srims.experts.ExpertEditPanel, Ext.Panel, {});
