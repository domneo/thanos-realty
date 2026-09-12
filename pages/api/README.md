# Content API

Migrated the original API and database so that it now lives inside this Next.js app.

## Layout

| Path                        | Role                                                                          |
| --------------------------- | ----------------------------------------------------------------------------- |
| `data/*.json`               | The content itself — the recovered database, one file per table               |
| `lib/db.ts`                 | Reads `data/`, writes runtime state to `data/runtime/`                        |
| `lib/api.ts`                | The `api/v1/*` router: filtering, sorting, pagination, response shapes        |
| `lib/paginate.ts`           | The paginator envelope the pages read `current_page`/`last_page`/`total` from |
| `lib/apiGateway.ts`         | Chooses between the in-process router and an external host                    |
| `pages/api/v1/[...path].ts` | Exposes the router over HTTP for the browser                                  |

`getStaticProps` calls the router in-process through `utils/fetchAPI`, so
`next build` needs no server listening. The browser calls the same router over
HTTP via `NEXT_PUBLIC_API_BASE_URL`.

Setting `API_BASE_URL` to a host switches both paths back to proxying an
external API, unchanged from how this app worked before.

## Endpoints

All responses are `{ "status": "success", "data": … }`; failures return
`{ "status": "error", "success": false, "message": …, "data": null }` so that
pages render a 404 rather than throwing.

| Method          | Endpoint                        | `data` payload                                |
| --------------- | ------------------------------- | --------------------------------------------- |
| GET             | `api/v1/carousels`              | `{ carousels: paginator }`                    |
| GET             | `api/v1/settings/:name`         | `{ setting }`                                 |
| GET             | `api/v1/posts`                  | `{ posts: paginator }`                        |
| GET             | `api/v1/posts/:slug`            | the post itself                               |
| GET             | `api/v1/post/categories`        | `{ categories: paginator }`                   |
| GET             | `api/v1/case-stories`           | `{ caseStories: paginator }`                  |
| GET             | `api/v1/case-stories/:slug`     | the case story itself                         |
| GET             | `api/v1/case-story/categories`  | `{ categories: paginator }`                   |
| GET             | `api/v1/properties`             | `{ properties: paginator }`                   |
| GET             | `api/v1/properties/:slug`       | the property itself                           |
| GET             | `api/v1/facilities`             | `{ facilities: paginator }`                   |
| GET             | `api/v1/members`                | `{ members: paginator }`                      |
| GET             | `api/v1/search`                 | paginator plus `query` counts per model       |
| GET/POST/DELETE | `api/v1/cart`                   | `{ properties: paginator of saved listings }` |
| POST            | `api/v1/subscribers`            | `{ subscriber }`                              |
| POST            | `api/v1/contact`                | `{ enquiry }`                                 |
| POST            | `api/v1/contact/saved-listings` | `{ enquiry }`                                 |

### Query parameters

- `page`, `per_page` — pagination (`per_page` defaults to 20)
- `sort`, `sort_by` — column and `asc`/`desc`; a column the rows don't have
  leaves the stored order alone
- `published=1` — published rows only
- `category_slug`, `category_id` — comma separated, match any
- `exclude_post_id` — comma separated ids to drop (used for "related" lists)
- `precinct` — properties; matched ignoring whitespace, because the labels in
  the page filters are spaced differently from the stored values
- `ideal_rent` — properties; `below-7`, `7-to-10`, `above-10`
- `q`, `model` — search; `model` is `Post`, `CaseStory` or `Property`

### Writes

Saved listings, subscribers and enquiries are appended to `data/runtime/`,
which is gitignored. That is a working store for a single self-hosted process
(the pm2 setup in `pm2.config.js`), not a database — swap `runtime` in
`lib/db.ts` for a real one before relying on it. Nothing else writes.
