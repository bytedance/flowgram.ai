# IOC

## 为什么需要 IOC

:::warning 几个概念

* 控制反转： Inversion of Control， 是面向对象中的一种设计原则，可以用来降低代码模块之间的耦合度，其中最常见的方式叫做依赖注入（Dependency Injection，简称DI）
* 领域逻辑：Domain Logic，也可以叫 业务逻辑（Business Logic），这些业务逻辑与特定的产品功能相关
* 面向切面编程：AOP （Aspect-Oriented Programming），最核心的设计原则是将软件系统拆分为公用逻辑 (横切，有贯穿的意味) 和 领域逻辑 （纵切）的多个个方面 (Aspect)，横切部分可以被所有的 纵切 部分 “按需消费”

:::

回答这个问题之前先了解切面编程，切面编程目的是将领域逻辑的粒度拆的更细，横切部分可被纵切 “按需消费” ，横切和纵切的连接也叫 织入 (Weaving)，而 IOC 就是扮演 Weaving 注入到纵切的角色

![切面编程](@/public/weaving.png)

理想的切面编程

```ts
- myAppliation 提供业务逻辑
  - service 特定的业务逻辑服务
     - customDomainLogicService
  - contributionImplement 钩子的注册实例化
    - MyApplicationContributionImpl
  - component 业务组件

- core 提供通用逻辑
  - model 通用模型
  - contribution 钩子接口
     - LifecycleContribution 应用的生命周期
     - CommandContribution
  - service 公用的service的服务
     - CommandService
     - ClipboardService
  - component 公用的组件
```

```ts
// IOC 的注入
@injectable()
export class CustomDomainLogicService {
@inject(FlowContextService) protected flowContextService: FlowContextService;
@inject(CommandService) protected commandService: CommandService;
@inject(SelectionService) protected selectionService: SelectionService;
}
// IOC 的接口声明
interface LifecycleContribution {
 onInit(): void
 onStart(): void
 onDispose(): void
}
// IOC 的接口实现
@injectable()
export class MyApplicationContributionImpl implements LifecycleContribution {
  onStart(): void {
    // 特定的业务逻辑代码
  }
}

// 手动挂在到生命周期钩子
bind(LifecycleContribution).toService(MyApplicationContributionImpl)
```

:::warning IOC是切面编程的一种手段，引入后，底层模块可以以接口形式暴露给外部注册，带来的好处：

* 实现微内核 + 插件化的设计，实现插件的可插拔按需消费
* 可以让包拆得更干净，实现 feature 式的拆包

:::
