import { PostgresAssociation } from "./postgresAssociationModel";
import { PostgresUnit } from "./postgresUnitModel";
import { PostgresUser } from "./postgresUserModel";

export const associateModels = () => {
  PostgresUser.belongsToMany(PostgresAssociation, {
    through: "association_users",
    foreignKey: "userId",
    otherKey: "associationId",
    as: "associations",
    timestamps: false,
  });

  PostgresAssociation.belongsToMany(PostgresUser, {
    through: "association_users",
    foreignKey: "associationId",
    otherKey: "userId",
    as: "users",
    timestamps: false,
  });

  PostgresUser.belongsToMany(PostgresUnit, {
    through: "unit_users",
    foreignKey: "userId",
    otherKey: "unitId",
    as: "units",
    timestamps: false,
  });

  PostgresUnit.belongsToMany(PostgresUser, {
    through: "unit_users",
    foreignKey: "unitId",
    otherKey: "userId",
    as: "users",
    timestamps: false,
  });

  PostgresUnit.belongsTo(PostgresAssociation, {
    foreignKey: "associationId",
    as: "association",
  });

  PostgresAssociation.hasMany(PostgresUnit, {
    foreignKey: "associationId",
    as: "units",
  });
};
