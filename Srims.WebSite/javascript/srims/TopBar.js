Srims.TopBar = new function() {
}
Srims.TopBar.getTopBar = function(pollList) {
    if (Srims.TopBar._topBar)
        return Srims.TopBar._topBar;
    var user = Srims.currentLoginLog.user;
    var topBarHtml = '';
    topBarHtml += '<h1 id="TopBar" class="x-panel-header">';
    topBarHtml += '	<div style="margin-left:5px;display:inline;float:left"><img class="icon-srims" src="../images/s.gif">欢迎使用中国海洋大学科研信息管理系统    </div>';

    topBarHtml += '	<div style="text-align:right;display:inline;float:right;">';
    topBarHtml += '您好： '+user.name+' ！        ';
    topBarHtml += '		<a href="#" onclick="Srims.Action.actions[\'message-list\']()"><img class="icon-message-list" src="../images/s.gif"><span id=SpanMessages>短消息</span></>';
    topBarHtml += '		<a href="#" onclick="Srims.Action.actions[\'expert-simple-query\']()"><img class="icon-expert-search" src="../images/s.gif">专家查询</>';
    //topBarHtml += '		<a href="#" onclick=""><img class="icon-help" src="../images/s.gif">获得帮助</>';
    topBarHtml += '		<a href="#" onclick="Srims.Action.actions[\'change-password\']()"><img class="icon-change-password" src="../images/s.gif">修改密码</>';
    topBarHtml += '		<a href="#" id="TopBarAction_Logout" onclick="Srims.TopBar._logout();"><img class="icon-logout" src="../images/s.gif">退出登录</>';
    topBarHtml += '	</div>'
    topBarHtml += '</h1>';
    topBarHtml += '';

    Srims.Poll.addPollAction(Srims.Poll.getPollAction_UnreadMessagesCount);

    Srims.TopBar._topBar = new Ext.Panel({
        region: 'north',
        html: topBarHtml,
        autoHeight: true,
        border: false,
        margins: '0 0 5 0'
    });

    return Srims.TopBar._topBar;
}
Srims.TopBar._logout = function() {
	Ext.MessageBox.show({
		title: '退出登陆',
		msg: '您确定退出登陆？',
		//animEl: 'TopBarAction_Logout',
		buttons: Ext.MessageBox.YESNO,
		icon: Ext.MessageBox.QUESTION,
		fn: Srims.TopBar._logout_confirm
	});
}
Srims.TopBar._logout_confirm = function(buttonId) {
	if (buttonId == 'yes') {
		Srims.Login.logout();
	}
};