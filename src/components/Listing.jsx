import React from "react";
import { Link } from "gatsby";
import Image from "gatsby-image";
import { Tags } from "../components/Tags";
import { get } from "lodash";
export default ({ post }) => {
  console.log("::listing post", post);
  const title = post.frontmatter.title || post.fields.slug;
  const publicURL = get(post, "frontmatter.images[0].publicURL");
  let gif =
    publicURL && publicURL.slice(-`.gif`.length) === `.gif` ? publicURL : null;
  const image = get(post, "frontmatter.images[0].childImageSharp.fixed");
  return (
    <article className="listing" key={post.fields.slug}>
      {gif ? (
        <img src={gif} />
      ) : image ? (
        <Link to={post.fields.slug} itemProp="url">
          <Image
            fixed={image}
            alt=""
            objectFit="cover"
            objectPosition="50% 50%"
            backgroundColor="#f8f8f8"
          />
        </Link>
      ) : (
        ""
      )}
      <header>
        <h2>
          <Link to={post.fields.slug} itemProp="url">
            <span itemProp="headline">{title}</span>
          </Link>
        </h2>
        <small>{post.frontmatter.date}</small>
        <Tags {...{ post }} />
        {/* Why would they have done it like this? dumb */}
        {/* <p
        dangerouslySetInnerHTML={{
          __html: post.frontmatter.excerpt || post.excerpt,
        }}
        itemProp="description"
      /> */}
        <p>{post.excerpt}</p>
      </header>
    </article>
  );
};
