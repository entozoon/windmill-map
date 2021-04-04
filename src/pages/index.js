import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
const windmills = [];
export default ({ data, location }) => {
  const posts = data.allMarkdownRemark.nodes;
  console.log("::posts", posts);
  if (posts.length === 0) {
    return <p>No posts</p>;
  }
  return (
    <Layout location={location}>
      {/* <SEO title="" />
      {posts.length ? (
        <div className="listings">
          {posts.map((post, i) => (
            <Listing {...{ post }} key={i} />
          ))}
        </div>
      ) : (
        ""
      )} */}
    </Layout>
  );
};
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          title
          # date(formatString: "DD MMM YYYY")
          # description
          # tags
          # images {
          #   publicURL
          #   childImageSharp {
          #     fixed(width: 400, height: 250) {
          #       # ...GatsbyImageSharpFixed
          #       ...GatsbyImageSharpFixed_tracedSVG
          #     }
          #   }
          # }
        }
      }
    }
  }
`;
