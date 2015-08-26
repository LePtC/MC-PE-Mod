﻿Minecraft PE LePtC Mod
======

欢迎收看萌狸君之特大不务正业系列：Minecraft PE 版 javascript mod 项目。这个项目是萌狸君玩 PE 版 Minecraft 时自己写的一些好玩的 javascript mod ，目前只有文字稿和截图，以后有时间再录视频吧…



![example](https://github.com/LePtC/MC-PE-Mod/blob/master/skin.png)

（皮肤作者：[HelloSophiaLOLXD](http://mcpehub.com/skin/cute-fox-skin)）


模版参考 https://github.com/BeATz-UnKNoWN/ModPE_Scripts/wiki/ModPE-Script-Templates

教程参考 https://github.com/Connor4898/ModPE-Scripts/wiki/ModPE-Scripts-Functions-List#text-functions-1



## 火狐魔杖（2015.08.26）

火狐魔杖是一个全能型工具：

- 攻击怪物：将怪物扔到上方 30 格然后摔落，对于抗摔耐火怪物不能造成伤害。
- 攻击动物：由于附加火焰伤害，动物摔落后直接获得熟肉。
- 即刻炼矿：每挖一个矿物方块，直接获得 3 个锭。
- 精准采集：除基岩和矿物外，对所有方块均为精准采集。

TODO：以后可能还会加入更多功能。


合成表：火把 + 金锭 + 木棍

![example](https://github.com/LePtC/MC-PE-Mod/blob/master/20150826172509.png)

（注：暂时用的是金剑的贴图，为了退出能保存物品，id 也是用金剑的 id，所以如果你合成金剑的话也是一样的效果…）

攻击怪物

![example](https://github.com/LePtC/MC-PE-Mod/blob/master/20150826172920.png)
![example](https://github.com/LePtC/MC-PE-Mod/blob/master/20150826172922.png)
![example](https://github.com/LePtC/MC-PE-Mod/blob/master/20150826172924.png)
![example](https://github.com/LePtC/MC-PE-Mod/blob/master/20150826172925.png)

精准采集

![example](https://github.com/LePtC/MC-PE-Mod/blob/master/20150826173848.png)



## 空间移动 Level5（2015.08.25）

- ↑↑ ：向前跳跃 25 格
- ↑ ：向前跳跃 10 格
- ↓ ：向后跳跃 10 格
（以上均为自动探测地面的高度）
- 瞬 ：瞬移到敌人背后

TODO：输入坐标来传送。

跳跃前

![example](https://github.com/LePtC/MC-PE-Mod/blob/master/20150826000823.png)

跳跃后

![example](https://github.com/LePtC/MC-PE-Mod/blob/master/20150826000830.png)


## 独立简版信息提示（2015.08.25）

![example](https://github.com/LePtC/MC-PE-Mod/blob/master/20150825232725.png)

（生存飞行和固定血量也附在这个模版里面）


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
