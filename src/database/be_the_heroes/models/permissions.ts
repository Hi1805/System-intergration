import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface permissionsAttributes {
  org_id: number;
  user_id: number;
  role: string;
  name: string;
  avatar: string;
}

export type permissionsPk = "org_id";
export type permissionsId = permissions[permissionsPk];
export type permissionsCreationAttributes = permissionsAttributes;

export class permissions extends Model<permissionsAttributes, permissionsCreationAttributes> implements permissionsAttributes {
  org_id!: number;
  user_id!: number;
  role!: string;
  name!: string;
  avatar!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof permissions {
    return permissions.init({
    org_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'permissions',
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
      {
        name: "permissions_users",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
