import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Movie } from '../../interfaces/movie.interface';
import { DescriptionPipe } from '../../pipes/description.pipe';
import { ImagePipe } from '../../pipes/image.pipe';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, ImagePipe, DescriptionPipe],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent {
  // -------------------------Carousel Info-------------------------
  @Input() videoContents: Movie[];
  @Input() title: string;
  // -------------------------End Carousel Info-------------------------

  // --------------------------------------------------Current Content Details--------------------------------------------------
  selectedContent: string | null = null;

  // -------------------------Set Current Content-------------------------
  setHoverContent(content: Movie) {
    this.selectedContent = content.original_title ?? content.title;
  }
  // -------------------------End Set Current Content-------------------------

  // -------------------------Clear Current Content-------------------------
  clearHoverContent() {
    this.selectedContent = null;
  }
  // -------------------------End Clear Current Content-------------------------
  // --------------------------------------------------End Current Content Details--------------------------------------------------
}
