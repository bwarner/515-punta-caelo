import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  // 👇 This is the important part
  options: {
    mdxOptions: {
      parseFrontmatter: true,
    },
  },
});

export default withMDX(nextConfig);
