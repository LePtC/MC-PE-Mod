// LePtC 的 Minecraft PE 空间移动 mod
// https://github.com/LePtC/MC-PE-Mod

// 模版参考 https://github.com/BeATz-UnKNoWN/ModPE_Scripts/wiki/ModPE-Script-Templates
// 教程参考 https://github.com/Connor4898/ModPE-Scripts/wiki/ModPE-Scripts-Functions-List#text-functions-1


var GUI;
var tick = 0;

function newLevel(){
  print("javascript mod 已加载");

  var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
  ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
    try{
        var layout = new android.widget.LinearLayout(ctx);
        layout.setOrientation(1); // 1 表示按钮垂直排列


        // 快速向前跳跃
        var button = new android.widget.Button(ctx);
        button.setText("↑↑");
        button.setTextSize(20);
        button.setOnClickListener(new android.view.View.OnClickListener({
        onClick:function(viewarg){
          jump(25);
        }}));
        layout.addView(button);

        // 向前跳跃
        var button = new android.widget.Button(ctx);
        button.setText("↑");
        button.setTextSize(20);
        button.setOnClickListener(new android.view.View.OnClickListener({
        onClick:function(viewarg){
          jump(10);
        }}));
        layout.addView(button);

        // 向后跳跃
        var button = new android.widget.Button(ctx);
        button.setText("↓");
        button.setTextSize(20);
        button.setOnClickListener(new android.view.View.OnClickListener({
        onClick:function(viewarg){
          jump(-10);
        }}));
        layout.addView(button);


        // 瞬移到敌人背后
        var button = new android.widget.Button(ctx);
        button.setText("瞬");
        button.setTextSize(20);
        button.setOnClickListener(new android.view.View.OnClickListener({
        onClick:function(viewarg){

          var me = Player.getEntity();
          var theta = getYaw();
          setRot(me,theta+180,getPitch()); // 转头
          theta = theta/180*Math.PI; // 注意用三角函数时要从弧度换算成角度
          setPosition(me,
            getPlayerX()-8*Math.sin(theta),
            getPlayerY(),
            getPlayerZ()+8*Math.cos(theta)
          );

          Level.playSound(getPlayerX(),getPlayerY(),getPlayerZ(),"fire.ignite",30,25); // 播放小黑瞬移声（目前不支持 mob.endermen.portal）

        }}));
        layout.addView(button);


        GUI = new android.widget.PopupWindow(layout, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
        GUI.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
        GUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.BOTTOM, 0, 0); // 改成右下角
    }catch(err){
        print("出错: " + err);
    }
  }}));
}



// 向前跳跃并探测目的地地面的高度
function jump(distance){

  var me = Player.getEntity();
  var theta = getYaw()/180*Math.PI;
  var px = getPlayerX()-distance*Math.sin(theta);
  var py = getPlayerY();
  var pz = getPlayerZ()+distance*Math.cos(theta);

  var groundy = 254; // 255 为 PE 版最大高度
  while(groundy>3 && getTile(px,groundy,pz) == 0){groundy--;} // 向下探该处地面的高度
  // 以防卡地里，前后左右也检测一下（但有一定几率会瞬移得太高然后摔一下）
  // if(getTile(px+1,groundy,pz) != 0){groundy+=1}
  // if(getTile(px-1,groundy,pz) != 0){groundy+=1}
  // if(getTile(px,groundy,pz+1) != 0){groundy+=1}
  // if(getTile(px,groundy,pz-1) != 0){groundy+=1}

  setPosition(me,px,groundy+3,pz); // 人物高 2 格
  Level.playSound(px,groundy,pz,"fire.ignite",30,25);

}




function leaveGame(){
    var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
    ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
        if(GUI != null){
            GUI.dismiss();
            GUI = null;
        }
    }}));
}



