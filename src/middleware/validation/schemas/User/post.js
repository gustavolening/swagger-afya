const userRepository = require('../../../../services/Users');

module.exports = {
  name: {
    isLength: {
      errorMessage: 'Nome deve ter entre 6 e 255 caracteres.',
      options: { min: 6, max: 255 },
    },
  },
  login: {
    isLength: {
      errorMessage: 'Usuário deve ter entre 5 e 20 caracteres.',
      options: { min: 5, max: 20 },
    },
  },
  password: {
    isLength: {
      errorMessage: 'Senha deve ter no mínimo 6 caracteres.',
      options: { min: 6 },
    },
  },
  dontExist: {
    custom: {
      errorMessage: 'Esse login já está cadastrado no sistema.',
      options: async (value, { req }) => {
        const exist = await userRepository.getOne({ login: req.body.login });
        if (exist) {
          return Promise.reject(Error(this.errorMessage));
        }
        return true;
      },
    },
  },
};
