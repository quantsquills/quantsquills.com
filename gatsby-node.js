const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )
  const posts = result.data.allMarkdownRemark.edges;
    
  posts.forEach(({node}, idx) => {
    
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/templates/blog-post.js'),
      context: {
        previous: idx === posts.length - 1 ? null : posts[idx + 1].node,
        next: idx === 0 ? null : posts[idx - 1].node,
        slug: node.fields.slug
      },
    })
  });
  
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    console.log('value', value);
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
