---
title: 49. Group Anagrams Explained
description: Leetcode question no. 49 Group Anagrams explained in 2 different ways.
pubDate: 2025-07-04
---

## What is an Anagram?

An anagram is a string that contains the exact same characters as another string, but the order of the characters can be different.
eg: "act" and "cat" are anagrams. They are different, but has same characters.

---

## Problem

Here is a brief introduction of the problem. You can see the original problem from [here](https://leetcode.com/problems/group-anagrams).

We've a list of words, we need to group the anagrams in a list and return everything inside another list. Basically like a list which contains a list of anagrams.

Example:
```py
Input: strs = ["act","pots","tops","cat","stop","hat"]

Output: [["hat"],["act", "cat"],["stop", "pots", "tops"]]
```

---

## Solutions

### 1. Sorting

We can iterate over the list of strings and create an identifier by sorting the string and use it as the key to store its anagrams.
Finally we return the values of the dict where we stored our anagrams.

```py title=group-anagrams.py
def group_anagrams(strs: list[str]) -> list[list[str]]:
    anagrams = {} # can use defaultdict instead

    # build hashmap
    for s in strs:
        sorted_s = "".join(sorted(s)) # key
        if sorted_s in anagrams:
            anagrams[sorted_s].append(s)
        else:
            anagrams[sorted_s] = [s]

    # return all values
    return list(anagrams.values())

# output: [['act', 'cat'], ['ate']]
print(group_anagrams(["act", "cat", "ate"]))
```

This solution has the Time Complexity of `O(m * n log n)` and the Space Complexity of `O(m * n)` where `m` is the number of strings and `n` is the length of the longest string.

### 2. HashTable

Here we are using a different approach, similar to former but more efficient because we are not gonna sort anything which saves the extra Time Complexity of `O(n log n)`.
Instead we'll be using a list which we populate by index as the key.

On each iteration through strings, we create a list of length `26` because that's the total count of letters in the alphabet.
We can fill every slot with `0` and increment it whenever we see a letter which should in that index position.

#### But, how do we determine the index position?

We will find the index position of each character in each string by its `unicode` value. But, what is a unicode value?

> A Unicode value, also known as a code point, is a unique numerical representation assigned to a character in the Unicode Standard. It's essentially a numerical identifier that allows computers to consistently represent and manipulate text from various writing systems.

We will use the [`ord()`](https://docs.python.org/3.4/library/functions.html#ord) function to get the unicode of a specific character.

We can find the index position of a character by substracting `a`'s unicode value from that `string`'s unicode value. Unicode value of `a` is `96`, it will be `unicode of string - unicode of a`.

```py title=group-anagrams.py
def group_anagrams(strs: list[str]) -> list[list[str]]:
    anagrams = {} # can use defaultdict

    for s in strs:
        count = [0] * 26

        for char in s:
            count[ord(char) - ord('a')] += 1

        key = tuple(count) # create identifier or key

        # we can avoid this checking by using defaultdict
        if key in anagrams:
            anagrams[key].append(s)
        else:
            anagrams[key] = [s]

    return list(anagrams.values())

# output: [['act', 'cat'], ['ate']]
print(group_anagrams(["act", "cat", "ate"]))
```

This solution has the Time Complexity of `O(m * n)` and the Space Complexity of `O(m * n)` where `m` is the number of strings and `n` is the length of the longest string.
