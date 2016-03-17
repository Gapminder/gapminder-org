import {Component} from 'angular2/core';

const listProposals = [
  {
    img: 'http://www.gapminder.org/GapminderMedia/wp-uploads/ted2006.jpg',
    link: '',
    title: 'TED 2006'
  },
  {
    img: 'http://www.gapminder.org/GapminderMedia/wp-uploads/ted2007.jpg',
    link: '',
    title: 'TED 2007'
  },
  {
    img: 'http://www.gapminder.org/GapminderMedia/wp-uploads/ted2006.jpg',
    link: '',
    title: 'TED 2006'
  },
  {
    img: 'http://www.gapminder.org/GapminderMedia/wp-uploads/ted2007.jpg',
    link: '',
    title: 'TED 2007'
  }
];

@Component({
  selector: 'sidebar',
  template: <string> require('./sidebar.html'),
  styles: [
    <string> require('./sidebar.styl')
  ]
})

export class Sidebar {
  private listProposals: Array<any> = listProposals;

}
