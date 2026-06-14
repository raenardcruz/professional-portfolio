# C# Design Patterns

Design patterns are proven solutions to common software design problems. In the C# and .NET ecosystem, these patterns help write clean, maintainable, testable, and scalable code by leveraging object-oriented programming (OOP) principles and modern C# language features.

This guide covers the most commonly used design patterns in C#, categorized by their purpose: **Creational**, **Structural**, and **Behavioral**.

---

## Creational Patterns

Creational patterns deal with object creation mechanisms, trying to create objects in a manner suitable to the situation.

### 1. Singleton Pattern
The Singleton pattern ensures that a class has only one instance and provides a global point of access to it.

```csharp
public sealed class CacheManager
{
    private static readonly Lazy<CacheManager> _instance = 
        new Lazy<CacheManager>(() => new CacheManager());

    // Private constructor prevents external instantiation
    private CacheManager() 
    {
        // Initialize cache storage
    }

    public static CacheManager Instance => _instance.Value;

    public void Set(string key, object value) => Console.WriteLine($"Cached: {key}");
    public object Get(string key) => null;
}
```

#### When to Use
| Scenario | Why it Fits |
| :--- | :--- |
| **Shared Resources** | When managing single database connections, thread pools, or configuration settings. |
| **State Sharing** | When you need a single centralized state coordinator across the application. |

> [!WARNING]
> Singletons introduce global state, making unit testing difficult (due to coupled state between test runs). Use them sparingly and prefer dependency injection (DI) with a `Singleton` lifetime where possible.

---

### 2. Factory Method Pattern
The Factory Method pattern defines an interface for creating an object, but lets subclasses decide which class to instantiate.

```csharp
// Product Interface
public interface INotificationService
{
    void Send(string message);
}

// Concrete Products
public class EmailNotification : INotificationService
{
    public void Send(string message) => Console.WriteLine($"Email: {message}");
}

public class SmsNotification : INotificationService
{
    public void Send(string message) => Console.WriteLine($"SMS: {message}");
}

// Creator
public abstract class NotificationSender
{
    // Factory Method
    public abstract INotificationService CreateNotificationService();

    public void SendNotification(string message)
    {
        var service = CreateNotificationService();
        service.Send(message);
    }
}

// Concrete Creators
public class EmailSender : NotificationSender
{
    public override INotificationService CreateNotificationService() => new EmailNotification();
}

public class SmsSender : NotificationSender
{
    public override INotificationService CreateNotificationService() => new SmsNotification();
}
```

#### When to Use
| Scenario | Why it Fits |
| :--- | :--- |
| **Unknown Dependencies** | When a class cannot anticipate the exact class of objects it must create. |
| **Extensible Libraries** | When you want to provide users of your library the ability to extend its internal components. |

> [!TIP]
> In modern .NET, the Factory pattern is often implemented using delegates (e.g., `Func<string, INotificationService>`) registered in the dependency injection container, which simplifies creation logic.

---

### 3. Builder Pattern
The Builder pattern separates the construction of a complex object from its representation, allowing the same construction process to create different representations.

```csharp
public class QueryBuilder
{
    private string _select = "*";
    private string _from = "";
    private string _where = "";

    public QueryBuilder Select(string columns)
    {
        _select = columns;
        return this; // Method chaining
    }

    public QueryBuilder From(string table)
    {
        _from = table;
        return this;
    }

    public QueryBuilder Where(string condition)
    {
        _where = condition;
        return this;
    }

    public string Build()
    {
        if (string.IsNullOrEmpty(_from))
            throw new InvalidOperationException("FROM clause is required.");

        var query = $"SELECT {_select} FROM {_from}";
        if (!string.IsNullOrEmpty(_where))
            query += $" WHERE {_where}";

        return query;
    }
}
```

#### When to Use
| Scenario | Why it Fits |
| :--- | :--- |
| **Complex Objects** | When constructing an object requires setting numerous optional fields or nested structures. |
| **Step-by-Step Construction** | When you want to construct objects incrementally or in a specific order. |

---

## Structural Patterns

Structural patterns explain how to assemble objects and classes into larger structures while keeping these structures flexible and efficient.

### 1. Adapter Pattern
The Adapter pattern allows incompatible interfaces to work together. It acts as a wrapper between two different objects.

```csharp
// Target Interface expected by the client
public interface IXmlLogger
{
    void LogXml(string xmlData);
}

// Adaptee (Incompatible interface)
public class JsonLogger
{
    public void LogJson(string jsonString) => Console.WriteLine($"Logged JSON: {jsonString}");
}

// Adapter
public class XmlToJsonLoggerAdapter : IXmlLogger
{
    private readonly JsonLogger _jsonLogger;

    public XmlToJsonLoggerAdapter(JsonLogger jsonLogger)
    {
        _jsonLogger = jsonLogger;
    }

    public void LogXml(string xmlData)
    {
        // Convert XML to JSON (mock conversion)
        string json = $"{{\"data\": \"{xmlData}\"}}";
        _jsonLogger.LogJson(json);
    }
}
```

#### When to Use
| Scenario | Why it Fits |
| :--- | :--- |
| **Legacy Integration** | When you want to use an existing class but its interface does not match the one you need. |
| **Third-Party Libraries** | When integrating a library whose API structure is incompatible with your system's design. |

---

### 2. Decorator Pattern
The Decorator pattern attaches additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.

