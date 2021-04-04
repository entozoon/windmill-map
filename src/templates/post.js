import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Image from "gatsby-image";
import { Tags } from "../components/Tags";
import { Disqus } from "gatsby-plugin-disqus";
import ImageGallery from "react-image-gallery";
import { get } from "lodash";
export default ({ data, location }) => {
  const post = data.markdownRemark;
  console.log("::post", post);
  console.log("::data", data);
  let images;
  if (
    get(post, "frontmatter.images[0].childImageSharp.full.src") &&
    get(post, "frontmatter.images[0].childImageSharp.thumbnail.src")
  ) {
    images = post.frontmatter.images.map((i) => ({
      original: i.childImageSharp.full.src,
      thumbnail: i.childImageSharp.thumbnail.src,
    }));
    console.log("::images", images);
  }
  return (
    <Layout location={location}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article className="post">
        {post.frontmatter.youtubeVideoId ? (
          <iframe
            width="1024"
            height="600"
            frameborder="0"
            src={`https://www.youtube.com/embed/${post.frontmatter.youtubeVideoId}?controls=0&showinfo=0&autoplay=1`}
            // autoplay isn't a thing anymore in chrome, without using API stuff
            // but leave here JIC
            allow="autoplay; encrypted-media"
          ></iframe>
        ) : null}
        {images ? (
          // (PROBS) DOESN'T HANDLE GIFS - E.G. REDDIT LIVE FEED
          <div className="gallery">
            <ImageGallery
              {...{
                items: images,
                autoPlay: false,
                showPlayButton: false,
                showThumbnails: images.length > 1,
              }}
            />
          </div>
        ) : null}
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <small>{post.frontmatter.date}</small>
          <Tags {...{ post }} />
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
      </article>
      <Disqus
        config={{
          url: `${data.site.siteMetadata.siteUrl + location.pathname}`,
          identifier: post.id,
          title: post.frontmatter.title,
        }}
      />
    </Layout>
  );
};
export const pageQuery = graphql`
  query BlogPostBySlug($id: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        date(formatString: "DD MMM YYYY")
        description
        tags
        youtubeVideoId
        images {
          publicURL
          childImageSharp {
            full: fixed(width: 2048) {
              # ...GatsbyImageSharpResolutions_tracedSVG
              ...GatsbyImageSharpFixed
            }
            thumbnail: fixed(width: 240) {
              src
            }
            # resize(width: 500, height: 500) {
            #   src
            # }
            # name2: resolutions(width: 500, height: 500) {
            #   ...GatsbyImageSharpResolutions_tracedSVG
            # }
          }
        }
      }
    }
  }
`;
