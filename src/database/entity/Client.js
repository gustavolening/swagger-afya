const { EntitySchema } = require('typeorm');
const baseModel = require('./BaseModel');

module.exports = new EntitySchema({
  name: 'Client',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
      length: 255,
      nullable: false,
    },
    cpf: {
      type: String,
      length: 14,
      nullable: false,
      unique: true,
    },
    phone: {
      type: String,
      length: 14,
      nullable: false,
    },
    cellphone: {
      type: String,
      length: 14,
      nullable: true,
    },
    mail: {
      type: String,
      length: 255,
      unique: true,
      nullable: false,

    },
    bloodtype: {
      type: 'enum',
      enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
      nullable: true,
    },
    ...baseModel,
  },
  relations: {
    address: {
      type: 'one-to-one',
      target: 'Address',
      joinColumn: true,
      cascade: true,
      nullable: false,
    },
    medicalRecord: {
      type: 'one-to-one',
      target: 'MedicalRecord',
      joinColumn: true,
      cascade: true,
    },
  },
});
