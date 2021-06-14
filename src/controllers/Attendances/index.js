const { validationResult } = require('express-validator');
const attendancesRepository = require('../../services/Attendances');

async function get(req, res) {
  try {
    // Verifica se existem erros de validação
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json(validationErrors.array());
    }

    const result = await attendancesRepository.list(req.query);
    return res.json(result);
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function getOne(req, res) {
  try {
    // Verifica se existem erros de validação
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(400).json(validationErrors.array());
    }

    const result = await attendancesRepository.getOne(req.params.id);
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

    const result = await attendancesRepository.update(req.params.id, req.body);
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

    const result = await attendancesRepository.create(req.body);
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

    const exist = await attendancesRepository.getById(req.params.id);
    if (!exist) return res.status(404).json('Registro não existe no banco de dados!');
    const result = await attendancesRepository.delete(req.params.id);
    return (result.affected ? res.status(200).json(result) : res.status(204).json(result));
  } catch (err) {
    return res.status(400).json(err);
  }
}

module.exports = {
  get, getOne, insert, update, remove,
};
