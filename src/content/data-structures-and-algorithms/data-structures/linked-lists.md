{
  "slug": "linked-lists",
  "title": "Linked Lists",
  "description": "Nodes, references, traversal, and insertion trade-offs.",
  "category": "Backend & Data",
  "tags": [
    "Data structures",
    "Algorithms"
  ],
  "date": "2026-10-19",
  "chapter": {
    "parent": "data-structures-and-algorithms",
    "order": 9,
    "section": "Data Structures"
  },
  "kind": "article"
}
---
## What is a linked list?

A **linked list** stores items in a chain of nodes. Unlike an array-backed list, its nodes do not need to be next to each other in memory. Each node holds a reference to the next node.

![A chain of four linked-list nodes, each referencing the next node.](/images/data-structures-and-algorithms/linked-list-nodes.png)

This can address the `O(n)` insertion problem in the [list-backed queue](#/article/queues): adding an item need not shift every existing item.

## Nodes and references

### What each node contains

In the notes, a node has two fields:

- **`val`:** The value it holds, such as `"Carla"` or `"James"`.
- **`next`:** A reference to the next node, or `None` at the end.

The diagrams label the next-node reference as `ref`.

## Linked lists versus Python lists

Both structures store ordered items, but they provide different access and update costs.

![Linked nodes connected by references compared with a list accessed by numbered indexes.](/images/data-structures-and-algorithms/linked-list-vs-list.png)

### Accessing a Python list by index

```python
car = cars[3]
```

A Python list stores a contiguous array of references, so an index identifies a position directly. The referenced Python objects themselves do not have to be contiguous. Accessing a valid index takes `O(1)` time.

### Following a linked list

A singly linked list has no direct array-style index access. To reach a node, start at the head and follow each `next` reference.

This snippet assumes `head_car_node` is already defined:

```python
current_car_node = head_car_node
while current_car_node is not None:
    print(current_car_node.val)
    current_car_node = current_car_node.next
```

Reaching a node near the end can take `O(n)` time.

## Inserting into the middle

### A Python list shifts the following items

Inserting in the middle of an array-backed list requires shifting the elements that follow the insertion point. In the worst case, that takes `O(n)` time.

![Inserting 100 into the middle of a list shifts the following values to new indexes.](/images/data-structures-and-algorithms/list-middle-insertion.png)

### A linked list updates references

Once you have the node to insert after, inserting a new node takes `O(1)` work: point the new node at the old successor, then point the preceding node at the new node.

![Inserting 100 between linked nodes by updating two references.](/images/data-structures-and-algorithms/linked-list-middle-insertion.png)

Finding the insertion position may still require `O(n)` traversal. Similarly, deleting a node from a singly linked list generally requires its predecessor; locating that predecessor can take `O(n)`.

## Linked list queue

The earlier [Python list-backed queue](#/article/queues) uses `insert(0, item)` for `push`, which takes `O(n)` time because it shifts the existing items.

A linked list queue that maintains both a head and a tail has `O(1)` `push` operations: append a new node at the tail and update the tail reference. Removing from the head also takes `O(1)` time, without searching through the chain.

## Trade-offs

Linked lists are usually a worse default choice than array-backed lists because:

- Each node adds memory overhead for references, and following nodes can make traversal slower than scanning a contiguous array of references.
- Managing nodes and references makes them more complex to work with, debug, and reason about.
- They have no constant-time random access: reaching a specific position requires traversal instead of direct indexing.

Their advantage is efficient reference updates when the required nodes are already available. A **doubly linked list** stores references to both the previous and next nodes. When it maintains a head and a tail, it supports `O(1)` insertions and deletions at both ends. This can make it a better choice than an array-backed list when frequent updates at both ends are required.
