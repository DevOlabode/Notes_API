const Joi = require('joi');

const noteSchema = Joi.object({
  title: Joi.string().min(1).max(100),
  content: Joi.string().min(1).required(),
  tags: Joi.array().items(Joi.string().max(30)).required(),
  isArchived: Joi.boolean().optional(),
  isPinned: Joi.boolean().optional()
});

module.exports = { noteSchema };