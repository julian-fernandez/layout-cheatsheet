import { Component, computed, signal } from '@angular/core';
import { PropertyDemoComponent } from '../../../shared/components/property-demo/property-demo.component';
import { PreviewBoxComponent } from '../../../shared/components/preview-box/preview-box.component';
import { ControlToggleComponent } from '../../../shared/components/control-toggle/control-toggle.component';

const OPTIONS = ['start', 'end', 'center', 'stretch', 'space-between', 'space-around', 'space-evenly'];

@Component({
  selector: 'lc-grid-justify-align-content-demo',
  standalone: true,
  imports: [PropertyDemoComponent, PreviewBoxComponent, ControlToggleComponent],
  template: `
    <lc-property-demo
      property="justify-content / align-content"
      description="Distributes the entire grid within its container when the total track size is smaller than the container. 'justify-content' is horizontal; 'align-content' is vertical. Only visible when the grid doesn't fill its container."
      appliesTo="grid container"
      [cssOutput]="css()"
    >
      <div controls style="display:flex; flex-direction:column; gap: 1rem;">
        <lc-control-toggle
          label="justify-content"
          [options]="options"
          [value]="justifyContent()"
          (valueChange)="justifyContent.set($event)"
        />
        <lc-control-toggle
          label="align-content"
          [options]="options"
          [value]="alignContent()"
          (valueChange)="alignContent.set($event)"
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
export class GridJustifyAlignContentDemoComponent {
  protected readonly options = OPTIONS;

  /** Horizontal distribution of the entire grid within its container. */
  protected readonly justifyContent = signal('start');

  /** Vertical distribution of the entire grid within its container. */
  protected readonly alignContent = signal('start');

  // `auto` tracks size to content (small boxes), leaving leftover space for start/end/center/space-*
  // to distribute. `stretch` then expands those auto tracks to fill all remaining container space.
  // Using fixed-px tracks instead would eliminate leftover space and make this demo invisible.
  protected readonly boxes: { style: Record<string, string> }[] = [
    { style: { 'min-width': '60px', 'min-height': '60px' } },
    { style: { 'min-width': '60px', 'min-height': '60px' } },
    { style: { 'min-width': '60px', 'min-height': '60px' } },
    { style: { 'min-width': '60px', 'min-height': '60px' } },
  ];

  /**
   * `auto` column and row tracks size to content, keeping the grid smaller than its container.
   * That leftover space is what justify-content and align-content distribute.
   * min-height ensures the container is taller than the grid so align-content is visible.
   */
  protected readonly containerStyle = computed(() => ({
    display: 'grid',
    'grid-template-columns': 'repeat(2, auto)',
    'grid-template-rows': 'repeat(2, auto)',
    'justify-content': this.justifyContent(),
    'align-content': this.alignContent(),
    gap: '8px',
    padding: '12px',
    'min-height': '240px',
    width: '100%',
  }));

  /** Derives the CSS snippet shown in the code footer. */
  protected readonly css = computed(
    () =>
      `justify-content: ${this.justifyContent()}; align-content: ${this.alignContent()};`
  );
}
