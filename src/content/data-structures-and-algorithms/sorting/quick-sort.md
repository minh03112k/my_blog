{
  "slug": "quick-sort",
  "title": "Quick Sort",
  "description": "Partitioning, pivot selection, and sorting complexity.",
  "category": "Backend & Data",
  "tags": [
    "Data structures",
    "Algorithms"
  ],
  "date": "2026-10-16",
  "kind": "article",
  "chapter": {
    "parent": "data-structures-and-algorithms",
    "order": 4,
    "section": "Sorting Algorithms"
  }
}
---
## How quicksort works

Quicksort chooses a pivot and partitions the list around it. It then recursively sorts the elements on either side of the pivot.

## Python implementation

```python
def quick_sort(nums: list[int], low: int, high: int) -> None:
    if low < high:
        p = partition(nums, low, high)
        quick_sort(nums, low, p - 1)
        quick_sort(nums, p + 1, high)


def partition(nums: list[int], low: int, high: int) -> int:
    pivot = nums[high]
    i = low
    for j in range(low, high):
        if nums[j] < pivot:
            nums[i], nums[j] = nums[j], nums[i]
            i += 1
    nums[i], nums[high] = nums[high], nums[i]
    return i
```

This version chooses the last element as the pivot. `partition()` moves smaller elements to the left and places the pivot at its final sorted position. `quick_sort()` modifies the input list in place and returns `None`.

## Quicksort complexity

A partition of `k` elements takes `O(k)` time because `partition()` scans the subarray once. Total sorting time depends on how balanced the recursive partitions are.

### Balanced partitions: O(n log n)

When the pivot splits each subarray into roughly equal parts, there are `O(log n)` levels of recursion. Across each level, partitioning does `O(n)` work, giving `O(n log n)` overall.

The important distinction is **recursion depth**, rather than the total number of calls to `partition()`.

### Average case: O(n log n)

Under a random ordering of distinct input values, the partitions are balanced enough on average to produce `O(n log n)` running time.

### Worst case: O(n²)

With this last-element pivot strategy, sorted or reverse-sorted inputs produce extremely unbalanced partitions. Each pivot removes only one element from the remaining problem.

The work becomes roughly:

```text
n + (n - 1) + ... + 1 = O(n²)
```

A list of equal values also produces unbalanced partitions in this implementation because `partition()` uses a strict `<` comparison.

## Improving pivot selection

Pivot strategies can reduce the likelihood of poor partitions, but neither of the following guarantees an `O(n log n)` worst case.

### Random approach

Shuffle the input before sorting, which takes `O(n)` time, or choose pivots randomly during partitioning.

Randomization avoids consistently poor pivots caused by input order and gives expected `O(n log n)` time for distinct values. The worst case remains `O(n²)`. Shuffling alone does not fix this implementation's behavior on equal values.

### Median-of-three approach

Choose three elements, such as the first, middle, and last elements of a partition, and use the median of those three values as the pivot.

Finding the median of a fixed sample of three takes `O(1)` work. It does not mean finding the exact median of the entire partition. This strategy is deterministic and avoids the need for randomness, though poor partitions are still possible.

## Why use quicksort?

### Advantages

- **Fast on average:** Its average running time is `O(n log n)` under suitable input or randomization assumptions.
- **In-place partitioning:** It rearranges elements without copying the list into subarrays.

### Trade-offs

- **Typically unstable:** Equal-key elements can change relative order.
- **Recursion overhead:** Recursive calls add work and use stack space. This implementation has `O(log n)` stack depth for balanced partitions and `O(n)` depth in the worst case.
- **Pivot sensitivity:** Poor pivots can cause quadratic running time.

Quicksort's average performance and in-place partitioning make these trade-offs useful in many sorting implementations. Hybrid sorts can combine different algorithms to balance their strengths.
