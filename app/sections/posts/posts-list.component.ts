import {Component} from 'angular2/core';
import {DatePipe} from 'angular2/common';
import {ContentfulService} from 'ng2-contentful/dist/src/services/contentful.service';

@Component({
  selector: 'posts',
  template: <string> require('./posts-list.html'),
  styles: [<string> require('./posts-list.css')],
  providers: [ContentfulService],
  pipes: [DatePipe]
})
export class PostsList {
  private posts:any = [
    {
      title: 'Ignorance Survey in South Africa 2015',
      date: new Date(),
      body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer`
    },
    {
      title: 'Ignorance Survey in South Africa 2015',
      date: new Date(),
      body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer`
    },
    {
      title: 'Ignorance Survey in South Africa 2015',
      date: new Date(),
      body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer`
    }
  ];

  constructor(private _contentfulService: ContentfulService) {
  }
}
