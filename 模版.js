// LePtC 的 Minecraft PE javascript mod 模版

// 模版参考 https://github.com/BeATz-UnKNoWN/ModPE_Scripts/wiki/ModPE-Script-Templates
// 教程参考 https://github.com/Connor4898/ModPE-Scripts/wiki/ModPE-Scripts-Functions-List#text-functions-1


var GUI;

function newLevel(){
  print("javascript mod 已加载");

  var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
  ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
    try{
        var layout = new android.widget.LinearLayout(ctx);
        layout.setOrientation(1); // 1 表示按钮垂直排列


        var button = new android.widget.Button(ctx);
        button.setText("按");
        button.setTextSize(20);
        button.setOnClickListener(new android.view.View.OnClickListener({
        onClick:function(viewarg){

          print("你按下了按钮！");

        }}));
        layout.addView(button);


        GUI = new android.widget.PopupWindow(layout, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
        GUI.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
        GUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.BOTTOM, 0, 0); // 改成显示在右下角
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



