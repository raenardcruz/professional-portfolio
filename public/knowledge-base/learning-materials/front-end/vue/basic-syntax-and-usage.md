# Vue.js Basic Syntax & Usage

Vue.js uses a declarative, template-based syntax that lets you bind your rendered DOM to the underlying component's data. This guide covers the core syntax features of Vue 3 using the modern **Composition API** with `<script setup>`, and clearly explains **when** and **why** you would reach for each construct.

---

## 1. Template Syntax Fundamentals

Vue templates are valid HTML enhanced with special directives and expressions. The Vue compiler processes these templates into optimized JavaScript rendering code.

### Text Interpolation — `{{ }}`

The most basic form of data binding. Use double curly braces (mustache syntax) to display reactive data as text content inside an element.

```vue
<template>
  <p>Hello, {{ username }}!</p>
  <p>Total: {{ price * quantity }}</p>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('Raenard')
const price = ref(29.99)
const quantity = ref(3)
</script>
```

> [!TIP]
> **When to use**: Use `{{ }}` whenever you need to display a **reactive value as text** inside an HTML element. It supports any valid JavaScript expression — variables, math, ternaries, and function calls — but **not** statements like `if` or `for`.

### Raw HTML — `v-html`

By default, mustache syntax escapes HTML to prevent XSS attacks. Use `v-html` when you specifically need to render a string as raw HTML.

```vue
<template>
  <!-- This will render the <strong> tag as actual bold text -->
  <p v-html="richContent"></p>
</template>

<script setup>
import { ref } from 'vue'

const richContent = ref('<strong>Bold</strong> and <em>italic</em> text')
</script>
```

> [!CAUTION]
> **When to use**: Only use `v-html` when you **trust the source of the HTML** (e.g., your own CMS or sanitized content). Never use it with user-submitted input, as it opens the door to cross-site scripting (XSS) attacks.

---

## 2. Attribute Binding — `v-bind` / `:`

HTML attributes cannot use mustache syntax. Instead, use `v-bind` (or its shorthand `:`) to dynamically bind an attribute to a reactive value.

### Basic Attribute Binding

```vue
<template>
  <!-- Full syntax -->
  <img v-bind:src="imageUrl" v-bind:alt="imageAlt" />

  <!-- Shorthand (preferred) -->
  <img :src="imageUrl" :alt="imageAlt" />

  <!-- Dynamic class binding -->
  <button :class="{ active: isActive, disabled: isLoading }">
    Submit
  </button>

  <!-- Dynamic style binding -->
  <div :style="{ color: textColor, fontSize: fontSize + 'px' }">
    Styled text
  </div>
</template>

<script setup>
import { ref } from 'vue'

const imageUrl = ref('/images/photo.jpg')
const imageAlt = ref('Profile photo')
const isActive = ref(true)
const isLoading = ref(false)
const textColor = ref('#42b883')
const fontSize = ref(16)
</script>
```

> [!TIP]
> **When to use `:` vs `{{ }}`**: Use `:attribute` (v-bind) when setting **HTML attributes** like `src`, `href`, `class`, `style`, `disabled`, etc. Use `{{ }}` only for **text content** between tags. You **cannot** use `{{ }}` inside an attribute — that is a syntax error.

### Class & Style Binding Patterns

Vue provides enhanced syntax for `:class` and `:style` because they are used so frequently:

| Pattern | Syntax | When to Use |
|---|---|---|
| **Object syntax** | `:class="{ active: isActive }"` | Toggle individual classes based on boolean conditions |
| **Array syntax** | `:class="[baseClass, sizeClass]"` | Apply multiple class names from variables |
| **Mixed** | `:class="[baseClass, { active: isActive }]"` | Combine static variable classes with conditional toggles |

```vue
<template>
  <!-- Object: toggle classes conditionally -->
  <div :class="{ 'card': true, 'card--featured': isFeatured, 'card--sold': isSold }">
    Product Card
  </div>

  <!-- Array: apply a list of class variables -->
  <div :class="[themeClass, layoutClass]">
    Content
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isFeatured = ref(true)
const isSold = ref(false)
const themeClass = ref('dark-theme')
const layoutClass = ref('grid-layout')
</script>
```

---

## 3. Reactivity — `ref` vs `reactive`

Vue 3's Composition API provides two core reactivity primitives. Understanding **when** to use each is crucial.

### `ref()` — For Primitive & Any Values

`ref()` wraps a value in a reactive object with a `.value` property. It works with **all data types** — strings, numbers, booleans, arrays, objects.

