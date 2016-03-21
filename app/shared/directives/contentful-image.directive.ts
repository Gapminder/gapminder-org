import {Directive, Input, OnInit, ElementRef} from 'angular2/core';
import {ContentfulService, ContentfulCommon, ContentfulAsset} from 'ng2-contentful';
import {URLSearchParams} from 'angular2/http';

@Directive({
  selector: '[contentful-src-id]',
  providers: [ContentfulService]
})
export class ContentfulImageDirective implements OnInit {
  @Input('contentful-src-id')
  private contentfulAssetId: string;
  @Input()
  private width: string;
  @Input()
  private height: string;
  @Input()
  private fit: string;
  private queryParams: URLSearchParams = new URLSearchParams();

  constructor(private element: ElementRef,
              private _contentful: ContentfulService) {
  }

  ngOnInit(): any {
    this._contentful
      .create()
      .getAsset(this.contentfulAssetId)
      .commit<ContentfulCommon<ContentfulAsset>>()
      .subscribe(
        response => {
          this.element.nativeElement.src =
            this.imageUrl(response.fields.file.url);
        }
      );
    return undefined;
  }

  private imageUrl(url: string): string {
    if (this.width) {
      this.queryParams.set('w', this.width);
    }
    if (this.height) {
      this.queryParams.set('h', this.height);
    }
    if (this.fit) {
      this.queryParams.set('fit', this.fit);
    }
    return `${url}?${this.queryParams.toString()}`;
  }
}
