
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/popup/popup-rel","pages/center/center","pages/profile/profile","pages/login/login","pages/login/forget","pages/login/register","pages/login/upload-userinfo","pages/test/test","pages/login/bind-mobile","pages/mall/mall","pages/mall/orders","pages/im/im","pages/im/log/log","pages/im/im-chat/im-list","pages/im/im-chat/im-chat","pages/im/register/register","pages/im/login/login","pages/im/im-chat/single","pages/im/im-chat/im-user","pages/im/im-chat/im-chat-group","pages/im/im-chat/im-chat-group-info","pages/im/my/my","pages/im/my/info","pages/im/my/safe","pages/im/address-book/address-book","pages/im/friend-invitiaon/friend-invitiaon","pages/im/im-chat/im-choose-user","pages/im/group-list/group-list","pages/im/group-apply/group-apply","pages/im/im-chat-room/list","pages/im/im-chat-room/room","pages/wallet/wallet","pages/member/member","pages/profile/release","pages/profile/apply","pages/profile/anonymous","pages/setting/setting","pages/profile/editCardInfo","pages/profile/cardInfo","pages/login/choose-area-code","pages/index/release-invite/release-invite","pages/mall/goods-detail","pages/mall/submit-order","pages/mall/address-manage","pages/mall/edit-address","pages/square/square","pages/square/release-square/release-square","pages/square/release-square/choose-tag","pages/square/square-details/square-details","pages/square/reply-page/reply-page","pages/popup/popup-tip","pages/seek/seek","pages/mall/buy-tip","pages/member/open-member/open-member","pages/setting/coupon","pages/square/square-tag/square-tag","pages/profile/invite-detail"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uView","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#909399","selectedColor":"#303133","borderStyle":"black","backgroundColor":"#ffffff","list":[{"pagePath":"pages/index/index","iconPath":"static/index.png","selectedIconPath":"static/index-selected.png","text":"首页"},{"pagePath":"pages/mall/mall","iconPath":"static/center.png","selectedIconPath":"static/center-selected.png","text":"商城"},{"pagePath":"pages/square/square","iconPath":"static/center.png","selectedIconPath":"static/center-selected.png","text":"广场"},{"pagePath":"pages/im/im","iconPath":"static/center.png","selectedIconPath":"static/center-selected.png","text":"消息"},{"pagePath":"pages/profile/profile","iconPath":"static/center.png","selectedIconPath":"static/center-selected.png","text":"我的"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"觅约2","compilerVersion":"3.1.2","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isNVue":true,"isTabBar":true},"window":{"navigationBarTitleText":"邀约","subNVues":[{"id":"invitePopup","path":"pages/index/subnvue/popup","style":{"position":"absolute","margin":"0","width":"750rpx","height":"1rpx"}}]}},{"path":"/pages/popup/popup-rel","meta":{},"window":{"navigationStyle":"custom","backgroundColor":"transparent","animationType":"fade-in","background":"transparent","popGesture":"none"}},{"path":"/pages/center/center","meta":{"isNVue":true},"window":{"navigationBarTitleText":"uView-center"}},{"path":"/pages/profile/profile","meta":{"isQuit":true,"isTabBar":true},"window":{"enablePullDownRefresh":false,"titleNView":false}},{"path":"/pages/login/login","meta":{},"window":{"titleNView":false}},{"path":"/pages/login/forget","meta":{},"window":{"navigationBarTitleText":"修改密码","enablePullDownRefresh":false}},{"path":"/pages/login/register","meta":{},"window":{"titleNView":false}},{"path":"/pages/login/upload-userinfo","meta":{},"window":{"titleNView":{"titleText":"完善资料","autoBackButton":false,"backgroundColor":"#ff7243","titleColor":"#FFFFFF"}}},{"path":"/pages/test/test","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/login/bind-mobile","meta":{},"window":{"navigationBarTitleText":"绑定手机号","enablePullDownRefresh":false}},{"path":"/pages/mall/mall","meta":{"isQuit":true,"isTabBar":true},"window":{"titleNView":{"type":"transparent","searchInput":{"disabled":true,"align":"center","placeholder":"请输入你需要的商品","placeholderColor":"#606266","backgroundColor":"rgba(231, 231, 231,.7)","borderRadius":"16px"},"buttons":[{"type":"none","fontSrc":"/static/font/iconfont.ttf","text":"","background":"rgba(231, 231, 231,.7)","color":"#606266"}]}}},{"path":"/pages/mall/orders","meta":{},"window":{"navigationBarTitleText":"我的订单","enablePullDownRefresh":true}},{"path":"/pages/im/im","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/pages/im/log/log","meta":{},"window":{"navigationBarTitleText":"uni-app","enablePullDownRefresh":true}},{"path":"/pages/im/im-chat/im-list","meta":{},"window":{"backgroundColor":"#fff","navigationBarTitleText":"会话列表","enablePullDownRefresh":true,"scrollIndicator":"none"}},{"path":"/pages/im/im-chat/im-chat","meta":{},"window":{"backgroundColor":"#fff","navigationBarTitleText":"会话","titleNView":false,"navigationStyle":"custom","scrollIndicator":"none"}},{"path":"/pages/im/register/register","meta":{},"window":{"navigationBarTitleText":"IM用户注册"}},{"path":"/pages/im/login/login","meta":{},"window":{"navigationBarTitleText":"IM用户登录"}},{"path":"/pages/im/im-chat/single","meta":{},"window":{"navigationBarTitleText":"创建单聊会话"}},{"path":"/pages/im/im-chat/im-user","meta":{},"window":{"navigationBarTitleText":"用户资料"}},{"path":"/pages/im/im-chat/im-chat-group","meta":{},"window":{"backgroundColor":"#fff","navigationBarTitleText":"群聊","titleNView":false,"navigationStyle":"custom","scrollIndicator":"none"}},{"path":"/pages/im/im-chat/im-chat-group-info","meta":{},"window":{"navigationBarTitleText":"群聊资料"}},{"path":"/pages/im/my/my","meta":{},"window":{"navigationBarTitleText":"我的","enablePullDownRefresh":true}},{"path":"/pages/im/my/info","meta":{},"window":{"navigationBarTitleText":"更新用户信息"}},{"path":"/pages/im/my/safe","meta":{},"window":{"navigationBarTitleText":"更新安全信息"}},{"path":"/pages/im/address-book/address-book","meta":{},"window":{"navigationBarTitleText":"","titleNView":false,"navigationStyle":"custom","scrollIndicator":"none"}},{"path":"/pages/im/friend-invitiaon/friend-invitiaon","meta":{},"window":{"navigationBarTitleText":"新朋友"}},{"path":"/pages/im/im-chat/im-choose-user","meta":{},"window":{"navigationBarTitleText":"选择好友"}},{"path":"/pages/im/group-list/group-list","meta":{},"window":{"navigationBarTitleText":"群聊列表"}},{"path":"/pages/im/group-apply/group-apply","meta":{},"window":{"navigationBarTitleText":"入群申请"}},{"path":"/pages/im/im-chat-room/list","meta":{},"window":{"navigationBarTitleText":"聊天室列表"}},{"path":"/pages/im/im-chat-room/room","meta":{},"window":{"navigationBarTitleText":"聊天室","titleNView":false,"navigationStyle":"custom","scrollIndicator":"none"}},{"path":"/pages/wallet/wallet","meta":{},"window":{"navigationBarTitleText":"钱包","enablePullDownRefresh":true,"backgroundColor":"#FFFFFF","titleNView":false}},{"path":"/pages/member/member","meta":{},"window":{"navigationBarTitleText":"会员中心","enablePullDownRefresh":false,"titleNView":false}},{"path":"/pages/profile/release","meta":{},"window":{"navigationBarTitleText":"发布","enablePullDownRefresh":false,"titleNView":false}},{"path":"/pages/profile/apply","meta":{},"window":{"navigationBarTitleText":"申请","enablePullDownRefresh":true}},{"path":"/pages/profile/anonymous","meta":{},"window":{"navigationBarTitleText":"匿名","enablePullDownRefresh":false,"titleNView":false}},{"path":"/pages/setting/setting","meta":{},"window":{"navigationBarTitleText":"设置","enablePullDownRefresh":false}},{"path":"/pages/profile/editCardInfo","meta":{},"window":{"navigationBarTitleText":"","titleNView":false}},{"path":"/pages/profile/cardInfo","meta":{},"window":{"navigationBarTitleText":"用户资料","enablePullDownRefresh":true,"titleNView":{"type":"transparent","buttons":[{"type":"none","fontSrc":"/static/font/iconfont.ttf","text":"","color":"#FF7243","fontSize":"15px","width":"0px"}]}}},{"path":"/pages/login/choose-area-code","meta":{},"window":{"navigationBarTitleText":"选择手机号归属地","enablePullDownRefresh":false}},{"path":"/pages/index/release-invite/release-invite","meta":{},"window":{"navigationBarTitleText":"发布邀约","enablePullDownRefresh":false,"titleNView":false}},{"path":"/pages/mall/goods-detail","meta":{},"window":{"navigationBarTitleText":"商品详情","enablePullDownRefresh":true,"titleNView":{"type":"transparent","buttons":[{"type":"menu"}]}}},{"path":"/pages/mall/submit-order","meta":{},"window":{"navigationBarTitleText":"提交订单","enablePullDownRefresh":false}},{"path":"/pages/mall/address-manage","meta":{},"window":{"navigationBarTitleText":"收货地址-管理","enablePullDownRefresh":false,"titleNView":false}},{"path":"/pages/mall/edit-address","meta":{},"window":{"navigationBarTitleText":"收货地址-编辑","enablePullDownRefresh":false,"titleNView":false}},{"path":"/pages/square/square","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"广场","enablePullDownRefresh":true,"titleNView":false}},{"path":"/pages/square/release-square/release-square","meta":{},"window":{"navigationBarTitleText":"发布广场","enablePullDownRefresh":false,"titleNView":false}},{"path":"/pages/square/release-square/choose-tag","meta":{},"window":{"navigationBarTitleText":"选择话题","enablePullDownRefresh":false,"titleNView":false}},{"path":"/pages/square/square-details/square-details","meta":{},"window":{"navigationBarTitleText":"动态详情","enablePullDownRefresh":true}},{"path":"/pages/square/reply-page/reply-page","meta":{},"window":{"navigationBarTitleText":"回复","enablePullDownRefresh":true}},{"path":"/pages/popup/popup-tip","meta":{},"window":{"navigationStyle":"custom","backgroundColor":"transparent","animationType":"fade-in","background":"transparent","popGesture":"none"}},{"path":"/pages/seek/seek","meta":{},"window":{"navigationBarTitleText":"觅约","enablePullDownRefresh":false,"titleNView":false}},{"path":"/pages/mall/buy-tip","meta":{},"window":{"navigationBarTitleText":"购买提示","enablePullDownRefresh":false}},{"path":"/pages/member/open-member/open-member","meta":{},"window":{"navigationBarTitleText":"开通会员","enablePullDownRefresh":false,"titleNView":false}},{"path":"/pages/setting/coupon","meta":{},"window":{"navigationBarTitleText":"我的优惠券","enablePullDownRefresh":true}},{"path":"/pages/square/square-tag/square-tag","meta":{},"window":{"navigationBarTitleText":"话题广场","enablePullDownRefresh":true,"titleNView":false}},{"path":"/pages/profile/invite-detail","meta":{},"window":{"navigationBarTitleText":"邀约详情","enablePullDownRefresh":true}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
