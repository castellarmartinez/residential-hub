import { PostgresUser } from "./postgresUserModel";
import { PostgresUnit } from "./postgresUnitModel";
import { PostgresAssociation } from "./postgresAssociationModel";

export const associateModels = () => {
  PostgresUser.belongsToMany(PostgresAssociation, {
    through: "association_users",
    foreignKey: "userId",
    otherKey: "associationId",
    as: "associations",
  });

  PostgresAssociation.belongsToMany(PostgresUser, {
    through: "association_users",
    foreignKey: "associationId",
    otherKey: "userId",
    as: "users",
  });

  PostgresUser.belongsToMany(PostgresUnit, {
    through: "unit_users",
    foreignKey: "userId",
    otherKey: "unitId",
    as: "units",
  });

  PostgresUnit.belongsToMany(PostgresUser, {
    through: "unit_users",
    foreignKey: "unitId",
    otherKey: "userId",
    as: "users",
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
