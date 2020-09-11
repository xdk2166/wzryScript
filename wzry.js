
"ui";

var totalTimes = 0 ;
var someTimes = 0;
var rest=0;
var timeout = 0;
var i = 0;
var totalMoney = 0;
var totalTime = 0;
var packageNme= "com.tencent.tmgp.sgame";

// 停止APP
function killApp(packageName) {
    shell('am force-stop ' + packageName, true);
};

//重复进行闯关
function enterGame(){
    //闯关
click(1640,866);
if(timeout!=0){
    sleep(timeout);
}
else{
    sleep(28000);
}
for(var i=0;i<35;i++){
    click(1100,1015);
    sleep(500);
}
sleep(1000);
//点击屏幕继续
click(1180,897);
sleep(1000);
//再次挑战
click(1938,982);
sleep(500);
}

//入口函数
function main(){
    ui.run(function(){
       importClass("android.view.WindowManager")
       activity.getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN);
    });
    launchApp("王者荣耀");
    sleep(3000);
//waitForActivity("com.tencent.tmgp.sgame.SGameActivity");
    click(1716,765);
    sleep(1000);
    click(222,251);
    sleep(1000);
    click(1146,777);
    sleep(1000);
    click(1200,452);
    sleep(1000);
    click(1697,937);
    sleep(1000);

    while(i<totalTimes){
        enterGame();
        i = i+1;
        totalTime = 50*i;
        totalMoney = i*6;
        if(i==someTimes){
            sleep(rest)
        }
             
        ui.run(function(){
            str1=util.format("闯关时间 %d 秒，",totalTime);
             str2=util.format("累计刷金币 %d 枚",totalMoney);
             ui.time.setText(str1+str2);
        });
            
             //ui.totalMoney.setText(str2);
        
    }
   
   
}

//保存本地数据
function setStorageData(name, key, value) {
    const storage = storages.create(name);  //创建storage对象
    storage.put(key, value);
};


//读取本地数据
function getStorageData(name, key) {
    const storage = storages.create(name);  //创建storage对象
    if (storage.contains(key)) {
        return storage.get(key, "");
    };
    //默认返回undefined
};

//保存输入框数据到本地
function saveData(){
   setStorageData("xdk","totalTimes",ui.totalTimes.text());
   setStorageData("xdk","someTimes",ui.someTimes.text());
   setStorageData("xdk","rest",ui.rest.text());
   setStorageData("xdk","timeout",ui.timeout.text());
   setStorageData("xdk","totalTime",totalTime);
   setStorageData("xdk","totalMoney",totalMoney);
   
}

//获取输入框数据
function getData(){
    totalTimes= getStorageData("xdk","totalTimes");
    someTimes= getStorageData("xdk","someTimes");
    rest= getStorageData("xdk","rest");
    timeout= getStorageData("xdk","timeout");

}


//悬浮窗显示实时数据
function floatWindow(){
    
    var window = floaty.rawWindow(
        <frame gravity="center">
            <text id="text" textSize="16sp" textColor="#f44336"/>
        </frame>
    );
    //window.exitOnClose();
    window.setTouchable(false);
    
    
    window.text.click(()=>{
        window.setAdjustEnabled(!window.isAdjustEnabled());
    });
    
    setInterval(()=>{
        //对控件的操作需要在UI线程中执行
        ui.run(function(){
            window.text.setText(dynamicText());
        });
    }, 1000);
    
    function dynamicText(){
        var str = util.format("累计使用时间: %d秒\n", totalTime);
        str += util.format("累计闯关次数: %d次\n", i);
        str += util.format("累计刷金币数: %d枚\n", totalMoney);
        
        str += util.format("内存使用量: %d%%\n", getMemoryUsage());
        str += "当前活动: " + currentActivity() + "\n";
        str += "当前包名: " + currentPackage();
        return str;
    }
    
      ui.windowClose.on("click",()=>{
    window.close();
 })
    
    //获取内存使用率
    function getMemoryUsage(){
        var usage = (100 * device.getAvailMem() / device.getTotalMem());
        //保留一位小数
        return Math.round(usage * 10) / 10;
    }
}


ui.layout(
    <vertical  >
    <appbar>
            <toolbar id="toolbar" title="王者辅助"/>
        </appbar>
        <text marginTop= "10" text="欢迎使用王者荣耀自动刷金币脚本！" gravity="center" textSize="20sp" />
         <card w="*" h="190" margin="10 20" cardCornerRadius="2dp"
    cardElevation="1dp" gravity="center_vertical">
    <vertical padding="15 8" h="auto">
     <linear>
            <text textColor="black" w="auto" textSize="18sp">计划闯关多少</text>
            <input id="totalTimes" inputType="number" w="60"  />
            <text textColor="black" w="auto" textSize="18sp">次后，停止脚本</text>
        </linear>
     <linear>
        <text textColor="black" w="auto" textSize="18sp">每闯多少</text>
            <input id="someTimes" inputType="number" w="60" />
            <text textColor="black" w="auto" textSize="18sp">关，休息</text>
            <input id="rest" inputType="number" w="60" />
            <text textColor="black" w="auto" textSize="18sp">毫秒</text>
        </linear>
         <linear>
        <text textColor="black" w="auto" textSize="18sp">设置关卡延时</text>
            <input id="timeout" inputType="number" w="60" />
            <text textColor="black" w="auto" textSize="18sp">毫秒</text>
        </linear>
        <linear>
        <text textColor="black" w="auto" textSize="18sp">累计</text>
  
            <text id="time" textColor="black" w="auto" textSize="18sp">闯关时间 0 秒，累计刷金币 0 枚</text>
            
        </linear>
    </vertical>
    <View bg="#dddddd" h="*" w="10"/>
</card>
        <linear marginLeft="10" gravity="center">
          <button  id = "windowStart" text="开启悬浮窗" style="Widget.AppCompat.Button.Colored" w="auto" />
          <button  id = "windowClose" text="关闭悬浮窗" style="Widget.AppCompat.Button.Colored" w="auto" />
        </linear>
        <button id='start' text="开始运行" style="Widget.AppCompat.Button.Colored"  />
        <button id='end' text="停止脚本"  />
         <text gravity="center" marginTop="190" >版本号：王者荣耀免root V1.0</text>
        <text gravity="center">作者：xdk</text>
        <text gravity="center">使用说明：联系作者获取使用说明</text>
        <text gravity="center">联系作者：3371223150@qq.ocm</text>
        <text gravity="center"  textColor="red">未经作者授权，禁止肆意传播！</text>
    </vertical>
    );
    
     ui.windowStart.on("click",()=>{
    /* threads.start(function(){
      

     } );*/
    threads.start(function(){
        floatWindow();

     } );
 })
 
 
    
    ui.start.on("click",()=>{
    /* threads.start(function(){
      

     } );*/
     threads.start(function(){
        auto();
        setScreenMetrics(1080, 2340);
        saveData();
        getData();
        main();
        sleep(1000);
        click(222,62);
        sleep(800);
        click(222,62);
        sleep(1000);
        launchApp("王者荣耀金币辅助"); 

     } );
     //thread.start();
    
        
        
       
        
 })
 
 ui.end.on("click",()=>{
     exit();
 })
 
