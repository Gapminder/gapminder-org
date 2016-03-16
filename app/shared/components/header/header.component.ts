import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {Collapse, DROPDOWN_DIRECTIVES} from 'ng2-bootstrap';
import {Root} from '../../../sections/root/root.component.ts';

const listCharts = [
  {
    name: 'Bubbles Chart',
    href: 'tools/bubbles',
    description: 'Explore a Wo rld the motion with animated statistics',
    img: '../../assets/img/bubbles.svg'
  }, {
    name: 'Map Chart',
    href: 'tools/map',
    description: 'Explore a World the motion with animated statistics',
    img: '../../assets/img/mapa_icon.svg'
  }, {
    name: 'Mountain Charts',
    href: 'tools/mountain',
    description: 'Explore a World the motion with animated statistics',
    img: '../../assets/img/mountain.svg'
  }
];

const listFacts = [
  {
    name: 'Answers',
    href: '',
    description: 'Wath Hans Rosling answer huge fact-questions in less than 90 sec.',
    img: '../../assets/img/qw.svg'
  }, {
    name: 'Awards',
    href: '',
    description: 'Explore a World in motion with animated statistics',
    img: '../../assets/img/ico_fact_03.svg'
  }, {
    name: 'Massive Ignorance',
    href: '',
    description: 'Beware the shocking results from our global knowladge surveys',
    img: '../../assets/img/ico_fact_02.svg'
  }, {
    name: 'Data',
    href: '',
    description: 'Download tables with stats gathered form hundreds of sources',
    img: '../../assets/img/ico_fact_04.svg'
  }
];

@Component({
  selector: 'header',
  template: <string> require('./header.html'),
  styles: [
    <string> require('./header.styl')
  ],
  directives: [Collapse, DROPDOWN_DIRECTIVES, ROUTER_DIRECTIVES]
})

export class Header {
  private listCharts: Array<any> = listCharts;
  private listFacts: Array<any> = listFacts;
  private isOnRootView: boolean;

  constructor(router:Router) {

    router.subscribe((url) => {
      router.recognize(url).then((instruction) => {
        this.isOnRootView = instruction.component.componentType === Root;
      });
    });
  }
}
