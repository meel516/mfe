import React, { useEffect, useRef } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const BlogDetail = ({ image, title, description, createdAt, user }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const contentRef = useRef(null);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      {/* Hero Image with Parallax Effect */}
      {
        <motion.div
          variants={itemVariants}
          className="relative w-full h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl mb-12 group"
        >
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </motion.div>
      }

      {/* Title & Meta */}
      <motion.div variants={itemVariants} className="mb-12">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold mr-4">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-300">
              Written by <span className="text-black">{user?.name}</span>
            </p>
            <p className="text-xs text-gray-400">
              {new Date(createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 leading-tight mb-6">
          {title}
        </h1>

        <div className="flex items-center space-x-4">
          <span className="h-px w-16 bg-gradient-to-r from-purple-500 to-pink-500" />
          <span className="text-gray-400 text-sm">Article</span>
        </div>
      </motion.div>

      {/* Content */}
      <motion.article
        variants={itemVariants}
        ref={contentRef}
        className="prose prose-lg prose-invert max-w-none 
                  prose-headings:text-gray-100
                  prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline
                  prose-blockquote:border-l-purple-500 prose-blockquote:text-gray-300
                  prose-strong:text-gray-100
                  prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded
                  prose-img:rounded-xl prose-img:shadow-lg"
      >
        <ReactQuill
          readOnly
          theme="bubble"
          value={description}
          className="text-gray-300 leading-relaxed"
        />
      </motion.article>

      {/* Floating CTA */}
      <motion.div
        variants={itemVariants}
        className="fixed bottom-8 right-8 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
          Like this article
        </button>
      </motion.div>
    </motion.section>
  );
};

export default BlogDetail;
