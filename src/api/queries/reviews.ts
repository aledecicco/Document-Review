import { queryOptions, useQuery } from '@tanstack/react-query'
import * as z from 'zod'

const MOCK_FILE = '/review_mock.json'

const Document = z.object({
  pdf_url: z.string(),
})

type Document = z.infer<typeof Document>

const User = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
})

type User = z.infer<typeof User>

const Issue = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  severity: z.union([
    z.literal('minor'),
    z.literal('major'),
    z.literal('critical'),
  ]),
  page: z.int(),
})

type Issue = z.infer<typeof Issue>

const Review = z.object({
  id: z.string(),
  name: z.string(),
  uploaded_at: z.string(),
  status: z.union([
    z.literal('created'),
    z.literal('processing'),
    z.literal('on_review'),
    z.literal('submitted'),
  ]),
  version: z.int(),
  document: Document,
  user: User,
  issues: z.array(Issue),
})

type Review = z.infer<typeof Review>

const fetchReviews = async (): Promise<Review[]> => {
  // TODO: fetch real reviews from server
  const json = await (await fetch(MOCK_FILE)).json()
  const reviews = [await Review.parseAsync(json)]

  return reviews
}

const REVIEWS_QUERY_KEY = ['reviews']

const reviewsQuery = queryOptions({
  queryKey: REVIEWS_QUERY_KEY,
  queryFn: () => fetchReviews(),
})

const useQueryReviews = () => useQuery(reviewsQuery)

export type { Document, Issue, Review, User }
export { useQueryReviews }
