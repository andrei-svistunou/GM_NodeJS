import { Sequelize, DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

export type Permissions = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

interface IGroup {
  id: string;
  name: string;
  permissions: Permissions[];
}

const sequelize = new Sequelize('postgres://fyshslnh:yCFlwJdgqT8iNtRCnQElA-nHMyDZ7IGX@tai.db.elephantsql.com:5432/fyshslnh');

class Group extends Model<IGroup>
  implements IGroup {
    public id!: string;
    public name!: string;
    public permissions: Permissions[];
}

Group.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: uuidv4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  permissions: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Group',
  tableName: 'groups',
  createdAt: false,
  updatedAt: false
});

console.log(Group === sequelize.models.Group);

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

export default Group;
