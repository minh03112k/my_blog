{
  "slug": "insertion-sort",
  "title": "Insertion Sort",
  "description": "How insertion sort works and when it is useful.",
  "category": "Backend & Data",
  "tags": [
    "Data structures",
    "Algorithms"
  ],
  "date": "2026-10-16",
  "kind": "article",
  "chapter": {
    "parent": "data-structures-and-algorithms",
    "order": 2,
    "section": "Sorting Algorithms"
  }
}
---
## How insertion sort works

Insertion sort builds a sorted prefix of the list. For each new element, it moves that element left until it reaches the correct position among the elements already visited.

## Python implementation

```python
def insertion_sort(nums: list[int]) -> list[int]:
    for i in range(len(nums)):
        j = i
        while j > 0 and nums[j - 1] > nums[j]:
            nums[j], nums[j - 1] = nums[j - 1], nums[j]
            j -= 1
    return nums
```

This implementation swaps adjacent elements, sorts the input list in place, and returns that same list.

## Insertion sort complexity

The outer loop runs `n` times. The amount of work in the inner loop depends on the input order.

### Worst case: O(n²)

For a reverse-sorted list such as `[5, 4, 3, 2, 1]`, every new element must move all the way back to index 0.

- The element at index 1 needs up to 1 swap.
- The element at index 2 needs up to 2 swaps.
- The element at index `n - 1` needs up to `n - 1` swaps.

Adding those swaps gives:

```text
1 + 2 + ... + (n - 1) = n × (n - 1) / 2
```

That grows quadratically, giving `O(n²)` worst-case running time.

### Average case: O(n²)

For a typical randomly ordered list of distinct values, a new element moves past about half of the sorted prefix on average. The total work still grows quadratically.

### Best case: O(n)

For an already sorted list such as `[1, 2, 3, 4, 5]`, no swaps are necessary.

After the first iteration, the condition `nums[j - 1] > nums[j]` is false on its first comparison each time. The outer loop still runs `n` times, but each iteration does constant work. The result is `O(n)` running time.

## Why use insertion sort?

### Advantages

- **Fast for small inputs:** Low overhead can make it faster than merge sort or quicksort on very small lists.
- **Adaptive:** Partially sorted inputs require fewer swaps.
- **Stable:** Equal elements retain their relative order because the comparison uses `>` rather than `>=`.
- **In place:** It requires only `O(1)` auxiliary space.
- **Online:** The insertion approach can maintain a sorted sequence as new elements arrive.

### Why it works well for small lists

Insertion sort has no recursion overhead and a small memory footprint. These properties make it useful inside hybrid sorting algorithms that switch to insertion sort for small partitions or runs. The threshold depends on the implementation.

### Trade-off for large inputs

Its quadratic average and worst-case growth makes it less suitable for large, randomly ordered lists.

## Check your understanding

### What is insertion sort's worst-case complexity?

**O(n²).** A reverse-sorted input makes each element move through the entire sorted prefix.

### What is its complexity on an already sorted array?

**O(n).** Each iteration does constant work and no swaps.
