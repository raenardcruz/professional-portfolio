# RabbitMQ Messaging Patterns with Go

A comprehensive developer's guide to implementing fundamental messaging patterns and establishing highly reliable, fault-tolerant communication pipelines in Go using the official `github.com/rabbitmq/amqp091-go` library.

---

## Prerequisites & Setup

Ensure you have initialized your Go module and imported the official, active RabbitMQ library:

```bash
go get github.com/rabbitmq/amqp091-go
```

> [!NOTE]
> Always use `github.com/rabbitmq/amqp091-go` instead of the legacy `github.com/streadway/amqp` library, which is no longer actively maintained.

---

## 1. Default (Direct) Exchange

### Concept
The **Default Exchange** is a pre-declared, nameless (`""`) direct exchange. When you publish a message to the default exchange, it is automatically routed to the queue whose name exactly matches the message's routing key. 

```mermaid
graph LR
    P[Producer] -->|Routing Key: 'tasks'| EX(Default Exchange)
    EX -->|Matches Name| Q[Queue: 'tasks']
    Q --> C[Consumer]
```

*   **When to Use**: Simple task queues, load balancing intensive jobs across identical workers (work-queue model), or standard point-to-point communication.

### Go Implementation

#### Producer
```go
package main

import (
	"context"
	"log"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
)

func main() {
	conn, err := amqp.Dial("amqp://admin:cluster-secret@localhost:5672/")
	if err != nil {
		log.Fatalf("Failed to connect: %v", err)
	}
	defer conn.Close()

	ch, err := conn.Channel()
	if err != nil {
		log.Fatalf("Failed to open channel: %v", err)
	}
	defer ch.Close()

	// Declare a queue
	q, err := ch.QueueDeclare(
		"task_queue", // name
		true,         // durable
		false,        // delete when unused
		false,        // exclusive
		false,        // no-wait
		nil,          // arguments
	)
	if err != nil {
		log.Fatalf("Failed to declare queue: %v", err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	body := "Hello World!"
	err = ch.PublishWithContext(ctx,
		"",     // exchange (empty = default exchange)
		q.Name, // routing key (matches queue name)
		false,  // mandatory
		false,  // immediate
		amqp.Publishing{
			DeliveryMode: amqp.Persistent,
			ContentType:  "text/plain",
			Body:         []byte(body),
		})
	if err != nil {
		log.Fatalf("Failed to publish: %v", err)
	}
	log.Printf(" [x] Sent %s", body)
}
```

#### Consumer
```go
package main

import (
	"log"

	amqp "github.com/rabbitmq/amqp091-go"
)

func main() {
	conn, err := amqp.Dial("amqp://admin:cluster-secret@localhost:5672/")
	if err != nil {
		log.Fatalf("Failed to connect: %v", err)
	}
	defer conn.Close()

	ch, err := conn.Channel()
	if err != nil {
		log.Fatalf("Failed to open channel: %v", err)
	}
	defer ch.Close()

	q, err := ch.QueueDeclare("task_queue", true, false, false, false, nil)
	if err != nil {
		log.Fatalf("Failed to declare queue: %v", err)
	}

	msgs, err := ch.Consume(
		q.Name, // queue
		"",     // consumer tag (empty yields auto-generated name)
		true,   // auto-ack (true for simple, false for reliable)
		false,  // exclusive
		false,  // no-local
		false,  // no-wait
		nil,    // args
	)
	if err != nil {
		log.Fatalf("Failed to register consumer: %v", err)
	}

	forever := make(chan bool)
	go func() {
		for d := range msgs {
			log.Printf("Received message: %s", d.Body)
		}
	}()

	log.Printf(" [*] Waiting for messages. To exit press CTRL+C")
	<-forever
}
```

---

## 2. Fanout Exchange

### Concept
A **Fanout Exchange** ignores the routing key completely. It duplicates and broadcasts every published message to all queues that are bound to it.

```mermaid
graph TD
    P[Producer] --> EX(Fanout Exchange)
    EX --> Q1[Queue A]
    EX --> Q2[Queue B]
    Q1 --> C1[Consumer 1]
    Q2 --> C2[Consumer 2]
```

*   **When to Use**: Publish/Subscribe scenarios where multiple decoupled services need to react to the same event simultaneously (e.g., broadcasting a user signup event to update the analytics database, send a welcome email, and generate user avatars).

### Go Implementation

