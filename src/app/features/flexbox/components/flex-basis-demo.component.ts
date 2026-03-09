import { Component, computed, signal } from '@angular/core';
import { PropertyDemoComponent } from '../../../shared/components/property-demo/property-demo.component';
import { PreviewBoxComponent } from '../../../shared/components/preview-box/preview-box.component';
import { ControlSliderComponent } from '../../../shared/components/control-slider/control-slider.component';

@Component({
  selector: 'lc-flex-basis-demo',
  standalone: true,
  imports: [PropertyDemoComponent, PreviewBoxComponent, ControlSliderComponent],
  template: `
    <lc-property-demo
      property="flex-basis"
      description="Sets the initial main-size of a flex item before grow or shrink is applied. Unlike width, flex-basis participates directly in the flex algorithm — it's the 'ideal' size an item negotiates from. Item 1 has its basis controlled here; items 2 & 3 use 'auto' (sized by content)."
      appliesTo="flex item"
      [cssOutput]="css()"
    >
      <lc-control-slider
        controls
        label="flex-basis (item 1)"
        [value]="basis()"
        [min]="0"
        [max]="300"
        [step]="10"
        unit="px"
        (valueChange)="basis.set($event)"
      />
      <lc-preview-box
        preview
        [containerStyle]="containerStyle"
        [boxes]="boxes()"
      />
    </lc-property-demo>
  `,
})
export class FlexBasisDemoComponent {
  /** flex-basis in pixels for item 1 — the "ideal" size before grow/shrink are applied. */
  protected readonly basis = signal(120);

  // containerStyle is static — only item 1's basis changes, so plain object suffices.
  protected readonly containerStyle: Record<string, string> = {
    display: 'flex',
    gap: '8px',
    padding: '12px',
    'align-items': 'center',
  };

  /**
   * Item 1 uses the controlled basis with flex-grow:0 and flex-shrink:1 to show
   * flex-basis as a hard starting point. Items 2 & 3 use 'auto' (sized by content)
   * to contrast with the explicitly sized item.
   */
  protected readonly boxes = computed(() => [
    {
      style: {
        'flex-basis': `${this.basis()}px`,
        'flex-grow': '0',
        'flex-shrink': '1',
      } as Record<string, string>,
    },
    { style: { 'flex-basis': 'auto', 'flex-grow': '0' } as Record<string, string> },
    { style: { 'flex-basis': 'auto', 'flex-grow': '0' } as Record<string, string> },
  ]);

  protected readonly css = computed(
    () =>
      `.item-1 { flex-basis: ${this.basis()}px; flex-grow: 0; flex-shrink: 1; }\n.item-2, .item-3 { flex-basis: auto; }`,
  );
}
