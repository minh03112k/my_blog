{
  "slug": "find-min-max",
  "title": "Find Min and Max",
  "description": "Find the minimum and maximum values in a binary search tree.",
  "category": "Backend & Data",
  "tags": [
    "Data structures",
    "Algorithms",
    "Python"
  ],
  "date": "2026-10-29",
  "chapter": {
    "parent": "trees",
    "order": 3,
    "section": "Data Structures"
  },
  "kind": "article"
}
---

```python
from typing import Any


class BSTNode:
    def get_min(self) -> Any:
        current = self
        # As long as the current node has a left child, keep looping.
        while current.left is not None:
            current = current.left

        return current.val

    def get_max(self) -> Any:
        current = self
        # As long as the current node has a right child, keep looping.
        while current.right is not None:
            current = current.right

        return current.val

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
```
