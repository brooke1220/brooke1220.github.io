# vim 最佳实践
是的,重新安装你的 *vim*. 因为默认安装的 *vim* 是不带 *python* 和 *lua,ruby,perl* 这一系列脚本支持的.因此你需要加入这些脚本支持,然后重新编译安装.重新安装前请先备份好 *~/.vim* 目录中的东西与 *vimrc*.

### 源码编译安装:
以 *OSX* 系统为例,在 *vim* 源码目录的 *src* 目录下有一个 *configure* 文件.运行 *./configure --help* 可以看到一些编译选项,从中添加你想要的编译选项.在添加 *--enable-pythoninterp* 请一定要带上 *--with-python-config-dir* 这个选项,用来指向你的 *python config* 目录.在 *OSX* 系统中这个值一般是: */Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/config*. 另外请勿使用 *homebrew* 安装的 *python*, 编译过程中会找不到 *python frameworks*. 如果配置有问题可以查看 *src* 目录中 *auto/config.log* 来看详细错误.编译成功后会在 *src/macvim/build/release* 目录生成好 *dmg* 安装包.

### 从homebrew中安装:
*homebrew* 也是下载好源码然后编译安装的.在 *brew install macvim* 前,可以使用 *brew edit macvim* 来编辑一些编译选项.只需要在 *args = %w[]* 这个中括号里面添加 *configure* 中的编译选项. 编译中产生的错误日志可以在 *~/Library/Logs/Homebrew/macvim* 目录下查看.

### 重新安装所有的插件
在没有包管理器之前 *vim* 的插件是个很不科学的东西.一个插件每次都需要复制 *.vim* 插件文件与 *doc* 文件到特定的目录中.安装非常麻烦,容易出错.并且 *vim* 内部并没有提供后续的插件升级机制.因此后续升级你得自己先去了解插件有没有升级,然后再重新复制文件进行插件安装.这完全是恶心人,因此,用这种方式安装的插件大部分人是不会想着去升级插件的.
还好有了 [Vundle](https://github.com/gmarik/vundle) 这么个东西.它是基于 *github repositories* 来安装与更新插件的.只需要在 *vimrc* 配置好 *Bundle* 项就可以搞定插件的安装与更新了.但请注意好 *Bundle* 的名字,错了的话就会找不到 *github repositories* .另外[这里](http://vim-scripts.org/vim/scripts.html)可以搜索到 *vim* 几乎所有的插件.
安装完后,将先前备份好的 *.vim* 文件夹下的 *color* 与 *syntax* 复制到新的 *.vim* 文件夹中去.因为这两个文件夹下的东西 *Bundle* 并未做管理,也不需要管理.

## 你不应该使用的东西
### 自动补全
相信我, *vim* 只是一个编辑器,自动补全这个玩意很难做到 *IDE* 的那种效果.没有自动补全最开始可能会不习惯,写代码速度会慢一点.但习惯了会有很多好处.首先,你的代码命令会非常的规范,不会出现单词与大小写错误的问题.其次不使用自动补全你会对代码理解更好,更深刻.当然,你若要写 *Objective-C* 这种的代码,你还是乖乖的用上 *IDE* 去自动补全吧.不然这是不人道的.

### 别试图将你的 vim 打造成IDE
网上有很多 "将你的 vim 打造成 IDE" 一类的文章,别去看这种文章并且跟着他们去安装一些不解决'你碰到的问题'的插件.既然你都使用编辑器了,就别试图将改装成那种 *IDE* 的环境.编辑有编辑器的用法,用得好会比 *IDE* 效率更高.

### 不要去使用别人的配置文件
网上有很多公开的 *vimrc* 文件,有很多高手的配置文件确实是神乎奇技.但那是别人的配置,别人有别人习惯与癖好.配置文件这个东西还是按你自己个人化的习惯来比较好.尤其是一些配置文件里改了快捷键后,你很难一下子去找到并适应这个快捷键.
另外,也不要去盲目的使用别人推荐的插件.大部分插件是解决特定存在的问题而产生的.你如果安装好一个插件,这个插件你并没有经常拿它去解决'你碰到的问题'.这个插件迟早有一天会被你遗忘在角落里.而且一些你不经常使用的插件的命令选项会给你造成不必要的记忆负担.

## 一些你应该知道的高级tips
### tag 跳转与缓冲区跳转
*vim* 默认是集成了 *ctags* 的接口,使用 *ctags* 产生 *tag* 文件后. **ctrl+[** 可跳转到函数的定义与声明.使用 **ctrl+o** 可以跳回上一个缓冲区, **ctrl+i** 可以跳到下一个缓冲区.这三个快捷键基本上可以满足你到处跳来跳去了.

### mark
上面的跳转实际上功能比较弱,属于盲跳. *vim* 自带的 *mark* 可以让你有目的性的跳转.在命令模式下,使用 **m**再加一个命名的字母标记就增加了一个类似书签的东西.添加好后,可以是用 **'(单引号)**加上你个刚刚命令的标记就可以跳到指定的地方去了,并且这种跳转还可以跨文件的.比如:使用 **ma** 添加一个标记, 然后使用 **'a** 就可以跳到刚才的那个标记.另外使用命令 **:marks** 可以看到你设置的标记.其中 *0~9* 是最近编辑的文件.

### register
*vim* 的 *register* 功能类似于 *mark* 但他记录了你最近删除与复制的文字.你可以将一段文字复制到特定 *register* 中去.然后再从 *register* 中复制出来.
使用 *visual* 模式选择好一段文字,在命令模式下使用 **"ay** 便将这段文字复制到了名字为 **a** 的 *register* 中.需要使用 **a** 中的文字,来使用 **"ap** 命令即可.使用 **:reg** 命令可以看到所有的 *register*, 其中 *0~9* 显示了最近删除与复制的一些文字.

### macro
*vim* 的 *macro* 是用来录制一段动作,然后保存到命名的 *macro* 中去的. 使用方法为:在命令模式下使用 **qa**命令(**a**代表 *marcro* 名,可以是其他数字与字母).这时候状态栏的左边上会显示 **recording**, 然后做一些操作,做完后在命令模式下使用 **q** 命令退出录制.然后就可以使用 **@a** 将这段 *macro* '播放'出来. 如果需要连续做10次,使用 **10@a**即可. 
