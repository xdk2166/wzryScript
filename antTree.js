/**
 * Author:xdk
 * Des:蚂蚁森林自动收取能量脚本
 * Date:2020-09-05
 */

 //打开对应的app应用
function init(AppName){
    auto();
    launchApp(AppName);
    setScreenMetrics(1080, 1920);//设置分辨率自适应
    sleep(3000);
    toast('开始运行...')
    sleep(1500);
}

//跳转到蚂蚁森林收取能量页面
function toPage(){
    waitForPackage("com.eg.android.AlipayGphone")//阻塞函数，等待支付宝打开
    desc('搜索').findOne(timeout=3000).parent().click();
    sleep(1500);
    setText([0,],'蚂蚁森林');
    sleep(1500);
    click('搜索'[0,0]);
    sleep(1500);
    click("蚂蚁森林");
}


//开始收集自动收集能量
function getEnergy(){
    waitForActivity("com.alipay.mobile.nebulax.integration.mpaas.activity.NebulaActivity$Main");
    toast('开始收集...');
    var object = textContains("收集能量").findOne(timeout=4000);
    log(object);
    var i = 0;
    sleep(500);
    //如果自己的能量收完了，直接收取好友能量
    while(object==null){
        i=0;
        //next=text("背包").findOne(timeout=3000).bounds();
        click(993,1533);
        sleep(1500);
        object = textContains("收集能量").findOne(timeout=4000);
         //检查所有好友的能量是否收完，如果连续三次没有收到好友能量，退出循环，结束程序
         while(object==null){
            click(938,1547);
            sleep(1500);
            object = textContains("收集能量").findOne(timeout=3000);
            if(i>=3){break;}
            i=i+1;
        }
        
    }

    while(object!=null){
        i=0;
        click(object.bounds().centerX(),object.bounds().centerY());
        object = textContains("收集能量").findOne(timeout=3000);
        sleep(1500);
        //检查所有好友的能量是否收完，如果连续三次没有收到好友能量，退出循环，结束程序
        while(object==null){
            click(938,1547);
            sleep(1500);
            object = textContains("收集能量").findOne(timeout=3000);
            if(i>=3){break;}
            i=i+1;
        }
    }
    toast("能量已收完")
    return;
    
}


setScreenMetrics(1080, 2340);//设置分辨率自适应
//init("支付宝");
//toPage();
getEnergy();






