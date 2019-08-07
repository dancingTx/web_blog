# 为什么会出现React Hooks?

![](./images/why-react-hooks.jpg)

> 当你要学习一个新事物的时候，你应该做的第一件事就是问自己两个问题

- 为什么会存在这个东西？
- 这东西能解决什么问题？

如果你从来没有对这两个问题都给出一个令人信服的答案，那么当你深入到具体问题时，你就没有足够的坚实的基础。关于 React Hooks，这些问题值得令人思考。当 Hooks 发布时，React 是 JavaScript 生态系统中最流行的、最受欢迎的前端框架。尽管 React 已经受到高度赞扬，React 团队仍然认为有必要构建和发布 Hooks。在不同的 Medium 帖子和博客文章中纷纷议论了 1.尽管受到高度赞扬和受欢迎，React 团队决定花费宝贵的的资源构建和发布 Hooks 是为了什么？以及 2.它的好处。

为了更好的理解这两个问题的答案，我们首先需要更深入的了解我们过去是如何编写 React 应用程序的。

## createClass

如果你已经使用 React 足够久，你就会记得 React.createClassAPI。这是我们最初创建 React 组件的方式。用来描述组件的所有信息都将作为对象传递给`createClass`。

```react
const ReposGrid = React.createClass({
    getInitialState() {
        return {
            repos:[],
            loading:true
        }
    },
    componentDidMount() {
        this.updateRepos(this.props.id)
    },
    componentDidUpdate(prevProps) {
        if(prevProps.id !== this.props.id) {
            this.updateRepos(this.props.id)
        }
    },
    updateRepos(id) {
        this.setState({loading:true})
        
        fetchRepos(id)
        .then(repos=>this.setState({
            repos,
            loading: false
        }))
    },
    render() {
        const {loading, repos} = this.state
        
        if(loading) {
            return <Loading />
        }
        return (
        <ul>
        {
        	repos.map(({name,handle,stars,url})=>(
            	<li key={name}>
                	<ul>
                    	<li><a href={url}>{name}</a></li>
                        <li>@{handle}</li>
                        <li>{stars} stars</li>
                    </ul>
                </li>
            ))            
        }
        </ul>
        )
    }
})
```

`createClass`是创建 React 组件的一种简单而又有效的方法。React 最初使用`createClassAPI`的原因是，当时 JavaScript 没有内置的类系统。当然，这最终改变了。在 ES6 中，JavaScript 引入了`class` 关键字，并以原生的方式在 JavaScript 中创建类。这迫使 React 处于一种进退两难的地步。要么继续使用`createClass`，对抗 JavaScript 的发展，要么遵循ECMAScript 标准，拥抱类。历史表明，他们选择了后者。

## React.Component

> 我们发现我们并不是想要去设计一个类系统，我们仅仅是想要以惯用的 JavaScript 方法来创建类。—— React v0.13.0 Release

React v0.13.0 中引入了React.Component API，它允许我们从(现在)原生 JavaScript 类中创建 React 组件。这是一场巨大的胜利，因为它更好的与 ECMAScript 标准结合在了一起。

```react
class ReposGrid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            repos: [],
            loading: true
        }
        this.updateRepos = this.updateRepos.bind(this)
    }
	componentDidMount() {
        this.updateRepos(this.props.id)
    }
    componentDidUpdate(prevProps) {
        if(prevProps.id !== this.props.id) {
            this.updateRepos(this.props.id)
        }
    }
    updateRepos(id) {
        this.setState({loading: true})
        fetchRepos(id)
        .then(repos=> this.setState({
            loading: false,
            repos
        }))
    }
    render() {
        const {loading,repos} = this.state
       	if(loading) {
            return <Loading />
        }
        return (
    	<ul>
    		{
            	repos.map(({name,handle,stars,url})=>(
                	<li key={namem}>
                    	<ul>
                        	<li><a href={url}>{name}</a></li>
                            <li>@{handle}</li>
                            <li>{stars} stars</li>
                        </ul>
                    </li>
                ))
        	}
    	</ul>
    )
    }
}
```

