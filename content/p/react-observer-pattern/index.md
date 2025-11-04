---
title: Understanding the Observer Pattern in React
description: In modern web development, managing state and ensuring different parts of your app stay synchronized can be challenging. The Observer Pattern offers an elegant solution by enabling objects to subscribe to changes and react automatically when those changes occur.
pubDate: 2025-11-04
categories: ["react", "observer", "design-patterns"]
---

## What Is the Observer Pattern?

The observer pattern is a behavioral design pattern that establishes a **one-to-many dependency**: when one object (called the *subject* or *observable*) changes its state,
all its dependents (called *observers*) are notified and updated automatically.

---

## How Does It Work?

* The **observable** maintains a list of subscribers (**observers**).
* Observers **subscribe** to the observable to listen for updates.
* When the observable's state changes, it **notifies** all subscribers.
* Subscribers react accordingly (e.g., update UI, perform actions).

---

## Example in React: Token Store

Suppose we have a React app that manages an authentication token in-memory, and multiple components need to react when this token updates.

### Traditional Approach:

* Components read the token directly from the store.
* When the token updates, only components that re-read it will see the new value, often requiring manual re-rendering or hooks.
* **Issue**: Components may not stay synchronized automatically.

### Observer Pattern Solution:

* Create a shared `TokenStore` with subscribe/unsubscribe/notify methods.
* Components **subscribe** to this store.
* When the token **updates** (e.g., after login), the store **notifies** all subscribers.
* Subscribers update their local state (via React hooks) instantly, keeping the UI in sync.

---

## How it Looks in Code

**TokenStore (Observable):**

```ts title=token-store.ts
class TokenStore {
  private token: string | null = null;
  private subscribers: Array<() => void> = [];

  private notify() {
    this.subscribers.forEach((cb) => {
      cb();
    });
  }

  public get(): string | null {
    return this.token;
  }

  public set(value: string): void {
    if (this.token === value) return;
    this.token = value;
    this.notify();
  }

  public subscribe(cb: () => void) {
    this.subscribers.push(cb);
    return () => {
      this.subscribers = this.subscribers.filter((sub) => sub !== cb);
    };
  }
}

// shared singleton instance
export const tokenStore = new TokenStore();
```

**Component subscribing to token changes:**

```tsx title=home.tsx
import { useEffect, useState } from "react";
import { tokenStore } from "@/lib/token-store";

export default function Home() {
  // TIP:
  // you can create a custom hook for this
  const [token, setToken] = useState(tokenStore.get());

  useEffect(() => {
    const unsubscribe = tokenStore.subscribe((newToken) => {
      setToken(newToken);
    });
    return () => unsubscribe();
  }, []);

  return (
    <span>Token: {token ?? "No Token"}</span>
  );
}
```

---

## Why Use the Observer Pattern in React?

* **Decoupling**: Components do not directly depend on each other but react to changes via `publication`/`subscription`.
* **Reactivity**: Components automatically update when data changes, leading to cleaner, more predictable code.
* **Flexibility**: You can add or remove subscribers on the fly, supporting dynamic and scalable apps.

---

## Final Thoughts

While React's built-in hooks and context provide powerful tools for managing state, the observer pattern can be particularly useful when dealing with event-driven,
asynchronous, or globally shared states—like your token store. It enables components to stay synchronized without tightly coupling them to the data sources.
