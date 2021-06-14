const { validationResult } = require('express-validator');
const specialistRepository = require('../../services/Specialists');

async function get(req, res) {
  try {
    const result = await specialistRepository.list(req.query);
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
}
async function getOne(req, res) {
  try {
    const result = await specialistRepository.getOne(req.params.id);
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
}
async function update(req, res) {
  // Verifica se existem erros de validação
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json(validationErrors.array());
  }

  try {
    const result = await specialistRepository.update(req.params.id, req.body);
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function insert(req, res) {
  try {
    // Verifica se existem erros de validação
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json(validationErrors.array());
    }

    const specialist = req.body;
    const result = await specialistRepository.create(specialist);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function remove(req, res) {
  try {
    // Verifica se existem erros de validação
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(404).json(validationErrors.array());
    }

    const result = await specialistRepository.delete(req.params.id);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
}
module.exports = {
  get, getOne, insert, update, remove,
};