尽管朝着正确的方向迈出了明确的一步，但还是要做出反应。React.Component 不是没有它的权衡。

## 构造函数

使用类组件，您可以在`constructor`方法内部将组件的状态初始化为实例(this)上的 state 属性。但是，根据 ECMAScript 规范，如果要扩展子类(这里指的是 React.Component)，必须先调用`super`属性，然后才能使用 this。具体来说，当使用 React 时，我们也需记得将`props`属性传递给`super`。

```react
constructor (props) {
    super(props) // 🤮

    ...
  }
```

## 自动绑定

当使用`createClass`时，React 会自动将所有方法绑定在组件的实例上，也就是 `this`。当有了 React.Component 后，情况就不同了。很快，各地的 React 开发人员都意识到了他们不知道`this`关键字是如何工作的。我们不得不记住类中的`constructor`中的`bind`方法。如果你不这样做，则会出现经常出现的错误 __Cannot read property `setState` of undefined__

```react
  constructor (props) {
    ...

    this.updateRepos = this.updateRepos.bind(this) // 😭
  }
```

现在我大概能猜到你们在想什么。首先，这些问题相当肤浅。当然，调用 super(props) 并记住`bind`方法是相当烦人的。但这里其实并没有什么根本错误。其次，这些问题并不像 JavaScript 类的设计方式那样严重。当然这两点都是毋庸置疑的。然而，对于我们开发人员来说，即便是再浅显的问题，当你一天要处理 20 多次甚至更多的时候，也会变得非常厌恶。幸运的是，在从 createClass 切换到 React.Component 后不久，类字段出台了。

## 类字段

类字段允许我们直接将实例属性作为属性添加到类上，而无需使用`constructor`。这对我们来说，意味着，使用类字段，我们之前所讨论的两个`浅显`的问题都将迎刃而解。我们不再需要使用`constructor`来设置组件的初始状态，也不再需要在`constructor`中使用`bind`函数，因为我们完全可以为方法使用箭头函数。

```react
class ReposGrid extends React.Component {
  state = {
    repos: [],
    loading: true
  }
  componentDidMount () {
    this.updateRepos(this.props.id)
  }
  componentDidUpdate (prevProps) {
    if (prevProps.id !== this.props.id) {
      this.updateRepos(this.props.id)
    }
  }
  updateRepos = (id) => {
    this.setState({ loading: true })

    fetchRepos(id)
      .then((repos) => this.setState({
        repos,
        loading: false
      }))
  }
  render() {
    const { loading, repos } = this.state

    if (loading === true) {
      return <Loading />
    }

    return (
      <ul>
        {repos.map(({ name, handle, stars, url }) => (
          <li key={name}>
            <ul>
              <li><a href={url}>{name}</a></li>
              <li>@{handle}</li>
              <li>{stars} stars</li>
            </ul>
          </li>
        ))}
      </ul>
    )
  }
}
```

所有问题都解决了，是吗？不幸的是，并没有。从`createClass`到 React.Component 的迁移过程中，

组件带有一些权衡，但正如我们所看到的，类字段确实解决了一些问题。不幸的是，在我们所见过的所有之前的版本中，仍然存在着一些更深刻(但很少提及)的问题。

React 的整体理念时，通过将应用程序分解为可以组合在一起的独立组件，可以更好地管理应用程序的复杂性。正是这种组件模型使得 React 如此优雅，也使得 React 如此的独一无二。然而，问题不在于组件模型，而是如何实现组件模型。

## 重复逻辑

过去，我们构建的 React 组件的方式与组件的声明周期是耦合的。这种划分自然而然的迫使我们在整个组件中散布着相关逻辑。在我们的所使用的 ReposGrid 组件示例中，我们可以很清楚的了解到这一点。我们需要三个单独的方法`componentDidMount、componentDidUpdate和updateRepos`来完成相同的任务——使`repos`与任何 `props.id`保持同步。

