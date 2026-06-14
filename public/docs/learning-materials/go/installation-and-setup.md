# Go Installation & Setup

Go (often referred to as **Golang**) is an open-source programming language developed by Google (designed by Robert Griesemer, Rob Pike, and Ken Thompson) in 2007 and launched in 2009. It was designed to address software engineering challenges at Google: namely, codebases growing too large, compilation times taking too long, and concurrency being difficult to manage in language ecosystems like C++ and Java.

Go is compiled, statically typed, garbage-collected, and features native, high-performance concurrency primitives.

---

## 1. Setting Up Go

Before you start writing Go code, you need to install the Go compiler and toolchain on your machine. Go supports Windows, macOS, and Linux out of the box.

### macOS Installation

You can install Go on macOS using either the official package installer or the Homebrew package manager.

#### Option A: Using Homebrew (Recommended)
If you have Homebrew installed, open your terminal and run:
```bash
brew install go
```
Homebrew automatically configures the environment paths for you.

#### Option B: Official Installer
1. Download the macOS package installer (`.pkg`) from the [Official Go Downloads page](https://go.dev/dl/).
2. Run the installer and follow the prompt instructions. It installs Go to `/usr/local/go`.
3. Open your shell configuration file (e.g., `~/.zshrc` or `~/.bash_profile`) and add the path to your bin directory:
   ```bash
   export PATH=$PATH:/usr/local/go/bin
   ```
4. Save the file and reload the shell configuration: `source ~/.zshrc` (or `source ~/.bash_profile`).

---

### Windows Installation

You can install Go on Windows using the official installer or the Windows Package Manager (`winget`).

#### Option A: Official MSI Installer
1. Download the MSI installer from the [Official Go Downloads page](https://go.dev/dl/).
2. Double-click the `.msi` file and follow the prompts to install Go (defaults to `C:\Program Files\Go`).
3. The installer automatically adds the Go binary directory (`C:\Program Files\Go\bin`) to your System Path environment variable. You may need to restart your terminal or PC for the changes to take effect.

#### Option B: Using Winget
If you use the Windows Package Manager, open Command Prompt or PowerShell and run:
```cmd
winget install GoLang.Go
```

---

### Linux Installation

To install Go on Linux, you download the compressed tarball and extract it to the recommended location:

1. Download the Linux tarball (e.g., `go1.XX.X.linux-amd64.tar.gz`) from the [Official Go Downloads page](https://go.dev/dl/).
2. Extract the archive into `/usr/local` (this typically requires root permissions):
   ```bash
   sudo rm -rf /usr/local/go && sudo tar -C /usr/local -xzf go1.XX.X.linux-amd64.tar.gz
   ```
   *(Replace `go1.XX.X.linux-amd64.tar.gz` with your downloaded filename.)*
3. Add the Go binary path to your system's environment variables. Open `~/.profile` or `~/.bashrc` and add the following line:
   ```bash
   export PATH=$PATH:/usr/local/go/bin
   ```
4. Apply the changes by running:
   ```bash
   source ~/.profile
   ```

---

### Verifying the Installation

Open your terminal (macOS/Linux) or Command Prompt/PowerShell (Windows) and type:

```bash
go version
```

You should see output similar to this:
`go version go1.22.4 darwin/arm64` (depending on your operating system, Go version, and architecture).

> [!TIP]
> You can view all active Go environment variables by running `go env`. The most important ones are:
> - **`GOROOT`**: The directory where the Go SDK is installed.
> - **`GOPATH`**: The directory where your workspace, downloaded packages, and built binaries reside (defaults to `~/go`).

---

## 2. Your First Go Program

Let's write a simple "Hello, World!" application to verify your setup and understand the structure of a Go program.

### Step 1: Create a Workspace Directory
Create a new directory for your project and navigate into it:
```bash
mkdir hello-go
cd hello-go
```

### Step 2: Initialize a Go Module
Every Go project should begin with a module definition. This tracks your dependencies. Initialize it using:
```bash
go mod init hello-go
```
This creates a `go.mod` file in your directory.

### Step 3: Create the Source File
Create a file named `main.go` and paste the following code:

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, Go!")
}
```

### Step 4: Run the Code
To run the code directly without generating a binary on disk, run:
```bash
go run main.go
```
*Output:*
```text
Hello, Go!
```

### Step 5: Build a Binary
To compile your application into a standalone executable:
```bash
go build main.go
```
This produces a compiled binary (e.g., `main` on macOS/Linux, or `main.exe` on Windows) in the current directory which you can execute directly:
```bash
./main
```

---

## 3. Structure of a Go File

Let's dissect the simple program above:

1. **`package main`**: Tells the Go compiler that this file belongs to the `main` package, which is the starting point of any executable program. If you are writing a library, the package name will match the directory name.
2. **`import "fmt"`**: Imports the `fmt` (Format) package from the Go standard library. This package is used to format and output text, scan inputs, and print to console.
3. **`func main()`**: The `main` function is the entry point of the executable. It takes no arguments and returns nothing. Execution starts here.

---

## 4. Next Steps & Code Hygiene

To ensure clean Go code:
- Run **`go fmt`** inside your directory to automatically format your code according to Go styling conventions.
- Always use **`go mod tidy`** to add missing module dependencies and clean up unused ones from your `go.mod` and `go.sum` files.
