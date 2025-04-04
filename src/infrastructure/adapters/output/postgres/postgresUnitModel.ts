import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../../../config/postgreSQL";
import { PostgresAssociation } from "./postgresAssociationModel";
import { PostgresUser } from "./postgresUserModel";

interface IUnit {
  id: string;
  name: string;
  associationId?: string;
}

const defineUnitModel = (sequelize: Sequelize) => {
  const Unit = sequelize.define<Model<IUnit>>(
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

  Unit.belongsTo(PostgresAssociation, {
    foreignKey: "associationId",
    as: "association",
  });

  Unit.belongsToMany(PostgresUser, {
    through: "unit_users",
    foreignKey: "unitId",
    as: "users",
  });

  return Unit;
};

export const PostgresUnit = defineUnitModel(sequelize);
