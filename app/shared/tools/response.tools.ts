import {ContentfulCommon, ContentfulIterableResponse} from 'ng2-contentful';

// this will be the part of ng2-contentful tools
/**
 * Transforms response to usable form by resolving all includes objects
 * @param response
 * @returns {T[]}
 */
export function transformResponse<T extends ContentfulCommon<any>>
(response: ContentfulIterableResponse<ContentfulCommon<any>>): T[] {
  // collect all includes
  let includes = {};
  for (let key in response.includes) {
    if (response.includes.hasOwnProperty(key)) {
      for (let item of response.includes[key]) {
        includes[item.sys.id] = item;
      }
    }
  }
  for (let item of response.items) {
    includes[item.sys.id] = item;
  }
  //  will change it later
  for (let item of response.items) {
    for (let key in item.fields) {
      if (item.fields.hasOwnProperty(key)) {
        let value = item.fields[key];
        if (value instanceof Array) {
          extendsArrayWithFields(value);
        }
        if (value instanceof Object && value.hasOwnProperty('sys')) {
          extendsObjectWithFields(value);
        }
      }
    }
  }

  function extendsObjectWithFields(value) {
    if (value.hasOwnProperty('sys') && includes.hasOwnProperty(value.sys.id)) {
      value.fields = includes[value.sys.id].fields;
      value.sys = includes[value.sys.id].sys;
    }
  }

  function extendsArrayWithFields(items: any[]) {
    for (let item of items) {
      extendsObjectWithFields(item);
    }
  }

  return <T[]> response.items;
}
