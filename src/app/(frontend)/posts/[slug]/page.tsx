import { client, sanityFetch } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import { Post } from "@/components/Post";
import { POST_QUERY, POSTS_SLUGS_QUERY } from "@/sanity/lib/queries";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await sanityFetch({
    query: POST_QUERY,
    params,
    revalidate: 3600
  }); 

  if (!post) {
    notFound();
  }

  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 p-12">
      <Post {...post} />
    </main>
  );
}

/**
 *
 * @description No cache for single posts
 * @returns ?
 *
 * @see https://www.sanity.io/learn/course/controlling-cached-content-in-next-js/combining-sanity-cdn-with-the-next-js-cache#s-68797873d23c
 */
export async function generateStaticParams() {
  const slugs = await client
    .withConfig({ useCdn: true })
    .fetch(POSTS_SLUGS_QUERY);
 
  return slugs;
}
