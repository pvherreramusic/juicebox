const express = require('express');
const tagsRouter = express.Router();
const { getPostsByTagName} = require('../db');

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to tags");

  next(); // THIS IS DIFFERENT
});


const { getAllTags } = require('../db');

// UPDATE
tagsRouter.get('/', async (req, res) => {
  const tags = await getAllTags();

  res.send({
    tags
  });
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
  const { tagName } = req.params;
 
  try {
    const getTagged = await getPostsByTagName(tagName);
    res.send({ getTagged })
   
  } catch ({ name, message }) {
    next({ name, message });
  }
});

tagsRouter.get('/', async (req, res) => {
  try {
    const allTags = await getAllTags();

    const tags = allTags.filter(post => {
      
      
  if (post.active) {
    return true;
  }

  
  if (req.user && post.author.id === req.user.id) {
    return true;
  }

 
  return false;
});
   

    res.send({
      tags
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = tagsRouter;

