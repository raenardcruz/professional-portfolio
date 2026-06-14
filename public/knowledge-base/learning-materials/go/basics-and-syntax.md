# Go Basics & Syntax

Go’s syntax is clean, modern, and deliberately concise. It enforces consistent styling rules (such as placing opening curly brackets on the same line as statements) and avoids complex OOP hierarchies in favor of composition and structures.

This guide covers the fundamental syntax and concepts you need to write and read Go code.

---

## 1. Variables and Constants

In Go, there are two primary ways to declare variables:

1. **Using the `var` keyword** (explicit type or inferred type).
2. **Using the shorthand `:=` operator** (inside functions only, type is inferred).

```go
package main

import "fmt"

const Pi = 3.14159 // Constants cannot be declared with :=

func main() {
    // 1. Explicit declaration
    var age int = 25
    
    // 2. Type inference with var
    var name = "Raenard"
    
    // 3. Shorthand syntax (only inside functions)
    score := 94.5
    
    // Multiple declarations
    var x, y int = 1, 2
    a, b := "hello", true

    fmt.Println(name, age, score, Pi, x, y, a, b)
}
```

> [!NOTE]
> Go is **statically typed**; once a variable's type is declared or inferred, it cannot change.
> In Go, variables that are declared but not assigned a value automatically receive their **zero value**:
> - Numerical types: `0`
> - Booleans: `false`
> - Strings: `""` (empty string)
> - Pointers, Slices, Maps, Channels, Interfaces: `nil`

---

## 2. Basic Data Types

Go provides standard primitive types:

| Type Category | Specific Types | Description |
| :--- | :--- | :--- |
| **Boolean** | `bool` | `true` or `false` |
| **String** | `string` | UTF-8 encoded sequence of characters |
| **Integers** | `int`, `int8`, `int16`, `int32`, `int64`<br>`uint`, `uint8`, `uint16`, `uint32`, `uint64`, `uintptr` | Signed (`int`) and unsigned (`uint`) integers. The plain `int` matches the CPU architecture width (32-bit or 64-bit). |
| **Alias Types** | `byte` (alias for `uint8`), `rune` (alias for `int32`, represents a Unicode code point) | Used for character manipulation. |
| **Floats** | `float32`, `float64` | Decimal values. |
| **Complex** | `complex64`, `complex128` | Complex numbers with float parts. |

---

## 3. Control Flow

Go conditional statements do not require parentheses `()` but do require curly braces `{}`.

### If / Else
Go allows you to run a short initialization statement before evaluating the condition:

```go
if num := 10; num < 0 {
    fmt.Println(num, "is negative")
} else if num < 10 {
    fmt.Println(num, "is a single digit")
} else {
    fmt.Println(num, "is double digits or more")
}
// Note: 'num' is out of scope here and cannot be accessed
```

### For Loop (The Only Loop)
Go has only one loop construct: the `for` loop. It serves as a traditional loop, a while loop, and an infinite loop.

```go
// A. Standard C-style loop
for i := 0; i < 5; i++ {
    fmt.Println(i)
}

// B. "While" loop style (omitting initialization and post statement)
count := 1
for count < 5 {
    count += count
}

// C. Infinite loop (break/return to exit)
for {
    if count > 100 {
        break
    }
    count++
}
```

### Switch Statement
Go's `switch` does not require `break` statements. It runs only the selected case. You can also write "tagless" switches, which act as cleaner `if-else` chains.

```go
finger := 3
switch finger {
case 1:
    fmt.Println("Thumb")
case 2:
    fmt.Println("Index")
case 3, 4, 5:
    fmt.Println("Other Finger")
default:
    fmt.Println("Unknown")
}

// Tagless switch
score := 85
switch {
case score >= 90:
    fmt.Println("Grade A")
case score >= 80:
    fmt.Println("Grade B")
default:
    fmt.Println("Grade F")
}
```

---

## 4. Functions

Functions in Go are defined using the `func` keyword. They support:
- Multiple parameter declarations.
- **Multiple return values** (highly used for error handling).
- **Named return values** (which are treated as variables defined at the top of the function).

