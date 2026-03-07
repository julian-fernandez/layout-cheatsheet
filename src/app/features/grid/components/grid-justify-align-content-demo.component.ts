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
  protected readonly justifyContent = signal('start');
  protected readonly alignContent = signal('start');

  // 'auto' tracks: size to content by default (small), so start/end/center/space-* all show
  // leftover space around them. 'stretch' then expands those auto tracks to fill the container —
  // which is the only sizing that allows stretch to actually do something.
  protected readonly boxes: { style: Record<string, string> }[] = [
    { style: { 'min-width': '60px', 'min-height': '60px' } },
    { style: { 'min-width': '60px', 'min-height': '60px' } },
    { style: { 'min-width': '60px', 'min-height': '60px' } },
    { style: { 'min-width': '60px', 'min-height': '60px' } },
  ];

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

  protected readonly css = computed(
    () =>
      `justify-content: ${this.justifyContent()}; align-content: ${this.alignContent()};`
  );
}
