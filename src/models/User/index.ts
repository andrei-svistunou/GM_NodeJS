import { Sequelize, DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import Group from '../Group';

interface UserAttributes {
  user_id: string;
  login: string;
  password: string;
  age: number;
  is_deleted: boolean;
}

const sequelize = new Sequelize('postgres://fyshslnh:yCFlwJdgqT8iNtRCnQElA-nHMyDZ7IGX@tai.db.elephantsql.com:5432/fyshslnh');

class User extends Model<UserAttributes>
  implements UserAttributes {
    public user_id!: string;
    public login!: string;
    public password!: string;
    public age!: number;
    public is_deleted: boolean;
}

User.init({
  user_id: {
    type: DataTypes.UUID,
    defaultValue: uuidv4,
    primaryKey: true
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  createdAt: false,
  updatedAt: false
});

console.log(User === sequelize.models.User); // true
User.belongsToMany(Group, { through: 'UserGroups' });
Group.belongsToMany(User, { through: 'UserGroups' });

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync();
    console.log('Synchronization has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default User;
