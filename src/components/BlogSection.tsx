"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

const posts = [
  {
    author: "Robert Lee",
    date: "August 25, 2024",
    title: "Vacina da gripe: o que muda todo ano e como se proteger",
    description:
      "A gripe não é sempre igual. Todo ano, o vírus Influenza sofre mutações genéticas e é por isso que a vacina também precisa ser atualizada anualmente.",
    image: "/images/vacina-one-homepage-blog-post-vacina-da-gripe.png",
  },
  {
    author: "Jane Adams",
    date: "September 18, 2024",
    title: "Vacina da gripe: o que muda todo ano e como se proteger",
    description:
      "A gripe não é sempre igual. Todo ano, o vírus Influenza sofre mutações genéticas e é por isso que a vacina também precisa ser atualizada anualmente.",
    image: "/images/vacina-one-homepage-blog-post-vacina-da-gripe-2.png",
  },
  {
    author: "Tom Harris",
    date: "October 1, 2024",
    title: "Vacina da gripe: o que muda todo ano e como se proteger",
    description:
      "A gripe não é sempre igual. Todo ano, o vírus Influenza sofre mutações genéticas e é por isso que a vacina também precisa ser atualizada anualmente.",
    image: "/images/vacina-one-homepage-blog-post-vacina-da-gripe-3.png",
  },
];

export default function BlogSection() {
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

        <motion.div
          className="mt-[clamp(64px,6vw,115px)] grid grid-cols-1 gap-[clamp(42px,4vw,72px)] md:grid-cols-2 xl:grid-cols-3"
          variants={staggerContainer}
        >
          {posts.map((post) => (
            <motion.article
              key={`${post.author}-${post.date}`}
              variants={fadeUp}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="group"
            >
              <div className="relative aspect-square w-full max-w-[452px] overflow-hidden bg-[#EAF4EB] md:max-w-none">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 85vw, (max-width: 1360px) 28vw, 452px"
                  className="object-cover transition duration-500 group-hover:scale-[1.01]"
                />
              </div>

              <div className="mt-8">
                <div className="flex flex-wrap items-center gap-4 font-sans text-[14px] leading-[20px]">
                  <span className="font-medium text-[#243752]">{post.author}</span>
                  <span className="h-5 w-px bg-[#CDD2D8]" aria-hidden="true" />
                  <span className="font-normal text-[#6A778B]">{post.date}</span>
                </div>

                <h3 className="mt-4 text-[20px] font-semibold leading-[28px] tracking-[-0.012em] text-[#1A3858] underline underline-offset-[3px]">
                  {post.title}
                </h3>

                <p className="mt-4 text-[14px] font-medium leading-[20px] text-[#6A778B]">{post.description}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
