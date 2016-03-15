import {ContentfulIterableResponse, ContentfulCommon} from 'ng2-contentful';
import {NodePageContent} from './content-type.structures';


export interface ContentfulNodePagesResponse extends ContentfulIterableResponse<ContentfulCommon<NodePageContent>> {
}

export interface ContentfulNodePage extends ContentfulCommon<NodePageContent> {
}
