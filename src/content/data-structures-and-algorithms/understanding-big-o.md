{
  "slug": "understanding-big-o",
  "title": "Understanding Big O",
  "description": "Algorithm efficiency and complexity categories.",
  "category": "Backend & Data",
  "tags": [
    "Data structures",
    "Algorithms"
  ],
  "date": "2026-10-16",
  "kind": "article",
  "chapter": {
    "parent": "data-structures-and-algorithms",
    "order": 1,
    "section": "Understanding Big O"
  }
}
---
## What does Big O measure?

In Big O notation, algorithm speed is not measured in seconds. Instead, it describes **how the number of operations grows** as the input size `n` increases.

Big O gives an upper bound on that growth. It is often used to describe **worst-case running time**, which provides a performance guarantee, but it can also describe average-case or best-case bounds. Always check which case a complexity claim refers to.

## Key Big O categories: fastest to slowest growth

These six common categories help you compare algorithms as their inputs grow. A slower growth rate usually scales better, but it does not guarantee a shorter running time for every input.

### O(1) — Constant time

**Growth:** The number of operations stays bounded by a constant, regardless of how large the input grows.

**Examples:** Reading an array element by index, or looking up a key in a hash table in the average case.

### O(log n) — Logarithmic time

**Growth:** The amount of work grows slowly because each step reduces the remaining problem by a fixed proportion, such as cutting it in half.

**Example:** **Binary search** in a sorted list. Each comparison eliminates roughly half of the remaining candidates.

### O(n) — Linear time

**Growth:** The number of operations grows in direct proportion to the input size `n`. Doubling the input roughly doubles the work.

**Examples:** **Simple search**, which checks elements one by one, or a loop that visits every element in a list and does constant work per element.

### O(n log n) — Log-linear time

**Growth:** Common in efficient sorting algorithms, this grows somewhat faster than linear time but much more slowly than quadratic time.

**Examples:** **Merge sort**, and **quicksort** in the average case.

### O(n²) — Quadratic time

**Growth:** Work grows with the square of the input size. Doubling the input can mean roughly four times as much work. This often occurs with nested loops that each traverse the input.

**Examples:** **Selection sort**, or generating a complete `n × n` multiplication table.

### O(n!) — Factorial time

**Growth:** Work grows extremely quickly as the input increases. Factorial growth eventually outpaces any fixed-base exponential growth, making it impractical for large inputs.

**Examples:** Generating every permutation of a list, or trying all possible city visit orders in a brute-force solution to the **Traveling Salesperson Problem**.

## Important nuances and trade-offs

### Worst case and average case

Worst-case complexity describes an upper bound for the most expensive input of a given size. Average-case complexity describes expected work under assumptions about the inputs or randomness.

For example, **hash-table lookups** take `O(1)` time on average under typical hashing assumptions, but can degrade to `O(n)` in the worst case because of collisions. Likewise, **quicksort** runs in `O(n log n)` on average but can degrade to `O(n²)` with poor partitions.

### Constants are ignored, but still matter

Fixed multipliers and lower-order terms are dropped when expressing the dominant growth rate. For example, `n / 2`, `n / 26`, and `3n + 10` are all `O(n)`.

However, constants still affect actual running time. Two algorithms with the same complexity can perform differently because of implementation overhead, memory access, or the input itself. This is one reason quicksort and merge sort can have different practical performance despite both having `O(n log n)` average running time.

## Big O Categories Review

| Big-O | Name | Description |
| --- | --- | --- |
| O(1) | constant | Best The algorithm always takes the same amount of time, regardless of how much data there is. Example: Looking up an item in a list by index |
| O(log(n)) | logarithmic | Great Algorithms that remove a percentage of the total steps with each iteration. Very fast, even with large amounts of data. Example: Binary search |
| O(n) | linear | Good 100 items, 100 units of work. 200 items, 200 units of work. This is usually the case for a single, non-nested loop. Example: unsorted array search. |
| O(n*log(n)) | "linearithmic" | Okay This is slightly worse than linear, but not too bad. Example: mergesort and other "fast" sorting algorithms. |
| O(n^2) | quadratic | Slow The amount of work is the square of the input size. 10 inputs, 100 units of work. 100 Inputs, 10,000 units of work. Example: A nested for loop to find all the ordered pairs in a list. |
| O(n^3) | cubic | Slower If you have 100 items, this does 100^3 = 1,000,000 units of work. Example: A triple nested for loop to find all the ordered triples in a list. |
| O(2^n) | exponential | Horrible We want to avoid this kind of algorithm at all costs. Adding one to the input doubles the amount of steps. Example: Brute-force guessing results of a sequence of n coin flips. |
| O(n!) | factorial | Even More Horrible The algorithm becomes so slow so fast, that it is practically unusable. Example: Generating all the permutations of a list |

![Big-O Complexity chart comparing operation growth as the number of elements increases.](/images/data-structures-and-algorithms/big-o-complexity.png)
