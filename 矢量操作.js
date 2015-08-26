// LePtC 的 Minecraft PE 矢量操作 mod
// https://github.com/LePtC/MC-PE-Mod

// 模版参考 https://github.com/BeATz-UnKNoWN/ModPE_Scripts/wiki/ModPE-Script-Templates
// 教程参考 https://github.com/Connor4898/ModPE-Scripts/wiki/ModPE-Scripts-Functions-List#text-functions-1


function newLevel()
{
  print("矢量操作 mod 已加载");
  Player.setCanFly(1); // 生存飞行

  var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
  ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
    try{
        var layout = new android.widget.LinearLayout(ctx);
        layout.setOrientation(1); // 1 表示按钮垂直排列


        // 跳跃提升 40 级
        var button = new android.widget.Button(ctx);
        button.setText("跳");
        button.setTextSize(20);
        button.setOnClickListener(new android.view.View.OnClickListener({
        onClick:function(viewarg){

          Entity.removeEffect(getPlayerEnt(), MobEffect.jump);
          Entity.addEffect(getPlayerEnt(), MobEffect.jump, 30*20, 39, false, false); // 可以用这个玩星跳水立方

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


function leaveGame(){
    var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
    ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
        if(GUI != null){
            GUI.dismiss();
            GUI = null;
        }
    }}));
}



var delay=0;

function modTick()
{

  pe=Player.getEntity();
  px=getPlayerX();
  py=getPlayerY();
  pz=getPlayerZ();

  // 用鸡免摔（参考 Sin0psysS 做了简化）
  if(Entity.getVelY(pe)<-0.2 && getTile(px,py-5,pz)!=0 && delay==0){
    var chicken = Level.spawnMob(px,py-1,pz,10);
    Entity.setRenderType(chicken,1); // 鸡隐身
    rideAnimal(getPlayerEnt(),chicken);
    // setVelY(chicken,vel);
    ModPE.showTipMessage(""); // 不要显示提示信息
    Entity.remove(chicken);
    delay = 10;
  }
  if(delay>0){delay--;}

}

