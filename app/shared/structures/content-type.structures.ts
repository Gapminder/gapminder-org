

export interface NodePageContent {
  title: string;
  type: string;
  slug: string;
  description?: string;
  relatedEntries?: NodePageContent[];
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
