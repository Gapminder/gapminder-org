import {Injectable} from 'angular2/core';

export interface ContentType {
  description: string;
  name: string;
  displayField: string;
  sys: {
    id: string
  };
}

export class ContentfulContentTypes {
  private static _contentTypes = {};

  static getContentTypeById(contentId: string): ContentType {
    if (this._contentTypes.hasOwnProperty(contentId)) {
      return this._contentTypes[contentId];
    }
  }

  static set contentTypes(items: ContentType[]) {
    for (let item of items) {
      this._contentTypes[item.sys.id] = item;
    }
  }
}
