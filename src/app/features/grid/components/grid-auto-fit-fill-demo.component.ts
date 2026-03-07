import { Component, computed, signal } from '@angular/core';
import { PropertyDemoComponent } from '../../../shared/components/property-demo/property-demo.component';
import { PreviewBoxComponent } from '../../../shared/components/preview-box/preview-box.component';
import { ControlToggleComponent } from '../../../shared/components/control-toggle/control-toggle.component';
import { ControlSliderComponent } from '../../../shared/components/control-slider/control-slider.component';

type Mode = 'auto-fill' | 'auto-fit';

@Component({
  selector: 'lc-grid-auto-fit-fill-demo',
  standalone: true,
  imports: [
    PropertyDemoComponent,
    PreviewBoxComponent,
    ControlToggleComponent,
    ControlSliderComponent,
  ],
  template: `
    <lc-property-demo
      property="repeat(auto-fill / auto-fit)"
      description="Both pack as many columns as fit without media queries. The key difference: auto-fill creates empty ghost tracks to preserve column width — items don't grow. auto-fit collapses those empty tracks, so existing items stretch to fill the row. Best seen with only a few items in a wide container."
      appliesTo="grid container"
      [cssOutput]="css()"
    >
      <div controls style="display:flex; flex-direction:column; gap: 1rem;">
        <lc-control-toggle
          label="Keyword"
          [options]="['auto-fill', 'auto-fit']"
          [value]="mode()"
          (valueChange)="setMode($event)"
        />
        <lc-control-slider
          label="min item width"
          [value]="minWidth()"
          [min]="60"
          [max]="200"
          [step]="10"
          unit="px"
          (valueChange)="minWidth.set($event)"
        />
      </div>
      <lc-preview-box
        preview
        [containerStyle]="containerStyle()"
        [boxes]="boxes"
      />
    </lc-property-demo>
  `,
})
export class GridAutoFitFillDemoComponent {
  protected readonly mode = signal<Mode>('auto-fill');
  protected setMode(value: string): void { this.mode.set(value as Mode); }
  protected readonly minWidth = signal(100);
  // Only 3 items so the gap between auto-fill and auto-fit is clearly visible
  protected readonly boxes = [{}, {}, {}];

  protected readonly containerStyle = computed(() => ({
    display: 'grid',
    'grid-template-columns': `repeat(${this.mode()}, minmax(${this.minWidth()}px, 1fr))`,
    gap: '8px',
    padding: '12px',
  }));

  protected readonly css = computed(
    () =>
      `grid-template-columns:\n  repeat(${this.mode()}, minmax(${this.minWidth()}px, 1fr));`,
  );
}