```vue
<script setup>
import { ref } from 'vue'

// Primitives
const count = ref(0)
const name = ref('Vue')
const isVisible = ref(true)

// Also works with objects/arrays
const user = ref({ name: 'Raenard', age: 25 })
const items = ref(['Apple', 'Banana'])

// Access/modify with .value in script
count.value++
name.value = 'Vue 3'
user.value.name = 'Updated'
items.value.push('Cherry')
</script>

<template>
  <!-- In templates, .value is automatically unwrapped -->
  <p>{{ count }}</p>
  <p>{{ user.name }}</p>
</template>
```

### `reactive()` — For Objects & Collections

`reactive()` makes an entire object deeply reactive **without** needing `.value`. However, it only works with **object types** (objects, arrays, Maps, Sets).

```vue
<script setup>
import { reactive } from 'vue'

const form = reactive({
  username: '',
  email: '',
  agreed: false
})

// Direct property access — no .value needed
form.username = 'Raenard'
form.agreed = true
</script>

<template>
  <p>{{ form.username }}</p>
</template>
```

### When to Use Which?

| Scenario | Use | Reason |
|---|---|---|
| Primitive values (string, number, boolean) | `ref()` | `reactive()` doesn't work with primitives |
| A single standalone value | `ref()` | Cleaner, can be easily reassigned |
| A form or config object with many fields | `reactive()` | Avoid writing `.value` on every field access |
| Returning values from composables | `ref()` | Maintains reactivity when destructured |
| Arrays that get reassigned entirely | `ref()` | `reactive()` loses reactivity on reassignment |

> [!WARNING]
> **Common pitfall**: Never destructure a `reactive()` object directly — the destructured variables will lose reactivity. Use `toRefs()` if you must destructure:
> ```js
> import { reactive, toRefs } from 'vue'
> const state = reactive({ count: 0, name: 'Vue' })
> const { count, name } = toRefs(state) // still reactive
> ```

---

## 4. Event Handling — `v-on` / `@`

Use `v-on` (shorthand `@`) to listen for DOM events and run JavaScript when they are triggered.

### Basic Events

```vue
<template>
  <!-- Full syntax -->
  <button v-on:click="handleClick">Click</button>

  <!-- Shorthand (preferred) -->
  <button @click="handleClick">Click</button>

  <!-- Inline expression (for simple one-liners) -->
  <button @click="count++">Add One</button>

  <!-- Passing arguments -->
  <button @click="greet('Hello')">Greet</button>

  <!-- Accessing the native DOM event -->
  <input @input="onInput($event)" />
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)

const handleClick = () => {
  console.log('Button clicked!')
}

const greet = (message) => {
  alert(message)
}

const onInput = (event) => {
  console.log(event.target.value)
}
</script>
```

> [!TIP]
> **When to use inline vs method**: Use an **inline expression** (`@click="count++"`) for trivial one-liners. Use a **method reference** (`@click="handleClick"`) when the logic is more than a single statement — it keeps your template clean and your logic testable.

### Event Modifiers

Vue provides chainable modifiers that handle common DOM event patterns so you don't have to:

```vue
<template>
  <!-- Prevent default browser behavior (e.g., form submit reload) -->
  <form @submit.prevent="onSubmit">...</form>

  <!-- Stop event propagation to parent elements -->
  <button @click.stop="doSomething">Click</button>

  <!-- Only trigger handler once -->
  <button @click.once="initApp">Initialize</button>

  <!-- Only trigger if the event target is the element itself -->
  <div @click.self="closeModal">
    <p>Clicking this paragraph won't trigger closeModal</p>
  </div>

  <!-- Key modifiers for keyboard events -->
  <input @keyup.enter="submitForm" />
  <input @keyup.escape="cancelEdit" />
</template>
```

| Modifier | What It Does | When to Use |
|---|---|---|
| `.prevent` | Calls `event.preventDefault()` | Prevent form submissions from reloading the page |
| `.stop` | Calls `event.stopPropagation()` | Prevent click events from bubbling to parent handlers |
| `.once` | Handler fires only one time | One-time initialization buttons or first-interaction events |
| `.self` | Only fires if `event.target` is the element itself | Modal overlays — close on backdrop click, not on content click |
| `.enter`, `.escape`, etc. | Filter by specific key | Keyboard shortcuts and form submission on Enter |

---

## 5. Two-Way Binding — `v-model`

`v-model` creates a **two-way data binding** between a form input and a reactive variable. It is syntactic sugar that combines `:value` binding and `@input` event handling.

