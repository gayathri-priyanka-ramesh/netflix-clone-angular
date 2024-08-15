import { Component } from '@angular/core';
import { SectionDetails } from '../../interfaces/section-details.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
})
export class SectionComponent {
  // --------------------------------------------------Section Details--------------------------------------------------
  sectionDetails: SectionDetails[] = [
    {
      title: '1 Lorem, ipsum dolor.',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum commodi sunt culpa enim, neque eaque reiciendis necessitatibus.',
      imageUrl: '../../../../assets/tv.png',
      imageAlt: 'Enjoy on your TV',
      videoUrl: '../../../../assets/tv.m4v',
    },
    {
      title: '2 Placeat, saepe provident!',
      description:
        'Accusamus eligendi, beatae minima voluptatem deleniti optio earum quas unde iste illum quae libero et esse nam.',
      imageUrl: '../../../../assets/mobile.jpg',
      imageAlt: 'Download your shows to watch offline',
      subImageUrl: '../../../../assets/boxshot.png',
      subImageAlt: 'Stranger Things',
    },
    {
      title: '3 Dolorum, nulla dolorem.',
      description:
        'Explicabo hic at possimus veniam quia enim, est id a non repellat, ipsa asperiores officiis pariatur eaque!',
      imageUrl: '../../../../assets/devices.png',
      imageAlt: 'Watch everywhere',
      videoUrl: '../../../../assets/devices.m4v',
    },
    {
      title: '4 Unde, cupiditate id?',
      description:
        'Ad reiciendis enim suscipit fugiat ratione dolor tempore illum nostrum molestiae cupiditate, animi similique id obcaecati eveniet.',
      imageUrl: '../../../../assets/kids.png',
      imageAlt: 'Create profiles for kids',
    },
  ];
  // --------------------------------------------------Section Details--------------------------------------------------
}
