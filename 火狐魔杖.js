// LePtC 的 Minecraft PE 火狐魔杖 mod
// https://github.com/LePtC/MC-PE-Mod

// 模版参考 https://github.com/BeATz-UnKNoWN/ModPE_Scripts/wiki/ModPE-Script-Templates
// 教程参考 https://github.com/Connor4898/ModPE-Scripts/wiki/ModPE-Scripts-Functions-List#text-functions-1


function newLevel() {
  print("火狐魔杖 mod 已加载");

  // 暂时用金剑的贴图…
  ModPE.setItem(283,"sword",3,"火狐剑");

  // 暂时不知如何防止重复定义
  Item.addShapedRecipe(283, 1, 0, [
    " t ",
    " g ",
    " s "
    ],
  ["t", 50, 0, "g", 266, 0, "s", 280, 0]);

  ModPE.setItem(285,"pickaxe",3,"火狐镐");

  // 暂时不知如何防止重复定义
  Item.addShapedRecipe(285, 1, 0, [
    "gtg",
    " s ",
    " s "
    ],
  ["t", 50, 0, "g", 266, 0, "s", 280, 0]);

}


function attackHook(attacker,victim) {
  if(attacker==Player.getEntity() && getCarriedItem()==283) {

    // Entity.setHealth(victim,6); // 血量置为 3

    Entity.setPosition(victim, // 将受害者扔上 30 格然后摔落
      Entity.getX(victim),Entity.getY(victim)+30,Entity.getZ(victim));

    Entity.setFireTicks(victim,5); // 杀动物的话还可以顺便把肉烧熟
  }
}


function useItem(x, y, z, itemId, blockId, side) {
// 基岩就别采了…
if(itemId==285 && blockId != 7) {

    Level.setTile(x,y,z,0);
    Level.playSound(getPlayerX(),getPlayerY(),getPlayerZ(),"step.cloth",30,25);
    // 挖矿物则瞬间获得 3 个锭
    switch(blockId) {
      case 14: // 金
        addItemInventory(266,3);
        break;
      case 15: // 铁
        addItemInventory(265,3);
        break;
      case 16: // 煤
        addItemInventory(263,5);
        break;
      case 21: // 青金石 351:4 好像不支持…
        addItemInventory(22,1);
        break;
      case 56: // 钻石 要比正常挖来的多才行
        addItemInventory(264,5);
        break;
      case 73: // 红石
        addItemInventory(331,5);
        break;
      case 74: // 亮红石
        addItemInventory(331,5);
        break;
      case 129: // 绿宝石
        addItemInventory(133,5);
        break;
    // 除基岩和矿物外，对所有方块均为精准采集
      default:
        addItemInventory(blockId,1);
    }
}}


