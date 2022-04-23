import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface organizationsAttributes {
  org_id: number;
  name: string;
  status: number;
  phone: string;
  avatar: string;
  cover_image: string;
  description: string;
}

export type organizationsPk = "org_id";
export type organizationsId = organizations[organizationsPk];
export type organizationsOptionalAttributes = "org_id";
export type organizationsCreationAttributes = Optional<organizationsAttributes, organizationsOptionalAttributes>;

export class organizations extends Model<organizationsAttributes, organizationsCreationAttributes> implements organizationsAttributes {
  org_id!: number;
  name!: string;
  status!: number;
  phone!: string;
  avatar!: string;
  cover_image!: string;
  description!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof organizations {
    return organizations.init({
    org_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(11),
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    cover_image: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'organizations',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "org_id" },
        ]
      },
    ]
  });
  }
}
