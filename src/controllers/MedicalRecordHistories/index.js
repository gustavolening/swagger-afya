const { validationResult } = require('express-validator');
const medRecordHistoriesRepository = require('../../services/MedicalRecordHistories');

async function get(req, res) {
  try {
    const result = await medRecordHistoriesRepository.list(req.query);
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function getOne(req, res) {
  try {
    const result = await medRecordHistoriesRepository.getOne(req.params.id);
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function update(req, res) {
  try {
    // Verifica se existem erros de validação
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json(validationErrors.array());
    }

    const result = await medRecordHistoriesRepository.update(req.body);
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

    const result = await medRecordHistoriesRepository.create(req.body);
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
      return res.status(400).json(validationErrors.array());
    }

    const result = await medRecordHistoriesRepository.delete(req.params.id);
    return (result.affected ? res.status(200).json(result) : res.status(404).json(result));
  } catch (err) {
    return res.status(400).json(err);
  }
}

module.exports = {
  get, getOne, insert, update, remove,
};
