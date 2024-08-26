import { Component } from '@angular/core';
import { SectionDetails } from '../../interfaces/sectionDetails.interface';
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
      imageUrl:
        'https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png',
      imageAlt: 'Enjoy on your TV',
      videoUrl:
        'https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-in-0819.m4v',
    },
    {
      title: '2 Placeat, saepe provident!',
      description:
        'Accusamus eligendi, beatae minima voluptatem deleniti optio earum quas unde iste illum quae libero et esse nam.',
      imageUrl:
        'https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg',
      imageAlt: 'Download your shows to watch offline',
      subImageUrl:
        'https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/boxshot.png',
      subImageAlt: 'Stranger Things',
    },
    {
      title: '3 Dolorum, nulla dolorem.',
      description:
        'Explicabo hic at possimus veniam quia enim, est id a non repellat, ipsa asperiores officiis pariatur eaque!',
      imageUrl:
        'https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile-in.png',
      imageAlt: 'Watch everywhere',
      videoUrl:
        'https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices-in.m4v',
    },
    {
      title: '4 Unde, cupiditate id?',
      description:
        'Ad reiciendis enim suscipit fugiat ratione dolor tempore illum nostrum molestiae cupiditate, animi similique id obcaecati eveniet.',
      imageUrl:
        'https://occ-0-2484-3662.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABVr8nYuAg0xDpXDv0VI9HUoH7r2aGp4TKRCsKNQrMwxzTtr-NlwOHeS8bCI2oeZddmu3nMYr3j9MjYhHyjBASb1FaOGYZNYvPBCL.png?r=54d',
      imageAlt: 'Create profiles for kids',
    },
  ];
  // --------------------------------------------------Section Details--------------------------------------------------
}
