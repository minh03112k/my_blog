{
  "slug": "insert-nodes",
  "title": "Insert Nodes",
  "description": "Build a Python BSTNode class and insert values recursively while preserving BST ordering.",
  "category": "Backend & Data",
  "tags": [
    "Data structures",
    "Algorithms",
    "Python"
  ],
  "date": "2026-10-29",
  "chapter": {
    "parent": "trees",
    "order": 1,
    "section": "Data Structures"
  },
  "kind": "article"
}
---
## A node is also a tree

The building blocks of a [binary search tree](#/article/trees) are **nodes**. In this implementation, we use a single class, `BSTNode`. Each node stores a value and references to its left and right children.

Any `BSTNode` is also the root of its own BST. It does not know about a potential parent; it only knows its value and its descendants. This lets us use the same insertion logic at every level of the tree.

We will use [recursion](https://en.wikipedia.org/wiki/Recursion): a method calls itself on a smaller subtree until it reaches a stopping condition.

## Implement the Python class

Here is the complete implementation. Create the root with an initial value, then call `insert()` to add more values:

```python
class BSTNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

    def insert(self, val):
        if val == self.val:
            return

        if val < self.val:
            if self.left is None:
                self.left = BSTNode(val)
            else:
                self.left.insert(val)
        else:
            if self.right is None:
                self.right = BSTNode(val)
            else:
                self.right.insert(val)
```

Use values with a consistent ordering, such as integers. This version requires an initial value and does not use `None` to represent an empty root. Missing children are represented by `None`.

### What does `self` mean?

`self` is the node receiving the method call. In `root.insert(6)`, `self` initially refers to `root`. If the method calls `self.left.insert(6)`, the next call has that left child as its own `self`.

Each call works with one node. Python passes the receiving instance automatically when you call an instance method.

### Keep the BST ordering

At each node, `insert()` makes one of three decisions:

1. If the value equals `self.val`, stop. This implementation ignores duplicates.
2. If the value is smaller, use the left subtree.
3. If the value is larger, use the right subtree.

If the chosen child is missing, create a node there. Otherwise, call `insert()` on that child. The new value must satisfy every comparison on the path, so it preserves the ordering of the whole tree.

The stopping conditions are an existing equal value or a missing child. Without a stopping condition, a recursive method would keep calling itself.

## Walk through an insertion

Run this after the class definition:

```python
root = BSTNode(8)
for val in [3, 10, 1, 6, 14]:
    root.insert(val)

print(root.left.right.val)  # 6
print(root.right.right.val)  # 14
```

The resulting tree is:

```text
        8
       / \
      3   10
     / \    \
    1   6    14
```

To insert `6`, the method follows this path:

1. At `8`, `6 < 8`, so call `insert(6)` on the left child, `3`.
2. At `3`, `6 > 3`, so inspect the right child.
3. That child is missing, so assign `BSTNode(6)` to `3`'s `right` reference.

We do not attach `6` directly to `8`: the left child already exists. Recursion continues through that child until there is an available position.

## Mutation and return values

`insert()` changes the existing tree and returns `None`. Call it like this:

```python
root.insert(7)
assert root.left.right.right.val == 7
```

Do not assign its return value to the root:

```python
# Incorrect: this replaces the root reference with None.
root = root.insert(7)
```

The recursive call also does not need an assignment such as `self.left = self.left.insert(val)`. The child already exists, and its method updates its own descendants.

Inserting a duplicate leaves the existing structure intact:

```python
existing_node = root.left.right
root.insert(6)
assert root.left.right is existing_node
```

Run this example after the correct `root.insert(7)` call, without running the incorrect assignment.

## Insertion cost

Insertion visits one path through the tree, so it takes `O(h)` time, where `h` is the tree's height. Recursive calls use `O(h)` stack space.

For a balanced tree, the height is `O(log n)`. This class does not balance itself: inserting sorted values can produce a chain, giving `O(n)` time and stack space for an insertion in the worst case. A sufficiently deep chain can also exceed Python's recursion limit.

## Reference

This lesson expands the supplied Insert Nodes introduction with a runnable Python example. Related discussion: [BST Insert Guidance](https://chatgpt.com/share/6ae33e45-3358-83ec-8812-2efa89fd3c5b).
