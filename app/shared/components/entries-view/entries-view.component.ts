import {Component} from 'angular2/core';
import {Input} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {ContentfulContentTypes} from '../../services/contentful-content-types.service';
import {VideoEntry} from './video.component';
import {HtmlEntry} from './html.component.ts';
import {IContentfulConfig} from 'ng2-contentful/dist/src/ng2-contentful-config';
import {ContentfulConfig} from '../../../app.constans';

@Component({
  selector: 'entries-view',
  template: `
    <p *ngFor="#entry of entries">
      <video-entry *ngIf="entry.isVideo" [entry]="entry"></video-entry>
      <html-entry *ngIf="entry.isHtml" [entry]="entry"></html-entry>
    </p>
  `,
  providers: [ContentfulContentTypes],
  directives: [VideoEntry, HtmlEntry]
})
export class EntriesView implements OnInit {
  @Input() entries: any[];

  ngOnInit(): any {
    for (let entry of this.entries) {
      entry.sys.contentType = ContentfulContentTypes.getContentTypeById(entry.sys.contentType.sys.id);
      entry.isVideo = this.resolveType(entry, ContentfulConfig.VIDEO_CONTENT_ID);
      entry.isHtml = this.resolveType(entry, ContentfulConfig.HTML_CONTENT_ID);
    }
    return;
  }

  resolveType(entry: any, id: string): boolean {
    return entry.sys.contentType.sys.id === id;
  }
}
