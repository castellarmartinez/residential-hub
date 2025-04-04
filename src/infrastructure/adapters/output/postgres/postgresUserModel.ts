import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../../../config/postgreSQL";

interface IUser {
  id: string;
  email: string;
  password: string;
  names?: string;
  lastNames?: string;
}

const defineUserModel = (sequelize: Sequelize) => {
  return sequelize.define<Model<IUser>>(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      names: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastNames: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "users",
      timestamps: false,
    }
  );
};

export const PostgresUser = defineUserModel(sequelize);
