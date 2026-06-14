# React Basic Syntax & Usage

React is a declarative, component-based JavaScript library for building user interfaces. It uses **JSX** — a syntax extension that lets you write HTML-like markup directly inside JavaScript — and a one-way data flow model. This guide covers the core syntax of modern React using **functional components** and **hooks**, with clear explanations of **when** and **why** to use each pattern.

---

## 1. JSX Fundamentals

JSX (JavaScript XML) is the primary way you describe UI in React. It looks like HTML but compiles down to JavaScript function calls. Understanding JSX rules is essential before writing any React code.

### Basic JSX Expressions

```jsx
function Greeting() {
  const name = 'Raenard'
  const currentYear = new Date().getFullYear()

  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Welcome to React in {currentYear}.</p>
      <p>2 + 2 = {2 + 2}</p>
    </div>
  )
}
```

> [!TIP]
> **When to use `{}`**: Use curly braces inside JSX whenever you need to embed a **JavaScript expression** — variables, math, function calls, ternaries. Think of `{}` as a window from HTML back into JavaScript. You cannot use statements like `if` or `for` inside `{}` — only expressions that return a value.

### JSX Rules You Must Follow

```jsx
function JsxRules() {
  const isLoggedIn = true

  return (
    // Rule 1: Must return a single root element
    // Use <div>, <section>, or a Fragment (<>...</>) to wrap multiple elements
    <>
      {/* Rule 2: All tags must be closed */}
      <img src="/photo.jpg" alt="Photo" />  {/* self-closing */}
      <br />

      {/* Rule 3: Use className, not class */}
      <div className="card">Content</div>

      {/* Rule 4: Use htmlFor, not for (on labels) */}
      <label htmlFor="email">Email</label>
      <input id="email" />

      {/* Rule 5: Style takes an object, not a string */}
      <p style={{ color: 'blue', fontSize: '16px' }}>Styled text</p>

      {/* Rule 6: Ternary for inline conditionals */}
      <p>{isLoggedIn ? 'Welcome back!' : 'Please log in.'}</p>
    </>
  )
}
```

### Key Differences from HTML

| HTML | JSX | Reason |
|---|---|---|
| `class="..."` | `className="..."` | `class` is a reserved word in JavaScript |
| `for="..."` | `htmlFor="..."` | `for` is a reserved word in JavaScript |
| `style="color: blue"` | `style={{ color: 'blue' }}` | JSX styles are objects with camelCase properties |
| `onclick="..."` | `onClick={handler}` | Events are camelCase and take function references |
| `<img>`, `<br>`, `<input>` | `<img />`, `<br />`, `<input />` | All tags must be explicitly closed in JSX |

> [!IMPORTANT]
> **Fragments (`<>...</>`)**: Use a Fragment when you need to return multiple sibling elements without adding an extra DOM node. This is preferred over wrapping everything in a `<div>` that adds unnecessary markup.

---

## 2. Components

Components are the building blocks of every React application. A component is a JavaScript function that returns JSX.

### Function Components

```jsx
// Simple component — no props
function WelcomeBanner() {
  return <h1>Welcome to My App</h1>
}

// Arrow function style (equally valid)
const Footer = () => {
  return <footer>© 2026 My App</footer>
}

// Using components
function App() {
  return (
    <div>
      <WelcomeBanner />
      <p>Main content here.</p>
      <Footer />
    </div>
  )
}
```

> [!NOTE]
> **When to create a component**: Extract a piece of UI into its own component when it is **reused** in multiple places, when it represents a **distinct section** of the page (header, sidebar, card), or when the parent component is becoming **too long** to read. A good rule of thumb: if a block of JSX has its own state or logic, it should be its own component.

### Props — Passing Data to Components

Props are how you pass data **from a parent to a child** component. They are read-only — a child should never modify its own props.

