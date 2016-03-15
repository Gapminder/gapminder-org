

export interface NodePageContent {
  title: string;
  type: string;
  slug: string;
  description?: string;
  relatedEntries?: NodePageContent[];
  thumbnail: any; // will be changed to sys structure
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
