import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface post_editing_historiesAttributes {
  id_post: number;
  end_date?: Date;
  residential_address: string;
  district: string;
  province?: string;
  ward?: string;
  phone: string;
  created_at?: Date;
  start_date?: Date;
}

export type post_editing_historiesPk = 'id_post';
export type post_editing_historiesId =
  post_editing_histories[post_editing_historiesPk];
export type post_editing_historiesOptionalAttributes =
  | 'end_date'
  | 'province'
  | 'ward'
  | 'created_at'
  | 'start_date';
export type post_editing_historiesCreationAttributes = Optional<
  post_editing_historiesAttributes,
  post_editing_historiesOptionalAttributes
>;

export class post_editing_histories
  extends Model<
    post_editing_historiesAttributes,
    post_editing_historiesCreationAttributes
  >
  implements post_editing_historiesAttributes
{
  id_post!: number;
  end_date?: Date;
  residential_address!: string;
  district!: string;
  province?: string;
  ward?: string;
  phone!: string;
  created_at?: Date;
  start_date?: Date;

  static initModel(
    sequelize: Sequelize.Sequelize
  ): typeof post_editing_histories {
    return post_editing_histories.init(
      {
        id_post: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        end_date: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        residential_address: {
          type: DataTypes.STRING(60),
          allowNull: false,
        },
        district: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        province: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        ward: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        phone: {
          type: DataTypes.STRING(15),
          allowNull: false,
        },
        start_date: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'post_editing_histories',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id_post' }],
          },
        ],
      }
    );
  }
}
