import { Component, computed, signal } from '@angular/core';
import { PropertyDemoComponent } from '../../../shared/components/property-demo/property-demo.component';
import { PreviewBoxComponent } from '../../../shared/components/preview-box/preview-box.component';
import { ControlSliderComponent } from '../../../shared/components/control-slider/control-slider.component';
import { ControlToggleComponent } from '../../../shared/components/control-toggle/control-toggle.component';

type Mode = 'equal-fr' | 'auto-fit' | 'mixed';

@Component({
  selector: 'lc-grid-template-columns-demo',
  standalone: true,
  imports: [PropertyDemoComponent, PreviewBoxComponent, ControlSliderComponent, ControlToggleComponent],
  template: `
    <lc-property-demo
      property="grid-template-columns"
      description="Defines the number and size of columns. 'fr' is a fractional unit — it divides the remaining space. 'auto-fit' with 'minmax()' creates a responsive column count with no media queries."
      appliesTo="grid container"
      [cssOutput]="css()"
    >
      <div controls style="display:flex; flex-direction:column; gap: 1rem;">
        <lc-control-toggle
          label="mode"
          [options]="modes"
          [value]="mode()"
          (valueChange)="mode.set($any($event))"
        />
        @if (mode() === 'equal-fr') {
          <lc-control-slider
            label="columns"
            [value]="cols()"
            [min]="1"
            [max]="6"
            (valueChange)="cols.set($event)"
          />
        }
        @if (mode() === 'auto-fit') {
          <lc-control-slider
            label="min column width"
            [value]="minWidth()"
            [min]="60"
            [max]="200"
            [step]="10"
            unit="px"
            (valueChange)="minWidth.set($event)"
          />
        }
      </div>
      <lc-preview-box
        preview
        [containerStyle]="containerStyle()"
        [boxes]="boxes"
      />
    </lc-property-demo>
  `,
})
export class GridTemplateColumnsDemoComponent {
  protected readonly modes: Mode[] = ['equal-fr', 'auto-fit', 'mixed'];

  /** Active column mode — maps to a different grid-template-columns string. */
  protected readonly mode = signal<Mode>('equal-fr');

  /** Number of equal-fr columns (only active in equal-fr mode). */
  protected readonly cols = signal(3);

  /** Minimum item width in px for auto-fit mode (only active in auto-fit mode). */
  protected readonly minWidth = signal(100);

  protected readonly boxes = [{}, {}, {}, {}, {}, {}];

  /**
   * Intermediate computed that maps the friendly mode enum to the actual CSS value.
   * Extracted as its own computed so both `containerStyle` and `css` can share it
   * without duplicating the switch logic.
   */
  protected readonly templateColumns = computed(() => {
    switch (this.mode()) {
      case 'equal-fr':
        return `repeat(${this.cols()}, 1fr)`;
      case 'auto-fit':
        // auto-fit collapses empty tracks, allowing items to stretch into freed space.
        return `repeat(auto-fit, minmax(${this.minWidth()}px, 1fr))`;
      case 'mixed':
        return '1fr 2fr 1fr';
    }
  });

  /** Derives the full container style object applied to the preview grid. */
  protected readonly containerStyle = computed(() => ({
    display: 'grid',
    'grid-template-columns': this.templateColumns(),
    gap: '8px',
    padding: '12px',
  }));

  /** Derives the CSS snippet shown in the code footer. */
  protected readonly css = computed(
    () => `display: grid; grid-template-columns: ${this.templateColumns()};`
  );
}