#### Producer
```go
package main

import (
	"context"
	"log"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
)

func main() {
	conn, err := amqp.Dial("amqp://admin:cluster-secret@localhost:5672/")
	if err != nil {
		log.Fatalf("Failed to connect: %v", err)
	}
	defer conn.Close()

	ch, err := conn.Channel()
	if err != nil {
		log.Fatalf("Failed to open channel: %v", err)
	}
	defer ch.Close()

	// Declare Fanout Exchange
	err = ch.ExchangeDeclare(
		"logs_fanout", // name
		"fanout",      // type
		true,          // durable
		false,         // auto-deleted
		false,         // internal
		false,         // no-wait
		nil,           // arguments
	)
	if err != nil {
		log.Fatalf("Failed to declare exchange: %v", err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	body := "Broadcast update details"
	err = ch.PublishWithContext(ctx,
		"logs_fanout", // exchange
		"",            // routing key (ignored by fanout)
		false,
		false,
		amqp.Publishing{
			ContentType: "text/plain",
			Body:        []byte(body),
		})
	if err != nil {
		log.Fatalf("Failed to publish: %v", err)
	}
	log.Printf("Sent broadcast: %s", body)
}
```

#### Consumer
```go
package main

import (
	"log"

	amqp "github.com/rabbitmq/amqp091-go"
)

func main() {
	conn, err := amqp.Dial("amqp://admin:cluster-secret@localhost:5672/")
	if err != nil {
		log.Fatalf("Failed to connect: %v", err)
	}
	defer conn.Close()

	ch, err := conn.Channel()
	if err != nil {
		log.Fatalf("Failed to open channel: %v", err)
	}
	defer ch.Close()

	err = ch.ExchangeDeclare("logs_fanout", "fanout", true, false, false, false, nil)
	if err != nil {
		log.Fatalf("Exchange declaration failed: %v", err)
	}

	// Declare a temporary queue with a random name
	q, err := ch.QueueDeclare("", false, true, true, false, nil)
	if err != nil {
		log.Fatalf("Queue declaration failed: %v", err)
	}

	// Bind queue to the fanout exchange
	err = ch.QueueBind(q.Name, "", "logs_fanout", false, nil)
	if err != nil {
		log.Fatalf("Failed to bind queue: %v", err)
	}

	msgs, err := ch.Consume(q.Name, "", true, false, false, false, nil)
	if err != nil {
		log.Fatalf("Consume registration failed: %v", err)
	}

	forever := make(chan bool)
	go func() {
		for d := range msgs {
			log.Printf("Received Broadcast: %s", d.Body)
		}
	}()

	log.Printf(" [*] Waiting for broadcasts. To exit press CTRL+C")
	<-forever
}
```

---

## 3. Selective Direct Exchange

### Concept
A custom **Direct Exchange** matches routing keys exactly. Multiple queues can bind to the same exchange with different routing keys. A single queue can also bind with multiple keys.

```mermaid
graph TD
    P[Producer] -->|Routing Key: 'error'| EX(Direct Exchange)
    EX -->|Routes 'error'| Q1[Queue: 'error-logs']
    EX -->|Routes 'info'| Q2[Queue: 'all-logs']
```

*   **When to Use**: Selective message routing. For example, routing `error` logs to a notifications system while routing `info` and `warning` logs to a standard log storage system.

### Go Implementation

#### Producer
```go
package main

import (
	"context"
	"log"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
)

func main() {
	conn, err := amqp.Dial("amqp://admin:cluster-secret@localhost:5672/")
	if err != nil {
		log.Fatalf("Failed to connect: %v", err)
	}
	defer conn.Close()

	ch, err := conn.Channel()
	if err != nil {
		log.Fatalf("Failed to open channel: %v", err)
	}
	defer ch.Close()

	err = ch.ExchangeDeclare("direct_logs", "direct", true, false, false, false, nil)
	if err != nil {
		log.Fatalf("Exchange failed: %v", err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Selectively publishing to "error"
	severity := "error"
	body := "CRITICAL: Database connection failed!"

	err = ch.PublishWithContext(ctx,
		"direct_logs", // exchange
		severity,      // routing key (selective key)
		false,
		false,
		amqp.Publishing{
			ContentType: "text/plain",
			Body:        []byte(body),
		})
	if err != nil {
		log.Fatalf("Failed to publish: %v", err)
	}
	log.Printf("Sent [%s] message: %s", severity, body)
}
```

