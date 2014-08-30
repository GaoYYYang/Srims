
if (!Srims.data) 
    Ext.namespace('Srims.data');
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.Message = new Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'receiver',
    type: 'string',
    mapping: 'Receiver'
}, {
    name: 'receiverID',
    type: 'int',
    mapping: 'ReceiverID'
}, {
    name: 'sender',
    type: 'string',
    mapping: 'Sender'
}, {
    name: 'senderID',
    type: 'int',
    mapping: 'SenderID'
}, {
    name: 'title',
    type: 'string',
    mapping: 'Title'
}, {
    name: 'content',
    type: 'string',
    mapping: 'Content'
}, {
    name: 'dateTime',
    type: 'date',
    mapping: 'DateTime'
}, {
    name: 'isRead',
    type: 'boolean',
    mapping: 'IsRead',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ShowMessage',
    type: 'boolean',
    mapping: 'HasPermission_ShowMessage',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_EditMessage',
    type: 'boolean',
    mapping: 'HasPermission_EditMessage',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_DeleteMessage',
    type: 'boolean',
    mapping: 'HasPermission_DeleteMessage',
    convert: Boolean.toBoolean
}, {
    name: 'canShowMessage',
    type: 'boolean',
    mapping: 'CanShowMessage',
    convert: Boolean.toBoolean
}, {
    name: 'canEditMessage',
    type: 'boolean',
    mapping: 'CanEditMessage',
    convert: Boolean.toBoolean
}, {
    name: 'canDeleteMessage',
    type: 'boolean',
    mapping: 'CanDeleteMessage',
    convert: Boolean.toBoolean
}])
Srims.data.Entity.apply(Srims.users.Message);
