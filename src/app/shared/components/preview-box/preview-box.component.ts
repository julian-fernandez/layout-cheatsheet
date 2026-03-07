import { Component, input } from '@angular/core';

const BOX_COLORS = ['#7c83ff', '#f472b6', '#4ade80', '#fbbf24', '#38bdf8', '#fb923c'];

@Component({
  selector: 'lc-preview-box',
  standalone: true,
  template: `
    <div class="preview-container" [style]="containerStyle()">
      @for (box of boxes(); track $index) {
        <div
          class="preview-item"
          [style.background]="BOX_COLORS[$index % BOX_COLORS.length]"
          [style]="box.style ?? {}"
        >
          {{ $index + 1 }}
        </div>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }

    .preview-container {
      width: 100%;
      min-height: 160px;
      border: 1px dashed rgba(255,255,255,0.1);
      border-radius: 8px;
      transition: all 0.25s ease;
    }

    .preview-item {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 40px;
      min-height: 48px;
      border-radius: 6px;
      font-weight: 700;
      font-size: 0.875rem;
      color: rgba(0, 0, 0, 0.7);
      transition: all 0.25s ease;
    }
  `,
})
export class PreviewBoxComponent {
  readonly containerStyle = input.required<Record<string, string>>();
  readonly boxes = input<{ style?: Record<string, string> }[]>([
    {}, {}, {}, {},
  ]);

  protected readonly BOX_COLORS = BOX_COLORS;
}
