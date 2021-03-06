# 理解红黑树

## 2-3-4树
### 2-3-4树的基本性质
2-3-4树也是一种有序的平衡树，它具有以下性质：

1. 所有节点最多存三个值，分别是从左到右大小依次排序。

2. 所有最底部叶子节点到最顶 root 的高度都是相等的。

3. 每个节点可容纳 2 到 4 个子节点。1个值的节点可以有两个子节点，2个值的节点可以有3个子节点，3个值的节点可以有4个子节点。也就是说一个值有两条边的子树，像二叉树一样，大小是按照从左到右排的。

   下图分别是 2-3-4 树的3种子树类型（这里的子树按边算的，有几条边就有几个子树）。

![2-3-4_1](/images/2-3-4_1.png)

### 2-3-4树的插入
前面说了 2-3-4树是一种平横树，叶子节点到 root 的高度都是相等的。这也就意味着每当插入一个新节点不能单纯的像 BST 那样将新的节点插入到树的底部，否则会破坏树的平衡。2-3-4树使用的平衡方法是合并。就是将2树变为3树，3树变4树。如下图：

![2-3-4_2](/images/2-3-4_2.png)

上面上正常情况下的插入，不会破坏树的平衡。但要插入的节点已经是一个4树了，这种方法就不管用了，因为4树是没法变为5树的。这时可以将 4 树往上挪一个分裂出两个 2 树的子节点，如果父节点已经是 4 树了，则继续往上挪动，直到 root 节点分裂，整颗树的高度会增加一层。下图是一个分裂增加树高度的方式：

![2-3-4_3](/images/2-3-4_3.png)

### 2-3-4树的删除
树结构的删除都很麻烦，2-3-4树 也不例外。2-3-4树 插入的时候需要保持树的平衡，删除的时候也需要保持树的平衡，树高度的调整需要从 root 合并来降低树的高度。2-3-4树 和 AVL 树一样会选择从最底部的叶子节点删除。如果找到的节点不是 leaf 节点会从当前节点的右边出发，找到最左边的 leaf 节点来替换，然后删除被替换后的 leaf 节点。如果 leaf 节点是 3 树或者或者4 树，直接删除即可。如果是2树的话就不能直接删除，需要对其进行旋转操作，从临近的同一层节点挪个节点过来补上。如果临近元素也是 2 树则从父节点挪一个节点下来。
下图是删除 3树 或 4 树的情况：

![2-3-4_4](/images/2-3-4_4.png)下图是一颗比较复杂的树，删除根节点会产生一系列很复杂的操作。

![2-3-4_5](/images/2-3-4_5.png)

  删除节点 40，找到右树最左边的 42 节点并替换掉。

![2-3-4_6](/images/2-3-4_6.png)



相邻节点也是 2 树，将43挪上来合并。

![2-3-4_7](/images/2-3-4_7.png)

树的高度不平衡，需要通过旋转从右子树拿到一个节点放上来。

![2-3-4_8](/images/2-3-4_8.png)

## 红黑树

