export type FieldMapFunction = (field: string) => string;

export interface IMappingStrategy {
  /**
   * Used to convert a MongoDB document into an AntMongoEntity.
   */
  docToEntity: FieldMapFunction;
  /**
   * Used to convert an AntMongo entity into a MongoDB document.
   */
  entityToDoc: FieldMapFunction;
  /**
   * List of **entity** fields to be mapped. Unmapped fields will remain unchanged.
   */
  fields: string[];
}
