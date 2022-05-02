import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Personal, PersonalId } from './Personal';

export interface Benefit_PlansAttributes {
  Benefit_Plan_ID: number;
  Plan_Name?: string;
  Deductable?: number;
  Percentage_CoPay?: number;
}

export type Benefit_PlansPk = "Benefit_Plan_ID";
export type Benefit_PlansId = Benefit_Plans[Benefit_PlansPk];
export type Benefit_PlansOptionalAttributes = "Benefit_Plan_ID" | "Plan_Name" | "Deductable" | "Percentage_CoPay";
export type Benefit_PlansCreationAttributes = Optional<Benefit_PlansAttributes, Benefit_PlansOptionalAttributes>;

export class Benefit_Plans extends Model<Benefit_PlansAttributes, Benefit_PlansCreationAttributes> implements Benefit_PlansAttributes {
  Benefit_Plan_ID!: number;
  Plan_Name?: string;
  Deductable?: number;
  Percentage_CoPay?: number;

  // Benefit_Plans hasMany Personal via Benefit_Plans
  Personals!: Personal[];
  getPersonals!: Sequelize.HasManyGetAssociationsMixin<Personal>;
  setPersonals!: Sequelize.HasManySetAssociationsMixin<Personal, PersonalId>;
  addPersonal!: Sequelize.HasManyAddAssociationMixin<Personal, PersonalId>;
  addPersonals!: Sequelize.HasManyAddAssociationsMixin<Personal, PersonalId>;
  createPersonal!: Sequelize.HasManyCreateAssociationMixin<Personal>;
  removePersonal!: Sequelize.HasManyRemoveAssociationMixin<Personal, PersonalId>;
  removePersonals!: Sequelize.HasManyRemoveAssociationsMixin<Personal, PersonalId>;
  hasPersonal!: Sequelize.HasManyHasAssociationMixin<Personal, PersonalId>;
  hasPersonals!: Sequelize.HasManyHasAssociationsMixin<Personal, PersonalId>;
  countPersonals!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Benefit_Plans {
    return Benefit_Plans.init({
    Benefit_Plan_ID: {
      autoIncrement: true,
      type: DataTypes.DECIMAL(18,0),
      allowNull: false,
      primaryKey: true
    },
    Plan_Name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Deductable: {
      type: DataTypes.DECIMAL(18,0),
      allowNull: true
    },
    Percentage_CoPay: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Benefit_Plans',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_dbo.Benefit_Plans",
        unique: true,
        fields: [
          { name: "Benefit_Plan_ID" },
        ]
      },
    ]
  });
  }
}
