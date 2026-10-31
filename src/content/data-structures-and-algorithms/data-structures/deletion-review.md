{
  "slug": "deletion-review",
  "title": "Deletion Review",
  "description": "Binary search tree deletion review and example code.",
  "category": "Backend & Data",
  "tags": [
    "Data structures",
    "Algorithms",
    "Python"
  ],
  "date": "2026-10-31",
  "chapter": {
    "parent": "trees",
    "order": 4,
    "section": "Data Structures"
  },
  "kind": "article"
}
---

The `delete` method is `O(log(n))` because, like most binary tree operations, we *don't* have to search the entire tree. We only have to search *one path* from the root to the leaf node we want to delete.

The depth of the tree on average is equal to `log base 2` of the number of nodes in the tree. For example:

| Nodes | Depth |
| ----- | ----- |
| 1     | 0     |
| 2     | 1     |
| 4     | 2     |
| 8     | 3     |
| 16    | 4     |
| 32    | 5     |
| 64    | 6     |
| 128   | 7     |
| 256   | 8     |
| 512   | 9     |
| 1024  | 10    |
| 2048  | 11    |
| 4096  | 12    |

**We only need to use \~10 steps to delete a node from a tree of \~1000 nodes**.

```python
from typing import Any


class BSTNode:
    def delete(self, val: Any) -> "BSTNode | None":

        # 1. If the current node is empty, nothing to delete
        if self.val is None:
            return None

        # 2. If val is smaller, search in the LEFT subtree
        if val < self.val:
            if self.left:
                # Delete recursively and update the left child
                self.left = self.left.delete(val)

            return self

        # 3. If val is greater, search in the RIGHT subtree
        if val > self.val:
            if self.right:
                # Delete recursively and update the right child
                self.right = self.right.delete(val)

            return self

        # 4. We found the node to delete (self.val == val)

        # CASE 1: No right child
        # Replace this node with its left child (or None)
        if self.right is None:
            return self.left

        # CASE 2: No left child
        # Replace this node with its right child
        if self.left is None:
            return self.right

        # CASE 3: The node has TWO children
        # We cannot simply remove it without losing children.
        # Instead, find its IN-ORDER SUCCESSOR.
        #
        # Successor = smallest value in the RIGHT subtree.
        # It is the next larger value after the current node.

        # Step A: Start searching from the right child
        successor = self.right

        # Step B: Keep moving LEFT to find the smallest node
        while successor.left is not None:
            successor = successor.left

        # Step C: Copy the successor's VALUE into this node
        # Example: replace 50 with 60
        # Important: This copies the value, NOT the whole node!
        self.val = successor.val

        # Step D: Remove the ORIGINAL successor node
        # The successor's value now exists in two places.
        # Delete the old one from the RIGHT subtree.
        #
        # Assign the result back to self.right because
        # the subtree's root or child links may change.
        self.right = self.right.delete(successor.val)

        # Step E: Return the updated current node
        return self

    # don't touch below this line

    def __init__(self, val: Any = None) -> None:
        self.left: BSTNode | None = None
        self.right: BSTNode | None = None
        self.val = val

    def insert(self, val: Any) -> None:
        if not self.val:
            self.val = val
            return

        if self.val == val:
            return

        if val < self.val:
            if self.left:
                self.left.insert(val)
                return
            self.left = BSTNode(val)
            return

        if self.right:
            self.right.insert(val)
            return
        self.right = BSTNode(val)

    def get_min(self) -> Any:
        current = self
        while current.left is not None:
            current = current.left
        return current.val

    def get_max(self) -> Any:
        current = self
        while current.right is not None:
            current = current.right
        return current.val
```
