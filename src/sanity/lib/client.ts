import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

// https://www.sanity.io/learn/course/controlling-cached-content-in-next-js
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