```csharp
public interface IMessageSender
{
    void Send(string message);
}

public class BaseMessageSender : IMessageSender
{
    public void Send(string message) => Console.WriteLine($"Sending: {message}");
}

// Decorator Base Class
public abstract class MessageDecorator : IMessageSender
{
    protected readonly IMessageSender _wrappedSender;

    protected MessageDecorator(IMessageSender sender)
    {
        _wrappedSender = sender;
    }

    public virtual void Send(string message) => _wrappedSender.Send(message);
}

// Concrete Decorators
public class EncryptingDecorator : MessageDecorator
{
    public EncryptingDecorator(IMessageSender sender) : base(sender) { }

    public override void Send(string message)
    {
        var encrypted = new string(message.Reverse().ToArray()); // Mock encryption
        base.Send($"[Encrypted: {encrypted}]");
    }
}

public class LoggingDecorator : MessageDecorator
{
    public LoggingDecorator(IMessageSender sender) : base(sender) { }

    public override void Send(string message)
    {
        Console.WriteLine("Log: Initiating send operation...");
        base.Send(message);
        Console.WriteLine("Log: Send operation completed.");
    }
}
```

#### When to Use
| Scenario | Why it Fits |
| :--- | :--- |
| **Dynamic Extensions** | When you want to add behaviors to objects at runtime without affecting other instances. |
| **Cross-Cutting Concerns** | When features like logging, encryption, and caching need to be layered onto business logic. |

> [!IMPORTANT]
> The Decorator pattern promotes the Single Responsibility Principle by dividing a large class with multiple behaviors into several smaller, focused decorator classes.

---

## Behavioral Patterns

Behavioral patterns are concerned with algorithms and the assignment of responsibilities between objects.

### 1. Strategy Pattern
The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. Strategy lets the algorithm vary independently from clients that use it.

```csharp
public interface IPaymentStrategy
{
    void ProcessPayment(decimal amount);
}

public class CreditCardPayment : IPaymentStrategy
{
    public void ProcessPayment(decimal amount) => 
        Console.WriteLine($"Paid ${amount} via Credit Card.");
}

public class PayPalPayment : IPaymentStrategy
{
    public void ProcessPayment(decimal amount) => 
        Console.WriteLine($"Paid ${amount} via PayPal.");
}

// Context
public class CheckoutService
{
    private IPaymentStrategy _paymentStrategy;

    public void SetPaymentStrategy(IPaymentStrategy strategy)
    {
        _paymentStrategy = strategy;
    }

    public void CompleteCheckout(decimal amount)
    {
        if (_paymentStrategy == null)
            throw new InvalidOperationException("Payment strategy is not set.");
            
        _paymentStrategy.ProcessPayment(amount);
    }
}
```

#### When to Use
| Scenario | Why it Fits |
| :--- | :--- |
| **Conditional Algorithms** | When you have many conditional statements (`if-else` or `switch`) selecting different behaviors. |
| **Runtime Selection** | When your application needs to select or swap out algorithms dynamically at runtime. |

---

### 2. Observer Pattern
The Observer pattern defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.

```csharp
// Observer Interface
public interface ISubscriber
{
    void Update(string stockSymbol, decimal price);
}

// Subject Interface
public interface IStockTicker
{
    void Register(ISubscriber subscriber);
    void Unregister(ISubscriber subscriber);
    void Notify();
}

// Concrete Subject
public class StockTicker : IStockTicker
{
    private readonly List<ISubscriber> _subscribers = new();
    private string _symbol = "";
    private decimal _price;

    public void UpdatePrice(string symbol, decimal price)
    {
        _symbol = symbol;
        _price = price;
        Notify();
    }

    public void Register(ISubscriber subscriber) => _subscribers.Add(subscriber);
    public void Unregister(ISubscriber subscriber) => _subscribers.Remove(subscriber);

    public void Notify()
    {
        foreach (var subscriber in _subscribers)
        {
            subscriber.Update(_symbol, _price);
        }
    }
}

// Concrete Observer
public class PortfolioViewer : ISubscriber
{
    public void Update(string stockSymbol, decimal price) => 
        Console.WriteLine($"[Dashboard] {stockSymbol} updated to ${price}");
}
```

#### When to Use
| Scenario | Why it Fits |
| :--- | :--- |
| **Event-Driven Architectures** | When changes to one object require changing others, and you don't know how many objects need to change. |
| **Decoupling Components** | When an object needs to notify other objects without making assumptions about who they are. |

> [!TIP]
> In C#, the Observer pattern is natively supported at the language level using **Events and Delegates**, or via reactive libraries like the **Reactive Extensions (Rx.NET)** using `IObservable<T>` and `IObserver<T>`.

---

## Design Pattern Summary Matrix

| Design Pattern | Category | Complexity | Primary Use Case |
| :--- | :--- | :--- | :--- |
| **Singleton** | Creational | Low | Global single-point resource coordinator. |
| **Factory Method** | Creational | Medium | Decoupled dynamic object instantiation. |
| **Builder** | Creational | Medium | Step-by-step creation of complex data models. |
| **Adapter** | Structural | Low | Interfacing incompatible class structures. |
| **Decorator** | Structural | Medium | Layered behavior modification without inheritance. |
| **Strategy** | Behavioral | Low | Swapping algorithms or processing routines. |
| **Observer** | Behavioral | Medium | Event-driven component state notifications. |
