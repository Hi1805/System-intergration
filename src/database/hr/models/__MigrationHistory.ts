import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface __MigrationHistoryAttributes {
  MigrationId: string;
  ContextKey: string;
  Model: any;
  ProductVersion: string;
}

export type __MigrationHistoryPk = "MigrationId" | "ContextKey";
export type __MigrationHistoryId = __MigrationHistory[__MigrationHistoryPk];
export type __MigrationHistoryCreationAttributes = __MigrationHistoryAttributes;

export class __MigrationHistory extends Model<__MigrationHistoryAttributes, __MigrationHistoryCreationAttributes> implements __MigrationHistoryAttributes {
  MigrationId!: string;
  ContextKey!: string;
  Model!: any;
  ProductVersion!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof __MigrationHistory {
    return __MigrationHistory.init({
    MigrationId: {
      type: DataTypes.STRING(150),
      allowNull: false,
      primaryKey: true
    },
    ContextKey: {
      type: DataTypes.STRING(300),
      allowNull: false,
      primaryKey: true
    },
    Model: {
      type: DataTypes.BLOB,
      allowNull: false
    },
    ProductVersion: {
      type: DataTypes.STRING(32),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: '__MigrationHistory',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_dbo.__MigrationHistory",
        unique: true,
        fields: [
          { name: "MigrationId" },
          { name: "ContextKey" },
        ]
      },
    ]
  });
  }
}