#### Consumer
```go
package main

import (
	"log"
	"os"

	amqp "github.com/rabbitmq/amqp091-go"
)

func main() {
	conn, err := amqp.Dial("amqp://admin:cluster-secret@localhost:5672/")
	if err != nil {
		log.Fatalf("Failed to connect: %v", err)
	}
	defer conn.Close()

	ch, err := conn.Channel()
	if err != nil {
		log.Fatalf("Failed to open channel: %v", err)
	}
	defer ch.Close()

	err = ch.ExchangeDeclare("direct_logs", "direct", true, false, false, false, nil)
	if err != nil {
		log.Fatalf("Exchange declaration failed: %v", err)
	}

	q, err := ch.QueueDeclare("", false, true, true, false, nil)
	if err != nil {
		log.Fatalf("Queue declaration failed: %v", err)
	}

	// Read routing keys from command-line arguments (e.g. go run main.go info error)
	severities := os.Args[1:]
	if len(severities) < 1 {
		log.Printf("Usage: %s [info] [warning] [error]", os.Args[0])
		os.Exit(1)
	}

	// Bind queue to each selected key
	for _, severity := range severities {
		err = ch.QueueBind(q.Name, severity, "direct_logs", false, nil)
		if err != nil {
			log.Fatalf("Failed to bind queue with key %s: %v", severity, err)
		}
		log.Printf("Bound queue to key: %s", severity)
	}

	msgs, err := ch.Consume(q.Name, "", true, false, false, false, nil)
	if err != nil {
		log.Fatalf("Consume failed: %v", err)
	}

	forever := make(chan bool)
	go func() {
		for d := range msgs {
			log.Printf("Received [%s]: %s", d.RoutingKey, d.Body)
		}
	}()

	<-forever
}
```

---

## 4. Topic Exchange

### Concept
A **Topic Exchange** routes messages matching complex patterns based on dot-separated words.

*   `*` (star) matches exactly **one** word.
*   `#` (hash) matches **zero or more** words.

```mermaid
graph TD
    P[Producer] -->|Key: 'eu.orders.payments'| EX(Topic Exchange)
    EX -->|Pattern: '*.orders.#'| Q1[Queue: Order Handler]
    EX -->|Pattern: '#.payments'| Q2[Queue: Payment Processor]
```

*   **When to Use**: Dynamic and granular subscriptions (e.g., subscribing to all payment events globally `#.payments`, or targeting regional operations specifically `eu.*.orders`).

### Go Implementation

#### Producer
```go
package main

import (
	"context"
	"log"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
)

func main() {
	conn, err := amqp.Dial("amqp://admin:cluster-secret@localhost:5672/")
	if err != nil {
		log.Fatalf("Failed to connect: %v", err)
	}
	defer conn.Close()

	ch, err := conn.Channel()
	if err != nil {
		log.Fatalf("Failed to open channel: %v", err)
	}
	defer ch.Close()

	err = ch.ExchangeDeclare("topic_logs", "topic", true, false, false, false, nil)
	if err != nil {
		log.Fatalf("Exchange failed: %v", err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	routingKey := "eu.order.checkout"
	body := "Order #1234 completed in EU region."

	err = ch.PublishWithContext(ctx,
		"topic_logs",
		routingKey,
		false,
		false,
		amqp.Publishing{
			ContentType: "text/plain",
			Body:        []byte(body),
		})
	if err != nil {
		log.Fatalf("Failed to publish: %v", err)
	}
	log.Printf("Sent [%s] message: %s", routingKey, body)
}
```

#### Consumer
```go
package main

import (
	"log"
	"os"

	amqp "github.com/rabbitmq/amqp091-go"
)

func main() {
	conn, err := amqp.Dial("amqp://admin:cluster-secret@localhost:5672/")
	if err != nil {
		log.Fatalf("Failed to connect: %v", err)
	}
	defer conn.Close()

	ch, err := conn.Channel()
	if err != nil {
		log.Fatalf("Failed to open channel: %v", err)
	}
	defer ch.Close()

	err = ch.ExchangeDeclare("topic_logs", "topic", true, false, false, false, nil)
	if err != nil {
		log.Fatalf("Exchange failure: %v", err)
	}

	q, err := ch.QueueDeclare("", false, true, true, false, nil)
	if err != nil {
		log.Fatalf("Queue declaration failure: %v", err)
	}

	// Binding keys, e.g., "*.order.*" or "eu.#"
	bindingKeys := os.Args[1:]
	if len(bindingKeys) < 1 {
		log.Printf("Usage: %s [binding_key]...", os.Args[0])
		os.Exit(1)
	}

	for _, key := range bindingKeys {
		err = ch.QueueBind(q.Name, key, "topic_logs", false, nil)
		if err != nil {
			log.Fatalf("Failed to bind queue with key %s: %v", key, err)
		}
		log.Printf("Bound queue to topic pattern: %s", key)
	}

	msgs, err := ch.Consume(q.Name, "", true, false, false, false, nil)
	if err != nil {
		log.Fatalf("Consumer execution failed: %v", err)
	}

	forever := make(chan bool)
	go func() {
		for d := range msgs {
			log.Printf("Received topic event [%s]: %s", d.RoutingKey, d.Body)
		}
	}()

	<-forever
}
```

