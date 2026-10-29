{
  "slug": "trees",
  "title": "Trees",
  "description": "Hierarchical nodes, binary search tree ordering, and recursive subtrees.",
  "category": "Backend & Data",
  "tags": [
    "Data structures",
    "Algorithms"
  ],
  "date": "2026-10-19",
  "chapter": {
    "parent": "data-structures-and-algorithms",
    "order": 10,
    "section": "Data Structures"
  },
  "kind": "article"
}
---
## What is a tree?

A **tree** stores nodes in a hierarchy. It is usually drawn upside down: the **root** is at the top, and the **leaves** are at the bottom.

![A tree with root 2, children 7 and 5, and several branches ending in leaf nodes.](/images/data-structures-and-algorithms/tree-nodes.png)

Like a [linked list](#/article/linked-lists), a tree connects nodes through references. A singly linked list forms one chain; a tree can branch because a node can have multiple children.

## Nodes, parents, and children

A rooted tree follows these rules:

- Each node holds a value and may reference child nodes.
- The root has no parent.
- Every other node has exactly one parent.
- Every node is reachable from the root, and the references contain no cycles.

A node with no children is a **leaf**. A node together with all its descendants forms a **subtree**.

Compare a linked list:

```text
node → node → node
```

with a tree:

```text
root
├── node
│   ├── leaf
│   └── leaf
└── node
    └── leaf
```

Trees can represent hierarchies such as folders and files without sorting their values. Ordering becomes useful when we want to search by value.

## Binary trees and binary search trees

A **binary tree** allows each node to have at most two children, called the left and right children. This limit alone does not impose any ordering on their values.

A **binary search tree**, or **BST**, adds an ordering rule. In the version described in these notes:

1. Every value in a node's left subtree is less than that node's value.
2. Every value in a node's right subtree is greater than that node's value.
3. Duplicate values are not stored.

The ordering applies to entire subtrees, not just the immediate children. Other BST implementations can allow duplicates if they define a consistent policy for them.

```text
        8
       / \
      3   10
     / \    \
    1   6    14
```

The first illustration in this chapter shows a general tree, not a BST: it includes a node with three children and repeated values.

## Searching by value

To find `6` in the BST above:

1. Compare it with `8`. Since `6 < 8`, follow the left child.
2. Compare it with `3`. Since `6 > 3`, follow the right child.
3. Reach `6` and return the matching node.

If the required child is missing, the value is not in the tree. The ordering lets each comparison rule out one subtree.

Search takes `O(h)` time, where `h` is the tree's height. In a balanced BST, the height is `O(log n)`. A skewed BST can form a chain of `n` nodes, making search take `O(n)` in the worst case. The same height-dependent bounds apply to inserting a value by following the ordering rules.

## BST nodes and recursion

The document introduces a single class, **`BSTNode`**, as the building block. Each node holds a value and references to its left and right children. In this representation, nodes do not store references to their parents.

Any node can be treated as the root of its own BST: its descendants already satisfy the same ordering rules. This makes recursive methods a natural fit. A method can compare the current value, then continue in the appropriate child subtree until it finds a match or reaches a missing child.

## Source

Adapted from the Trees, Binary Trees, and Insert Nodes sections of the [original data structures notes](https://docs.google.com/document/d/1vliduD42aEdUDCa1T6jkzC62lBnZLRAg-FMCexMLYLw/edit?tab=t.0).
