---
title: "Understanding AI Semantic Search and Embeddings"
description: "A practical guide to understanding the difference between lexical keyword search and semantic search, with a code example using Python's sentence-transformers."
pubDate: 2026-03-08
categories: ["ai", "python", "machine-learning"]
---

Search has been a fundamental part of how we interact with information online. Whether you are browsing an e-commerce store, searching through documentation, or just using Google, you are relying on underlying search algorithms. With the rise of AI, search has evolved drastically. 

In this post, we'll dive into what traditional lexical search is, how AI-powered semantic search works, and how you can implement semantic search yourself with a few lines of code.

## What is Lexical Search?

Lexical search, also known as traditional keyword-based search, is the classic way search engines have operated for decades. It works by looking for exact matches (or slight variations) of the words in a user's query within the database of documents. 

Under the hood, lexical search often uses algorithms like **TF-IDF** (Term Frequency-Inverse Document Frequency) or **BM25**. These algorithms score documents based on how often the search terms appear in them.

**Pros of Lexical Search:**
- Extremely fast and computationally lightweight.
- Great for exact matches (e.g., searching for a specific product ID, name, or error code).

**Cons of Lexical Search:**
- Fails when synonyms are used (e.g., searching for "sneakers" might not return documents that only contain "running shoes").
- Doesn't understand context or intent. "Apple" the fruit and "Apple" the company are treated identically.

---

## What is Semantic Search?

Semantic search takes a completely different approach. Instead of looking for exact keyword matches, it attempts to understand the **intent and contextual meaning** behind a user's query.

At the core of semantic search is a concept called **Embeddings**. 
An embedding is a way to represent text (words, sentences, or entire documents) as an array of numbers (a vector) in a high-dimensional space. Machine learning models are trained to place texts with similar meanings close together in this space.

Because the text is represented as numbers, the search engine can simply measure the "distance" (often using Cosine Similarity) between the search query's vector and the document vectors. The closer the vectors, the more relevant the result.

**Pros of Semantic Search:**
- Understands synonyms and related concepts natively.
- Captures context and user intent.
- Handles typos and phrasing variations gracefully.

---

## The Difference: Lexical vs Semantic Search

To summarize the difference: 
If you search for *"how to make a cup of joe"*:
- **Lexical Search** will look specifically for the words "how", "make", "cup", and "joe". If a document says *"the best way to brew coffee"*, lexical search will miss it entirely because there's no word overlap.
- **Semantic Search** understands that "a cup of joe" means "coffee", and building/brewing share the same intent. It will successfully retrieve the document about brewing coffee.

---

## How to Code a Semantic Search Engine

Building a semantic search engine used to require a massive engineering team. Today, thanks to open-source models, you can build a basic version in just a few lines of Python code!

We will use the popular `sentence-transformers` library from Hugging Face.

### 1. Install Dependencies

First, you'll need to install the required library:

```bash
pip install sentence-transformers
```

### 2. The Code

In this example, we will:
1. Load a pre-trained embedding model (`all-MiniLM-L6-v2`, which is small, fast, and great for general text).
2. Generate embeddings for a small database of sentences.
3. Compare a user's search query against the database using cosine similarity.

```python title=semantic_search.py
from sentence_transformers import SentenceTransformer, util

# 1. Load a pre-trained model for generating embeddings
# 'all-MiniLM-L6-v2' is an excellent, lightweight model for sentence embeddings
model = SentenceTransformer('all-MiniLM-L6-v2')

# 2. Our database of documents
documents = [
    "A dog is chasing a ball in the park.",
    "The new smartphone has a great camera and battery life.",
    "Cats are known to be very independent pets.",
    "I love drinking black coffee in the morning."
]

# Generate embeddings for all documents
# This transforms our text into mathematical vectors
doc_embeddings = model.encode(documents)

# 3. The user's search query
# Notice how the query doesn't share exact words with the target document
query = "What is a good pet to have?"

# Generate the embedding for the search query
query_embedding = model.encode(query)

# 4. Perform the semantic search! 
# Calculate the cosine similarity between the query and all documents
# We will return the top 2 closest matches
hits = util.semantic_search(query_embedding, doc_embeddings, top_k=2)

print(f"Query: '{query}'\n")
print("Top Search Results:")

# hits[0] contains the results for our first (and only) query
for hit in hits[0]:
    doc_id = hit['corpus_id']
    score = hit['score']
    print(f"- {documents[doc_id]} (Similarity Score: {score:.4f})")
```

### The Output

If you run the script, you'll get an output similar to this:

```text
Query: 'What is a good pet to have?'

Top Search Results:
- Cats are known to be very independent pets. (Similarity Score: 0.6123)
- A dog is chasing a ball in the park. (Similarity Score: 0.4589)
```

Notice how the model correctly identified the sentences about "cats" and "dogs" as the most relevant matches to a query about "pets", even though the word "pet" is only explicitly mentioned in one document, and wasn't matched based on keyword lookup alone. 

## Conclusion

Semantic search and embeddings are transforming the way we build search experiences, recommendation engines, and even LLM architectures (like Retrieval-Augmented Generation, or RAG). While lexical search still has its place for specific use cases, combining both (often called Hybrid Search) is the modern gold standard for building powerful AI applications.
