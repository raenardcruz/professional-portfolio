# Go Project Layout & Design Patterns

Structuring scalable, maintainable codebases is critical in Go. Unlike frameworks in other languages that dictate project organization, Go leaves structuring decisions to the developer. Over time, the Go community has evolved standard directory layouts and design patterns suited to Go’s unique type system, explicit error handling, and concurrency model.

This guide covers modern Go folder structures for scalable projects and the essential design patterns used in professional Go applications.

---

## 1. Standard Go Project Directory Layout

The most widely accepted directory layout in the Go community is based on the [Standard Go Project Layout](https://github.com/golang-standards/project-layout). It separates entry points, private application code, public libraries, and configuration files.

Below is the recommended structure for a scalable, production-ready Go project:

```text
my-project/
├── api/                  # API contracts, OpenAPI definitions, or Protobuf/gRPC specs
├── cmd/                  # Entry points. Each subfolder corresponds to a compiled binary
│   ├── api-server/
│   │   └── main.go       # Starts the HTTP/gRPC server
│   └── worker/
│       └── main.go       # Starts background processors/cron tasks
├── configs/              # Configuration files (YAML, JSON, ENV) or configuration templates
├── deployments/          # Deployment configurations (Dockerfiles, Kubernetes manifests, Terraform)
├── internal/             # Private application code. Code here cannot be imported by external projects
│   ├── auth/             # Modular domain package: Authentication
│   │   ├── handler.go    # HTTP/gRPC handlers (transport layer)
│   │   ├── service.go    # Business logic implementation
│   │   ├── repository.go # Database operations/interfaces (data access layer)
│   │   └── model.go      # Domain structures
│   ├── database/         # Database client connection setup (PostgreSQL, Redis, etc.)
│   ├── middleware/       # Custom HTTP/gRPC middlewares (logging, CORS, recovery)
│   └── config/           # Application configuration loading logic
├── pkg/                  # Public library code. Safe for external projects to import
│   └── logger/           # Reusable custom logger wrapper
├── scripts/              # Helper scripts for building, testing, linting, or database migrations
├── test/                 # Integration tests, system tests, and test mocks
├── go.mod                # Go module definition
└── go.sum                # Dependency checksums
```

### Core Directory Purposes

| Directory | Scope | Purpose |
| :--- | :--- | :--- |
| `/cmd` | Entry points | Keep files here minimal. Only write code that sets up configurations, initializes dependencies (wiring), and starts the application. Avoid writing business logic here. |
| `/internal` | Private | Code inside `/internal` is protected by the Go compiler. Other Go projects cannot import packages inside this folder. This prevents internal implementations from leaking as public APIs. |
| `/pkg` | Public | Only place code here that you explicitly want to share with other projects (e.g., shared utilities, SDK clients). If in doubt, place it in `/internal` first. |
| `/api` | Interfaces | Houses API specs, OpenAPI schema files, and code generated from Protobuf definitions. |

---

## 2. Monolithic vs. Domain-Driven Layouts

Within the `/internal` directory, there are different strategies for structuring application files. The choice depends on the size and complexity of your project.

### Option A: Layered (Horizontal) Structure
This approach groups code by technical layers:
```text
internal/
├── handlers/   # HTTP controllers
├── services/   # Business logic
└── models/     # Database models
```
* **Pros**: Simple to understand; common in MVC frameworks.
* **Cons**: As the application grows, circular dependencies become common. Developers must search across multiple directories to make changes to a single feature (e.g., adding a new field to a User).

### Option B: Domain-Driven (Vertical / Modular) Structure
This approach organizes code by business domain (e.g., `user`, `order`, `billing`). Each folder owns its transport handlers, business logic, models, and database interfaces:
```text
internal/
├── user/
│   ├── handler.go
│   ├── service.go
│   ├── repository.go
│   └── model.go
├── order/
│   ├── handler.go
│   └── ...
```
* **Pros**: Strong boundaries between features, eliminates circular dependencies, and simplifies scaling codebases.
* **Cons**: Requires discipline to define clean boundaries and model interfaces between domains.

> [!TIP]
> **Use Modular Structures for Scalability**: For medium-to-large projects, choose the domain-driven modular structure. It makes it easier to split parts of a monolith into microservices later since the business boundaries are already defined.

---

## 3. Essential Go Design Patterns

Go does not support class inheritance, making many traditional OOP design patterns redundant. Instead, Go leverages composition, implicit interfaces, and first-class functions.

### Functional Options Pattern

Constructors in Go cannot be overloaded. The Functional Options pattern allows you to write APIs with sensible defaults and highly customizable configurations.

```go
package main

import (
	"fmt"
	"time"
)

// Server defines our application server configuration.
type Server struct {
	Host    string
	Port    int
	Timeout time.Duration
}

// Option defines a function type that modifies a Server.
type Option func(*Server)

// WithPort configures a custom port.
func WithPort(port int) Option {
	return func(s *Server) {
		s.Port = port
	}
}

// WithTimeout configures a custom timeout.
func WithTimeout(timeout time.Duration) Option {
	return func(s *Server) {
		s.Timeout = timeout
	}
}

// NewServer initializes a Server with default values and applies custom options.
func NewServer(host string, opts ...Option) *Server {
	// 1. Define defaults
	srv := &Server{
		Host:    host,
		Port:    8080,
		Timeout: 30 * time.Second,
	}

	// 2. Apply options override
	for _, opt := range opts {
		opt(srv)
	}

	return srv
}

func main() {
	// Instance 1: Uses default configuration
	srvDefault := NewServer("localhost")
	fmt.Printf("Default Server: %+v\n", srvDefault)

	// Instance 2: Customized configuration using functional options
	srvCustom := NewServer(
		"127.0.0.1",
		WithPort(9000),
		WithTimeout(15*time.Second),
	)
	fmt.Printf("Custom Server: %+v\n", srvCustom)
}
```

---

### Dependency Injection (DI) & Clean Architecture

In Go, Dependency Injection is handled simply by passing dependencies into constructors (e.g., `NewService`). This decouples packages and enables unit testing using mocks.

```go
package domain

import "errors"

// 1. Define the Domain Model
type Product struct {
	ID    string
	Name  string
	Price float64
}

// 2. Define the Interface (Port)
// The business logic layer defines what data access methods it needs.
type ProductRepository interface {
	GetByID(id string) (*Product, error)
	Save(product *Product) error
}

// 3. Implement the Business Logic Layer (Use Cases)
type ProductService struct {
	repo ProductRepository // Injected interface dependency
}

// Constructor injects the repository interface
func NewProductService(r ProductRepository) *ProductService {
	return &ProductService{repo: r}
}

func (s *ProductService) CreateProduct(p *Product) error {
	if p.Price <= 0 {
		return errors.New("price must be greater than zero")
	}
	return s.repo.Save(p)
}
```

> [!NOTE]
> Since `ProductRepository` is an interface, you can easily mock it in unit tests. The implementation of the repository (e.g., PostgreSQL or MongoDB database adapters) remains separated in another package, isolating the business core from external infrastructure.

---

### Repository Pattern

The Repository Pattern separates data retrieval logic from business logic. The service interacts with a Repository interface, and the concrete implementation handles database queries.

```go
package repository

import (
	"database/sql"
	"domain"
)

// PostgresProductRepository implements the domain.ProductRepository interface.
type PostgresProductRepository struct {
	db *sql.DB
}

func NewPostgresProductRepository(db *sql.DB) *PostgresProductRepository {
	return &PostgresProductRepository{db: db}
}

func (r *PostgresProductRepository) GetByID(id string) (*domain.Product, error) {
	query := "SELECT id, name, price FROM products WHERE id = $1"
	row := r.db.QueryRow(query, id)

	var p domain.Product
	err := row.Scan(&p.ID, &p.Name, &p.Price)
	if err != nil {
		return nil, err
	}
	return &p, nil
}

func (r *PostgresProductRepository) Save(p *domain.Product) error {
	query := "INSERT INTO products (id, name, price) VALUES ($1, $2, $3)"
	_, err := r.db.Exec(query, p.ID, p.Name, p.Price)
	return err
}
```

---

### Singleton Pattern (Using `sync.Once`)

For global configurations, logging pools, or database connections, you need to ensure a struct is instantiated exactly once, even when accessed by multiple concurrent goroutines. In Go, the thread-safe way to do this is using `sync.Once`.

```go
package database

import (
	"database/sql"
	"fmt"
	"sync"
)

type DatabaseConnection struct {
	Pool *sql.DB
}

var (
	instance *DatabaseConnection
	once     sync.Once
)

// GetInstance returns a thread-safe singleton database connection pool.
func GetInstance(connStr string) (*DatabaseConnection, error) {
	var err error
	once.Do(func() {
		fmt.Println("Connecting to the database...")
		db, dbErr := sql.Open("postgres", connStr)
		if dbErr != nil {
			err = dbErr
			return
		}
		instance = &DatabaseConnection{Pool: db}
	})
	return instance, err
}
```

---

## 4. Go Design Proverbs and Best Practices

When writing and designing Go applications, keep these idiomatic Go proverbs in mind:

### Accept Interfaces, Return Structs
* **Accept Interfaces**: Functions should accept interfaces as parameters. This makes the function flexible and easy to mock during tests.
* **Return Structs**: Functions and constructors should return concrete types (like `*MyStruct` or `MyStruct`) rather than interface types. This allows the caller to determine what methods they need and keeps return values clean and performant.

### Keep Interfaces Small
Go interfaces are implicitly satisfied, which is most powerful when they are small and focused. The standard library demonstrates this:
* `io.Reader` has only one method: `Read(p []byte) (n int, err error)`
* `io.Writer` has only one method: `Write(p []byte) (n int, err error)`

> [!IMPORTANT]
> Avoid creating monolithic interfaces with dozens of methods. Split them up into single-method interfaces and compose them together if necessary.

### Make the Zero Value Useful
Design your structs so they are immediately usable without explicit initialization where possible.
* Example: `sync.Mutex` requires no initialization to use (`var mu sync.Mutex` is ready to go).
* Example: `bytes.Buffer` is ready to write to immediately.
