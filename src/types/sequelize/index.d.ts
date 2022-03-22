// sequelize
import { Model as OriginalModel } from 'sequelize/types/model';

// model type
import { ModelsType } from '../../db/models/';

declare module 'sequelize' {
  export abstract class Model<T = any, T2 = any> extends OriginalModel<T, T2> {
    public static associate?: (models: ModelsType) => void;
  }
}
