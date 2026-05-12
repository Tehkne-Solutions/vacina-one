import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { getLatestPosts, getFeaturedImage, getAuthorName } from "@/lib/wordpress";

export default async function BlogSection() {
  const posts = await getLatestPosts(3);

  return (
    <motion.section
      id="blog"
      className="w-full bg-[#F2FBFA] py-[clamp(72px,7vw,130px)] font-franie"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
    >
      <div className="mx-auto w-[85%] max-w-[1570px]">
        <motion.div className="text-center" variants={fadeUp}>
          <p className="text-[clamp(22px,1.8vw,32px)] font-bold leading-[118%] tracking-[-0.02em] text-[#56B0BB]">
            Blog VacinaOne
          </p>

          <h2 className="mt-1 text-[clamp(34px,3.2vw,56px)] font-bold leading-[108%] tracking-[-0.03em] text-[#1A3858]">
            conteúdo e educação em saúde
          </h2>
        </motion.div>

        {posts.length === 0 ? (
          <motion.div className="mt-[clamp(64px,6vw,115px)] text-center" variants={fadeUp}>
            <h3 className="text-[24px] font-bold text-[#1A3858] mb-4">
              Nenhum artigo publicado ainda.
            </h3>
            <p className="text-[16px] text-[#5A5A5A]">
              Em breve, você encontrará aqui conteúdos sobre vacinação, prevenção e cuidado em saúde.
            </p>
          </motion.div>
        ) : (
          <>
            <motion.div
              className="mt-[clamp(64px,6vw,115px)] grid grid-cols-1 gap-[clamp(42px,4vw,72px)] md:grid-cols-2 xl:grid-cols-3"
              variants={staggerContainer}
            >
              {posts.map((post) => {
                const featuredImage = getFeaturedImage(post);
                const authorName = getAuthorName(post);
                const date = new Date(post.date).toLocaleDateString('pt-BR');
                const excerpt = post.excerpt?.rendered?.replace(/<[^>]*>/g, '').slice(0, 150) + '...';

                return (
                  <motion.article
                    key={post.id}
                    variants={fadeUp}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="group"
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <div className="relative aspect-square w-full max-w-[452px] overflow-hidden bg-[#EAF4EB] md:max-w-none">
                        {featuredImage ? (
                          <Image
                            src={featuredImage.url}
                            alt={featuredImage.alt}
                            fill
                            sizes="(max-width: 768px) 85vw, (max-width: 1360px) 28vw, 452px"
                            className="object-cover transition duration-500 group-hover:scale-[1.01]"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-[#56B0BB] text-4xl">
                            📝
                          </div>
                        )}
                      </div>

                      <div className="mt-8">
                        <div className="flex flex-wrap items-center gap-4 font-sans text-[14px] leading-[20px]">
                          <span className="font-medium text-[#243752]">{authorName}</span>
                          <span className="h-5 w-px bg-[#CDD2D8]" aria-hidden="true" />
                          <span className="font-normal text-[#6A778B]">{date}</span>
                        </div>

                        <h3 className="mt-4 text-[20px] font-semibold leading-[28px] tracking-[-0.012em] text-[#1A3858] underline underline-offset-[3px]">
                          {post.title.rendered.replace(/<[^>]*>/g, '')}
                        </h3>

                        <p className="mt-4 text-[14px] font-medium leading-[20px] text-[#6A778B]">{excerpt}</p>
                      </div>
                    </Link>
                  </motion.article>
                );
              })}
            </motion.div>

            <motion.div className="mt-12 text-center" variants={fadeUp}>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center border border-[#56B0BB] text-[#56B0BB] font-semibold px-6 py-3 rounded-full hover:bg-[#56B0BB] hover:text-white transition-colors duration-200"
              >
                Ver todos →
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </motion.section>
  );
}