红黑树是2-3-4树的一种抽象表示，在1978年 Guibas 和 Sedgewick 发明最初的红黑树。2008年 Sedgewick 对其进行了改进，并将此命名为 LLRBT(Left-leaning red–black tree 左倾红黑树)。LLRBT 相比1978年的红黑树要简单很多，实现的代码量也少很多。Sedgewick的一篇 [PPT](http://www.cs.princeton.edu/~rs/talks/LLRB/RedBlack.pdf) 对此有非常详细的介绍。 现在大部分工程中的红黑树都是基于 1978 发明的算法，本文介绍的是 LLRBT。

2-3-4 树转通过涂边的颜色转化成二叉树。它把 3 树转化成一条红边的左树或右树（本文讨论的是左倾红黑树，右倾的情况忽略），4 树转化成两条红边的二叉树，两条黑边的就是 2 树。如图所示：

![rbt1](/images/rbt1.png)

以下是一颗 2-3-4 树转换成红黑树的表示。

![rb2](/images/rb2.png)

### 红黑树的插入

红黑树的插入主要分两步，首先找到插入节点的合适的排序位置进行插入，然后通过旋转平衡树的深度。第一步很容易，使用二叉树递归搜索算法即可。第二部方式按照 2-3-4 树插入节点的方式来进行的。2-3-4树每插入一个节点会对树自底向上进行调整(合并或分裂)，红黑树也是对应于2-3-4树进行同样的操作，通过将3树合并为4树，4树分裂为两个2树。红黑树通过旋转和颜色反转来做这些操作。

![rb3](/images/rb3.png)

在 3 树中插入一个节点。

![rb4](/images/rb4.png)

在 3 树中间插入一个节点第二种情况。

![rb5](/images/rb5.png)

在 3 树中间插入一个节点第三种情况。

![rb6](/images/rb6.png)

从上面几种 3 树的插入情况可以看出，LLRBT 之所以使用左倾(left-leaning)是为了将3树限制为一种，以便更容易的将3树转为4树，来减少实现上复杂度。下图是4节点的分裂。  

如果插入的一个节点已经是 4 树，这时候做的法就是不断的向上分裂节点把 4 树分裂成两个 2 树的子树。由于 3 树的两条边都是红的，转化成 2 树后需要把两条边变成黑的，并把红边提上去。我们上文提到过，两条黑边的是 2 树，这里颜色翻转后就是两个 2 树。

下图就是4树分裂颜色翻转的例子。

![rb7](/images/rb7.png)

下面是两种当父节点是 2 树，4树分裂的两种情况。（当前节点时父节点的左子树）

![rb8](/images/rb8.png)

情况二（当前节点时父节点的右子树）

![rb9](/images/rb9.png)

当父节点是 3 树时，4 树分裂的就比较复杂了，一共会有 3 种情况。

情况一

![rb10](/images/rb10.png)

情况二：

![rb11](/images/rb11.png)

情况三：

![rb12](/images/rb12.png)

###  红黑树的删除

根据我们上面提到过的 2-3-4 树的删除方法，直接删除一个 3 树或 4 树不会影响树的平衡，删除一个 2 树节点会让整个树失去平衡。为了保证不删到 2 树，红黑树在节点搜索阶段就开始旋转调整树，以避免最后碰到 2 节点树。另外由于 LLRBT  树是没有 parent 节点的，在删除一个节点是并不能像 AVL 树那样在删除后再旋转。事先旋转为的就是将要删除节点的那个方向的树通过旋转将高度升高一层。  像二分查找树一样，删除操作会从右树的最左边找到一个节点进行替换并删除，所以关键点就需要实现一个  DeleteMin  方法。

Sedgwick 的 PPT 里面关于删除的方法讲不够详细，我们只能在这里根据上面提到的策略，以及最终实现的代码推测删除的原理。上面说了，为了最终找到的节点是 3 树或 4 树，在搜索阶段就开始对树进行调整，让搜索那个方向的树最终升高一层。

以下搜索路径往左走，调整左方向树的方式。

![rb13](/images/rb13.png)



以下搜索路径往右走，调整右向树的方式。

![rb14](/images/rb14.png)

以上两种操作方式最终会让树搜索的那个方向升高一层，我们可以看到最底层哪个节点的变始终会是红的（也就是始终会是 3 树）。DeleteMin 的做法就是不断的往左边进行递归，把左子树升高一层。在节点删除完后，最底层递归会重新往上走，这时候会再次调整树的平衡，把右树红色节点旋转到左边，两边都是左树的红色节点进行右旋。

以下是向上调整节点的过程。

![rb15](/images/rb15.png)

以上的的删除方式看起来非常慢，向上和向下递归都需要不断的调整，实际上它的确[非常慢](http://www.read.seas.harvard.edu/~kohler/notes/llrb.html)。另外经过颜色翻转向下递归的这个过程实际上是碰不到 4 树的，在红树向下传递的过程中最终的叶子会是颗 3 树，而不会是4树。Sedgewick 的 PPT 里面并没有说到这个问题。他的[另一篇论文](http://www.cs.princeton.edu/~rs/talks/LLRB/LLRB.pdf)才说到了这个问题。

[这里](https://github.com/leyafo/practice-algorithm/blob/master/DataStruct/rb_tree.c)是我用 C 语言实现的  LLRBT。
