{
  "slug": "merge-sort",
  "title": "Merge Sort",
  "description": "Splitting, merging, and sorting complexity.",
  "category": "Backend & Data",
  "tags": [
    "Data structures",
    "Algorithms"
  ],
  "date": "2026-10-16",
  "kind": "article",
  "chapter": {
    "parent": "data-structures-and-algorithms",
    "order": 3,
    "section": "Sorting Algorithms"
  }
}
---
## How merge sort works

To understand why merge sort runs in `O(n log n)` time, break the algorithm into two parts: how many times we divide the list, and how much work we do to merge the pieces back together.

### Dividing the list: log n levels

Merge sort repeatedly divides the list in half:

- Start with 8 elements and split into two lists of 4.
- Split again into four lists of 2.
- Finally, split into eight lists of 1.

Each time you halve the problem, you move one step closer to lists of size 1. The number of splits along a path is proportional to the base-2 logarithm of `n`.

Think of the recursive breakdown as an upside-down tree:

- For `n = 8`, there are 3 levels of splits because `2³ = 8`.
- For `n = 16`, there are 4 levels because `2⁴ = 16`.
- In general, there are approximately `log₂ n` levels of splits.

### Merging the pieces: O(n) work per level

The `merge()` function compares elements with pointers `i` and `j` to combine two sorted sublists. Every element is placed into the result once per merge.

- At the bottom level, pairs of single items become lists of 2. Across all pairs, we touch all `n` elements.
- At the next level, lists of 2 become lists of 4. Across all merges, we touch all `n` elements again.
- At the final level, the two halves become one sorted list of size `n`.

Across any level, merging all the sublists takes `O(n)` work.

### Putting the complexity together

There are `O(log n)` levels, with `O(n)` work per level:

```text
work per level × number of levels = O(n log n)
```

This implementation takes `O(n log n)` time in the best, average, and worst cases. It always splits the list and merges the elements back together.

## Python implementation

```python
def merge_sort(nums: list[int]) -> list[int]:
    if len(nums) < 2:
        return nums
    first = merge_sort(nums[: len(nums) // 2])
    second = merge_sort(nums[len(nums) // 2 :])
    return merge(first, second)


def merge(first: list[int], second: list[int]) -> list[int]:
    final = []
    i = 0
    j = 0
    while i < len(first) and j < len(second):
        if first[i] <= second[j]:
            final.append(first[i])
            i += 1
        else:
            final.append(second[j])
            j += 1
    while i < len(first):
        final.append(first[i])
        i += 1
    while j < len(second):
        final.append(second[j])
        j += 1
    return final
```

`merge_sort()` returns a sorted list. The `<=` comparison in `merge()` takes equal elements from the first sublist before the second, preserving their original order.

## Why use merge sort?

### Advantages

- **Efficient growth:** `O(n log n)` scales better than bubble sort's quadratic average and worst-case running time.
- **Stable:** Elements with equal keys retain their relative order.
- **Predictable:** The worst-case time bound is also `O(n log n)`.

### Trade-offs

- **Extra memory:** This implementation creates slices and result lists, requiring `O(n)` peak auxiliary space rather than sorting in place.
- **Recursion overhead:** Recursive calls add overhead, including in Python.