```jsx
// Defining a component that accepts props
function UserCard({ name, role, avatar }) {
  return (
    <div className="user-card">
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <p>{role}</p>
    </div>
  )
}

// Default prop values using destructuring defaults
function Badge({ label = 'New', color = '#42b883' }) {
  return (
    <span style={{ backgroundColor: color, padding: '4px 8px', borderRadius: '12px' }}>
      {label}
    </span>
  )
}

// Using components with props
function TeamPage() {
  return (
    <div>
      <UserCard name="Alice" role="Designer" avatar="/alice.jpg" />
      <UserCard name="Bob" role="Developer" avatar="/bob.jpg" />
      <Badge label="Pro" color="#6366f1" />
      <Badge />  {/* Uses defaults: "New" with green */}
    </div>
  )
}
```

### Children Prop — Composition Pattern

The special `children` prop lets you nest content inside a component, just like you nest HTML elements.

```jsx
function Card({ title, children }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="card-body">
        {children}
      </div>
    </div>
  )
}

// Usage — anything between <Card> and </Card> becomes children
function App() {
  return (
    <Card title="Announcements">
      <p>Welcome to the new semester!</p>
      <p>Check the updated schedule.</p>
    </Card>
  )
}
```

> [!TIP]
> **When to use `children`**: Use the `children` pattern when building **wrapper/layout components** — cards, modals, sidebars, page layouts — where the outer structure is fixed but the inner content varies. It's React's equivalent of Vue's slots.

---

## 3. State — `useState`

`useState` is the most fundamental React hook. It lets a component **remember** values between renders and triggers a **re-render** when the value changes.

```jsx
import { useState } from 'react'

function Counter() {
  // Declare state: [currentValue, setterFunction] = useState(initialValue)
  const [count, setCount] = useState(0)
  const [name, setName] = useState('React')

  return (
    <div>
      <p>{name} Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button>
      <input value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  )
}
```

### State with Objects and Arrays

```jsx
import { useState } from 'react'

function ProfileForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: ''
  })

  const [tags, setTags] = useState(['react', 'javascript'])

  // Updating object state — always spread the previous state
  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  // Updating array state — never mutate directly
  const addTag = (tag) => {
    setTags(prev => [...prev, tag])
  }

  const removeTag = (index) => {
    setTags(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div>
      <input
        value={form.firstName}
        onChange={(e) => updateField('firstName', e.target.value)}
        placeholder="First name"
      />
      <input
        value={form.email}
        onChange={(e) => updateField('email', e.target.value)}
        placeholder="Email"
      />
    </div>
  )
}
```

> [!WARNING]
> **Never mutate state directly.** React only re-renders when you call the setter function with a **new reference**. Doing `form.firstName = 'new'` or `tags.push('new')` will **not** trigger a re-render. Always use the spread operator (`...`) to create new objects/arrays.

> [!TIP]
> **When to use the functional updater** `setCount(prev => prev + 1)`: Use the callback form whenever the new state **depends on the previous state**. This guarantees correctness even when multiple updates are batched. Use the direct form `setCount(5)` only when setting an **independent value** that doesn't depend on what came before.

---

## 4. Handling Events

React uses synthetic events that wrap native DOM events for cross-browser consistency. Event handler props are **camelCase** and take **function references**, not strings.

```jsx
function EventExamples() {
  const handleClick = () => {
    console.log('Button clicked!')
  }

  const handleSubmit = (e) => {
    e.preventDefault() // Prevent page reload on form submit
    console.log('Form submitted!')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log('Enter pressed!')
    }
  }

  return (
    <div>
      {/* Method reference */}
      <button onClick={handleClick}>Click Me</button>

      {/* Inline arrow function — needed when passing arguments */}
      <button onClick={() => console.log('Inline!')}>Inline</button>

      {/* Form with prevent default */}
      <form onSubmit={handleSubmit}>
        <input onKeyDown={handleKeyDown} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
```

### When to Use Each Pattern

| Pattern | Syntax | When to Use |
|---|---|---|
| Method reference | `onClick={handleClick}` | Default for most cases — clean, reusable, no extra re-renders |
| Inline arrow | `onClick={() => doSomething(id)}` | When you need to **pass arguments** to the handler |
| Inline expression | `onClick={() => setCount(count + 1)}` | Simple **one-liners** that don't warrant a named function |

