import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../../../config/postgreSQL";

interface IUnit {
  id: string;
  name: string;
  associationId?: string;
}

const defineUnitModel = (sequelize: Sequelize) => {
  return sequelize.define<Model<IUnit>>(
    "Unit",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      associationId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "associations",
          key: "id",
        },
      },
    },
    {
      tableName: "units",
      timestamps: false,
    }
  );
};

export const PostgresUnit = defineUnitModel(sequelize);
