import {Directive, Input, OnInit, ElementRef} from 'angular2/core';
import {ContentfulService} from 'ng2-contentful/dist/src/services/contentful.service';

@Directive({
  selector: '[contentful-src-id]',
  providers: [ContentfulService]
})
export class ContentfulImageDirective implements OnInit {
  @Input('contentful-src-id')
  contentfulAssetId: string;

  constructor(private element: ElementRef,
              private _contentful: ContentfulService) {
  }

  ngOnInit(): any {
    this._contentful.getAsset(this.contentfulAssetId)
      .map(response => response.json())
      .subscribe(
        response => {
          this.element.nativeElement.src = response.fields.file.url;
        }
      );
    return undefined;
  }
}
