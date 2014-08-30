var Cookies = new Ext.state.CookieProvider({
    path: "/",
    expires: new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 365))
});

Cookies.getLoginId = function(){
    return this.get("LoginId");
}
Cookies.setLoginId = function(loginId){
    this.set("LoginId", loginId);
}

Cookies.getPassword = function(){
    return this.get("Password");
}
Cookies.setPassword = function(password){
    this.set("Password", password);
}

Cookies.getIsRememberLogin = function(){
    return this.get("IsRememberLogin");
}
Cookies.setIsRememberLogin = function(isRememberLogin){
    this.set("IsRememberLogin", isRememberLogin);
}

Cookies.getToken = function(){
    return this.get("Token");
}
Cookies.setToken = function(token){
    this.set("Token", token);
}