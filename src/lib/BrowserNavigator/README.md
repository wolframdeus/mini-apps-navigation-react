# BrowserNavigator
### Properties
#### `navigator: BrowserNavigator`
`BrowserNavigator` instance

#### `children?: ReactNode | ReactNodeArray`
Children React elements

### HOCs
Common call signature: `hoc(Component, options?: {displayName?: string})`

| HOC | Property name | Property value |
|---|---|---|
|`withNavigatorContext`| `navigatorContext` | Full navigator context |
|`withNavigator`| `navigator` | Navigator |
|`withNavigatorState`| `navigatorState` | State |
|`withNavigatorHistory`| `navigatorHistory` | History |

### Hooks
| Hook | Return value |
|---|---|
|`useNavigatorContext`| Full navigator context |
|`useNavigatorState` | State |
|`useNavigatorHistory`| History |
|`useNavigator`| Navigator|