```vue
<template>
  <!-- Text input -->
  <input v-model="name" placeholder="Your name" />
  <p>Hello, {{ name }}!</p>

  <!-- Textarea -->
  <textarea v-model="bio"></textarea>

  <!-- Checkbox (boolean) -->
  <input type="checkbox" v-model="agreed" />
  <span>Agreed: {{ agreed }}</span>

  <!-- Radio buttons -->
  <input type="radio" value="light" v-model="theme" /> Light
  <input type="radio" value="dark" v-model="theme" /> Dark
  <p>Selected theme: {{ theme }}</p>

  <!-- Select dropdown -->
  <select v-model="country">
    <option disabled value="">Select a country</option>
    <option>Philippines</option>
    <option>Japan</option>
    <option>Italy</option>
  </select>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const bio = ref('')
const agreed = ref(false)
const theme = ref('light')
const country = ref('')
</script>
```

> [!IMPORTANT]
> **When to use `v-model`**: Use it on **form inputs** (`<input>`, `<textarea>`, `<select>`) whenever you need user input to be automatically synced with your component's state. You do **not** need `v-model` for display-only values — plain `:value` binding is sufficient for read-only fields.

### v-model Modifiers

```vue
<template>
  <!-- .lazy: syncs on 'change' instead of 'input' (after blur) -->
  <input v-model.lazy="searchQuery" />

  <!-- .number: auto-cast input to a number -->
  <input v-model.number="age" type="number" />

  <!-- .trim: strip leading/trailing whitespace -->
  <input v-model.trim="email" />
</template>
```

| Modifier | When to Use |
|---|---|
| `.lazy` | When you don't need real-time updates — e.g., search fields that query an API after the user stops typing |
| `.number` | When the value must be a number, not a string (common for age, quantity, price fields) |
| `.trim` | For text inputs where leading/trailing spaces should be stripped (usernames, emails) |

---

## 6. Conditional Rendering — `v-if` / `v-show`

Vue provides two ways to conditionally display elements. The choice depends on how often the visibility toggles.

### `v-if` / `v-else-if` / `v-else`

Conditionally **creates or destroys** DOM elements. The element is not rendered at all when the condition is false.

```vue
<template>
  <div v-if="status === 'loading'">
    <p>Loading data...</p>
  </div>
  <div v-else-if="status === 'error'">
    <p>Something went wrong.</p>
  </div>
  <div v-else>
    <p>Data loaded successfully!</p>
  </div>

  <button @click="toggleStatus">Cycle Status</button>
</template>

<script setup>
import { ref } from 'vue'

const statuses = ['loading', 'error', 'success']
let index = 0
const status = ref('loading')

const toggleStatus = () => {
  index = (index + 1) % statuses.length
  status.value = statuses[index]
}
</script>
```

### `v-show`

Toggles the element's CSS `display` property. The element is **always rendered** in the DOM — it's just hidden visually.

```vue
<template>
  <div v-show="isVisible">
    This content is toggled with CSS display.
  </div>
  <button @click="isVisible = !isVisible">Toggle</button>
</template>

<script setup>
import { ref } from 'vue'
const isVisible = ref(true)
</script>
```

### When to Use Which?

| Directive | Behavior | When to Use |
|---|---|---|
| `v-if` | Adds/removes from DOM | Content that is **rarely shown** or involves heavy rendering (lazy loading sections, permission-gated features) |
| `v-show` | Toggles CSS `display` | Content that **toggles frequently** (tabs, dropdown menus, tooltips) — avoids expensive mount/unmount cycles |

> [!NOTE]
> `v-if` has higher **toggle cost** (creates/destroys elements each time) but lower **initial render cost** (doesn't render what's hidden). `v-show` has higher **initial render cost** (always renders) but lower **toggle cost** (just toggles CSS). Choose accordingly.

---

## 7. List Rendering — `v-for`

Use `v-for` to render a list of items by iterating over an array or object.

### Iterating Over Arrays

```vue
<template>
  <!-- Basic list -->
  <ul>
    <li v-for="fruit in fruits" :key="fruit">{{ fruit }}</li>
  </ul>

  <!-- With index -->
  <ul>
    <li v-for="(fruit, index) in fruits" :key="index">
      {{ index + 1 }}. {{ fruit }}
    </li>
  </ul>

  <!-- Array of objects -->
  <div v-for="user in users" :key="user.id" class="user-card">
    <h3>{{ user.name }}</h3>
    <p>{{ user.email }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const fruits = ref(['Apple', 'Banana', 'Cherry'])
const users = ref([
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' }
])
</script>
```