---

## 5. Reliable Communication

### Concept
To achieve **reliable delivery** where messages are guaranteed not to be lost under server crash, network outage, or consumer failure, we must orchestrate three mechanisms:

1.  **Durable Assets**: Queues and Exchanges are declared as `durable: true`.
2.  **Persistent Messages**: Messages are published with `amqp.Persistent` delivery mode.
3.  **Publisher Confirms**: The producer waits for confirmation from the broker before deleting local states.
4.  **Manual Consumer Acknowledgements**: The consumer processes the message and explicitly triggers `d.Ack(false)`. If the consumer crashes before doing this, RabbitMQ re-queues the message.

```mermaid
sequenceDiagram
    participant P as Producer
    participant B as Broker (RabbitMQ)
    participant C as Consumer
    
    Note over P,B: Publisher Confirm Flow
    P->>B: Publish Persistent Message
    Note over B: Save to Disk
    B-->>P: Ack (Publish Confirm)
    
    Note over B,C: Reliable Consumer Flow
    B->>C: Deliver Message
    Note over C: Process Message
    C->>B: Manual Ack (Message Resolved)
    Note over B: Remove from Queue
```

*   **When to Use**: High-value tasks, financial transactions, order processing, state change synchronization.

### Go Implementation

```go
package main

import (
	"context"
	"log"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
)

func main() {
	conn, err := amqp.Dial("amqp://admin:cluster-secret@localhost:5672/")
	if err != nil {
		log.Fatalf("Connection failed: %v", err)
	}
	defer conn.Close()

	ch, err := conn.Channel()
	if err != nil {
		log.Fatalf("Channel failure: %v", err)
	}
	defer ch.Close()

	// 1. Durability: Declare Durable Queue
	q, err := ch.QueueDeclare(
		"reliable_queue",
		true,  // durable
		false, // auto-delete
		false, // exclusive
		false, // no-wait
		nil,
	)
	if err != nil {
		log.Fatalf("Queue declaration failed: %v", err)
	}

	// 2. Put channel in Confirm mode (Publisher Confirms)
	if err := ch.Confirm(false); err != nil {
		log.Fatalf("Failed to put channel into confirm mode: %v", err)
	}

	// Monitor confirms asynchronously
	confirmChan := ch.NotifyPublish(make(chan amqp.Confirmation, 1))

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	body := "Persistent, transaction-critical data"

	// 3. Publish Persistent Message
	err = ch.PublishWithContext(ctx,
		"",     // default exchange
		q.Name, // routing key
		false,  // mandatory
		false,  // immediate
		amqp.Publishing{
			DeliveryMode: amqp.Persistent, // Persistent Delivery
			ContentType:  "text/plain",
			Body:         []byte(body),
		})
	if err != nil {
		log.Fatalf("Publish request failed: %v", err)
	}

	// Wait for Publisher Confirm
	select {
	case confirmed := <-confirmChan:
		if confirmed.Ack {
			log.Printf("Successfully received publish confirmation: Message successfully disk-written!")
		} else {
			log.Printf("Warning: Publish received Nack (Negative acknowledgement) from RabbitMQ server.")
		}
	case <-time.After(2 * time.Second):
		log.Printf("Timed out waiting for server publish confirmation.")
	}

	// 4. Reliable Consumer Execution
	msgs, err := ch.Consume(
		q.Name,
		"",
		false, // manual-ack (auto-ack set to FALSE for reliability)
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		log.Fatalf("Consumer binding failed: %v", err)
	}

	go func() {
		for d := range msgs {
			log.Printf("Processing critical task: %s", d.Body)
			
			// Simulate work
			time.Sleep(500 * time.Millisecond)

			// Send consumer acknowledgement
			err := d.Ack(false) // false means ack only this specific message
			if err != nil {
				log.Printf("Error sending manual Ack: %v", err)
			} else {
				log.Printf("Consumer manually Acknowledged task resolution.")
			}
		}
	}()

	// Keep running
	select {}
}
```
