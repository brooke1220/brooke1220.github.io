# 前后端分离实践

Rails 可以很快的解决各类繁琐的业务逻辑，这都是基于 ruby 这门语言编程效率高。开发高效随之带来的代价就是运行效率低，效率问题只会在大规模用户量才会突显（参见 twitter）。在做产品的过程中解决复杂业务逻辑的效率取决于程序员对业务的理解程度，足够透彻的理解自然就会浮现简单的实现方案。从这个角度来说，业务逻辑与编程语言联系没有那么紧密，处理业务逻辑应该更多的去设计架构。

在 Rails 火爆的的年代，刚好是前端发展起步的年代。那个时候前端几乎只有 jQuery，那时做网页最快的就是使用 Rails 了。Rails 应该是那时前后端结合得最好的 Framework 了。Rails 的特点就是弱化前端，让后端的程序员顺带把前端的事情也干了，由此就产生 Full Stack Programmer 这样一个称谓。这几年 web 前端发展突飞猛进，这得益于 Javascript 的灵活。Rails 在后端做肯定是无法赶上 Javascript 的灵活性。如果现在依然还坚持使用 Rails 这种重后端的架构，肯定是无法获取到前端这几年迸发出巨大的生产力。

前后端分离可以让架构变得更加灵活，后端提供数据库端访问的 API 实现上会变得很简单，前端的程序员可以更加专注于界面效果的实现。现在手机端的 HTML5 是天然的前后端分离，这也更加促使项目不得不去做分离前后端。我们最开始分离前后端还是带着以前的思维去做的，在不用考虑数据库操作的情况下，我们选用了 Sinatra 做为后端提供。最开始我们还着把整个网站的 js 压缩打包到一个文件里面，我们甚至还把每一个 ajax 放到 Sinatra 里面单独处理。后来的事实证明这些思维给我们带来了不少的麻烦。

我们选用了 Vue 做为前端库，一开始用 Vue 的时候没有考虑到为每个页面单独加载一份 js，直到出现问题了才不得不去研究它的打包渲染机制。Vue 官方推荐的是 webpack 做为压缩打包的工具。在没有深入接触前端的情况下 webpack 对于我们来说明显是过于复杂了。所以我当时采用了 requirejs 这个几年前没那么激进的方案。当初不用 webpack 还有一个原因是我认为我们会需要在后端处理很多复杂的请求，用 webpack 我们就不得不去用 nodejs。后来的事实证明 Vue 表现非常好，我们的业务逻辑全部放到了前端去做，后端的作用只剩下 session 的管理和 API 的转发。 

分离后端提供 API 的程序员负担大大的减轻了，架构变得非常灵活了。在设计好接口的情况下，如果有效率问题，可以非常迅速的替换一种高效的编程语言去实现。能迅速替换最主要的原因是后端变简单了，任何一个稍微有经验的程序员都能维护好 API。而前端的程序员也会轻松不少，新加入的前端程序员可以完全不需要知道后端的实现就能快速提供生产力。
