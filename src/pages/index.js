import React from "react";
import { Link, graphql } from "gatsby";
import axios from "axios";
import Layout from "../components/layout";
import { dump } from "./dump";
const windmills = [];
var axiosInstance = axios.create({
  baseURL: "https://en.wikipedia.org/wiki",
  timeout: 5000,
});
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
      {/* <div
        dangerouslySetInnerHTML={{
          __html: dump,
        }}
      /> */}
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
