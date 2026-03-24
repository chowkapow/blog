import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('blog');

  const index = posts.map((post) => ({
    slug: post.id,
    title: post.data.title,
    description: post.data.description,
    date: post.data.pubDate.toISOString(),
    // Strip frontmatter delimiters and basic markdown syntax from body
    body: (post.body ?? '')
      .replace(/---[\s\S]*?---/, '')
      .replace(/[#*_`>\[\]]/g, '')
      .trim(),
  }));

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
}
