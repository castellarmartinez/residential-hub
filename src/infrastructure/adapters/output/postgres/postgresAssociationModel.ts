import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../../../config/postgreSQL";

interface IAssociation {
  id: string;
  name: string;
  address?: string;
}

export const defineAssociationModel = (sequelize: Sequelize) => {
  return sequelize.define<Model<IAssociation>>(
    "Association",
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
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "associations",
      timestamps: false,
    }
  );
};

export const PostgresAssociation = defineAssociationModel(sequelize);
