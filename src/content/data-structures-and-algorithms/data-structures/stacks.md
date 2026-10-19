{
  "slug": "stacks",
  "title": "Stacks",
  "description": "Last-in, first-out ordering, stack operations, and balanced parentheses.",
  "category": "Backend & Data",
  "tags": [
    "Data structures",
    "Algorithms"
  ],
  "date": "2026-10-19",
  "chapter": {
    "parent": "data-structures-and-algorithms",
    "order": 7,
    "section": "Data Structures"
  },
  "kind": "article"
}
---
## What is a stack?

A **stack** stores ordered items, but its interface is more restrictive than a list. You add and remove items only at the top.

### Last in, first out

Imagine a stack of plates: taking the top plate is straightforward, while reaching one at the bottom requires removing the plates above it.

That behavior is called **LIFO: last in, first out**. The most recently added item is the first one removed.

## Stack operations and speed

A stack exposes a small set of operations:

| Operation | Time complexity | Description |
| --- | --- | --- |
| `push` | `O(1)`* | Add an item to the top. |
| `pop` | `O(1)`* | Remove and return the top item. |
| `peek` | `O(1)` | Return the top item without removing it. |
| `size` | `O(1)` | Return the number of items. |

*These bounds depend on the implementation. A linked-node stack can support constant-time pushes and pops. With a Python list, pushing with `append()` is amortized `O(1)` because resizing is occasionally necessary; popping from the end is also amortized `O(1)`.*

### Why restrict the operations?

A stack offers fewer operations than a list on purpose. Its interface matches tasks that need access only to the most recent item, making the intended ordering explicit.

The standard stack interface does not provide searching, sorting, or random access.

### The cost of reaching the bottom

Individual stack operations can be constant time, but a task may require many operations. Reaching the bottom of a stack with `n` items requires up to `n` pops, taking `O(n)` time overall.

## Where stacks are used

- Function call management.
- Undo and redo functionality.
- Expression evaluation.
- Browser history.

A stack can store different types of values. Its behavior, rather than the type of its contents, defines the abstract data type.

## Example: balanced parentheses

The following example from the notes assumes a separate `Stack` class with `push()`, `pop()`, and `size()` methods. That class is not included in this snippet.

```python
from stack import Stack


def is_balanced(input_str: str) -> bool:
    stack = Stack()

    for char in input_str:
        if char == '(':
            stack.push(char)

        if stack.size() == 0 and char == ')':
            return False

        if char == ')':
            stack.pop()

    return stack.size() == 0
```

### Following the example

1. Push each opening parenthesis onto the stack.
2. If a closing parenthesis has no matching opening parenthesis, return `False`.
3. Otherwise, pop the matching opening parenthesis.
4. At the end, the parentheses are balanced only if the stack is empty.

Other characters are ignored. This example checks parentheses only, rather than every kind of bracket.
