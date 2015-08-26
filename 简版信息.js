// LePtC 简版信息提示
// modified from MP430488's work http://pan.baidu.com/s/1gduwH5h#path=%252F
// and qsefthukol(啦啦菌)'s map http://pan.baidu.com/share/link?shareid=815720780&uk=3829338695

var tick=0,sec=0,min=0,sectemp=0;
var screenwidth=1500;

var pe,px,py,pz,yaw;

var btn = null;
var openWindow = null;
var simpleGUI = null;

var ctx=com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var title = new android.widget.TextView(ctx);

function newLevel()
{
  print("MC PE info mod loaded");
  // Player.setCanFly(1); // P2 矢量操作（生存飞行）

  ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
  ctx.runOnUiThread(new java.lang.Runnable({
run: function()
{
try
{
  // 信息显示在中上
  layout = new android.widget.RelativeLayout(ctx);
  xdt = new android.widget.ImageView(ctx);
  layout.addView(xdt);
  simpleGUI = new android.widget.PopupWindow(layout,600,50);
  simpleGUI.showAtLocation(ctx.getWindow().getDecorView(),
    android.view.Gravity.CENTER_HORIZONTAL | android.view.Gravity.TOP,0,0);

  info(); // 持续显示坐标
}
catch(err)
{
  print("Error: "+err);
}
}
}));
}

function leaveGame()
{
  dismissmenu();
  ctx.runOnUiThread(new java.lang.Runnable({run: function(){
    if(simpleGUI != null){
      simpleGUI.dismiss();
    }
  }}));
}



function info()
{
new android.os.Handler().postDelayed(new java.lang.Runnable(
{
run: function()
{
  var newb = android.graphics.Bitmap.createBitmap(600,50,
    android.graphics.Bitmap.Config.ARGB_8888 );
  var canvasTemp = new android.graphics.Canvas(newb);
  var p = new android.graphics.Paint();

  p.setARGB(100,0,0,0);
  canvasTemp.drawRect(0,0,600,50,p); // 宽 600 高 50

  p.setTextSize(40);
  p.setTextAlign(android.graphics.Paint.Align.CENTER);
  p.setARGB(255,255,255,255);

  canvasTemp.drawText("["+min+":"+sec+"] P("+px+","+py+","+pz+";"+yaw+"°)",300,40,p);

  var drawable = new android.graphics.drawable.BitmapDrawable(newb);
  xdt.setBackgroundDrawable(drawable);

  info(); // 保持持续刷新

}
}), 100);
}


// 默认游戏速度为 20 ticks = 1 秒
function modTick()
{
  tick++;
  sectemp=parseInt(tick/20);
  min=parseInt(sectemp/60);
  sec=sectemp%60;

  pe=Player.getEntity();
  px=parseInt(getPlayerX());
  py=parseInt(getPlayerY());
  pz=parseInt(getPlayerZ());

  yaw = parseInt(getYaw()%360);
  if(yaw<-179){yaw += 360;}
  if(yaw>181){yaw -= 360;}

  // Player.setHealth(20); // 保持满血, 测试用
}



function dismissmenu()
{
  var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
  ctx.runOnUiThread(new java.lang.Runnable({run: function(){
    if(btn!=null)btn.dismiss();btn=null
    if(openWindow!=null)openWindow.dismiss();openWindow=null
  }}));
}

