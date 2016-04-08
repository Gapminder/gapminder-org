import {Injectable} from 'angular2/core';
import {PageStructureContent} from '../structures/content-type.structures';

export interface PageNode {
  name: string;
}

@Injectable()
export class PageStructure {
  private _structure: PageStructureContent;
  private _flat_structure: Array<PageStructureContent> = [];

  buildFromContentful(structure: PageStructureContent): void {
    this._structure = structure;
    this._flat_structure = this.createFlattenStructure(this._structure);
  }

  get structure() {
    return this._structure;
  }

  getSectionType(type: string): PageStructureContent {
    return this._flat_structure.find(item => item.type === type);
  }

  private createFlattenStructure(item: PageStructureContent): Array<PageStructureContent> {
    let flatStructure: Array<PageStructureContent> = [];
    if (item.children && item.children.length) {
      for (let child of item.children) {
        flatStructure = flatStructure.concat(this.createFlattenStructure(child.fields));
      }
    }
    flatStructure.push(item);
    return flatStructure;
  }
}
