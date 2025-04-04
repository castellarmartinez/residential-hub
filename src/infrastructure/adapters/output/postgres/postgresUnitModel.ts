import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { sequelize } from "../../../../config/postgreSQL";

interface IUnit {
  id: string;
  name: string;
  associationId?: string;
}

export interface UnitInstance
  extends Model<IUnit, Optional<IUnit, "associationId">>,
    IUnit {
  setUsers: (users: string[]) => Promise<void>;
  addUser: (userId: string) => Promise<void>;
  addUsers: (userIds: string[]) => Promise<void>;
}

export const defineUnitModel = (sequelize: Sequelize) => {
  return sequelize.define<UnitInstance>(
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