```react
componentDidMount () {
    this.updateRepos(this.props.id)
  }
  componentDidUpdate (prevProps) {
    if (prevProps.id !== this.props.id) {
      this.updateRepos(this.props.id)
    }
  }
  updateRepos = (id) => {
    this.setState({ loading: true })

    fetchRepos(id)
      .then((repos) => this.setState({
        repos,
        loading: false
      }))
  }
```

为了解决这个问题，我们需要一个全新的方式来处理 React 组件中的副作用。

## 共享非可视逻辑

当你在 React 中考虑构图时，你很有可能会考虑 UI 构图。这是很正常的，因为这正是 React 所擅长的。

```react
view = fn(state)
```

实际上，构建一个应用程序不仅仅是 UI 层面的。需要组合和非可视逻辑的地方并不少见。但是，因为 React 将 UI 与组件耦合起来，所以这可能会比较困难。到目前为止，React 并没有给出一个很好的解决方案。

继续看我们的示例，假设我们需要另一个同样需要`repos` 状态的组件。现在，该状态和处理它的逻辑位于 ReposGrid 组件中。我们该如何做呢？最简单的方式就是复制所有用于获取和处理`repos`的逻辑，并将其粘贴到新组件中。听起来还不错，但它并不是一个好的方案。一个更聪明的方法是创建一个高阶组件，它封装了所有的共享逻辑，并将`loading`和`repos`作为`props`传递给任何需要它的组件。

```react
function withRepos (Component) {
  return class WithRepos extends React.Component {
    state = {
      repos: [],
      loading: true
    }
    componentDidMount () {
      this.updateRepos(this.props.id)
    }
    componentDidUpdate (prevProps) {
      if (prevProps.id !== this.props.id) {
        this.updateRepos(this.props.id)
      }
    }
    updateRepos = (id) => {
      this.setState({ loading: true })

      fetchRepos(id)
        .then((repos) => this.setState({
          repos,
          loading: false
        }))
    }
    render () {
      return (
        <Component
          {...this.props}
          {...this.state}
        />
      )
    }
  }
}
```

当应用程序中的任何组件需要`repos`(或加载)时，我们可以将其封装在 withRepos HOC 中。

```react
// ReposGrid.js
function ReposGrid ({ loading, repos }) {
  ...
}

export default withRepos(ReposGrid)
```

```react
// Profile.js
function Profile ({ loading, repos }) {
  ...
}

export default withRepos(Profile)
```

这是可行的，而且它加上 Render Props 一直是最佳的共享非可视逻辑的解决方案。然而，这两种模式都有一些缺点。

首先，如果你不够熟悉它们(即使你熟悉)，你会有点发懵。使用 withRepos  HOC ，我们有一个函数，它以最终呈现的组件作为第一个参数，但返回一个新的类组件，这就是逻辑所在。一个多么复杂的过程啊。接下来，如果我们调用多个 HOC，又会怎么样呢？你可以想象，它很快就失控了。

```react
export default withHover(
  withTheme(
    withAuth(
      withRepos(Profile)
    )
  )
)
```

比这更糟的是最终得到的结果。HOCs(和类似的模式)迫使我们必须重新构造和包装组件。这最终可能导致`包装地狱`，这又一次使它更难遵循。

```react
<WithHover>
  <WithTheme hovering={false}>
    <WithAuth hovering={false} theme='dark'>
      <WithRepos hovering={false} theme='dark' authed={true}>
        <Profile 
          id='JavaScript'
          loading={true} 
          repos={[]}
          authed={true}
          theme='dark'
          hovering={false}
        />
      </WithRepos>
    </WithAuth>
  <WithTheme>
</WithHover>
```

## 现状

这就是我们所处的现状。

- React 很受欢迎。
- 我们为 React 组件使用类，因为这在当时很有意义。
- 调用`super(props)`很烦人。
- 没人知道`this`是如何工作的。
- ok，冷静一下。我知道你明白`this`是如何工作的，但对于有些人来说，这是一个不必要的障碍。
- 按照生命周期方法组织组件迫使我们在组件中散布着相关的逻辑。
- React 没有用于共享非可视逻辑的良好原语。