> [!WARNING]
> **Don't call the function**: `onClick={handleClick()}` will execute the function **immediately** during render, not on click. Always pass a reference: `onClick={handleClick}` or wrap in an arrow: `onClick={() => handleClick()}`.

---

## 5. Conditional Rendering

React doesn't have special directives like `v-if`. Instead, you use standard JavaScript expressions inside JSX.

### Ternary Operator — `condition ? a : b`

```jsx
function AuthStatus({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <p>Welcome back, User!</p>
      ) : (
        <p>Please sign in to continue.</p>
      )}
    </div>
  )
}
```

> **When to use**: Use a ternary when you have **two branches** — something to show when true AND something different to show when false.

### Logical AND — `condition && element`

```jsx
function Notifications({ messages }) {
  return (
    <div>
      <h2>Dashboard</h2>
      {messages.length > 0 && (
        <p>You have {messages.length} unread messages.</p>
      )}
    </div>
  )
}
```

> **When to use**: Use `&&` when you want to render something **only when a condition is true** and render **nothing** otherwise. It's cleaner than a ternary with `null` as the else branch.

> [!CAUTION]
> **Gotcha with `&&` and numbers**: `{0 && <Component />}` will render `0`, not nothing, because `0` is a falsy but renderable value in JSX. Always ensure the left side evaluates to a **boolean**: `{messages.length > 0 && ...}` not `{messages.length && ...}`.

### Early Return Pattern

```jsx
function UserProfile({ user }) {
  // Guard clause — return early for edge cases
  if (!user) {
    return <p>Loading user data...</p>
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  )
}
```

> **When to use**: Use early returns for **loading states, error states, or empty states** at the top of a component. It keeps the happy-path JSX clean and un-nested.

### Summary: Choosing the Right Pattern

| Pattern | Best For |
|---|---|
| `condition ? <A /> : <B />` | Two distinct branches (show A or B) |
| `condition && <A />` | Show or hide a single element |
| Early `return` | Loading/error/empty guard clauses at the top of a component |
| Variables + `if/else` before `return` | Complex multi-branch logic that would clutter JSX |

---

## 6. Rendering Lists

Use JavaScript's `.map()` method to transform arrays into lists of JSX elements.

```jsx
function FruitList() {
  const fruits = ['Apple', 'Banana', 'Cherry', 'Durian']

  return (
    <ul>
      {fruits.map((fruit, index) => (
        <li key={fruit}>{index + 1}. {fruit}</li>
      ))}
    </ul>
  )
}

// With objects — always use a unique id as key
function UserList() {
  const users = [
    { id: 1, name: 'Alice', role: 'Designer' },
    { id: 2, name: 'Bob', role: 'Developer' },
    { id: 3, name: 'Charlie', role: 'Manager' }
  ]

  return (
    <div>
      {users.map(user => (
        <div key={user.id} className="user-card">
          <h3>{user.name}</h3>
          <p>{user.role}</p>
        </div>
      ))}
    </div>
  )
}
```

> [!IMPORTANT]
> **The `key` prop is required.** Every element in a `.map()` list must have a unique, stable `key` prop. React uses keys to identify which items changed, were added, or were removed. Use a **unique ID** from your data, not the array index, unless the list is static and never reordered.

### Filtering and Transforming

```jsx
function ActiveUserList({ users }) {
  // Filter first, then map — clean separation of concerns
  const activeUsers = users.filter(u => u.isActive)

  return (
    <ul>
      {activeUsers.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
      {activeUsers.length === 0 && <li>No active users found.</li>}
    </ul>
  )
}
```

> [!TIP]
> **When to filter vs when to conditionally render**: Filter the array **before** mapping when you want to exclude items entirely. Use conditional rendering **inside** the map when you want all items in the DOM but some visually different (e.g., greyed out, badged).

---

## 7. Effects — `useEffect`

`useEffect` lets you perform **side effects** — data fetching, subscriptions, DOM manipulation, timers — in function components.

