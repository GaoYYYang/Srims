Srims.FormLogin = function(containter) {

    //field
    this._container = containter;
    this._isTextFieldLoginValid = false;
    this._isTextFieldPasswordValid = false;

    //controls
    this._buttonLogin = new Ext.Button({
        text: ' 登 陆 ',
        disabled: true,
        minWidth: 70
    });
    this._buttonForgetPassword = new Ext.Button({
        text: '忘记密码',
        minWidth: 70
    });
    this._textFieldLoginId = new Ext.form.TextField({
        fieldLabel: '用户名',
        allowBlank: false,
        blankText: '请输入您的用户名。',
        msgTarget: 'side',
        emptyText: '工作证号或登陆名',
        selectOnFocus: true,
        enableKeyEvents: true
    });
    this._textFieldPassword = new Ext.form.TextField({
        fieldLabel: '密　码',
        name: 'password',
        allowBlank: false,
        blankText: '请输入您的密码。',
        inputType: 'password',
        msgTarget: 'side',
        enableKeyEvents: true
    });
    this._checkBoxAutoLogin = new Ext.form.Checkbox({
        fieldLabel: '登陆',
        labelStyle: 'visibility:hidden;width:45px',
        boxLabel: '下次自动登陆',
        name: 'autoLogin'
    });

    //method    
    this._onTextFieldLoginId_Valid = function(sender, e) {
        var form = sender.ownerCt;
        form._isTextFieldLoginIdValid = form._textFieldLoginId.isValid();
        form._onTextFieldValidChange();
    };
    this._onTextFieldPassword_Valid = function(sender, e) {
        var form = sender.ownerCt;
        form._isTextFieldPassword = form._textFieldPassword.isValid();
        form._onTextFieldValidChange();
    };

    this._onTextFieldValidChange = function() {
        if (this._isTextFieldLoginIdValid && this._isTextFieldPassword) {
            this._buttonLogin.enable();
        }
        else {
            this._buttonLogin.disable();
        }
    }
    this._onTextField_KeyPress = function(sender, e) {
        var form = sender.ownerCt;
        if (e.getKey() == e.ENTER && !form._buttonLogin.disabled)
            form._login();
    };

    this._onButtonLogin_Click = function(sender, e) {
        var form = sender.ownerCt;
        form._login();
    };
    this._onButtonForgetPassword_Click = function(sender, e) {
        Ext.Msg.show({
            title: '找回密码',
            msg: Srims.FormLogin.FORGET_PASSWORD_MSG,
            buttons: Ext.Msg.OK,
            animEl: sender.id,
            width: 400,
            cls: 'forget-password'
        });
    }

    this._login = function() {
        this._buttonLogin.setText('正在登陆');
        this._buttonLogin.disable();
        Srims.Login.login(this._textFieldLoginId.getValue(), this._textFieldPassword.getValue(), this._onLogin);
    };
    this._onLogin = function(loginResult) {
        var form = Srims.FormLogin.getFormLogin();

        if (loginResult.isSucceed) {
            form._onLogin_success(loginResult);
            return;
        }

        if (loginResult.state == 'NotAgreeLicence') {
            form._showLicence();
            return;
        }
        form._onLogin_fail(loginResult);
    }
    this._onLogin_success = function(loginResult) {
        if (this._checkBoxAutoLogin.getValue()) {
            Cookies.setLoginId(this._textFieldLoginId.getValue());
            Cookies.setPassword(this._textFieldPassword.getValue());
            Cookies.setIsRememberLogin(true);
        }
        Srims.Load.loadMain();
    }
    this._onLogin_fail = function(loginResult) {
        this._buttonLogin.setText(' 登 陆 ');
        this._buttonLogin.enable();
        Ext.Msg.show({
            title: '登陆失败',
            msg: '<br />' + loginResult.stateDescription,
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.WARNING
        });
    }
    this._showLicence = function() {
        Ext.Msg.defaultTextHeight = 0;
        Ext.Msg.buttonText.yes = '同意';
        Ext.Msg.buttonText.no = '不同意';
        Ext.Msg.show({
            title: '用户协议',
            msg: Srims.FormLogin.LICENCE,
            buttons: Ext.Msg.YESNO,
            width: 600,
            closable: false,
            scope: this,
            fn: this._onShowLicence
        });
    }
    this._onShowLicence = function(buttonId) {
        this._buttonLogin.setText(' 登 陆 ');
        this._buttonLogin.enable();
        Ext.Msg.buttonText.yes = '是';
        Ext.Msg.buttonText.no = '否';
        if (buttonId == 'yes') {
            Ext.Ajax.request({
                url: Srims.service.users.UserService + '/AgreeLicence',
                success: this._login,
                method: 'POST',
                scope: this,
                params: {
                    loginId: this._textFieldLoginId.getValue(),
                    password: this._textFieldPassword.getValue()
                }
            });
        }
    }

    this._getMarginLeft = function() {
        return ((this._container.getWidth() - Srims.FormLogin.WIDTH) / 2) + "px";
    }

    //event
    this._textFieldLoginId.on('change', this._onTextFieldLoginId_Valid);
    this._textFieldLoginId.on('valid', this._onTextFieldLoginId_Valid);
    this._textFieldLoginId.on('keypress', this._onTextField_KeyPress);

    this._textFieldPassword.on('change', this._onTextFieldPassword_Valid);
    this._textFieldPassword.on('valid', this._onTextFieldPassword_Valid);
    this._textFieldPassword.on('keypress', this._onTextField_KeyPress);

    this._buttonLogin.on('click', this._onButtonLogin_Click);
    this._buttonForgetPassword.on('click', this._onButtonForgetPassword_Click);

    //constructor
    Srims.FormLogin.superclass.constructor.call(this, {
        labelWidth: 45,
        frame: true,
        id: Srims.FormLogin.ID,
        title: '用户登陆',
        bodyStyle: 'padding:5px 5px 0',
        width: Srims.FormLogin.WIDTH,
        buttonWidth: 240,
        style: "margin-left: " + this._getMarginLeft(),

        items: [this._textFieldLoginId, this._textFieldPassword, this._checkBoxAutoLogin],

        buttons: [this._buttonLogin, this._buttonForgetPassword]
    });
}
Ext.extend(Srims.FormLogin, Ext.form.FormPanel, {
    render: function() {
        if (this.rendered)
            this.getEl().dom.style.marginLeft = this._getMarginLeft();

        Srims.FormLogin.superclass.render.call(this, this._container);

        this._textFieldLoginId.focus();
    }
});
Srims.FormLogin.WIDTH = 240;
Srims.FormLogin.ID = 'FormLoginID';
Srims.FormLogin.FORGET_PASSWORD_MSG = '<br />您可以发送主题为“索取密码”的邮件至：<a href="mailto:cyb@ouc.edu.cn" />cyb@ouc.edu.cn</a> 索取您的密码。邮件中，请注明您的姓名，工作证号以及所在院系。<br /><br />感谢您的支持！<br /><div style="width: 100%; text-align: right">中国海洋大学<br />科技处&nbsp;&nbsp;&nbsp;</div>';
Srims.FormLogin.LICENCE = '<div id="DivUserProtocolHead" style="text-align: center; font-weight: bolder; font-size: x-large margin-bottom: 5px;">' +
'中国海洋大学科研信息管理软件授权许可协议' +
'</div>' +
'<div id="DivUserProtocolBody" style="text-align: left; height: 330px; width: 95%;border: 1px; border-style: solid; overflow: auto">' +
'<div style="margin-top: 10px">' +
'<ol style="list-style-type: none">' +
'<li style="text-indent: 2em">' +
'中国海洋大学科技处许可阁下个人、院(系)或法律实体（以下皆称为“阁下”）使用本授权软件，条件是阁下必须接受本许可协议（“授权许可协议”）的全部条款。请阁下在使用本授权软件之前详细阅读有关条款和条件。本文件为阁下与中国海洋大学科技处之间合法及可执行的合同。单击“同意”或“是”按钮，或者通过其它电子方式表示同意、或以其它方式使用授权软件皆表示阁下同意本授权许可协议的条款和条件。若阁下不同意上述条款和条件，请单击“我不同意”或“否”按钮，并不再使用本授权软件。' +
'</li>' +
'<li>一、定义</li>' +
'<div style="text-indent: 2em; margin-top: 5px; margin-bottom: 8px">' +
'“服务内容”是指由本软件产品提供的使用内容，包括但不限于：科技项目录入功能，科技项目档案的提交功能、档案的下载服务；用户承担的所有项目及专利、成果的相关信息查询功能；项目经费的分配功能，项目经费的查询功能，经费到款信息的查询功能；接收来自其他用户的短消息，并进行相应操作；用户个人信息的维护功能、密码修改功能；' +
'“文档”是指中国海洋大学科技处随本授权软件一起向用户提供的文档资料。 “授权文件”是指下面一个或多个进一步定义阁下对本授权软件的许可权的适用文档：授权证书或颁发的类似许可文档，或者阁下在签署本授权许可协议的同时、之前或之后与中国海洋大学科技处签订的书面协议。' +
'“授权软件”是指以目标代码形式随本授权许可协议一起提供的软件产品，包括此类软件中包含的或者为了使用此类软件而提供的文档，或者本授权许可协议所附带的文档。 “软件更新与升级”是指根据本软件技术要求所提供的更新与升级服务，已公开发布用于取代本授权软件的上一版本的本授权软件的任意版本。' +
'</div>' +
'<li>二、授予许可证</li>' +
'<div style="text-indent: 2em; margin-top: 5px; margin-bottom: 8px">' +
'在阁下遵守本授权许可协议的条款和条件的情况下，中国海洋大学科技处授权阁下为支持科研业务管理，按照本授权许可协议中规定的以非独占、不可转让（除非在 10.1 部分中另外说明）的方式单独使用本授权软件;阁下已获得是非永久性授权软件，阁下使用此类授权软件的权限将在适用许可证文件中指明的适用结束日期终止，在此适用结束日期后，阁下应停止使用本授权软件。' +
'</div>' +
'<li>三、授权许可的限制。</li>' +
'<div style="text-indent: 2em; margin-top: 5px; margin-bottom: 8px">' +
'除非在本授权协议中明确规定，否则未经中国海洋当大学科技处事先书面同意，阁下不得引导、促成或允许：(i) 使用、复制、修改、再授权或转让本授权软件；(ii) 基于本授权软件创建任何衍生作品；(iii)' +
'对本授权软件进行逆向工程、分解或反编译（除非是为了实现互操作目的而反编译本授权软件，前提是适用的法律允许阁下这么做，而且阁下严格遵守适用法律）；(iv) 将本授权软件与服务部门、设备管理、时分、服务提供商或类似活动结合使用，在这些活动中，阁下操作或使用本授权软件从第三方那里获得好处；(v)' +
'由阁下之外的任何其它方使用本授权软件；(vi) 使用本授权软件的更高版本（如果该版本不是本授权许可协议附带的版本），除非阁下已通过许可证文件或支持证书单独购买了使用此类更高版本的权利；并且' +
'(vii) 在使用本授权软件时不得超出本授权许可协议或适用许可证文件授予阁下的使用数量和使用级别。' +
'</div>' +
'<li>四、所有权/版权。</li>' +
'<div style="text-indent: 2em; margin-top: 5px; margin-bottom: 8px">' +
'本授权软件是 中国海洋大学科技处或其许可方的专有财产，受版权法保护。中国海洋大学科技处和其许可方保留本授权软件（包括对本授权软件的所有拷贝、改进、增强、修改和衍生作品的利益）的所有权利、版权和利益。阁下使用本授权软件的权利仅限于本授权许可协议中明确授予的权利。所有未明确授予阁下的权利均由中国海洋大学科技处和/或其许可方保留。' +
'</div>' +
'<li>五、内容更新</li>' +
'<div style="text-indent: 2em; margin-top: 5px; margin-bottom: 8px">' +
'如果阁下使用的中国海洋大学科技处提供的软件产品中所述的内容更新组成或者包括这些内容更新，那么当中国海洋大学科技处向此类维护/支持产品的最终用户客户公开提供这些内容更新时，阁下有权将这些内容更新作为本授权软件的一部分使用，使用期限为适用的支持证书正面标明的时间段。除此之外，本授权许可协议并未允许阁下取得和使用“内容更新”。' +
'</div>' +
'<li style="margin-top: 5px; margin-bottom: 8px">六、有限担保。' +
'<ol style="margin-top: 5px">' +
'<li>介质担保</li>如果中国海洋大学科技处通过有形介质向阁下提供本授权软件，中国海洋大学科技处保证，在正常使用的情况下，刻有本授权软件的光盘在交付之日起三十(30)' +
'天内不会有瑕疵。中国海洋大学科技处将免费更换在保证期内退给中国海洋大学科技处的瑕疵介质。如果授权软件介质由于未经授权使用授权软件而损坏，上述保证将不适用。上述条款是当中国海洋大学科技处违反该保证时阁下可获得的唯一补偿。' +
'<li>合同履行担保</li>中国海洋大学科技处保证本授权软件在中国海洋大学科技处交付时，以及在根据相关文档使用的情况下，在交付后的三十天 (30) 天内将完全符合相关文档。如果本授权软件不符合该保证，且阁下在三十天(30)天的保证期内将此情况报告给' +
'中国海洋大学科技处，中国海洋大学科技处将根据自己的合理判断选择采取以下措施之一：(i) 修复本授权软件，(ii) 使用具有相同功能的软件替换本授权软件，或者 (iii)' +
'终止本授权协议并退还为此类不符合要求的授权软件支付的相关许可费用。上述担保明确排除因事故、滥用、未授权修复、修改、增强或误用导致的瑕疵。上述条款是当 中国海洋大学科技处违反该保证时阁下可获得的唯一补偿。' +
'</ol>' +
'</li>' +
'<li>七、担保免责声明</li>' +
'<div style="text-indent: 2em; margin-top: 5px; margin-bottom: 8px">' +
'在适用法律允许的最大范围内，第6.1 和6.2 部分中的担保是阁下所获得的独有担保，并取代所有其它明示或默示的担保，包括但不限于有关适销性、质量可靠、适用于特定用途及无侵害知识产权的默示保证。中国海洋大学科技处不担保或声明本授权软件、内容更新或升级将能够满足阁下的要求，或者本授权软件、内容更新或升级的运行或使用将不会中断或没有错误。阁下亦可能拥有其它保证权利。' +
'</div>' +
'<li>八、有限责任</li>' +
'<div style="text-indent: 2em; margin-top: 5px; margin-bottom: 8px">' +
'在适用法律允许的最大范围内，不论在此所述的任何补偿措施是否能达到其根本目的，在任何情况下，对于由本授权许可协议直接或间接导致的以下损失/损害，中国海洋大学科技处均不承担任何责任：(i)' +
'购买替代商品和服务导致的任何成本、利润损失、无法使用、数据遗失或损坏、业务中断、生产损失、收入损失、合同损失、商誉损失、预期的节约或管理层与普通员工因此而浪费的时间；(ii)' +
'任何特殊的、衍生的、偶然的或间接的损害，即使中国海洋大学科技处曾被告知可能会发生此类损害赔偿。在任何情况下，中国海洋大学科技处的责任都应免责。对于由于疏忽而引起的死亡或人身伤害，或对于法律要求中国海洋大学科技处对阁下承担的其它任何责任，本协议中的任何内容都不会进行排除或限制。无论阁下是否接受本授权软件、内容更新或升级，上述免责声明和限制均适用。' +
'</div>' +
'<li>九、维护/支持</li>' +
'<div style="text-indent: 2em; margin-top: 5px; margin-bottom: 8px">' +
'根据本授权许可协议没有义务为本授权软件提供维护/支持。为本授权软件的任何维护/支持都应遵守本软件最新的维护/支持政策。' +
'</div>' +
'<li style="margin-top: 5px; margin-bottom: 8px;">十、一般条款。' +
'<ol style="margin-top: 5px">' +
'<li>转让</li>未经中国海洋大学科技处事先明确的书面同意，阁下不得全部或部分转让下面或本授权许可协议中授予的权利，无论是通过合同、法律还是其它方式。' +
'<li>遵守适用的法律</li>在阁下使用本授权软件时，阁下应独自负责遵守并同意遵守所有适用法律和法规。阁下的用户名和密码是阁下操作的依据，阁下应负责保管密码并对以阁下以密码进行的所有活动和事件负法律责任。' +
'<li>适用法律；可分割性；豁免</li>本授权许可协议将受中华人民共和国法律的约束。并且无需遵守法律冲突原则。如果发现本授权许可协议部分或全部不合法或无法执行，则应以允许的最大程度执行此类条款；本授权许可协议的其余条款则应当持续有效。豁免违反本协议或不履行本授权协议的任何行为并不等于豁免任何后续违反协议或不履行协议的行为。' +
'<li>第三方程序。</li>本授权软件可能包含根据开放源代码或免费软件许可证提供的第三方软件程序（以下称“第三方程序”）。本授权许可协议不会改变这些开放源代码或免费软件许可证赋予阁下的任何权利或义务。尽管本授权许可协议中的内容可能与此类许可证中所含内容相反，但本授权许可协议中的免责条款和责任限制条款仍将适用于这些第三方程序。' +
'<li>数据真实性与可靠性。</li>中国海洋大学科技处承诺尽最大可能确保本软件服务内容提供的数据准确、真实，但不承诺该数据被用于其它用途时的任何法律责任。阁下的提交给本软件的数据,中国海洋大学科技处将在能力所及的范围内予以保护，但若由于不可抗力或其他人为原因(如操作不当或故意破坏)而造成数据损坏、丢失等，中国海洋大学科技处将不承担任何法律责任，不提供任何补偿。阁下的提交本软件的数据，中国海洋大学科技处将尽力保存，但不承诺永久保存。' +
'<li>服务变更、中断或终止</li>如因软件系统维护或升级的需要而需暂停服务，中国海洋大学科技处将尽可能事先进行通告。如发生下列任何一种情形，中国海洋大学科技处有权随时中断或终止向阁下提供本协议项下服务内容而无需提前通知阁下：(i)' +
'阁下或以阁下的密码登陆进行任何可能对本软件正常运转造成不利影响的行为；(ii)利用软件漏洞或任何非法目的而使用本软件提供的非阁下管理的数据； (iii)任何违反国家法律、法规的行为。' +
'<li>客户服务</li>若阁下对本授权许可协议有任何疑问或欲联络 我们，(i)请致函 中国海洋大学科学技术处 山东省青岛市崂山区松岭路238号405室;(ii)发送电子邮件至' +
'kjc@ouc.edu.cn' +
'<li>隐私数据保护</li>本授权软件会从装有该软件的设备中收集某些信息，这些信息可能包括: (i)有关本授权软件的使用信息。用户名、操作记录、IP地址及访问时间。收集此信息的目的在于此信息可告知本授权软件的使用是否正常以及用于评估和提高产品的使用和提升安全。此信息与个人身份信息相关联。' +
'(ii)有关潜在安全风险以及本授权软件视为有欺诈嫌疑的访问信息。收集此信息的目的在于评估和提高本软件系统的对检测恶意行为、有欺诈嫌疑的访问以及安全风险的能力。此信息不会与任何个人身份信息相关联。' +
'为优化本软件的功能，有必要收集上述信息。这些信息可能会被传输到软件研发小组，中国海洋大学科技处已采取相应措施，以确保收集的信息在传输后能够得到充分的保护。如果因法律要求或经法律允许，或者为了响应传讯或其它法律程序，要求中国海洋大学科技处透露收集到的信息，则可能会透露收集的信息。为提高对Internet安全风险的认识、检测和防范，中国海洋大学科技处可能会与研究机构共享某些信息。我们也可以使用从这些信息中派生出的统计数据用于分析。如果使用本授权软件，即表示阁下承认并同意中国海洋大学科技处可以出于上述目的收集、传输、存储、透露和分析此类信息。' +
'</ol>' +
'</li>' +
'<li style="margin-top: 5px; margin-bottom: 8px">十一、通知和送达' +
'<ol style="margin-top: 5px">' +
'<li>本协议项下所有的通知均可通过重要页面公告、电子邮件或常规的信件传送等方式进行；该等通知于发送之日视为已送达收件人。</li>' +
'</ol>' +
'</li>' +
'<li style="margin-top: 5px; margin-bottom: 8px">十二、关于数据的注意事项' +
'<ol style="margin-top: 5px">' +
'<li>用户的提交的信息,本系统将在能力所及的范围内保护，但若由于不可抗力或其他人为原因(如操作不当或故意破坏)而造成数据损坏、丢失等，科技处和相关人员将不承担任何责任。</li>' +
'<li>用户有关数据本系统将尽力保存，但不承诺永久保留。安全起见，请用户自行保留，以备后用。</li>' +
'</ol>' +
'</li>' +
'</ol>' +
'</div>' +
'</div>' +
'</div>';

Srims.FormLogin.getFormLogin = function() {
    return Ext.getCmp(Srims.FormLogin.ID);
};