现在，我们需要一个新的组件 API 来解决所有这些问题，同时保持简单、可组合、灵活和可扩展。这个任务很艰巨，但是 React 团队还是成功了。

## React Hooks

从 React v0.14.0 开始，我们有两种方式来创建组件——类和函数。不同之处在于，如果我们的组件有状态或者需要使用生命周期方法的话，我们就必须使用类。否则，如果它只是接受`props`并呈现一些 UI，我们就可以使用函数。

那么，如果不是这样呢？如果我们不使用类，而是只使用函数，又该怎么办呢？

> 有时候，优雅的实现只是一个函数。不是一个方法，不是一个类。不是一个框架。只是一个函数。—— John Carmack. Oculus VR 首席技术官

当然，我们需要找到一种方法来添加功能组件，使其拥有状态和生命周期方法的能力，但是假设我们这样做了，我们又能得到什么好处呢？

我们不再需要调用`super(props)`，不再需要担心绑定方法或`this`关键字，也不再需要使用类字段。本质上，我们之前讨论的所有`表面`问题都会解决。

```react
(ノಥ,_｣ಥ)ノ彡 React.Component 🗑

function ヾ(Ő‿Ő✿)
```

好吧，现在，更棘手的问题摆在面前。

- 状态
- 生命周期函数
- 共享非可视逻辑

### 状态

由于我们不再使用类或`this`，我们需要一种新的方法来添加和管理组件的内部状态。React v16.8.0 通过 useState 为我们提供了这种新方法。

> useState 是我们在本课程中看到的众多 Hooks 中的第一个。让这篇文章的其余部分做一个简单的介绍。在之后的章节中，我们将更加深入的研究 useState 和其他的 Hooks。

useState 只接受一个参数，即状态的初始值。它返回的是一个数组，其中第一项是状态块(也就是更改后的状态值，类似于在 this.state中定义的状态值)，第二项是更新改状态的函数(用来改变状态，类似于this.setState())。

```react
const loadingTuple = React.useState(true)
const loading = loadingTuple[0]
const setLoading = loadingTuple[1]

...

loading // true
setLoading(false)
loading // false
```

正如我们所看到的，单独获取数组中的每一项并不是最佳的开发人员体验。这是为了演示 useState 如何返回数组。通常，我们会采用数组析构的方式在一行中获取值。

```react
// const loadingTuple = React.useState(true)
// const loading = loadingTuple[0]
// const setLoading = loadingTuple[1]

const [ loading, setLoading ] = React.useState(true) // 👌
```

现在，让我们使用新学习的有关于 useState 钩子的知识来更新 ReposGrid 组件。

```react
function ReposGrid ({ id }) {
  const [ repos, setRepos ] = React.useState([])
  const [ loading, setLoading ] = React.useState(true)

  if (loading === true) {
    return <Loading />
  }

  return (
    <ul>
      {repos.map(({ name, handle, stars, url }) => (
        <li key={name}>
          <ul>
            <li><a href={url}>{name}</a></li>
            <li>@{handle}</li>
            <li>{stars} stars</li>
          </ul>
        </li>
      ))}
    </ul>
  )
}
```

- 状态 ✅
- 生命周期函数
- 共享非可视逻辑

### 生命周期函数

现在，有些事情可能会让你感到难过(或开心?)。在使用 React Hooks 时，我希望你能够将你所知道的关于传统 React 生命周期函数以及这种思维方式的所有相关知识都忘掉。我们已经看到了考虑组件生命周期的问题——__这个【生命周期】划分自然而然的迫使我们在组件中散布着相关的逻辑。__相反，考虑同步。

思考一下你曾经使用过的生命周期函数。无论是设置组件的初始状态、获取数据、更新DOM，还是做任何事情——最终目标总是同步。通常，同步 React land(API 请求、DOM等)外部的内容和 React land(组件状态)内部的内容，反之亦然。