```jsx
import { useState, useEffect } from 'react'

function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Side effect: fetch data
    setLoading(true)
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data)
        setLoading(false)
      })

    // Cleanup function (optional) — runs before next effect or on unmount
    return () => {
      console.log('Cleaning up previous effect')
    }
  }, [userId]) // Dependency array — re-run when userId changes

  if (loading) return <p>Loading...</p>
  return <h2>{user.name}</h2>
}
```

### Dependency Array Patterns

The second argument to `useEffect` controls **when** the effect runs:

| Dependency Array | Runs When | Use Case |
|---|---|---|
| `useEffect(fn)` | **Every render** | Almost never needed — risks infinite loops |
| `useEffect(fn, [])` | **Once on mount** | Initial data fetch, event listeners, third-party library setup |
| `useEffect(fn, [a, b])` | **When `a` or `b` change** | Re-fetch data when props/state change, sync external systems |

```jsx
import { useEffect } from 'react'

function WindowTracker() {
  useEffect(() => {
    // Runs once on mount, cleans up on unmount
    const handleResize = () => console.log(window.innerWidth)
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array = mount & unmount only

  return <p>Resize the window and check the console.</p>
}
```

> [!WARNING]
> **Common mistake — missing dependencies**: If your effect reads a state variable but doesn't include it in the dependency array, it will use a stale value. Always include every reactive value the effect reads. The React ESLint plugin (`eslint-plugin-react-hooks`) will warn you about missing dependencies.

> [!TIP]
> **When to use `useEffect` vs not**: `useEffect` is for **synchronizing with external systems** (APIs, DOM, timers, subscriptions). You do **not** need `useEffect` to transform data for rendering — use regular variables or `useMemo` instead. If you're computing derived state, you don't need an effect.

---

## 8. Derived Values — `useMemo` and `useCallback`

### `useMemo` — Cached Computation

`useMemo` memoizes the result of an expensive computation so it only recalculates when its dependencies change.

```jsx
import { useState, useMemo } from 'react'

function ProductList({ products }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')

  // Only recalculates when products, searchTerm, or sortOrder change
  const filteredProducts = useMemo(() => {
    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    return filtered.sort((a, b) =>
      sortOrder === 'asc' ? a.price - b.price : b.price - a.price
    )
  }, [products, searchTerm, sortOrder])

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
      />
      {filteredProducts.map(p => (
        <div key={p.id}>{p.name} — ${p.price}</div>
      ))}
    </div>
  )
}
```

### `useCallback` — Stable Function Reference

`useCallback` memoizes a function definition so it doesn't get recreated on every render. This is important when passing callbacks to optimized child components.

```jsx
import { useState, useCallback } from 'react'

function TodoApp() {
  const [todos, setTodos] = useState([])

  // Without useCallback, this function is recreated every render
  // which would cause child components using React.memo to re-render unnecessarily
  const addTodo = useCallback((text) => {
    setTodos(prev => [...prev, { id: Date.now(), text, done: false }])
  }, [])

  const toggleTodo = useCallback((id) => {
    setTodos(prev =>
      prev.map(t => t.id === id ? { ...t, done: !t.done } : t)
    )
  }, [])

  return <TodoList todos={todos} onAdd={addTodo} onToggle={toggleTodo} />
}
```

### When to Use Each

| Hook | Purpose | When to Use |
|---|---|---|
| `useMemo` | Cache a **computed value** | Expensive calculations (filtering/sorting large lists), creating objects/arrays used as deps |
| `useCallback` | Cache a **function** | Passing callbacks to child components wrapped in `React.memo`, or as dependencies of other hooks |
| Neither | Default — just compute inline | Simple calculations that are fast. **Don't prematurely optimize** — only reach for these hooks when you measure a performance issue |

> [!NOTE]
> **Don't overuse `useMemo`/`useCallback`.** Memoization itself has a cost (memory and comparison overhead). For most simple computations and small lists, inline calculation is faster. Use these hooks only when: (a) the computation is genuinely expensive, or (b) referential equality matters for preventing child re-renders.

---

## 9. Refs — `useRef`

`useRef` gives you a **mutable container** (`.current`) that persists across renders without triggering re-renders when changed.

### DOM Access