### Iterating Over Objects

```vue
<template>
  <div v-for="(value, key) in profile" :key="key">
    <strong>{{ key }}:</strong> {{ value }}
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const profile = reactive({
  name: 'Raenard',
  role: 'Developer',
  location: 'Philippines'
})
</script>
```

> [!IMPORTANT]
> **Always provide a `:key`**: The `:key` attribute is **required** when using `v-for`. It gives Vue a stable identity for each rendered node so it can efficiently track, reorder, and update items. Use a **unique identifier** (like `id`) rather than the array index when the list can be reordered, filtered, or mutated.

> [!WARNING]
> **Avoid `v-if` with `v-for` on the same element.** When both are on the same element, `v-if` has higher priority and won't have access to the `v-for` variable. Wrap the `v-if` in a parent `<template>` tag instead:
> ```vue
> <!-- ✅ Correct -->
> <template v-for="item in items" :key="item.id">
>   <li v-if="item.isActive">{{ item.name }}</li>
> </template>
>
> <!-- ❌ Avoid -->
> <li v-for="item in items" v-if="item.isActive" :key="item.id">
>   {{ item.name }}
> </li>
> ```

---

## 8. Computed Properties — `computed()`

Computed properties are **derived values** that automatically re-calculate when their reactive dependencies change. They are cached — they only re-evaluate when a dependency actually changes.

```vue
<template>
  <input v-model="firstName" placeholder="First name" />
  <input v-model="lastName" placeholder="Last name" />
  <p>Full Name: {{ fullName }}</p>

  <h3>Filtered List (active users only):</h3>
  <ul>
    <li v-for="user in activeUsers" :key="user.id">{{ user.name }}</li>
  </ul>
</template>

<script setup>
import { ref, computed } from 'vue'

const firstName = ref('Juan')
const lastName = ref('Dela Cruz')

// Computed: derived from other reactive data
const fullName = computed(() => `${firstName.value} ${lastName.value}`)

const users = ref([
  { id: 1, name: 'Alice', active: true },
  { id: 2, name: 'Bob', active: false },
  { id: 3, name: 'Charlie', active: true }
])

const activeUsers = computed(() => users.value.filter(u => u.active))
</script>
```

> [!TIP]
> **When to use `computed()` vs a method**: Use `computed()` when you need a **derived value that depends on reactive state** — it's cached and won't recalculate unless dependencies change. Use a regular function/method when you need to perform an **action** (side effects, API calls) or when the result depends on **non-reactive** inputs like function arguments.

---

## 9. Watchers — `watch()` and `watchEffect()`

Watchers let you run **side effects** in response to reactive data changes — things like API calls, logging, or syncing to localStorage.

### `watch()` — Explicit Dependencies

```vue
<script setup>
import { ref, watch } from 'vue'

const searchQuery = ref('')

// Watch a specific ref
watch(searchQuery, (newValue, oldValue) => {
  console.log(`Search changed from "${oldValue}" to "${newValue}"`)
  // e.g., call an API with the new query
})

// Watch multiple sources
const page = ref(1)
watch([searchQuery, page], ([newQuery, newPage]) => {
  fetchResults(newQuery, newPage)
})

// Watch a nested object with { deep: true }
const filters = ref({ category: 'all', sort: 'date' })
watch(filters, (newFilters) => {
  applyFilters(newFilters)
}, { deep: true })
</script>
```

### `watchEffect()` — Automatic Dependencies

```vue
<script setup>
import { ref, watchEffect } from 'vue'

const userId = ref(1)

// Automatically tracks every reactive ref used inside
watchEffect(async () => {
  const response = await fetch(`/api/users/${userId.value}`)
  const data = await response.json()
  console.log(data)
})
// When userId.value changes, this effect re-runs automatically
</script>
```

### When to Use Which?

