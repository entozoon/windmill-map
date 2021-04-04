import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Listing from "../components/Listing";
import { tagHuman } from "../components/Tags";
import { startCase, kebabCase } from "lodash";
const Tags = ({ data, location, pageContext }) => {
  let { tag } = pageContext;
  const { edges, totalCount } = data.allMarkdownRemark;
  return (
    <Layout location={location}>
      <SEO title={tagHuman(tag)} />
      <h1>{tagHuman(tag)}</h1>
      <div className="listings">
        {edges.map((edge, i) => (
          // const { slug } = post.fields;
          // const { title } = post.frontmatter;
          // return (
          //   <li key={slug}>
          //     <Link to={slug}>{title}</Link>
          //   </li>
          // )
          <Listing post={edge.node} key={i} />
        ))}
      </div>
    </Layout>
  );
};
export default Tags;
export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "DD MMM YYYY")
            description
            tags
            images {
              childImageSharp {
                fixed(width: 400, height: 250) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`;
