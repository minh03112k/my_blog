{
  "slug": "queues",
  "title": "Queues",
  "description": "First-in, first-out ordering and the cost of a list-backed queue.",
  "category": "Backend & Data",
  "tags": [
    "Data structures",
    "Algorithms"
  ],
  "date": "2026-10-19",
  "chapter": {
    "parent": "data-structures-and-algorithms",
    "order": 8,
    "section": "Data Structures"
  },
  "kind": "article"
}
---
## What is a queue?

A **queue** stores ordered items with a restricted interface. Items are added at the **tail** and removed from the **head**.

![Queue diagram showing items entering at the tail and leaving at the head.](/images/data-structures-and-algorithms/queue-order.png)

### First in, first out

Think of people waiting in line to order coffee. The first person to join the line is the first person served.

This behavior is called **FIFO: first in, first out**. Use a queue when items should be processed in their arrival order.

A [stack](#/article/stacks) uses LIFO ordering instead.

## Queue operations and speed

With an implementation designed for efficient access to both ends, the core queue operations can take constant time:

| Operation | Time complexity | Description |
| --- | --- | --- |
| `push` | `O(1)` | Add an item to the back. |
| `pop` | `O(1)` | Remove and return the front item. |
| `peek` | `O(1)` | Return the front item without removing it. |
| `size` | `O(1)` | Return the number of items. |

These bounds assume an appropriate implementation, such as a linked queue that maintains head, tail, and size. Restricting the interface alone does not make an inefficient underlying operation constant time.

## A problem with a list-backed queue

Consider this method from a queue backed by a Python list. It assumes the class already has a `self.items` list:

```python
def push(self, item: str) -> None:
    self.items.insert(0, item)
```

### Inserting at index zero requires shifting

This `push()` is **O(n)** rather than `O(1)`. Python must shift the existing references one position to make room for the new item.

![Adding onion at index zero shifts every existing item in the list-backed queue.](/images/data-structures-and-algorithms/queue-list-insertion.png)

In this representation, the tail is at index zero and the head is at the other end. The ordering still behaves like a queue, but insertion becomes slower as the list grows.

## Moving to a linked list

A [linked list](#/article/linked-lists) can avoid shifting the existing items. With references to both the head and tail, a linked queue can add at the tail and remove from the head in `O(1)` time.
