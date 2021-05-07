# 为什么 PAAS (paltform as a service) 是伪需求？
试想一下你的开发团队需要一款 MQ(message queue) 服务，你是去买现成的云计算厂商的 MQ 服务还是自己买个 VPS(Virtual Private Server) 去安装一个 MQ 的服务呢？如果是买一个 MQ 的服务你如何确定这个 MQ 的服务是你现在团队需要的 MQ 服务？你如何确保从云计算厂家那里买过来的 MQ 服务是可靠的？    
如果你选择自己搭建一个 MQ 服务，在 2019 年你还会选择从头安装一个 MQ 服务吗？你会选用 docker 还是 k8s 去 setup 你的服务吗？    
你的开发环境，运行环境，测试环境，生产环境各自都有很多不一样的地方，如果和快速的把这几个测试环境 setup 起来？你是选用现有云计算提供的 paas 云服务，还是自己在公司内网的服务器搭建一套 k8s,线上再搭建一套。  
如果每个团队的成员都需要一个开发环境怎么办？怎么快速的 setup 起来？  
如果你购买的 paas 服务出问题了，你要怎么解决？是直接找云计算厂商解决起来比较靠谱，还是自己了解清楚每一个细节比较靠谱？关键的业务涉及到计费，公司收入，你会交给别人去管理吗？你的公司增长的速度和技术支出的速度以同样的速度增加，你是自己培养一支技术团队，还是把命根子交到别人手里？

以上问题就是我们做一个互联网服务经常遇到的问题。在快和可靠之间我们必须要有所取舍。对于技术的选型关键不在技术，而是在业务。当你的业务增长过快或者过慢的时候用现成的 paas 服务无论如何都不是好的选择。如果你的业务复杂，研发的周期长，自己做一套简化部署和运维的 k8s 是非常有必要的。

这就是现在的 paas 服务面临的尴尬境地，它的运维成本比 iaas 要低，扩容成本比 iaas 的服务要高，比 k8s 要更复杂。在关键的业务上（数据库，message queue） 你如果不吃透它，难道要把自己的命根子（收入）交到别人那里去？