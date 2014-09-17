// modified from MP430488's work http://pan.baidu.com/s/1gduwH5h#path=%252F 
// and qsefthukol(啦啦菌)'s map http://pan.baidu.com/share/link?shareid=815720780&uk=3829338695
// only tested on Android Minecraft PE 0.9.5

var pe,px,py,pz,yaw;
var p1x=0,p1y=0,p1z=0;
var p2x=0,p2y=0,p2z=0;

var bodydes = -1;

var btn = null;
var openWindow = null;
var simpleGUI = null;

var ctx=com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var title = new android.widget.TextView(ctx);

function newLevel()
{
	print("LePtC MC PE mod loaded");
	
	window();
	p1x = ModPE.readData("p1x");
	p1y = ModPE.readData("p1y");
	p1z = ModPE.readData("p1z");
	p2x = ModPE.readData("p2x");
	p2y = ModPE.readData("p2y");
	p2z = ModPE.readData("p2z");
	
	ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	ctx.runOnUiThread(new java.lang.Runnable({
run: function() 
{
try
{
	// 左上信息
	layout = new android.widget.RelativeLayout(ctx);                       
	xdt = new android.widget.ImageView(ctx);
	layout.addView(xdt);
	simpleGUI = new android.widget.PopupWindow(layout,1200,50); 
	simpleGUI.showAtLocation(ctx.getWindow().getDecorView(), 
		android.view.Gravity.LEFT | android.view.Gravity.TOP,0,0);
		
	dxc(); // 持续显示坐标
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
	ModPE.saveData("p1x",p1x);
	ModPE.saveData("p1y",p1y);
	ModPE.saveData("p1z",p1z);
	ModPE.saveData("p2x",p2x);
	ModPE.saveData("p2y",p2y);
	ModPE.saveData("p2z",p2z);
	
	dismissmenu();
	ctx.runOnUiThread(new java.lang.Runnable({run: function(){
		if(simpleGUI != null){
			simpleGUI.dismiss();
		}
	}}));
}

/* function procCmd(cmd)
{
	var Data = cmd.split(" ");
	if(Data[0]=="GUI")
	{
		window();
		clientMessage("已恢复GUI");
	}
} */

/* function useItem(x,y,z,ii,bi)
{
	if(ii==267)
	{
	if(start==1)
	{
		p1x=x,p1y=y,p1z=z
		clientMessage("已设置点1")
		clientMessage("x:"+p1x+" y:"+p1y+" z:"+p1z)
	}
	if(start==2)
	{
	p1x=x,p1y=y,p1z=z
	clientMessage("已设置点1")
	clientMessage("x:"+p1x+" y:"+p1y+" z:"+p1z)
	start++
	}
		if(start==4)
	{
	p2x=x,p2y=y,p2z=z
	clientMessage("已设置点2")
	clientMessage("x:"+p2x+" y:"+p2y+" z:"+p2z)
	clientMessage("x:"+Math.abs(p2x-p1x)+"y:"+Math.abs(p2y-p1y)+"z:"+Math.abs(p2z-p1z))
	start++
	}
		// t=-1
	}
} */

// 通过攻击骑上动物
function attackHook(at,vi)
{
	if(getCarriedItem()==344) // 没鞍用鸡蛋代替 …
	{
		rideAnimal(pe,vi);
		clientMessage("已成功骑上动物");
	}
}

function openMenu()
{
	ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	var layout = new android.widget.LinearLayout(ctx);
try{
	var menu = new android.widget.PopupWindow(layout,
		dip2px(ctx,40),dip2px(ctx,40));
	menu.setFocusable(true);
	mainMenu = menu;
	var layout = new android.widget.LinearLayout(ctx);
	layout.setOrientation(1); // 1:vertical
	
	/* var textParams = new android.widget.LinearLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
	textParams.setMargins(dip2px(ctx,2),0,0,0);
	
	title = new android.widget.TextView(ctx)
	title.setTextSize(16);
	title.setTextColor(android.graphics.Color.rgb(255,255,255));
	title.setText("x:"+px+"\ny:"+py+"\nz:"+pz+"\nθ:"+yaw+
		"°\nx1:"+p1x+"\ny1:"+p1y+"\nz1:"+p1z+
		"\nx2:"+p2x+"\ny2:"+p2y+"\nz2:"+p2z);
	title.setLayoutParams(textParams);
	layout.addView(title); */
	
	// 设脚下点为 p1
	var button = new android.widget.Button(ctx);
	button.setText("①");
	button.setTextSize(20);
	button.setOnClickListener(new android.view.View.OnClickListener({
	onClick:function(mp){
		p1x=px;
		p1y=py-2;
		p1z=pz;
	}}));
	layout.addView(button);
	
	// 设脚下点为 p2
	var button = new android.widget.Button(ctx);
	button.setText("②");
	button.setTextSize(20);
	button.setOnClickListener(new android.view.View.OnClickListener({
	onClick:function(mp){
		p2x=px;
		p2y=py-2;
		p2z=pz;
	}}));
	layout.addView(button);
	
	// 以手持物品造长方体
	var button = new android.widget.Button(ctx);
	button.setText("■");
	button.setTextSize(20);
	button.setOnClickListener(new android.view.View.OnClickListener({
	onClick:function(mp){
		var i,j,k;
		for(i=Math.min(p1x,p2x);i<=Math.max(p1x,p2x);i++){
		for(j=Math.min(p1y,p2y);j<=Math.max(p1y,p2y);j++){
		for(k=Math.min(p1z,p2z);k<=Math.max(p1z,p2z);k++){
			setTile(i,j,k,Player.getCarriedItem(),
				Player.getCarriedItemData());
		}}}
	}}));
	layout.addView(button);
	
	// 空心长方体
	var button = new android.widget.Button(ctx);
	button.setText("□");
	button.setTextSize(20);
	button.setOnClickListener(new android.view.View.OnClickListener({
	onClick:function(mp){
		var i,j,k;
		for(i=Math.min(p1x,p2x);i<=Math.max(p1x,p2x);i++){
		for(j=Math.min(p1y,p2y);j<=Math.max(p1y,p2y);j++){
		for(k=Math.min(p1z,p2z);k<=Math.max(p1z,p2z);k++){
			setTile(i,j,k,Player.getCarriedItem(),
				Player.getCarriedItemData());
		}}}
		for(i=Math.min(p1x,p2x)+1;i<=Math.max(p1x,p2x)-1;i++){
		for(j=Math.min(p1y,p2y)+1;j<=Math.max(p1y,p2y)-1;j++){
		for(k=Math.min(p1z,p2z)+1;k<=Math.max(p1z,p2z)-1;k++){
			setTile(i,j,k,0);
		}}}
	}}));
	layout.addView(button);
	
	// 以 p1 为圆心到 p2 画球
	var button = new android.widget.Button(ctx);
	button.setText("⊙");
	button.setTextSize(20);
	button.setOnClickListener(new android.view.View.OnClickListener({
	onClick:function(mp){
		var i,j,k,temp;
		var r=parseInt(Math.sqrt(
			(p1x-p2x)*(p1x-p2x)+(p1y-p2y)*(p1y-p2y)+(p1z-p2x)*(p1z-p2z)));
		for(i=-r;i<=r;i++){
		for(j=-r;j<=r;j++){
		for(k=-r;k<=r;k++){
			temp = i*i+j*j+k*k; 
			if(temp<r*r && temp>(r-1)*(r-1)){
				setTile(p1x+i,p1y+j,p1z+k,Player.getCarriedItem(),
					Player.getCarriedItemData());
			}
		}}}
	}}));
	layout.addView(button);
	
	// 以 p1 为中心建水漏斗，漏至 p2 的高度，自动化农场和刷怪塔常用
	var button = new android.widget.Button(ctx);
	button.setText("Y");
	button.setTextSize(20);
	button.setOnClickListener(new android.view.View.OnClickListener({
	onClick:function(mp){
		var i,j,k;
		for(i=-5;i<=5;i++){
		for(j=-5;j<=5;j++){
			setTile(p1x+i,p1y,p1z+j,Player.getCarriedItem(),
				Player.getCarriedItemData());
			if(i==-5||i==5||j==-5||j==5){
				setTile(p1x+i,p1y+1,p1z+j,Player.getCarriedItem(),
					Player.getCarriedItemData());
			}
		}}
		setTile(p1x,p1y,p1z,0);
		
		setTile(p1x+4,p1y+1,p1z+4,8,0); // 静止的水
		setTile(p1x+4,p1y+1,p1z-4,8,0);
		setTile(p1x-4,p1y+1,p1z+4,8,0);
		setTile(p1x-4,p1y+1,p1z-4,8,0);
		
		for(k=p1y-1;k>=p2y;k--){ // 漏斗颈
			for(i=-1;i<=1;i++){
			for(j=-1;j<=1;j++){
				setTile(p1x+i,k,p1z+j,Player.getCarriedItem(),
						Player.getCarriedItemData());
			}}
			setTile(p1x,k,p1z,0);
		}
		
	}}));
	layout.addView(button);
	
	// 删除长方体内任何方块
	var button = new android.widget.Button(ctx);
	button.setText("×");
	button.setTextSize(20);
	button.setOnClickListener(new android.view.View.OnClickListener({
	onClick:function(mp){
		var i,j,k;
		for(i=Math.min(p1x,p2x);i<=Math.max(p1x,p2x);i++){
		for(j=Math.min(p1y,p2y);j<=Math.max(p1y,p2y);j++){
		for(k=Math.min(p1z,p2z);k<=Math.max(p1z,p2z);k++){
			setTile(i,j,k,0);
		}}}
	}}));
	layout.addView(button);
	
	// 随人物开洞
	var button = new android.widget.Button(ctx);
	button.setText("#");
	button.setTextSize(20);
	button.setOnClickListener(new android.view.View.OnClickListener({
	onClick:function(mp){
		bodydes*=-1;
	}}));
	layout.addView(button);

	var button = new android.widget.Button(ctx);
	button.setText("→");
	button.setTextSize(20);
	button.setOnClickListener(new android.view.View.OnClickListener({
	onClick:function(mp){
		inputtp();
	}}));
	layout.addView(button);
	
	// 切换生存创造
	var button = new android.widget.Button(ctx);
	if(Level.getGameMode()==0) // 生存
	{
		button.setText("♥");
	}else{
		button.setText("♠");
	}
	button.setTextSize(20);
	button.setOnClickListener(new android.view.View.OnClickListener({
	onClick:function(mp){
		if(Level.getGameMode()==1) // 创造
		{
			Level.setGameMode(0);
			button.setText("♥");
			Level.setTime(8000);
		}else{
			Level.setGameMode(1);
			button.setText("♠");
			Level.setTime(13000);
		}
	}}));
	layout.addView(button);

	var mlayout=makeMenu(ctx,menu,layout);
	menu.setContentView(mlayout);
	// menu.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth());
	menu.setWidth(80);
	menu.setHeight(ctx.getWindowManager().getDefaultDisplay().getHeight()-100);
	menu.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
	menu.showAtLocation(ctx.getWindow().getDecorView(),android.view.Gravity.RIGHT | android.view.Gravity.TOP,0,100);
	
}
catch(err){
	clientMessage("Error"+err)
}
}


function inputtp(){
	var number=android.text.InputType.TYPE_CLASS_NUMBER;
	var mpLayout=new android.widget.LinearLayout(ctx);
try{
	mpLayout.setOrientation(1);
	var sv=new android.widget.ScrollView(ctx);
	
	xx1=new android.widget.EditText(ctx);
	xx1.setHint("x");
	xx1.setText(String(parseInt(Player.getX())));
	xx1.setInputType(number);
	mpLayout.addView(xx1);
	
	yy1=new android.widget.EditText(ctx);
	yy1.setHint("y");
	yy1.setText(String(parseInt(Player.getY())));
	yy1.setInputType(number);
	mpLayout.addView(yy1);
	
	zz1=new android.widget.EditText(ctx);
	zz1.setHint("z");
	zz1.setText(String(parseInt(Player.getZ())));
	zz1.setInputType(number);
	mpLayout.addView(zz1);
	
	sv.addView(mpLayout);
	var inputDialog = new android.app.AlertDialog.Builder(ctx).setView(sv).setTitle("请输入参数").setNegativeButton("确定",
	new android.content.DialogInterface.OnClickListener(){ 
	onClick:function(mp){
		setPosition(pe,parseInt(xx1.getText()),parseInt(yy1.getText()),parseInt(zz1.getText()));
		// toast("已传送到 ("+px+","+py+","+pz+")");
		inputDialog.dismiss();
	}})
	.create();
	inputDialog.setCanceledOnTouchOutside(false);
}
catch(err)
{
	clientMessage("Error"+err)
}
	inputDialog.show();
}


function dxc()
{
new android.os.Handler().postDelayed(new java.lang.Runnable(
{
run: function()
{
	var newb = android.graphics.Bitmap.createBitmap(1200,50, 
		android.graphics.Bitmap.Config.ARGB_8888 );
	var canvasTemp = new android.graphics.Canvas(newb);
	var p = new android.graphics.Paint();

	p.setARGB(100,0,0,0);
	canvasTemp.drawRect(0,0,1200,50,p);

	p.setTextSize(40);
	p.setTextAlign(android.graphics.Paint.Align.LEFT);
	p.setARGB(255,255,255,255);

	canvasTemp.drawText("pe("+px+","+py+","+pz+";"+yaw+"°)"+
		" p1("+p1x+","+p1y+","+p1z+")"+
		" p2("+p2x+","+p2y+","+p2z+")",5,40,p);

	var drawable = new android.graphics.drawable.BitmapDrawable(newb);
	xdt.setBackgroundDrawable(drawable);
	
	dxc(); // 保持持续刷新

}
}), 100);
}


function modTick()
{
	pe=Player.getEntity();
	px=parseInt(getPlayerX());
	py=parseInt(getPlayerY());
	pz=parseInt(getPlayerZ());
	
	yaw = parseInt(getYaw()%360);
	if(yaw<-179){yaw += 360;}
	if(yaw>181){yaw -= 360;}
	
	if(bodydes==1){
		var i,j,k;
		for(i=px-1;i<=px+1;i++){
		for(j=py-1;j<=py+1;j++){
		for(k=pz-1;k<=pz+1;k++){
			setTile(i,j,k,0);
		}}}
	}
}

function window(){
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get()
	ctx.runOnUiThread(new java.lang.Runnable({
	run: function(){
try{
	var layout = new android.widget.LinearLayout(ctx)
	var MP = new android.widget.Button(ctx)
	MP.setText("+");
	MP.setTextSize(20);
	MP.setOnClickListener(new android.view.View.OnClickListener(){
	onClick: function(v){
		openMenu();
	}
	})
	layout.addView(MP);
	openWindow = new android.widget.PopupWindow(layout, dip2px(ctx, 40), dip2px(ctx, 40));
	openWindow.showAtLocation(ctx.getWindow().getDecorView(), 
		android.view.Gravity.BOTTOM | android.view.Gravity.RIGHT, 5, 5); 

}
catch(err)
{
	clientMessage("Error"+err);
}
	}
	}));
}

// 根据手机的分辨率从 dp 的单位转成为 px 像素
function dip2px(ctx, dips){
	return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density)
}

function makeMenu(ctx,menu,layout)
{
	var mlayout=new android.widget.RelativeLayout(ctx);
	var svParams=new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.FILL_PARENT,android.widget.RelativeLayout.LayoutParams.FILL_PARENT);
	var scrollview=new android.widget.ScrollView(ctx);
	var pad = dip2px(ctx,2);
	scrollview.setPadding(pad,pad,pad,pad);
	scrollview.setLayoutParams(svParams);
	scrollview.addView(layout);
	mlayout.addView(scrollview);
	return mlayout
}

function dismissmenu()
{
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	ctx.runOnUiThread(new java.lang.Runnable({run: function(){
		if(btn!=null)btn.dismiss();btn=null
		if(openWindow!=null)openWindow.dismiss();openWindow=null
	}}));
}
