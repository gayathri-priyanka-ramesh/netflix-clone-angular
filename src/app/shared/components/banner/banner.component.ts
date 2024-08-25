import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DescriptionPipe } from '../../pipes/description.pipe';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, DescriptionPipe],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent implements OnChanges {
  private urlSanitizer = inject(DomSanitizer);

  // -------------------------Banner Info-------------------------
  @Input({ required: true }) title: string = '';
  @Input() overview: string = '';
  @Input({ required: true }) key: string = '';
  @Input() isBackdrop: boolean;
  videoURL = this.urlSanitizer.bypassSecurityTrustResourceUrl(
    `https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&playlist=${this.key}&controls=0&showinfo=0&modestbranding=1&rel=0`
  );
  backdropURL = `https://image.tmdb.org/t/p/original${this.key}`;
  // -------------------------End Banner Info-------------------------

  // -------------------------Detect Banner Info Changes-------------------------
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['key']) {
      this.videoURL = this.urlSanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&playlist=${this.key}&controls=0&showinfo=0&modestbranding=1&rel=0`
      );
      this.backdropURL = `https://image.tmdb.org/t/p/original${this.key}`;
    }
  }
  // -------------------------End Detect Banner Info Changes-------------------------
}
