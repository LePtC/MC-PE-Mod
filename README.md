﻿Minecraft PE LePtC Mod
======

欢迎收看萌狸君之特大不务正业系列：Minecraft PE 版 javascript mod 项目

下面是萌狸君玩 PE 版 Minecraft 时写的一些好玩的 javascript mod ，目前只有文字稿和截图，以后有时间再录视频吧…



![example](https://github.com/LePtC/MC-PE-Mod/blob/master/skin.png)

（皮肤作者：[HelloSophiaLOLXD](http://mcpehub.com/skin/cute-fox-skin)）


模版参考 https://github.com/BeATz-UnKNoWN/ModPE_Scripts/wiki/ModPE-Script-Templates

教程参考 https://github.com/Connor4898/ModPE-Scripts/wiki/ModPE-Scripts-Functions-List#text-functions-1


## 狐狸物语（开发计划）

- 玩家首先要制作豆浆机，石头豆浆机可将 3 个种子变成 1 个豆浆，铁豆浆机 1 变 1，钻石豆浆机 1 变 3
- 到狐狸森林寻找野生的狐狸，用豆浆驯服，每个豆浆的驯服概率为 1/3
- 驯服的狐狸和狗一样会一只跟随玩家，无法命令其左下，下面会讲原因
- 每只狐狸都有一种怪物克星的属性，相应的怪物见到它会逃跑
- 但驯服的狐狸必须用相应怪物的掉落物才能喂养，例如僵尸属性的需喂腐肉，骷髅喂骨头，蜘蛛喂蜘蛛眼，苦力怕喂火药 (⊙_⊙)
- 狐狸喂养大后会变成狐狸宝石，可用来合成下面的火狐工具
- 狐狸屋，在这里可发现下面的狐狸套装


## 火狐套装

- 火狐帽：让玩家隐身，怪物不会主动攻击（灵感来自狸猫的传说）
- 火狐服：免疫所有负面 buff，如中毒，失明，凋零
- 火狐裤：免疫火焰伤害，在水下生成蒸气泡自由呼吸
- 火狐靴：跳跃提升，需配合火狐尾巴防摔落伤害
- 火狐尾巴：拿在手上时能限制降落速度，免疫摔落伤害（灵感来自任天堂的金狸猫）




## 火狐魔杖（2015.08.26）

火狐魔杖是一套工具（以前是一个工具，不过后来我发现把功能拆开更节省耐久…）

火狐剑：

- 攻击怪物：将怪物扔到上方 30 格然后摔落，
对抗摔耐火怪物（如岩浆怪）不能造成伤害
- 攻击动物：由于其附加火焰伤害，动物摔落后直接获得熟肉
（鸡免疫摔落但会在空中被烧死）
- 点击方块：相当于打火石

合成表：火把 + 金锭 + 木棍

![example](https://github.com/LePtC/MC-PE-Mod/blob/master/20150826213610.png)

（注：暂时用的是金剑的贴图，为了退出能保存物品，id 也是用金剑的 id，所以目前你合成金剑的话也能得到一样的效果…）

攻击怪物

![example](https://github.com/LePtC/MC-PE-Mod/blob/master/20150826172920.png)
![example](https://github.com/LePtC/MC-PE-Mod/blob/master/20150826172922.png)
![example](https://github.com/LePtC/MC-PE-Mod/blob/master/20150826172924.png)
![example](https://github.com/LePtC/MC-PE-Mod/blob/master/20150826172925.png)

火狐镐：

- 即刻炼矿：每挖一个矿物方块，直接获得 3 个锭，煤和钻石为获得 5 个
- 精准采集：除基岩和矿物外，对所有摸得到的方块均为精准采集
（液体方块无法采集）

合成表：火把 + 金锭 + 木棍

![example](https://github.com/LePtC/MC-PE-Mod/blob/master/20150826213615.png)

精准采集

![example](https://github.com/LePtC/MC-PE-Mod/blob/master/20150826214338.png)


火狐斧：

- 快速砍树：点树干一次，砍整棵树（自动检测树干的范围）
- 树叶变成随机数目的树苗，苹果，木炭（想精准采集的话用火狐镐去）





注：上述工具只做其相应的事情的话是不会掉耐久的


TODO：以后加入新的动物（狐狸），然后把金锭换成别的狐狸相关的资源，应该就可以做成一个完整的大 mod 了（← 又是 #就差个写代码的了#… ）



## 空间移动 Level5（2015.08.25）

- ↑↑ ：向前跳跃 25 格
- ↑ ：向前跳跃 10 格
- ↓ ：向后跳跃 10 格
（以上均为自动探测地面的高度）
- 瞬 ：瞬移到敌人背后

TODO：输入坐标来传送

跳跃前

![example](https://github.com/LePtC/MC-PE-Mod/blob/master/20150826000823.png)

跳跃后

![example](https://github.com/LePtC/MC-PE-Mod/blob/master/20150826000830.png)



## 矢量操作 Level5

- 跳 ：加跳跃提升 40 级的 buff
- 时刻免疫任何摔落伤害
- 开启允许生存飞行

TODO：伤害反射不造怎么做…

![example](https://github.com/LePtC/MC-PE-Mod/blob/master/20150826235654.png)




## 独立简版信息提示（2015.08.25）

![example](https://github.com/LePtC/MC-PE-Mod/blob/master/20150825232725.png)



## 独立简版指令

- item 获得物品
- time 设置 MC 时间
- hour 以二十四小时数设时间
- gamemode 设游戏模式 0 生存 1 创造
- goto 传送到坐标



## MC LePtC gui（2014.09.17）

TODO：建筑类 mod 以后再更新…

only tested on Android Minecraft PE 0.9.5

function: actively show the current coordinate and orientation, create a cuboid of blocks by two points with the material that you are holding.

- ① : set the block under your foot as point 1
- ② : set the block under your foot as point 2
- ■ : create cuboid from point 1 to point 2
- □ : create holo cuboid from point 1 to point 2
- ⊙ : create holo sphere, point 1 as center, point 2 is on its surface
- Y : water funnel, point 1 as center, point 2 as ended height
- × : delete all items in cuboid from point 1 to point 2
- #  : actively delete items within the 3×3×3 box around you
- → : teleport to the input coordinate
- ♥/♠ : switch between survival/creative mode

![example](https://github.com/LePtC/MC-PE-Mod/blob/master/2014-09-17-12-14-29.png)

notice: if point 1 to point 2 are too far, the game might crash