| Function | When to Use |
|---|---|
| `watch()` | You need access to **old and new values**, you want to watch **specific sources**, or you want **lazy** execution (doesn't run immediately) |
| `watchEffect()` | You want the callback to **run immediately** and **auto-track** all reactive dependencies used inside — great for side effects that should run on mount and on every change |
| `computed()` | You need a **cached derived value**, not a side effect. If you're not returning a value, use `watch` instead |

---

## 10. Component Basics

Vue applications are built from a tree of reusable components. Each `.vue` file is a **Single File Component (SFC)** containing template, logic, and styles.

### Defining & Using a Component

**ChildCard.vue**
```vue
<script setup>
// Props — data passed from parent
const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: 'No subtitle' }
})

// Emits — events sent to parent
const emit = defineEmits(['select'])

const handleClick = () => {
  emit('select', props.title)
}
</script>

<template>
  <div class="card" @click="handleClick">
    <h3>{{ title }}</h3>
    <p>{{ subtitle }}</p>
  </div>
</template>

<style scoped>
.card {
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: box-shadow 0.2s;
}
.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
```

**ParentPage.vue**
```vue
<script setup>
import ChildCard from './ChildCard.vue'

const handleSelect = (title) => {
  alert(`You selected: ${title}`)
}
</script>

<template>
  <ChildCard
    title="Getting Started"
    subtitle="Learn the basics of Vue"
    @select="handleSelect"
  />
  <ChildCard
    title="Advanced Patterns"
    @select="handleSelect"
  />
</template>
```

### Props vs Emits — When to Use

| Mechanism | Direction | When to Use |
|---|---|---|
| `defineProps()` | Parent → Child | Pass **data down** to a child component (config, content, flags) |
| `defineEmits()` | Child → Parent | Notify the parent that **something happened** (click, submit, select) |

> [!TIP]
> Follow the **"props down, events up"** principle. Never mutate a prop inside a child component — emit an event and let the parent handle the state change instead.

---

## 11. Lifecycle Hooks

Lifecycle hooks let you run code at specific stages of a component's existence.

```vue
<script setup>
import { onMounted, onUpdated, onUnmounted } from 'vue'

onMounted(() => {
  // Runs after the component is inserted into the DOM
  // Use for: API calls, DOM measurements, third-party library init
  console.log('Component mounted!')
})

onUpdated(() => {
  // Runs after every reactive state change that triggers a re-render
  // Use for: DOM-dependent operations after an update
  console.log('Component updated!')
})

onUnmounted(() => {
  // Runs when the component is removed from the DOM
  // Use for: cleanup — remove event listeners, clear timers, cancel subscriptions
  console.log('Component unmounted — cleaning up!')
})
</script>
```

| Hook | When It Runs | Common Use Cases |
|---|---|---|
| `onMounted` | After first DOM render | Fetch initial data, initialize charts/maps, set up event listeners |
| `onUpdated` | After every re-render | Scroll adjustment, DOM measurements after data changes |
| `onUnmounted` | Component destroyed | Cleanup: clear intervals, remove global event listeners, cancel API calls |
| `onBeforeMount` | Before first render | Rarely needed — prefer `onMounted` |
| `onBeforeUpdate` | Before re-render | Capture pre-update DOM state (e.g., scroll position) |

---

## 12. Template Refs — `ref` on Elements

Use template refs to get direct access to a DOM element or child component instance.

```vue
<template>
  <input ref="searchInput" placeholder="Search..." />
  <button @click="focusInput">Focus Search</button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// The ref name must match the template ref attribute
const searchInput = ref(null)

const focusInput = () => {
  searchInput.value.focus()
}

onMounted(() => {
  // Auto-focus on mount
  searchInput.value.focus()
})
</script>
```

> [!NOTE]
> **When to use template refs**: Only use them when you need **direct DOM access** — focusing inputs, measuring dimensions, integrating third-party DOM libraries. For everything else (showing/hiding, styling, text), prefer Vue's declarative directives (`v-if`, `v-show`, `:class`, `{{ }}`).

---

## Quick Reference Cheat Sheet

| Syntax | Purpose | Example |
|---|---|---|
| `{{ value }}` | Display text | `{{ username }}` |
| `v-html` | Render raw HTML | `v-html="htmlString"` |
| `:attr` / `v-bind:attr` | Bind attribute | `:src="imageUrl"` |
| `@event` / `v-on:event` | Listen to event | `@click="handler"` |
| `v-model` | Two-way form binding | `v-model="inputValue"` |
| `v-if` / `v-else` | Conditional render (DOM) | `v-if="isLoggedIn"` |
| `v-show` | Conditional render (CSS) | `v-show="isVisible"` |
| `v-for` | List rendering | `v-for="item in items"` |
| `ref()` | Reactive primitive/value | `const x = ref(0)` |
| `reactive()` | Reactive object | `const obj = reactive({})` |
| `computed()` | Cached derived value | `computed(() => a + b)` |
| `watch()` | Side effect on change | `watch(x, (n) => { ... })` |
| `defineProps()` | Receive parent data | `defineProps({ title: String })` |
| `defineEmits()` | Emit events to parent | `emit('select', value)` |
