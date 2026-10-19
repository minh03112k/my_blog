{
  "slug": "python-lists",
  "title": "Python Lists",
  "description": "Accessing, appending, deleting, and searching.",
  "category": "Backend & Data",
  "tags": [
    "Data structures",
    "Algorithms"
  ],
  "date": "2026-10-16",
  "kind": "article",
  "chapter": {
    "parent": "data-structures-and-algorithms",
    "order": 6,
    "section": "Data Structures"
  }
}
---
## Working with Python lists

A Python list stores an ordered sequence and lets you access elements by index. Common operations have different costs as the list grows.

## Common operations and their cost

| Operation | Example | Time complexity | Why |
| --- | --- | --- | --- |
| Append | `cars.append("ford")` | Amortized `O(1)` | Usually adds directly at the end; occasionally the backing array must resize. |
| Access by index | `cars[2]` | `O(1)` | Goes directly to the indexed position. |
| Delete from the middle | `cars.pop(2)` | `O(n)` | Shifts the following elements to close the gap. |
| Search by value | `cars.index("ford")` | `O(n)` | Checks elements until it finds the value. |

### Appending at the end

Most appends require constant work. A single append can take `O(n)` when the list needs to allocate more space and copy its references. Spread across many appends, the cost per append is **amortized O(1)**.

### Accessing an index

Index access does not need to scan the preceding elements. For a valid index, `cars[2]` takes `O(1)` time.

### Deleting from the middle

Removing an item from the middle shifts the elements after it one position toward the start. That can require `O(n)` work.

### Searching for a value

`cars.index("ford")` scans until it finds the first matching value. In the worst case, it examines the whole list. If the value is missing, Python raises `ValueError`.

## Where lists start to struggle

Lists become less suitable when you frequently need to:

1. Insert or delete elements near the beginning or middle.
2. Search the entire list for particular values.

[Stacks](#/article/stacks), [Queues](#/article/queues), and [Linked Lists](#/article/linked-lists) offer different operations and trade-offs.
