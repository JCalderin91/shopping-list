import Airtable from "airtable";
import { FieldSet } from "airtable/lib/field_set";
import { QueryParams } from "airtable/lib/query_params";

const apiKey = import.meta.env.VITE_AIRTABLE_TOKEN;
const bd = import.meta.env.VITE_AIRTABLE_BD;

Airtable.configure({ apiKey });

const base = Airtable.base(bd);

export class Client<T> {
  all(table: string, options: QueryParams<FieldSet> = {}): Promise<T[]> {
    return base(table)
      .select({
        view: "Grid view",
        ...options,
      })
      .all()
      .then((items): T[] => {
        return items.map((item) => ({
          ...item.fields,
          uuid: item.id,
        })) as T[];
      });
  }
  async create(item: T, table: string): Promise<any> {
    return await base(table).create(
      item as any,
      function (err: any, record: any) {
        if (err) {
          return;
        }
        return record;
      }
    );
  }
  delete(id: string, table: string): Promise<T> {
    return new Promise((resolve, reject) => {
      base(table).destroy(id, function (err, record) {
        if (err) {
          reject(err);
          return;
        }
        console.log({ record });
        resolve(record as T);
      });
    });
  }
  async update(id: string, item: T, table: string): Promise<T> {
    return new Promise((resolve, reject) => {
      base(table).create(id, item as any, function (err, record) {
        if (err) {
          reject(err);
          return;
        }
        resolve(record as any);
      });
    });
  }
}