当我们考虑同步而不是生命周期函数时，它允许我们将相关的逻辑片段组合在一起。为此，React 提供了另一个钩子——useEffect。

定义后，useEffect 允许您在函数组件中执行副作用。它接受两个参数，一个函数和一个可选数组。函数定义要运行哪些副作用，(可选)数组定义何时__重新同步(或重新运行)__结果。

注：该函数会在组件加载期间首次运行，随后通过监听可选数组中传入的参数变化，更新函数以重新同步。

```react
React.useEffect(() => {
  document.title = `Hello, ${username}`
}, [username])
```

在上面的代码中，传递给 useEffect 的函数将在用户名发生改变时运行。因此，将文档的标题与`Hello、${username}`解析为内容同步。

现在，我们如何使用代码中的 useEffect 钩子来同步`repos`和 fetchRepos API 请求？

```react
function ReposGrid ({ id }) {
  const [ repos, setRepos ] = React.useState([])
  const [ loading, setLoading ] = React.useState(true)

  React.useEffect(() => {
    setLoading(true)

    fetchRepos(id)
      .then((repos) => {
        setRepos(repos)
        setLoading(false)
      })
  }, [id])

  if (loading === true) {
    return <Loading />
  }

  return (
    <ul>
      {repos.map(({ name, handle, stars, url }) => (
        <li key={name}>
          <ul>
            <li><a href={url}>{name}</a></li>
            <li>@{handle}</li>
            <li>{stars} stars</li>
          </ul>
        </li>
      ))}
    </ul>
  )
}
```

很顺畅，不是吗？我们已经成功的摆脱了 React.Component、`constructor`、`super`，更重要的是，我们不再在组件中散布(和复制)`effect`逻辑了。

- 状态✅
- 生命周期函数✅
- 共享非可视逻辑

### 共享非可视逻辑

前面我们提到过，React 对共享非可视逻辑没有很好的解决方案的原因是__React 将 UI 和组件耦合在了一起__。这导致了像高阶组件或 Render Props 这样过于复杂的模式。现在你一定猜到了，Hooks 对此也有了一个答案。然而，这可能跟你想象中的有些出入。并没有专门用于共享非可视逻辑的内置钩子，相反，你可以创建与任何 UI 解耦的自定义钩子。

通过创建我们自己自定义的 useRepos 钩子，我们可以看到这一点。这个钩子将接受我们想要获取的 Repos 的`id`，并(保留类似的API)返回一个数组，其中第一项为加载状态，第二项为 Repos 状态。

```react
function useRepos (id) {
  const [ repos, setRepos ] = React.useState([])
  const [ loading, setLoading ] = React.useState(true)

  React.useEffect(() => {
    setLoading(true)

    fetchRepos(id)
      .then((repos) => {
        setRepos(repos)
        setLoading(false)
      })
  }, [id])

  return [ loading, repos ]
}
```

好消息是任何与获取`repos`相关的逻辑都可以在这个自定义钩子中抽象。现在，不管我们在哪个组件中，即使它是非可视逻辑，每当我们需要有关`repos`的数据时，我们都可以使用 useRepos 自定义钩子。

```react
function ReposGrid ({ id }) {
  const [ loading, repos ] = useRepos(id)

  ...
}
```

```react
function Profile ({ user }) {
  const [ loading, repos ] = useRepos(user.id)

  ...
}
```

- 状态✅
- 生命周期函数✅
- 共享非可视逻辑✅

## 总结

Hooks 的推广理念是你可以在功能组件中使用状态。实际上，Hooks 的作用远不止于此。更多的是关于改进代码重用、组合和更好的默认设置。我们还有很多关于 Hooks 的知识需要学习，但是现在你已经知道了它们存在的原因，我们就有了一个坚实的基础。

**本文根据译者理解翻译，如有需要，请阅读原文**

## 原文链接

[Why React Hooks?](https://dev.to/tylermcginnis/why-react-hooks-51lj)