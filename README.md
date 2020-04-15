# Browse books from the OpenLibrary API

[LIVE](http://frontend.milton-soft.com/react/books/)

## Custom caching using closures

home and book detail page uses different api calls, so main search is cached and all data

## Pagination

api return aray of only 100 books, also position is cached

### Main endpoints

- Search - searches books by the query string - https://openlibrary.org/dev/docs/api/search
- Book - gives information about the book - https://openlibrary.org/dev/docs/api/books