```go
package main

import (
    "errors"
    "fmt"
)

// Function with multiple parameters and multiple returns
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("cannot divide by zero")
    }
    return a / b, nil
}

// Function with named return values
func rectangleStats(width, height float64) (area float64, perimeter float64) {
    area = width * height
    perimeter = 2 * (width + height)
    return // "Naked" return returns the named variables
}

func main() {
    result, err := divide(10, 2)
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Println("Result:", result)
    }

    // Ignore a returned value using the blank identifier '_'
    area, _ := rectangleStats(5, 10)
    fmt.Println("Area:", area)
}
```

> [!IMPORTANT]
> Go uses the **blank identifier `_`** (underscore) as a write-only placeholder to ignore values returned by functions that you do not need. Go does not compile if there are unused variables!

---

## 5. Pointers

Like C/C++, Go supports pointers, allowing you to pass references to variables rather than copying their values. However, Go has **no pointer arithmetic** (making them significantly safer).

- **`&` operator**: Generates a pointer to its operand (gets the memory address).
- **`*` operator**: De-references the pointer (gets the underlying value) or denotes a pointer type.

```go
package main

import "fmt"

func zeroval(ival int) {
    ival = 0 // Passed by value: only modifies the copy inside the function
}

func zeroptr(iptr *int) {
    *iptr = 0 // Passed by pointer: modifies the original value at the memory address
}

func main() {
    i := 1
    fmt.Println("Initial:", i) // 1

    zeroval(i)
    fmt.Println("After zeroval:", i) // 1

    // Pass the memory address of i using &
    zeroptr(&i)
    fmt.Println("After zeroptr:", i) // 0
}
```

---

## 6. Composite Data Structures

Go provides three major composite data types: **Slices**, **Maps**, and **Structs**.

### Slices (Dynamic Arrays)

Slices are wrappers around primitive arrays that provide dynamic sizing. They are typed as `[]T`, where `T` is the type of elements.

```go
// 1. Declare and initialize slice
numbers := []int{10, 20, 30}

// 2. Append elements dynamically
numbers = append(numbers, 40, 50) 

// 3. Make slice with initial length and capacity
// make(Type, length, capacity)
names := make([]string, 3, 10)
names[0] = "Alice"

// 4. Slicing an existing slice/array: slice[start:end] (exclusive of end index)
subset := numbers[1:4] // contains elements at indices 1, 2, and 3: [20, 30, 40]

// 5. Iterating over slices using range
for index, value := range numbers {
    fmt.Printf("Index: %d, Value: %d\n", index, value)
}
```

---

### Maps (Hash Tables / Key-Value Stores)

Maps are associative data structures represented as `map[KeyType]ValueType`.

```go
// 1. Create a map using make()
ages := make(map[string]int)

// 2. Assign keys and values
ages["Alice"] = 28
ages["Bob"] = 32

// 3. Retrieve value and check existence (ok-idiom)
age, exists := ages["Charlie"]
if exists {
    fmt.Println("Charlie is", age)
} else {
    fmt.Println("Charlie is not in the map")
}

// 4. Delete a key-value pair
delete(ages, "Bob")

// 5. Iterating over maps
for name, age := range ages {
    fmt.Printf("%s: %d\n", name, age)
}
```

---

### Structs

Structs are collections of fields grouped together. They are Go's way of creating custom user-defined data structures. Go does not have classes or inheritance; instead, it uses structs and composition.

```go
package main

import "fmt"

// Define a struct
type Person struct {
    Name string
    Age  int
}

// Define a method on the struct
// (p Person) is the "receiver" of the method
func (p Person) Greet() string {
    return fmt.Sprintf("Hi, my name is %s and I am %d years old.", p.Name, p.Age)
}

// Method modifying the struct (requires a pointer receiver)
func (p *Person) HaveBirthday() {
    p.Age++
}

func main() {
    // Instantiate a struct
    bob := Person{Name: "Bob", Age: 30}
    
    // Call method
    fmt.Println(bob.Greet()) // "Hi, my name is Bob..."

    // Call pointer receiver method
    bob.HaveBirthday()
    fmt.Println("New age:", bob.Age) // 31
}
```
