# Link
Represents a wrapper around any React element. Passes props
`href` and `onClick` to child element where `href` is built
link, and `onClick` is handler which calls `navigator` actions

### Properties
#### `children: ReactElement<{ href?: string; onClick?(e: React.MouseEvent<HTMLElement>): void; }>`
Children React elements which could support such props as
`href` and `onClick`

#### `back?: boolean`
States if navigator should go back when link is clicked

OR

#### `state: BrowserNavigatorStateType`
When link is clicked, navigator will push this link

#### `replace?: boolean;`
States if navigator should replace current state with passed

#### `oneTime?: boolean;`
States if this state should be visited only once
