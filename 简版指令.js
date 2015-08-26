

function procCmd(cmd)
{
  var Data = cmd.split(" ");

  // 给物品
  if(Data[0]=="item")
  {
    if(Level.getGameMode()==0)
    {
      if(Data.length==4) {
        i1=Data[1],i2=Data[2],i3=Data[3];
        addItemInventory(i1,i2,i3);
        clientMessage("获得物品 "+i1+":"+i3+" 共 "+i2+" 个");
      }
      if(Data.length==3) {
        i1=Data[1],i2=Data[2];
        addItemInventory(i1,i2);
        clientMessage("获得物品 "+i1+" 共 "+i2+" 个");
      }
      if(Data.length==2) {
        i1=Data[1];
        addItemInventory(i1,64);
        clientMessage("获得物品 "+i1+" 共 64 个");
      }
    }else{
      if(Data.length==2) {
        i1=Data[1]
        Entity.setCarriedItem(pe,i1,1)
        clientMessage("更改手中物品为 "+i1);
      }
      if(Data.length==3) {
        i1=Data[1]
        i2=Data[2]
        Entity.setCarriedItem(pe,i1,1,i2);
        clientMessage("更改手中物品为 "+i1+":"+i2);
      }
    }
  }

  if(Data[0]=="time") {
    if(Data.length==2) {
      Level.setTime(Data[1]);
    }
  }
  // 以 24 小时制设时间
  if(Data[0]=="hour") {
    if(Data.length==2) {
      Level.setTime(((Data[1]-7)%24)*1000);
    }
  }

  // 设游戏模式 0 生存 1 创造
  if(Data[0]=="gamemode") {
    if(Data.length==2) {
      if(Data[1]=="0") {
        Level.setGameMode(0);
      }
      if(Data[1]=="1") {
        Level.setGameMode(1);
      }
    }
  }

  // 传送，TODO: a 为自动
  if(Data[0]=="goto") {
    if(Data.length==4) {
      setPosition(pe,parseInt(Data[1]),parseInt(Data[2]),parseInt(Data[3]));
    }
  }

}

