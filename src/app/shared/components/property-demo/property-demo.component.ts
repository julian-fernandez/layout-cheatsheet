import { Component, input } from '@angular/core';

@Component({
  selector: 'lc-property-demo',
  standalone: true,
  template: `
    <article class="demo">
      <header class="demo__header">
        <div class="demo__title-row">
          <code class="demo__property">{{ property() }}</code>
          @if (appliesTo()) {
            <span class="demo__applies-to">applies to: {{ appliesTo() }}</span>
          }
        </div>
        <p class="demo__description">{{ description() }}</p>
      </header>

      <div class="demo__body">
        <div class="demo__controls">
          <ng-content select="[controls]" />
        </div>
        <div class="demo__preview">
          <ng-content select="[preview]" />
        </div>
      </div>

      @if (cssOutput()) {
        <footer class="demo__code">
          <code>{{ cssOutput() }}</code>
        </footer>
      }
    </article>
  `,
  styles: `
    @use 'styles/tokens' as t;

    .demo {
      background: t.$color-surface;
      border: 1px solid t.$color-border;
      border-radius: t.$radius-lg;
      overflow: hidden;
    }

    .demo__header {
      padding: 1.25rem 1.5rem 1rem;
      border-bottom: 1px solid t.$color-border;
    }

    .demo__title-row {
      display: flex;
      align-items: baseline;
      gap: 0.75rem;
      margin-bottom: 0.5rem;
      flex-wrap: wrap;
    }

    .demo__property {
      font-family: t.$font-mono;
      font-size: 1.0625rem;
      font-weight: 700;
      color: t.$color-accent;
      background: t.$color-accent-glow;
      padding: 0.125rem 0.5rem;
      border-radius: t.$radius-sm;
    }

    .demo__applies-to {
      font-size: 0.75rem;
      font-family: t.$font-mono;
      color: t.$color-text-muted;
      background: t.$color-surface-raised;
      padding: 0.125rem 0.5rem;
      border-radius: t.$radius-sm;
      border: 1px solid t.$color-border;
    }

    .demo__description {
      font-size: 0.9375rem;
      color: t.$color-text-secondary;
      line-height: 1.6;
    }

    .demo__body {
      display: grid;
      grid-template-columns: 1fr;
      min-height: 200px;

      @media (min-width: 768px) {
        grid-template-columns: 280px 1fr;
      }
    }

    .demo__controls {
      padding: 1.25rem;
      border-bottom: 1px solid t.$color-border;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;

      @media (min-width: 768px) {
        border-bottom: none;
        border-right: 1px solid t.$color-border;
      }
    }

    .demo__preview {
      padding: 1.25rem;
      background: t.$color-bg;
      display: flex;
      align-items: stretch;
    }

    .demo__code {
      padding: 0.625rem 1.25rem;
      background: t.$color-surface-raised;
      border-top: 1px solid t.$color-border;
      font-family: t.$font-mono;
      font-size: 0.8125rem;
      color: t.$color-success;
    }
  `,
})
export class PropertyDemoComponent {
  readonly property = input.required<string>();
  readonly description = input.required<string>();
  readonly appliesTo = input<string>('');
  readonly cssOutput = input<string>('');
}