```jsx
import { useRef } from 'react'

function SearchBar() {
  const inputRef = useRef(null)

  const focusInput = () => {
    inputRef.current.focus()
  }

  return (
    <div>
      <input ref={inputRef} placeholder="Search..." />
      <button onClick={focusInput}>Focus Search</button>
    </div>
  )
}
```

### Persisting Values Without Re-renders

```jsx
import { useRef, useState, useEffect } from 'react'

function Stopwatch() {
  const [seconds, setSeconds] = useState(0)
  const intervalRef = useRef(null) // Store interval ID without causing re-renders

  const start = () => {
    if (intervalRef.current) return // Prevent double-start
    intervalRef.current = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)
  }

  const stop = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = null
  }

  useEffect(() => {
    return () => clearInterval(intervalRef.current) // Cleanup on unmount
  }, [])

  return (
    <div>
      <p>{seconds}s</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  )
}
```

> [!TIP]
> **When to use `useRef` vs `useState`**: Use `useRef` when you need to store a value that **should not trigger a re-render** when it changes — DOM elements, timer IDs, previous values, mutable flags. Use `useState` when changing the value **should** update the UI.

---

## 10. Custom Hooks

Custom hooks let you extract and share **stateful logic** between components. A custom hook is simply a function whose name starts with `use`.

```jsx
import { useState, useEffect } from 'react'

// Custom hook — reusable data-fetching logic
function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(json => {
        if (!cancelled) {
          setData(json)
          setLoading(false)
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err.message)
          setLoading(false)
        }
      })

    return () => { cancelled = true }
  }, [url])

  return { data, loading, error }
}

// Using the custom hook in any component
function UserList() {
  const { data: users, loading, error } = useFetch('/api/users')

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
```

> [!TIP]
> **When to create a custom hook**: Extract a hook when you find yourself **duplicating the same `useState` + `useEffect` pattern** across multiple components. Common examples: `useFetch`, `useLocalStorage`, `useDebounce`, `useMediaQuery`, `useClickOutside`.

---

## 11. Lifting State Up & Callback Pattern

When two sibling components need to share state, **lift the state up** to their closest common parent and pass it down via props.

```jsx
import { useState } from 'react'

// Parent holds the shared state
function TemperatureConverter() {
  const [celsius, setCelsius] = useState(0)
  const fahrenheit = (celsius * 9) / 5 + 32

  return (
    <div>
      <TemperatureInput
        label="Celsius"
        value={celsius}
        onChange={setCelsius}
      />
      <p>{celsius}°C = {fahrenheit.toFixed(1)}°F</p>
    </div>
  )
}

// Child receives state and a callback to update it
function TemperatureInput({ label, value, onChange }) {
  return (
    <label>
      {label}:
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  )
}
```

> [!IMPORTANT]
> **"Props down, callbacks up"** — This is React's fundamental data flow pattern. Parent components own the state and pass it down as props. Child components notify parents of changes by calling callback functions received as props. This keeps data flow predictable and easy to debug.

---

## Quick Reference Cheat Sheet

| Syntax | Purpose | Example |
|---|---|---|
| `{expression}` | Embed JS in JSX | `{user.name}` |
| `className` | CSS class attribute | `className="card"` |
| `style={{ }}` | Inline styles (object) | `style={{ color: 'red' }}` |
| `onClick={fn}` | Event handler | `onClick={handleClick}` |
| `<> ... </>` | Fragment (no extra DOM) | Wrap sibling elements |
| `{cond ? <A/> : <B/>}` | Conditional render | Ternary for two branches |
| `{cond && <A/>}` | Conditional show | Show only when true |
| `list.map(x => <X/>)` | List rendering | Always include `key` |
| `useState(init)` | Component state | `const [x, setX] = useState(0)` |
| `useEffect(fn, [deps])` | Side effects | Data fetching, subscriptions |
| `useRef(init)` | DOM access / mutable val | `const ref = useRef(null)` |
| `useMemo(fn, [deps])` | Cached derived value | Expensive computations |
| `useCallback(fn, [deps])` | Cached function ref | Stable callbacks for children |
| `children` prop | Component composition | Wrapper/layout components |
