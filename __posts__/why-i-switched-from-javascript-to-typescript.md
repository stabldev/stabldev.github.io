---
title: Why I Switched from JavaScript to TypeScript
description: A developer's take on moving to TypeScript and never looking back.
pubDate: 2025-07-01
---

## Goodbye JavaScript, Hello Type Safety

After years of writing JavaScript, I finally gave TypeScript a serious try — and wow, I should’ve done this sooner.

Let me walk you through what changed my mind, how the learning curve felt, and the biggest benefits I’ve seen so far.

> Spoiler: strict mode is a blessing.

---

### What Made Me Switch?

I hit a wall when I started working on a larger project. JS didn’t complain, but runtime did.

Here's a typical issue I faced:

```js
function getUser(id) {
  return fetch(`/api/user/${id}`).then(res => res.json());
}

// Later...
const user: User = getUser(42); // ❌ TypeError: .then is not a function
```

It turns out `getUser` returned a Promise, but I forgot to `await` it. TypeScript would’ve caught that!

---

### What I Like About TypeScript

- **Type safety** saves me from dumb mistakes.
- **Editor IntelliSense** is actually useful now.
- **Better refactoring** — I feel more confident moving code around.

Inline types like `const id: number = 123` are just the beginning.

You can also define full-blown interfaces:

```ts
interface User {
  id: number;
  name: string;
  email?: string;
}
```

---

### The Learning Curve

At first, all the red squiggly lines were annoying. But once I learned to interpret them, it felt like having a pair programmer.

If you’re just starting out, here’s what helped me:

1. Don’t try to convert everything at once.
2. Use `tsc --noEmit` to find type issues.
3. Use `any` when you’re stuck — then fix it later.

---

### Final Thoughts

Switching to TypeScript felt like going from a sketchpad to a real design tool. It’s still JavaScript underneath — but now I have guardrails.

> “Move fast **and** don’t break things.”

If you're on the fence, just try converting one file in your project — maybe `utils.js` — and see what happens.

[Here’s a great migration guide](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html) if you're curious.
