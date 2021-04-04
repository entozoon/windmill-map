import React from "react";
import { Link, graphql } from "gatsby";
import { kebabCase, startCase } from "lodash";
export const tagHuman = (tag) => startCase(tag).replace("3 D", "3D");
export const Tags = ({ post }) =>
  post.frontmatter.tags ? (
    <nav className="tags">
      {post.frontmatter.tags.map((t) => (
        <Link to={`/tags/${kebabCase(t)}`} key={t} className="tag">
          {tagHuman(t)}
        </Link>
      ))}
    </nav>
  ) : null;
