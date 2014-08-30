Srims.Login = function() {
};
Srims.Login.login = function(loginId, password, callback) {
    Ext.Ajax.request({
        url: Srims.service.users.UserService + '/Login',
        success: Srims.Login._onLogin_success,
        method: 'POST',
        scope: callback,
        params: {
            loginId: loginId,
            password: password
        }
    });
}
Srims.Login._onLogin_success = function(response) {
    var loginResult = Srims.Login._parseLoginResult(response);
    if (loginResult.isSucceed)
        Srims.Login._setCurrentLoginLog(loginResult);

    this(loginResult);
}
Srims.Login._setCurrentLoginLog = function(loginResult) {
    Cookies.setToken(loginResult.loginLog.token);

    Srims.currentLoginLog = loginResult.loginLog;
    Srims.currentUser = loginResult.loginLog.user;

    Ext.TaskMgr.start(Srims.Login._activeTask);
    Ext.Ajax.extraParams = {
        token: Srims.currentLoginLog.token
    };
}
//Active
Srims.Login._activeTask = {
    run: function() {
        var token = Srims.currentLoginLog.token;
        if (token == undefined)
            Srims.currentLoginLog.token = Cookies.getToken();
        Ext.Ajax.request({
            url: Srims.service.users.UserService + '/Active',
            success: Srims.Login._onActive,
            method: 'POST'
        });

    },
    interval: 1000 * 60
}
Srims.Login._onActive = function(response) {
    var loginResult = Srims.Login._parseLoginResult(response);
    if (!loginResult.isSucceed) {
        Ext.Msg.show({
            title: '登陆失效',
            msg: '您的登录信息已失效，请重新登陆。',
            buttons: Ext.Msg.OK,
            fn: function() {
                window.location.reload(true)
            },
            icon: Ext.MessageBox.WARNING
        });
    }
}
//logout
Srims.Login.logout = function() {
    Ext.Ajax.request({
        url: Srims.service.users.UserService + '/Logout',
        success: Srims.Login._onLogout_success,
        method: 'GET'
    });
}
Srims.Login._onLogout_success = function() {
    Srims.currentLoginLog = undefined;

    Cookies.setToken(undefined);
    Cookies.setLoginId(undefined);
    Cookies.setPassword(undefined);
    Cookies.setIsRememberLogin(false);

    window.location.reload(true);
}
//try login
Srims.Login.tryLogin = function() {
    Srims.Login._tryLoginByToken();
}
Srims.Login._tryLoginByToken = function() {
    var token = Cookies.getToken();
    if (token) {
        Ext.Ajax.request({
            url: Srims.service.users.UserService + '/Active',
            success: Srims.Login._onTryLoginByToken,
            method: 'POST',
            extraParams: undefined,
            params: {
                token: token
            }
        });
    } else {
        Srims.Login._tryLoginByLoginIdAndPassword();
    }
}
Srims.Login._onTryLoginByToken = function(response) {
    var loginResult = Srims.Login._parseLoginResult(response);
    if (loginResult.isSucceed) {
        Srims.Login._setCurrentLoginLog(loginResult);
        Srims.Load.loadMain();
    } else {
        Srims.Login._tryLoginByLoginIdAndPassword();
    }
}
Srims.Login._tryLoginByLoginIdAndPassword = function() {

    var isRememberLogin = Cookies.getIsRememberLogin();
    var loginId = Cookies.getLoginId();
    var password = Cookies.getPassword();

    if (isRememberLogin && loginId && password) {
        Srims.Login.login(loginId, password, Srims.Login._onTryLoginByLoginIdAndPassword);
    } else {
        Srims.Load.loadLoginForm();
    }
}
Srims.Login._onTryLoginByLoginIdAndPassword = function(loginResult) {
    if (loginResult.isSucceed) {
        Srims.Load.loadMain();
    } else {
        Srims.Load.loadLoginForm();
    }
}
Srims.Login._parseLoginResult = function(response) {
    var loginResult = new function() {
    };
    loginResult.state = Ext.DomQuery.selectValue('/LoginResult/State', response.responseXML);
    loginResult.stateDescription = Srims.Login._parseLoginResultState(loginResult.state);
    loginResult.isSucceed = loginResult.state == 'Succeed';

    if (loginResult.isSucceed) {
        loginResult.loginLog = Srims.Login._parseLoginLog(Ext.DomQuery.selectNode('/LoginResult/UserLoginLog', response.responseXML));
    }

    return loginResult;
}
Srims.Login._parseLoginLog = function(node) {
    var loginLog = new function() {
    };
    loginLog.token = Ext.DomQuery.selectValue('/Token', node);
    loginLog.user = Srims.Login._parseUser(Ext.DomQuery.selectNode('/User', node));

    return loginLog;
}
Srims.Login._parseUser = function(node) {
    var user = new function() {
    };
    var getBoolean = function(p, n) {
        return Boolean.toBoolean(Ext.DomQuery.selectValue(p, n));
    };
    user.id = Ext.DomQuery.selectValue('/ID', node);
    user.isSuper = getBoolean('/IsSuper', node);
    user.userRoleType = Ext.DomQuery.selectValue('/UserRoleType', node);
    user.name = Ext.DomQuery.selectValue('/Name', node);
    user.loginId = Ext.DomQuery.selectValue('/LoginID', node);
    user.expertId = Ext.DomQuery.selectValue('/ExpertID', node);
    user.isNeedEditPassword = getBoolean('/IsNeedEditPassword', node);

    user.hasPermission_ManageAnnouncement = getBoolean('/HasPermission_ManageAnnouncement', node);
    user.hasPermission_editLiteralAward = getBoolean('/HasPermission_EditLiteralAward', node);
    user.hasPermission_editScienceAward = getBoolean('/HasPermission_EditScienceAward', node);
    user.hasPermission_ManageAward = getBoolean('/HasPermission_ManageAward', node);
    user.hasPermission_ShowExpert = getBoolean('/HasPermission_ExpertShow', node);
    user.hasPermission_EditExpert = getBoolean('/HasPermission_ExpertEdit', node);
    user.hasPermission_EditExpertLinkWay = getBoolean('/HasPermission_ExpertLinkWayEdit', node);
    user.hasPermission_ResetUserPassword = getBoolean('/HasPermission_ResetUserPassword', node);
    user.isExpert = getBoolean('/IsExpert', node);
    user.hasSecondCollege = getBoolean('/HasSecondCollege', node);
    user.hasPermission_ManageBase = getBoolean('/HasPermission_ManageBase', node);
    user.hasPermission_ManageFinance = getBoolean('/HasPermission_ManageFinance', node);
    user.hasPermission_ManageFinishProject = getBoolean('/HasPermission_ManageFinishProject', node);
    user.hasPermission_ManageFund = getBoolean('/HasPermission_ManageFund', node);
    user.hasPermission_ManagePaper = getBoolean('/HasPermission_ManagePaper', node);
    user.hasPermission_ManagePatent = getBoolean('/HasPermission_ManagePatent', node);
    user.hasPermission_EditPatent = getBoolean('/HasPermission_EditPatent', node);
    user.hasPermission_ManageType = getBoolean('/HasPermission_ManageType', node);
    user.hasPermission_ManageSubjectLevel = getBoolean('/HasPermission_ManageSubjectLevel', node);

    user.hasPermission_EditAnyHorizontalProject = getBoolean('/HasPermission_EditAnyHorizontalProject', node);
    user.hasPermission_EditAnyVerticalProject = getBoolean('/HasPermission_EditAnyVerticalProject', node);
    user.hasPermission_ShowAnyHorizontalProject = getBoolean('/HasPermission_ShowAnyHorizontalProject', node);
    user.hasPermission_ShowAnyVerticalProject = getBoolean('/HasPermission_ShowAnyVerticalProject', node);
    user.hasPermission_CensorAnyVerticalProject = getBoolean('/HasPermission_CensorAnyVerticalProject', node);
    user.hasPermission_CensorAnyHorizontalProject = getBoolean('/HasPermission_CensorAnyHorizontalProject', node);

    user.hasPermission_CensorVerticalProjectDocuments = getBoolean('/HasPermission_CensorVerticalProjectDocuments', node);
    user.hasPermission_CensorHorizontalProjectDocuments = getBoolean('/HasPermission_CensorHorizontalProjectDocuments', node);

    user.hasPermission_CensorVerticalProjectContracts = getBoolean('/HasPermission_CensorVerticalProjectContracts', node);
    user.hasPermission_CensorHorizontalProjectContracts = getBoolean('/HasPermission_CensorHorizontalProjectContracts', node);

    user.hasPermission_AddHorizontalProject = getBoolean('/HasPermission_AddHorizontalProject', node);
    user.hasPermission_AddVerticalProject = getBoolean('/HasPermission_AddVerticalProject', node);

    user.HasPermission_CensorHorizontalProjectFundDescends = getBoolean('/HasPermission_CensorHorizontalProjectFundDescends', node);

    user.HasPermission_CensorVerticalProjectFundAllocation = getBoolean('/HasPermission_CensorVerticalProjectFundAllocation', node);
    user.HasPermission_CensorHorizontalProjectFundAllocation = getBoolean('/HasPermission_CensorHorizontalProjectFundAllocation', node);

    user.HasPermission_AllocationVerticalProjectFundDescend = getBoolean('/HasPermission_AllocationVerticalProjectFundDescend', node);
    user.HasPermission_AllocationHorizontalProjectFundDescend = getBoolean('/HasPermission_AllocationHorizontalProjectFundDescend', node);

    user.hasPermission_AddSecretProject = getBoolean('/HasPermission_AddSecretProject', node);
    user.hasPermission_ExpertSimpleQuery_ShowDetail = getBoolean('/HasPermission_ExpertSimpleQuery_ShowDetail', node);

    user.hasPermission_ProjectCountStatistic = getBoolean('/HasPermission_ProjectCountStatistic', node);
    user.hasPermission_FundTotalStatistic = getBoolean('/HasPermission_FundTotalStatistic', node);
    user.hasPermission_FundDescendStatistic = getBoolean('/HasPermission_FundDescendStatistic', node);
    user.hasPermission_VoucherStatistic = getBoolean('/HasPermission_VoucherStatistic', node);
    user.hasPermission_PaperStatistic = getBoolean('/HasPermission_PaperStatistic', node);
    user.hasPermission_PatentStatistic = getBoolean('/HasPermission_PatentStatistic', node);
    user.hasPermission_AwardStatistic = getBoolean('/HasPermission_AwardStatistic', node);

    user.hasPermission_ProjectCountStatisticViewManage = getBoolean('/HasPermission_ProjectCountStatisticViewManage', node);
    user.hasPermission_FundTotalStatisticViewManage = getBoolean('/HasPermission_FundTotalStatisticViewManage', node);
    user.hasPermission_FundDescendStatisticViewManage = getBoolean('/HasPermission_FundDescendStatisticViewManage', node);
    user.hasPermission_VoucherStatisticViewManage = getBoolean('/HasPermission_VoucherStatisticViewManage', node);
    user.hasPermission_PaperStatisticViewManage = getBoolean('/HasPermission_PaperStatisticViewManage', node);
    user.hasPermission_PatentStatisticViewManage = getBoolean('/HasPermission_PatentStatisticViewManage', node);
    user.hasPermission_AwardStatisticViewManage = getBoolean('/HasPermission_AwardStatisticViewManage', node);

    user.HasPermissionFundlent = getBoolean('/HasPermissionFundlent', node);
    user.HasPermissionFundReturn = getBoolean('/HasPermissionFundReturn', node);

    user.hasPermission_ManageStamp = getBoolean('/HasPermission_ManageStamp', node);
    user.HasPermission_StampDepartmentPrincipal = getBoolean('/HasPermission_StampDepartmentPrincipal', node);
    user.hasPermission_ManageStampFeedback = getBoolean('/HasPermission_ManageStampFeedback', node);
    user.hasPermission_CensorStamp = getBoolean('/HasPermission_CensorStamp', node);
    //待完成
    user.HasPermission_CensorHorizontalProjectPerformationAllocation = true;
    user.HasPermission_CensorVerticalProjectPerformationAllocation = true;


    user.hasPermission_Statistic = user.hasPermission_ProjectCountStatistic ||
	user.hasPermission_FundTotalStatistic ||
	user.hasPermission_FundDescendStatistic ||
	user.hasPermission_VoucherStatistic ||
	user.hasPermission_PaperStatistic ||
	user.hasPermission_PatentStatistic ||
	user.hasPermission_AwardStatistic;

    user.hasPermission_ExportFinanceData = getBoolean('/hasPermission_ExportFinanceData', node);
    user.isSurper = getBoolean('/IsSuper', node)

    user.hasPermission_EditPaper = getBoolean('/HasPermission_EditPaper', node);
    return user;
}
Srims.Login._parseLoginResultState = function(loginResultState) {
    switch (loginResultState) {
        case 'Succeed':
            return '登陆成功！';
        case 'NullUserName':
            return '您输入的用户名为空！';
        case 'UserNotFound':
            return '您输入的用户名不存在！';
        case 'NullPassword':
            return '您输入的密码不能为空！';
        case 'WrongPassword':
            return '您输入的密码错误，请重新输入！';
        case 'DenyMultiLogin':
            return '该用户不允许多人同时登陆！';
        case 'Locked':
            return '该用户已被锁定！';
        case 'NotAgreeLicence':
            return '尚未同意用户协议！';
    }
};