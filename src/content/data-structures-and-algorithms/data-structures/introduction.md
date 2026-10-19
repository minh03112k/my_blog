{
  "slug": "introduction-to-data-structures",
  "title": "Introduction to Data Structures",
  "description": "An overview of data structures and their uses.",
  "category": "Backend & Data",
  "tags": [
    "Data structures",
    "Algorithms"
  ],
  "date": "2026-10-16",
  "kind": "article",
  "chapter": {
    "parent": "data-structures-and-algorithms",
    "order": 5,
    "section": "Data Structures"
  }
}
---
## What are data structures?

Data structures store and organize data so that it can be accessed and modified. They expose operations for reading and updating that data.

The structure you choose affects both the operations available and their cost.

### Familiar Python examples

A list stores an ordered sequence of items:

```python
animals = ["cat", "dog", "mouse"]
```

A dictionary maps keys to values:

```python
car = {"brand": "Ford", "model": "Mustang", "year": 1964}
```

## Common data structures

### Stacks and queues

- **Stacks:** Last in, first out. Add and remove items at the top.
- **Queues:** First in, first out. Add items at the tail and remove them from the head.

### Linked lists

A linked list is a chain of nodes. Each node references the next. Inserting after a known node can be efficient because it updates references rather than shifting the remaining items.

### Trees

- **Binary trees:** Each node has at most two children.
- **Red-black trees:** Self-balancing binary search trees that use node colors and balancing rules.
- **Tries:** Trees used to store and search sequences such as words by their prefixes.

### Hash maps and graphs

- **Hash maps:** Map keys to values.
- **Graphs:** Collections of nodes connected by edges.

## Explore the chapters

Start with [Python Lists](#/article/python-lists), then compare their behavior with [Stacks](#/article/stacks), [Queues](#/article/queues), and [Linked Lists](#/article/linked-lists).
