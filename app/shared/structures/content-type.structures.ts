

import {ContentfulCommon} from 'ng2-contentful/ng-contentful-types';
export interface NodePageContent {
  title: string;
  type: string;
  slug: string;
  description?: string;
  relatedEntries?: NodePageContent[];
  thumbnail: any; // will be changed to sys structure
  createdAt: string;
}

export interface VideoContent {
  title: string;
  description?: string;
  youtube?: string;
  vimeo?: string;
}

export interface HtmlContent {
  name: string;
  content: string;
}

export interface ImageContent {
  title: string;
}

export interface PageStructureContent {
  active: boolean;
  name: string;
  type: string;
  children: Array<ContentfulCommon<PageStructureContent>>;
}
